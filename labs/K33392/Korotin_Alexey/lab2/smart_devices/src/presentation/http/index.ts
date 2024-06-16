import express from 'express';
import profileRouter from "./profile";
import teapotRouter from "./teapot";


const routes = express();
routes.use('/profiles', profileRouter);
routes.use('/devices/teapots', teapotRouter);

export default routes;
