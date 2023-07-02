// @ts-nocheck
import express from "express";
const app = express();

app.use(express.json());

function isOvernight (segment) {
    return segment.date.getHours() >= 22 || segment.date.getHours() <= 6;
}

function isSunday (segment) {
    return segment.date.getDay() === 0;
}

// calculate ride price
app.post("/calculate_ride", function (req, res) { 
    let price = 0;
    for (const segment of req.body.segments) {
        segment.date = new Date(segment.date);
        if (segment.distance != null && segment.distance != undefined && typeof segment.distance === "number" && segment.distance > 0) {
            if (segment.date != null && segment.date != undefined && segment.date instanceof Date && segment.date.toString() !== "Invalid Date") {
                if (isOvernight(segment)) {
                    if (!isSunday(segment)) {
                        price += segment.distance * 3.90;
                    } else {
                        price += segment.distance * 5;
                    }
                } else {
                    if (isSunday(segment)) {
                        price += segment.distance * 2.9;
                    } else {
                        price += segment.distance * 2.10;
                    }
                }
            } else {
                res.json({ price: -2 });
                return;
            }
        } else {
            res.json({ price: -1 });
            return;
        }
    }
    if (price < 10) {
        price = 10;
    }
    res.json({ price });
    return;
});

app.listen(3000);