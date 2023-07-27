The provided text seems to be a set of instructions for setting up and running a Node.js and Angular project. It includes steps for setting up the backend service using grpc and Sequelize, as well as the frontend service using Angular.

The project is an ibasis interview project that allows users to log in and view weather reports using the OpenWeatherMap API.

Here's a summary of the steps to run the project:

1. Set Environment Variables:
   Create a `.env` file inside of `grpc-project` directory and add the required environment variables, including the database connection details and the OpenWeatherMap API key.

2. Backend Service:
   - Navigate to the `grpc-project` directory.
   - Install dependencies by running `npm install`.
   - Install the Sequelize CLI globally using `npm install -g sequelize-cli`.
   - Run database migrations using `sequelize-cli db:migrate`.
   - Seed the database using `sequelize-cli db:seed:all`.
   - Start the backend server and service using `npm run start:server` and `npm run start:service`, respectively.
   - To run unit tests, use `npm test`.

3. Frontend Service:
   - Navigate to the `weather-report-ui` directory.
   - Install dependencies by running `npm install`.
   - Start the frontend server using `ng serve`.

4. Login:
   - Use the provided usernames and passwords to log in as User 1 or User 2.
   - User - 1 
   - username - rajan
   - password - testuser

   - User - 2
   - username - raj
   - password - testpassword

5. Rollback (Optional):
   - If needed, you can perform a rollback of the database migrations using `sequelize-cli db:migrate:undo` to revert the most recent migration, or `sequelize-cli db:migrate:undo:all` to revert all migrations.

Please ensure you have all the required dependencies and environment variables set up correctly before running the project. Follow the steps mentioned in the instructions carefully to run the backend and frontend services.