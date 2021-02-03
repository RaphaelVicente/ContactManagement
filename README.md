# ContactManagement
This project is a contact management. You can register an address and contact of people.
You can register an employee. Employee is responsable for registrying people. This Employee is required to sign in to api.
It is a project only to practice building Back-End project with NodeJS, Express, JSON Web Token(JWT), Jest, Sequelize and PostgreSQL.

## How to run

First you need to run the command `npm i` in project directory.
This command will install all dependencies necessaries to run this project.

At this moment, you already can run tests.
You just need to run the command `npm run test`.

Now, you need to install PostgreSQL and create a DB.

Then, you will need to have a `.env` file similar to this.

```
PORT=

AUTH_SECRET=
TOKEN_EXPIRE_TIME=

DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
```

After you create DB and `.env` file, you can create the tables in DB.
You can run the command `npm run synctables` to create tables and `npm run createadmin` to create employee admin.

Finaly, you can run the command `npm run dev` to run the api in the development mode on port 3030.
You can also run the command `npm start` to run the api.

---
## Learn More

- NodeJS - https://nodejs.org/en/docs/
- Express - https://expressjs.com/en/guide/routing.html
- JSON Web Token(JWT) - https://jwt.io/introduction
- Jest - https://jestjs.io/docs/en/getting-started
- Sequelize - https://sequelize.org/master/manual/getting-started.html
