// @ts-nocheck
import express from "express";
const app = express();

app.use(express.json());

// calculate ride price
app.post("/calculate_ride", function (req, res) { 
    let price = 0;
    for (const segments of req.body.segments) {
        segments.date = new Date(segments.date);
        if (segments.distance != null && segments.distance != undefined && typeof segments.distance === "number" && segments.distance > 0) {
            if (segments.date != null && segments.date != undefined && segments.date instanceof Date && segments.date.toString() !== "Invalid Date") {
                const isOvernight = segments.date.getHours() >= 22 || segments.date.getHours() <= 6;
                const isSunday = segments.date.getDay() === 0;
                if (isOvernight) {
                    if (!isSunday) {
                        price += segments.distance * 3.90;
                    } else {
                        price += segments.distance * 5;
                    }
                } else {
                    if (isSunday) {
                        price += segments.distance * 2.9;
                    } else {
                        price += segments.distance * 2.10;
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