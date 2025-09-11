import express from 'express';
import { authenticateUser } from '../middleware/authenticate.js'; 
import {  addOrUpdatePatientDetails, getMedicalRecordsOfPatient, getPatientDetails } from '../controller/patient.controller.js';

const patientRouter = express.Router();

// POST /api/patient/details
patientRouter.post('/details', authenticateUser, addOrUpdatePatientDetails);
patientRouter.get('/medical-records', authenticateUser, getMedicalRecordsOfPatient);
patientRouter.get('/profile', authenticateUser, getPatientDetails);
export default patientRouter;
