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
                //overnight
                if (segments.date.getHours() >= 22 || segments.date.getHours() <= 6) {
                        //not sunday
                    if (segments.date.getDay() !== 0) {
                        price += segments.distance * 3.90;
                        // sunday
                    } else {
                        price += segments.distance * 5;
                    }
                } else {
                    // sunday
                    if (segments.date.getDay() === 0) {
                        price += segments.distance * 2.9;
                    } else {
                        price += segments.distance * 2.10;
                    }
                }
            } else {
                // console.log();
                res.json({ price: -2 });
                return;
            }
        } else {
            // console.log(req.body.distance);
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