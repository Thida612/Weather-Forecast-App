import { Router } from 'express';
const router = Router();

 import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
    const { cityName } = req.body;
    console.log('Received cityName:', cityName);
  // TODO: GET weather data from city name
  const weatherData = await WeatherService.getWeatherForCity(cityName);
    console.log('Fetched weatherData:', weatherData);

  // TODO: save city to search history
  await HistoryService.addCity(cityName);

  res.status(200).json(weatherData);
} catch (error) {
  console.error('Error retrieving weather data:', error);
  res.status(500).json({ message: 'Error retrieving weather data' });
}
});

// TODO: GET search history
router.get('/history', async (req, res) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
