const express = require('express');
const User = require('../User'); // Ensure the correct path to the User model
const router = express.Router();

// Middleware to ensure authentication (assumed to be added elsewhere if required)

// Route to increment or decrement tokens dynamically
router.patch('/finalTokens/:id', async (req, res) => {
    const { id } = req.params; // Get ID from URL parameters
    const valueToUpdate = parseInt(req.query.valueToUpdate); // Parse to integer

    // Check if valueToUpdate is a valid number
    if (isNaN(valueToUpdate)) {
        return res.status(400).json({ message: 'Invalid token update value' });
    }

    try {
        // Find the user by ID and update tokens
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $inc: { tokens: valueToUpdate } },  
            { new: true }  // Return the updated document
        );

        // Check if the user exists
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser); // Return updated user data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
