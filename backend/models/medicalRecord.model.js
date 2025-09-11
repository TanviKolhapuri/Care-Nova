import mongoose from "mongoose";

const medicalRecordSchema = mongoose.Schema({
  condition: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  currentMedications: [String],
  notes: {
    type: String,
  },
  allergies: [String],
});

export default mongoose.model('MedicalRecordSchema', medicalRecordSchema);
