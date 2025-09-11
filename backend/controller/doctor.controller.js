import Patient from '../models/patient.model.js';
import MedicalRecord from '../models/medicalRecord.model.js'
import cipherionClient from '../config/cipherion.config.js';

// Add or Update Medical Record
export const addOrUpdateMedicalRecord = async (req, res) => {
  try {
    const { patientId } = req.params;
    const {
      condition,
      symptoms,
      currentMedications,
      notes,
      allergies
    } = req.body;

    
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

   
    let encryptedData = await cipherionClient.deepEncrypt(req.body)

    const newMedicalRecord = new MedicalRecord({
      condition: encryptedData.encrypted.condition,
      symptoms: encryptedData.encrypted.symptoms,
      currentMedications: encryptedData.encrypted.currentMedications,
      notes:encryptedData.encrypted.notes,
      allergies:encryptedData.encrypted.allergies,
    });

    // Without Cipherion
    //  const newMedicalRecord = new MedicalRecord({
    //   condition,
    //   symptoms,
    //   currentMedications,
    //   notes,
    //   allergies,
    // });


    const savedMedicalRecord = await newMedicalRecord.save();

    // Step 3: Add the new medical record to the patient's medicalHistory
    patient.medicalHistory.push({ medicalRecord: savedMedicalRecord._id });
    await patient.save();

    res.status(201).json({
      message: 'Medical record added successfully',
      record: savedMedicalRecord,
    });
  } catch (error) {
    console.error('Error adding medical record:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
