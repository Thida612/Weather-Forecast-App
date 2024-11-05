import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();


// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
    class Weather {
    constructor(
    public city: string,
    public date: string,
    public icon: string,
    public iconDescription: string,
    public tempF: number,
    public windSpeed: number,
    public humidity: number
  ) {}
}

// TODO: Complete the WeatherService class
class WeatherService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org';
    this.apiKey = process.env.API_KEY || '';
  }
  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
     private async fetchLocationData(query: string): Promise<Coordinates> {
     const response = await axios.get(`${this.baseURL}/geo/1.0/direct`, {
      params: {
        q: query,
        limit: 1,
        appid: this.apiKey,
      },
    });
    const data = response.data[0];
    return { lat: data.lat, lon: data.lon };
  }

  // TODO: Create destructureLocationData method
      private destructureLocationData(locationData: Coordinates): Coordinates {
      return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }
  
  // TODO: Create buildWeatherQuery method
     private buildWeatherQuery(coordinates: Coordinates): string {
     return `${this.baseURL}/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
    private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(city);
    return this.destructureLocationData(locationData);
  }
}
  // TODO: Create fetchWeatherData method
    private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = this.buildWeatherQuery(coordinates);
    const response = await axios.get(url);
    return response.data;
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any, city: string): Weather {
    const { temp, humidity, wind_speed: windSpeed } = response.current;
    const { description, icon } = response.current.weather[0];
    const tempF = Math.round(temp);

    return new Weather(
      city,
      this.formatDate(response.current.dt),
      icon,
      description,
      tempF,
      windSpeed,
      humidity
    );
  }
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();