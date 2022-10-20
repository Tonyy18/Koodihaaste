const getObjectData = (name, callback, errorCallback) => {
    $.ajax({
        url: "/api/getObjectData?name=" + name,
        success: function(data) {
            callback(data)
        },
        error: function(data) {
            errorCallback(data)
        }
    })
}

class Food {
    constructor(name, callback) {
        getObjectData(name, (data) => {
            this.data = data
            this.name = name
            this.ready = true
            this.health = parseFloat(data["energy"])
            this.attack = parseFloat(data["carbohydrate"])
            this.defence = parseFloat(data["protein"])
            this.delay = parseFloat((this.attack + this.defence + parseFloat(data["fat"])).toFixed(1))
            callback();
        }, () => {
            this.ready = false
        })
    }
}