
//Game objects.
//Is used within the logic.js
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.started = false;
        this.events = {}
        this.timer = null;
        this.time = 0; //In seconds
        this.winner = null;
    }

    start(callback) {
        //Initializes the food objects
        this.player1 = new Food(this.player1, () => {
            this.player2 = new Food(this.player2, () => {
                callback();
                this.started = true;
                this.startAttacking()
                this.timer = setInterval(() => {
                    //Counts the game time.
                    //Is sent to UI
                    this.time++;
                }, 1000)
            })
        })
    }
    getTime() {
        return this.time
    }
    getPlayers() {
        return [this.player1, this.player2];
    }
    callEvent(name, param) {
        //Call game events.
        //Registered in the logic.js
        if(name in this.events) {
            this.events[name](param);
        }
    }
    executeAttack(attacker, target) {
        //Attack the other object
        //Both players uses this same function
        attacker.damageDealt = parseFloat((attacker.attack - ((attacker.attack / 100) * target.defence).toFixed(2)));
        let newHealth = target.health - attacker.damageDealt;
        if(newHealth.toString().includes(".")) {
            newHealth = parseFloat(newHealth.toFixed(1));
        }
        if(newHealth < 0) {
            newHealth = 0;
        }
        target.health = newHealth;
        if("attack" in this.events) {
            this.events["attack"](attacker, target)
        }
        if(target.health <= 0) {
            //One of the players died. Ending the game
            this.winner = this.player1;
            if(this.player1.health < this.player2.health) {
                this.winner = this.player2
            }
            this.callEvent("die", this.winner)
            this.stopAttacking();
        }
    }
    startAttacking() {
        //Basically starts the game.
        //Sets intervals based on the player attack delay
        this.callEvent("start")
        this.player1.interval = setInterval(() => {
            this.executeAttack(this.player1, this.player2);
        }, this.player1.delay * 1000)

        this.player2.interval = setInterval(() => {
            this.executeAttack(this.player2, this.player1);
        }, this.player2.delay * 1000)
    }

    stopAttacking() {
        //Ends the game, stops and clears all intervals
        clearInterval(this.player1.interval);
        clearInterval(this.player2.interval);
        clearInterval(this.timer);
        this.callEvent("end", this.winner)
        this.started = false;
    }

    on(name, func) {
        this.events[name] = func;
    }
}