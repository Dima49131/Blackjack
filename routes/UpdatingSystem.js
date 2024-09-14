const express = require('express');
const User = require('../User'); // Ensure the correct path to the User model
const router = express.Router();

// Middleware to ensure authentication
router.patch('/incrementTokens/:id', async (req, res) => {
    const { id } = req.params; // Get ID from URL parameters

    try {
        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has enough tokens before decrementing
        if (user.tokens < 5) {
            return res.status(400).json({ message: 'Insufficient tokens' });
        }

        // Decrement tokens by 5
        user.tokens -= 5;
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/finalTokens/:id', async (req, res) => {
    const { id } = req.params; // Get ID from URL parameters
    const { valueToUpdate } = req.query;
    console.log(valueToUpdate);
    
    
    try {
        // Find the user by ID and decrement the tokens
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $inc: { tokens: valueToUpdate } },  
            { new: true }             // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
