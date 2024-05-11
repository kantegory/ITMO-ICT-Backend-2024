Install necessary packages:
npm install express sequelize sequelize-typescript sequelize-cli sqlite3 @types/express @types/node @types/sequelize typescript ts-node nodemon dotenv express-validator bcrypt jsonwebtoken cookie-parser

Initialize TypeScript configuration:
npx tsc --init

compile and run
npx nodemon --exec ts-node src/app.ts
sequelize db:migrate


