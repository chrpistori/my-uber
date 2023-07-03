// @ts-nocheck
import express from "express";
import { calculate } from "./RideCalculator";
const app = express();

app.use(express.json());

app.post("/calculate_ride", function (req, res) { 
    const price = calculate(req.body.segments)
    res.json({ price });
});

app.listen(3000);