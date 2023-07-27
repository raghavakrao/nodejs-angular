# ibasis-interview-project-nodejs-angular
Check out this repository - 

Add below enviremnet variable in .env file

NODE_ENV = "development"
DB_HOST = ""
DB_USER = ""
DB_PASSWORD = ""
DB_NAME = ""
DB_PORT = ""
API_KEY = ""// Go to "https://home.openweathermap.org/api_keys" this website and create your own apikey, It's free. 

Without API key it wont work.

## Run backend service - 

cd grpc-project

Setup step - 
Run - **npm install**
Run - **npm install -g sequelize-cli**
Run - **sequelize-cli db:migrate**
Run - **sequelize-cli db:seed:all**
Run - **npm run start:server**
Run - **npm run start:service**

If you want to check the unit test cases - **npm test**

Now your backend service is up. 

## Run frontend service - 

Run - **cd weather-report-ui**
Run - **npm install**
Run - **ng serve**


You can use below users to login - 
User - 1 
username - rajan
password - testuser

User - 2
username - raj
password - testpassword


In case of rollback run - **sequelize-cli db:migrate:undo**   --this command will revert the most recent migration.
To revert all - **sequelize-cli db:migrate:undo:all**

