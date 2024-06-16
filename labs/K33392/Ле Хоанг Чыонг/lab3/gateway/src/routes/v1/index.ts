import express from "express";
import proxy from "express-http-proxy";

const router: express.Router = express.Router();

router.use('/users', proxy('http://localhost:8001'));
router.use('/trips', proxy('http://localhost:8002'));
router.use('/activities', proxy('http://localhost:8003'));
router.use('/users-activities', proxy('http://localhost:8004'));
router.use('/reviews', proxy('http://localhost:8005'));
router.use('/locations', proxy('http://localhost:8006'));
router.use('/locations-activities', proxy('http://localhost:8007'));
router.use('/trips-locations', proxy('http://localhost:8008'));
router.use('/offers', proxy('http://localhost:8009'));

export default router;
