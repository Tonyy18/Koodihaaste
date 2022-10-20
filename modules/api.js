var https = require('https');
var fs = require("fs");
const path = require("./path")

let availableObjects = null
const getAvailableObjects = (callback) => {
    //Get objects to battle with
    if(availableObjects) {
        return callback(availableObjects)
    }
    const file = path + "/objects.json"
    fs.readFile(file, (err, data) => {
        availableObjects = JSON.parse(data.toString())
        callback(availableObjects)
    })
}

const searchObjects = (q, callback) => {
    //Returns all data from fineli query
    https.get("https://fineli.fi/fineli/api/v1/foods?q=" + q, (response) => {
        let data = "";
        response.on("data", (bits) => {
            data += bits
        })
        response.on("end", () => {
            callback(JSON.parse(data))
        })
    })
}

const searchObject = (q, callback) => {
    //Returns only the specific item
    searchObjects(q, (data) => {
        let results = null
        for(a = 0; a < data.length; a++) {
            let ob = data[a];
            if(ob["type"]["code"] == "FOOD") {
                results = ob
                break;
            }
        }
        callback(results)
    })
}
exports.searchObjects = searchObjects
exports.searchObject = searchObject
exports.getAvailableObjects = getAvailableObjects;