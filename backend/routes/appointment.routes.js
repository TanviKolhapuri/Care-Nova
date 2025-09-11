import express from 'express';
import { authenticateUser } from '../middleware/authenticate.js'; 
;
import { bookAppointment, getAppointments } from '../controller/appointment.control.js';

const appointmentRouter = express.Router();
appointmentRouter.get('/appointments', authenticateUser, getAppointments)
appointmentRouter.post('/book-appointment', authenticateUser, bookAppointment);

export default appointmentRouter;
