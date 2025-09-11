// routes/medicalRecordRoutes.js
import express from 'express';
import { addOrUpdateMedicalRecord } from '../controller/doctor.controller.js';
import { authenticateUser } from '../middleware/authenticate.js';


const doctorRouter = express.Router();

// Doctor adds medical record for a patient
doctorRouter.post('/patients/:patientId/medical-record', authenticateUser, addOrUpdateMedicalRecord);

export default doctorRouter;
