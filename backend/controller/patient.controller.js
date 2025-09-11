import Patient from '../models/patient.model.js';


import cipherionClient from '../config/cipherion.config.js';
// Add or Update Patient Details
export const addOrUpdatePatientDetails = async (req, res) => {
  try {
    const user = req.details;

    // Role check
    if (!user || user.role !== 'patient') {
      return res.status(403).json({ message: 'Access denied. Only patients can perform this action.' });
    }


    const {
      dob,
      gender,
      phone,
      address,
      emergencyContact,
      insuranceInfo,
      esiInfo,
    } = req.body;

    let finalInsuranceInfo;
    let finalEsiInfo ;

    // Encrypt insuranceInfo
    if (insuranceInfo) {
      try {
        const resp = await cipherionClient.deepEncrypt(insuranceInfo ); 
        finalInsuranceInfo = resp.encrypted;
      } catch (encErr) {
        console.warn("Encryption failed for insuranceInfo, storing raw data:", encErr.message);
      }
    }

    // Encrypt esiInfo
    if (esiInfo) {
      try {
        const resp = await cipherionClient.deepEncrypt(esiInfo );
        finalEsiInfo = resp.encrypted;
      } catch (encErr) {
        console.warn("Encryption failed for esiInfo, storing raw data:", encErr.message);
      }
    }

    // Check if patient record already exists
    let patient = await Patient.findOne({ userId: user._id });

    if (patient) {
      // Update patient record
      patient.dob = dob || patient.dob;
      patient.gender = gender || patient.gender;
      patient.phone = phone || patient.phone;
      patient.address = address || patient.address;
      patient.emergencyContact = emergencyContact || patient.emergencyContact;
      patient.insuranceInfo = finalInsuranceInfo || patient.insuranceInfo;
      patient.esiInfo = finalEsiInfo || patient.esiInfo;

      await patient.save();
      return res.status(200).json({ message: 'Patient details updated successfully.', patient });
    }

    // Create new patient record
    const newPatient = new Patient({
      userId: user._id,
      dob,
      gender,
      phone,
      address,
      emergencyContact,
      insuranceInfo: finalInsuranceInfo,
      esiInfo: finalEsiInfo,
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient details added successfully.', patient: newPatient });

  } catch (error) {
    console.error('Error in adding/updating patient details:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const formatForDecryption = (history) => {
  return history.map((item) => {
    const record = item?.medicalRecord;
    if (!record) return null;

    return {
      condition: record.condition,
      symptoms: record.symptoms,
      notes: record.notes,
      currentMedications: record.currentMedications,
      allergies: record.allergies,
    };
  }).filter(Boolean);
};

export const getMedicalRecordsOfPatient = async (req, res) => {
  try {
    const userId = req.details?._id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing in request" });
    }

    const patient = await Patient.findOne({ userId })
      .populate({
        path: "medicalHistory.medicalRecord",
        model: "MedicalRecordSchema",
        select: "-__v -createdAt -updatedAt",
      })
      .lean();

    if (!patient) {
      return res.status(404).json({ message: "Patient not found for the given user" });
    }

    if (!patient.medicalHistory?.length) {
      return res.status(404).json({ message: "No medical history found for the patient" });
    }

    const encryptedPayload = formatForDecryption(patient.medicalHistory);

    let records;
    try {
      records = await cipherionClient.deepDecrypt(encryptedPayload);
    } catch (decryptError) {
      console.error("Decryption error:", decryptError?.response?.data || decryptError);
      return res.status(500).json({ message: "Error decrypting medical records" });
    }

    const filtered = (records?.data || []).filter(Boolean);

    if (!filtered.length) {
      return res.status(404).json({ message: "No valid medical records found" });
    }

    res.status(200).json({
      message: "Medical records fetched successfully",
      count: filtered.length,
      records: filtered,
    });
  } catch (error) {
    console.error("Fetch Medical Records Error:", error);
    res.status(500).json({ message: "Server error while fetching medical records" });
  }
};

// @desc   Get patient details
// @route  GET /api/patients/me
// @access Private (Patient only)

export const getPatientDetails = async (req, res) => {
  try {
    const user = req.details; // Extracted from JWT middleware

    if (!user || user.role !== 'patient') {
      return res.status(403).json({ message: 'Access denied. Only patients can access their details.' });
    }

    // Find patient record
    const patient = await Patient.findOne({ userId: user._id }).lean();

    if (!patient) {
      // Return empty fields if patient record doesn't exist
      return res.status(200).json({
        message: 'Patient record not found, returning empty fields.',
        patient: {
          dob: '',
          gender: '',
          phone: '',
          address: '',
          emergencyContact: {
            name: '',
            phone: '',
            relationship: '',
          },
          insuranceInfo: {
            provider: '',
            policyNumber: '',
          },
          esiInfo: {
            esiNumber: '',
          },
        },
      });
    }

    let decryptedInsuranceInfo = patient.insuranceInfo;
    let decryptedEsiInfo = patient.esiInfo;

    // Decrypt insuranceInfo
    if (patient) {
      try {
        const resp = await cipherionClient.deepDecrypt(patient.insuranceInfo);
        decryptedInsuranceInfo = resp.data || patient.insuranceInfo;
      } catch (decErr) {
        console.warn("Decryption failed for insuranceInfo, sending raw data:", decErr.message);
      }
    }

    // Decrypt esiInfo
    if (patient) {
      try {
        const resp = await cipherionClient.deepDecrypt(patient.esiInfo);
        decryptedEsiInfo = resp.data || patient.esiInfo;
      } catch (decErr) {
        console.warn("Decryption failed for esiInfo, sending raw data:", decErr.message);
      }
    }

    res.status(200).json({
      message: 'Patient details fetched successfully.',
      patient: {
        dob: patient.dob || '',
        gender: patient.gender || '',
        phone: patient.phone || '',
        address: patient.address || '',
        emergencyContact: {
          name: patient.emergencyContact?.name || '',
          phone: patient.emergencyContact?.phone || '',
          relationship: patient.emergencyContact?.relationship || '',
        },
        insuranceInfo: {
          provider: decryptedInsuranceInfo?.provider || '',
          policyNumber: decryptedInsuranceInfo?.policyNumber || '',
        },
        esiInfo: {
          esiNumber: decryptedEsiInfo?.esiNumber || '',
        },
      },
    });
  } catch (error) {
    console.error('Error fetching patient details:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};