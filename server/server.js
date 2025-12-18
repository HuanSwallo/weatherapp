import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/weather', async (req , res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({error: "City is required"});
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        res.json(data);
    } catch (err) {
        res.status(500).json({error: "Failed to fetch weather data"});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

