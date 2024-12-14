
import express from 'express';
import Doctor from '../model/doctor.model.js';

const router = express.Router();

// Create a new doctor
router.post('/', async (req, res) => {
  try {
    console.log("req.body",req.body);    
    const { name, speciality, contact } = req.body;
    const newDoctor = await Doctor.create({ name, speciality, contact });
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all doctors
router.get('/', async (req, res) => {
  try {
    console.log("coming");    
    const doctors = await Doctor.findAll();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update doctor information
router.put('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (doctor) {
      const { name, speciality, contact } = req.body;
      doctor.name = name || doctor.name;
      doctor.speciality = speciality || doctor.speciality;
      doctor.contact = contact || doctor.contact;
      await doctor.save();
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a doctor
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (doctor) {
      await doctor.destroy();
      res.status(200).json({ message: 'Doctor deleted' });
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
