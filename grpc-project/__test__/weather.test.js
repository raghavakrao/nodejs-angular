const request = require('supertest');
const weather = require('../weather'); 
const { auth } = require('../middleware');
const { TemperatureLabel, Op } = require('../db/models');
const axios = require('axios');

jest.mock('../middleware');
jest.mock('axios');
jest.mock('../db/models');

describe('Weather API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return weather data for a valid city', async () => {
    const mockCity = 'London';
    const mockTemperature = 25;
    const mockTemperatureLabel = { label: 'Sunny' };
    const mockReq = { query: { city: mockCity } };
    const mockResponse = {
      data: {
        main: { temp: mockTemperature },
      },
    };

    axios.get.mockResolvedValue(mockResponse);
    TemperatureLabel.findOne.mockResolvedValue(mockTemperatureLabel);
    auth.mockImplementation((req, res, next) => next());
    const response = await request(weather).get('/api/weather').query(mockReq.query);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.temperature).toBe(mockTemperature);
    expect(response.body.label).toBe(mockTemperatureLabel.label);
  });

  it('should return weather data for a different city ', async () => {
    const mockCity = 'Hyderbad';
    const mockTemperature = 25;
    const mockTemperatureLabel = { label: 'Sunny' };
    const mockReq = { query: { city: mockCity } };
    const mockResponse = {
      data: {
        main: { temp: mockTemperature },
      },
    };
    axios.get.mockResolvedValue(mockResponse);
    TemperatureLabel.findOne.mockResolvedValue(mockTemperatureLabel);
    auth.mockImplementation((req, res, next) => next());
    const response = await request(weather).get('/api/weather').query(mockReq.query);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.temperature).toBe(mockTemperature);
    expect(response.body.label).toBe(mockTemperatureLabel.label);
  });

  it('should return 400 when city is not provided', async () => {
    const mockReq = { query: {} };
    auth.mockImplementation((req, res, next) => next());

    const response = await request(weather).get('/api/weather').query(mockReq.query);
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('city is required field.');
  });

  it('should return 404 when temperature label not found', async () => {
    const mockCity = 'InvalidCity';
    const mockReq = { query: { city: mockCity } };
    const mockResponse = {
        data: {
          main: { temp: 15 },
        },
      };
  
    axios.get.mockResolvedValue(mockResponse);
    auth.mockImplementation((req, res, next) => next());
    TemperatureLabel.findOne.mockResolvedValue(null);
    const response = await request(weather).get('/api/weather').query(mockReq.query);
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Temperature label not found.');
  });
});
