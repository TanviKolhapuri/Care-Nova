import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String,
  },
  insuranceInfo: {
    provider: String,
    policyNumber: String,
  },
  esiInfo: {
    esiNumber: String,
  },
  medicalHistory: [
    {
      medicalRecord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalRecordSchema',
        required: true,
      },
    },
  ],
});

export default mongoose.model('Patient', patientSchema);
