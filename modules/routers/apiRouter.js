const express = require("express");
const router = express.Router()
const api = require("../api.js");

router.get("/getAvailableObjects", (req, res) => {
    api.getAvailableObjects((data) => {
        res.status(200).json(data);
    })
})
router.get("/getObjectData", (req, res) => {
    if(!("name" in req.query) || req.query.name == "") {
        res.status(404).json({
            status: 404,
            message: "Required object name missing"
        })
        return;
    }
    api.searchObject(req.query.name, (data) => {
        if(data == null) {
            res.status(404).json({
                "status": 404,
                "message": "Api call failed"
            })
            return;
        }
        res.json({
            energy: Math.round(data["energyKcal"]),
            carbohydrate: data["carbohydrate"].toFixed(1),
            protein: data["protein"].toFixed(1),
            fat: data["fat"].toFixed(1)
        })
    })
})

module.exports = router