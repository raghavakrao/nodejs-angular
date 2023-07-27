const request = require('supertest');
const auth = require('../auth'); 
const validation = require('../lib/validation');
const { authClient } = require('../client');

jest.mock('../lib/validation');
jest.mock('../client');

describe('Authentication API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with access_token when authentication is successful', async () => {
    const authenticateRequest = {
      username: 'testuser',
      password: 'testpassword',
    };
    const expectedToken = 'valid_token_here';

    validation.authenticateRequest.mockReturnValue({
      error: null,
      value: authenticateRequest,
    });

    authClient.Authenticate.mockImplementation((payload, callback) => {
      callback(null, { token: expectedToken });
    });

    const response = await request(auth)
      .post('/authenticate')
      .send(authenticateRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.access_token).toBe(expectedToken);
  });

it('should return 401 with error message when authentication fails', async () => {
    const authenticateRequest = {
      username: 'testuser',
      password: 'wrongpassword',
    };

    validation.authenticateRequest.mockReturnValue({
      error: null,
      value: authenticateRequest,
    });

    authClient.Authenticate.mockImplementation((payload, callback) => {
      callback(null, { token: "" });
    });

    const response = await request(auth)
      .post('/authenticate')
      .send(authenticateRequest);

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Incorrect username or password');
  });

  it('should return 500 with error message when unexpected error occured', async () => {
    const authenticateRequest = {
      username: 'testuser',
      password: 'wrongpassword',
    };

    validation.authenticateRequest.mockReturnValue({
      error: null,
      value: authenticateRequest,
    });

    authClient.Authenticate.mockImplementation((payload, callback) => {
      callback({ message: 'Authentication failed' });
    });

    const response = await request(auth)
      .post('/authenticate')
      .send(authenticateRequest);

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Something went wrong at server side.');
  });

  it('should return 400 with error message when request payload is invalid', async () => {
    const invalidRequest = {
    };

    validation.authenticateRequest.mockReturnValue({
      error: { details: [{ message: 'Invalid request payload' }] },
    });

    const response = await request(auth)
      .post('/authenticate')
      .send(invalidRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Invalid request payload');
  });
});
