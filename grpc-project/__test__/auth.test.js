const request = require('supertest');
const auth = require('../auth'); 
const { verifyPassword } = require('../lib/utilities');
const { Users } = require('../db/models');
const jwt = require('jsonwebtoken');
const config  = require('../config');
jest.mock('../db/models');
jest.mock('../lib/utilities');

describe('Authentication API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with access_token when authentication is successful', async () => {
    const mockRequest = {
      username: 'testuser',
      password: 'testpassword',
    };

    const expectedUser = {
      id: 1,
      username: 'testuser',
      password: 'hashed_password_here',
      email: 'testuser@example.com',
    };

    const mockUserFindOne = jest.fn().mockResolvedValue(expectedUser);
    Users.findOne = mockUserFindOne;

    verifyPassword.mockResolvedValue(true);
    const response = await request(auth)
      .post('/authenticate')
      .send(mockRequest);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    const decodedToken = jwt.verify(response.body.access_token, config.jwt.secretKey);
    expect(decodedToken.userId).toBe(expectedUser.id);
    expect(decodedToken.username).toBe(expectedUser.username);
    expect(decodedToken.email).toBe(expectedUser.email);
  });

it('should return 401 with error message when authentication fails', async () => {
    const authenticateRequest = {
      username: 'testuser',
      password: 'wrongpassword',
    };
    verifyPassword.mockResolvedValue(false);
    const response = await request(auth)
      .post('/authenticate')
      .send(authenticateRequest);
    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Incorrect username or password');
  });

  it('should return 400 with error message when request payload is invalid', async () => {
    const invalidRequest = {
    };
    const response = await request(auth)
      .post('/authenticate')
      .send(invalidRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('\"username\" is required');
  });
});
