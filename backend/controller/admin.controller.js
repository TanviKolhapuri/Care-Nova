import { request } from 'express';
import Doctor from '../models/doctor.models.js';
import User from '../models/user.model.js';

import Appointment from '../models/appointment.model.js';


/**
 * Admin adds/updates a doctor's professional details
 * @route   POST /api/admin/doctor-details
 * @access  Admin only
 */
export const addDoctorDetailsByAdmin = async (req, res) => {
  try {
    const {
    userId,
      specialization,
      qualifications,
      experience,
      department,
      availability,
      phone,
      consultationFee,
      
    } = req.body;
    const{ _id,role} = req.details; 

    const adminId = _id
    const user = await User.findById(adminId);
    console.log(user)
    if (!user || user.role === 'patient') {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    // Check if doctor profile already exists
    let doctor = await Doctor.findOne({ userId });

    if (doctor) {
      // Update existing doctor details
      doctor.specialization = specialization;
      doctor.qualifications = qualifications;
      doctor.experience = experience;
      doctor.department = department;
      doctor.availability = availability;
      doctor.phone = phone;
      doctor.consultationFee = consultationFee;

      await doctor.save();
      return res.status(200).json({ message: 'Doctor details updated', doctor });
    }

    // Create new doctor profile
    const newDoctor = new Doctor({
      userId,
      specialization,
      qualifications,
      experience,
      department,
      availability,
      phone,
      consultationFee,
    });

    await newDoctor.save();
    res.status(201).json({ message: 'Doctor details added successfully', doctor: newDoctor });

  } catch (error) {
    console.error('Error adding doctor details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


/**
 * Admin fetches all doctor and appointment data
 * @route GET /api/admin/overview
 * @access Admin only
 */
export const getAllDoctorsAndAppointments = async (req, res) => {
  try {
    // 1. Get all users with role = "doctor"
    const doctorUsers = await User.find({ role: 'doctor' }).select('name email role');

    // 2. Fetch all doctor documents and index by userId for quick lookup
    const doctorProfiles = await Doctor.find();
    const doctorMap = new Map(); // key = userId.toString(), value = doctor doc
    doctorProfiles.forEach(doc => {
      doctorMap.set(doc.userId.toString(), doc);
    });

    // 3. Merge user data with doctor data
    const doctors = doctorUsers.map(user => {
      const docProfile = doctorMap.get(user._id.toString());

      return {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        _id: docProfile?._id || "",
        specialization: docProfile?.specialization || "",
        qualifications: docProfile?.qualifications || "",
        experience: docProfile?.experience || 0,
        department: docProfile?.department || "",
        availability: Array.isArray(docProfile?.availability) ? docProfile.availability : [],
        phone: docProfile?.phone || "",
        consultationFee: docProfile?.consultationFee || 0,
      };
    });

    // 4. Fetch all appointments with doctor and patient info
    const appointments = await Appointment.find()
      .populate({
        path: 'doctorId',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'name email',
        },
      })
      .populate({
        path: 'patientId',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'name email',
        },
      });

    // 5. Send final response
    res.status(200).json({
      success: true,
      data: {
        doctors,
        appointments,
      },
    });

  } catch (error) {
    console.error('Error in admin overview:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};