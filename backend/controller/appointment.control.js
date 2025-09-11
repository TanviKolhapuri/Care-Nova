import Appointment from '../models/appointment.model.js';
import Patient from '../models/patient.model.js';
import Doctor from '../models/doctor.models.js'
export const getAppointments = async (req, res) => {
  try {
    const user = req.details;

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized access.' });
    }

    let appointments;

    if (user.role === 'patient') {
      const patient = await Patient.findOne({ userId: user._id });
      if (!patient) {
        return res.status(404).json({ message: 'Patient profile not found.' });
      }

      appointments = await Appointment.find({ patientId: patient._id })
        .populate({
          path: 'doctorId',
          populate: { path: 'userId', model: 'User' }
        })
        .populate({
          path: 'patientId',
          populate: { path: 'userId', model: 'User' }
        })
        .sort({ date: -1 });

    } else if (user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: user._id });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor profile not found.' });
      }

      appointments = await Appointment.find({ doctorId: doctor._id })
        .populate({
          path: 'doctorId',
          populate: { path: 'userId', model: 'User' }
        })
        .populate({
          path: 'patientId',
          populate: { path: 'userId', model: 'User' }
        })
        .sort({ date: -1 });

    } else if (user.role === 'admin') {
      appointments = await Appointment.find()
        .populate({
          path: 'doctorId',
          populate: { path: 'userId', model: 'User' }
        })
        .populate({
          path: 'patientId',
          populate: { path: 'userId', model: 'User' }
        })
        .sort({ date: -1 });

    } else {
      return res.status(403).json({ message: 'Invalid role. Access denied.' });
    }

    // Add patientName to each appointment
    const appointmentsWithPatientName = appointments.map((appointment) => {
      const patientName = appointment.patientId?.userId?.name || 'Unknown';
      return {
        ...appointment._doc, // spread appointment data
        patientName,
      };
    });

    res.status(200).json({
      success: true,
      message: 'Appointments fetched successfully.',
      appointments: appointmentsWithPatientName,
    });

  } catch (error) {
    console.error('Error fetching appointments:', error.message);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};


export const bookAppointment = async (req, res) => {
  try {
    const user = req.details;

    // Only patients can book appointments
    if (!user || user.role !== 'patient') {
      return res.status(403).json({ message: 'Access denied. Only patients can book appointments.' });
    }

    const { doctorId, date, timeSlot, reason } = req.body;

    if (!doctorId || !date || !timeSlot) {
      return res.status(400).json({ message: 'doctorId, date, and timeSlot are required.' });
    }

    // Find the patient profile for the logged-in user
    const patient = await Patient.findOne({ userId: user._id });

    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found.' });
    }

    // Optional: Check for duplicate appointment at the same time
    const existingAppointment = await Appointment.findOne({
      patientId: patient._id,
      doctorId,
      date,
      timeSlot,
    });

    if (existingAppointment) {
      return res.status(409).json({ message: 'Appointment already exists for the selected time slot.' });
    }

    const newAppointment = new Appointment({
      patientId: patient._id,
      doctorId,
      date,
      timeSlot,
      reason,
    });

    await newAppointment.save();

    res.status(201).json({
      message: 'Appointment booked successfully.',
      appointment: newAppointment,
    });

  } catch (error) {
    console.error('Error booking appointment:', error.message);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
