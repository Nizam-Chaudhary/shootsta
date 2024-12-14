import express from 'express';
import doctorRoutes from '../route/doctor.routes.js';

const router = express.Router();

router.get('/health-check', (req,res)=>{
    res.status(201).json("success");
});
router.use('/doctors', doctorRoutes);

export default router;