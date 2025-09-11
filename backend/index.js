import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.config.js';
import userRouter from './routes/user.routes.js';
import cors from 'cors';
import adminRouter from './routes/admin.routes.js';
import patientRouter from './routes/patient.routes.js';
import appointmentRouter from './routes/appointment.routes.js';
import doctorRouter from './routes/doctor.routes.js';


dotenv.config();

const app = express();
const PORT = 5000;


app.use(cors())
// app.options("*",cors())
app.use(express.json());
connectDB()
// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express server on port 8000!');
});

app.use('/user',userRouter)
app.use('/admin',adminRouter)
app.use('/patient',patientRouter)
app.use('/appointment',appointmentRouter)
app.use('/doctor',doctorRouter)
// app.post('/temp',temp)
// Global Error Handler (for thrown or passed errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
