import { Router } from "express";
import { addDoctorDetailsByAdmin, getAllDoctorsAndAppointments } from "../controller/admin.controller.js";
import { authenticateUser } from "../middleware/authenticate.js";


const adminRouter = Router();

adminRouter.post('/adddoctordetails',authenticateUser,addDoctorDetailsByAdmin);
adminRouter.get('/getdetails',getAllDoctorsAndAppointments)




export default adminRouter;







