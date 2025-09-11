import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  specialization: {
    type: String,
    required: true,
  },

  qualifications: {
    type: String,
  },

  experience: {
    type: Number, // In years
    min: 0,
  },
  department: {
    type: String,
  },

  availability: [
    {
      day: {
        type: String, // Example: 'Monday'
      },
      startTime: String, // Example: '09:00 AM'
      endTime: String,   // Example: '01:00 PM'
    }
  ],

  phone: String,
  consultationFee: Number,
});

export default mongoose.model('Doctor', doctorSchema);
