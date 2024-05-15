import express from "express";
import proxy from "express-http-proxy";

const router: express.Router = express.Router();

router.use('/users', proxy('http://auth:8001'));
router.use('/trips', proxy('http://trip:8002'));
router.use('/activities', proxy('http://activity:8003'));
//router.use('/users-activities', proxy('http://localhost:8003'));
router.use('/reviews', proxy('http://review:8005'));
router.use('/locations', proxy('http://location:8006'));
//router.use('/locations-activities', proxy('http://localhost:8006'));
//router.use('/trips-locations', proxy('http://localhost:8002'));
router.use('/offers', proxy('http://offer:8009'));

export default router;
