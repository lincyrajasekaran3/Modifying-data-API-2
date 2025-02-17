require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const MenuItem = require('./models/MenuItem');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Update a Menu Item (PUT request)
app.put('/menu/:id', async (req, res) => {
  try {
      const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedItem) return res.status(404).json({ message: 'Menu item not found' });
      res.json(updatedItem);
  } catch (error) {
      res.status(400).json({ message: 'Error updating menu item', error });
  }
});

// Delete a Menu Item (DELETE request)
app.delete('/menu/:id', async (req, res) => {
  try {
      const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
      if (!deletedItem) return res.status(404).json({ message: 'Menu item not found' });
      res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
      res.status(400).json({ message: 'Error deleting menu item', error });
  }
});


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
