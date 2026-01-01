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
    const { city, unit = "metric" } = req.query;

    if (!city) {
        return res.status(400).json({error: "City is required"});
    }

    try {
        // 1) Current weather (gives coord)
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${process.env.WEATHER_API_KEY}`;

        const currentResponse = await fetch(currentUrl);
        const currentData = await currentResponse.json();


        // 2) 5-day / 3-hour forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=${unit}&appid=${process.env.WEATHER_API_KEY}`;

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        // Build daily summaries from 3-hour blocks
        const daily = buildDailySummaries(forecastData);

        res.json({ currentData, forecastData, daily });
    } catch (err) {
        res.status(500).json({error: "Failed to fetch weather data"});
    }
});

app.get('/suggestions', async (req, res) => {
    const { query } = req.query;
    
    if (!query || query.length < 2) {
        return res.json([]);
    }

    try {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.WEATHER_API_KEY}`
        const response = await fetch(url);
        const data = await response.json();

        res.json(data);
    } catch (err) {
        res.status(500).json({error: "Failed to fetch city suggestions"});
    }
});

app.get('/gif', async (req, res) => {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query is required"});
    }

    try {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${encodeURIComponent(query)}&rating=pg-13`;
      const response = await fetch(url);
      const data = await response.json();
      
    const gifUrl =
  data?.data?.[0]?.images?.original?.url ?? null;

      res.json({ gifUrl });
    } catch (err) {
      res.status(500).json({error: "Failed to fetch GIF"});
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// helper: group 3-hour data into daily min/max + max pop + representative icon
function buildDailySummaries(forecastData) {
  if (!forecastData || !forecastData.list) return [];

  const byDate = new Map();

  for (const item of forecastData.list) {
    const date = item.dt_txt.split(" ")[0]; // YYYY-MM-DD
    if (!byDate.has(date)) byDate.set(date, []);
    byDate.get(date).push(item);
  }

  const days = [];
  for (const [date, items] of byDate.entries()) {
    const temps = items.map(x => x.main.temp);
    const min = Math.min(...temps);
    const max = Math.max(...temps);

    const pop = Math.max(...items.map(x => x.pop ?? 0)); // 0..1

    // pick the item closest to 12:00 as "representative" icon/desc
    const midday = items.reduce((best, cur) => {
      const bestDiff = Math.abs(new Date(best.dt_txt).getHours() - 12);
      const curDiff = Math.abs(new Date(cur.dt_txt).getHours() - 12);
      return curDiff < bestDiff ? cur : best;
    }, items[0]);

    days.push({
      date,
      min,
      max,
      pop,
      icon: midday.weather?.[0]?.icon,
      desc: midday.weather?.[0]?.description
    });
  }

  // forecast includes today + next days. We usually want tomorrow.. + up to 5 days total.
  return days;
}
