// models/Admin.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  department: {
    type: String,
  },

});

export default mongoose.model('Admin', adminSchema);
