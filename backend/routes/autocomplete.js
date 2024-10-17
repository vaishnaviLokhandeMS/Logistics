const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/autocomplete', async (req, res) => {
  const { input } = req.query;
  const googlePlacesApiKey = process.env.GOOGLE_API_KEY; // Use your API key from .env

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
      params: {
        input,
        types: '(cities)',
        key: googlePlacesApiKey,
      },
    });

    res.json(response.data);  // Return the predictions as JSON
  } catch (error) {
    console.error('Error fetching location suggestions:', error.message);
    res.status(500).json({ error: 'Failed to fetch location suggestions' });
  }
});

module.exports = router;
