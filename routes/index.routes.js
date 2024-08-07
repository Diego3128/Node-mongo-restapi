import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("/ working");
});

router.get("/employees", (req, res) => {
  res.send("list of employees");
});

export default router;
