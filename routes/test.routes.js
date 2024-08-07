import { Router } from "express";

const router = Router();

// To check the conexion
// /test/
router.get("/", (req, res) => {
  res.json({message: 'test endpoint',
           endpoints: ['/ping']});
});
// test/ping
router.get("/ping", (req, res) => {
  res.json({message: 'pong'});
});

export default router;
