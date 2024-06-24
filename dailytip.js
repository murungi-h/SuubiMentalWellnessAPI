const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const router = express.Router();
require('dotenv')

// In-memory storage for the current daily quote
let currentQuote = null;

// Function to fetch the daily quote from the API
async function fetchDailyQuote() {
    const options = {
        method: 'GET',
        url: 'https://motivation-quotes-api.p.rapidapi.com/api/quotes',
        headers: {
            'x-rapidapi-key': '58a3bd261bmsh9b390df705bb777p1e8951jsn83ba169f7b2a',
            'x-rapidapi-host': 'motivation-quotes-api.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        // Assuming the API returns an array of quotes, we'll pick a random one
        const randomQuote = response.data[Math.floor(Math.random() * response.data.length)];
        currentQuote = {
            text: randomQuote.text,
            author: randomQuote.author
        };
        console.log('Daily quote updated:', currentQuote);
    } catch (error) {
        console.error('Error fetching daily quote:', error);
    }
}

// Schedule the cron job to run every day at 7 AM
cron.schedule('0 7 * * *', fetchDailyQuote);

// Fetch the first quote when the server starts
fetchDailyQuote();

// Endpoint to get the current daily quote
router.get('/daily-quote', (req, res) => {
    if (currentQuote) {
        res.json(currentQuote);
    } else {
        res.status(404).json({ message: 'Daily quote not available' });
    }
});

module.exports = router;
