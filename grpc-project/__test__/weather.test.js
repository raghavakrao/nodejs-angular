const request = require('supertest');
const express = require('express');
const weather = require('../weather'); 
const { weatherClient } = require('../client');
const { auth } = require('../middleware');

jest.mock('../client');
jest.mock('../middleware');

describe('Weather API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return weather data for a valid city', async () => {
    const mockCity = 'London';
    const expectedWeatherData = {
      temperature: 25,
      label: 'Sunny',
    };
    const mockReq = { query: { city: mockCity } };
    weatherClient.GetWeather.mockImplementation((payload, callback) => {
      callback(null, expectedWeatherData);
    });
    auth.mockImplementation((req, res, next) => next());

    const response = await request(weather).get('/api/weather').query(mockReq.query);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.temperature).toBe(expectedWeatherData.temperature);
    expect(response.body.label).toBe(expectedWeatherData.label);
  });

  it('should return 400 when city is not provided', async () => {
    const mockReq = { query: {} };
    auth.mockImplementation((req, res, next) => next());

    const response = await request(weather).get('/api/weather').query(mockReq.query);
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('city is required field.');
  });

  it('should return 200 with success: false when weather data not found', async () => {
    const mockCity = 'InvalidCity';
    const mockReq = { query: { city: mockCity } };

    weatherClient.GetWeather.mockImplementation((payload, callback) => {
      callback(null, null);
    });
    auth.mockImplementation((req, res, next) => next());

    const response = await request(weather).get('/api/weather').query(mockReq.query);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Temperature label not found.');
  });
});
