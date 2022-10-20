
function buildStats(player1, player2) {
    console.log(player1)
    const arr = [player1, player2]
    const statsEl = $(".game .stats")
    for(let a = 0; a < arr.length; a++) {
        const player = arr[a];
        const section = $(statsEl[a]).find("section")[0]
        $(section).append(duildStatsRow("Energia", player.data.energy + " kcal"));
        $(section).append(duildStatsRow("Hiilihydraatit", player.data.carbohydrate + " g"));
        $(section).append(duildStatsRow("Proteiini", player.data.protein + " g"));
        $(section).append(duildStatsRow("Rasva", player.data.fat + " g"));
        const statsSection = $(statsEl[a]).find("section")[1]
        $(statsSection).append(duildStatsRow("Health", player.health));
        $(statsSection).append(duildStatsRow("Attack", player.attack));
        $(statsSection).append(duildStatsRow("Defence", player.defence));
        $(statsSection).append(duildStatsRow("Delay", player.delay));
    }
}
let gameObj = null;
class Logger {
    static stats(left, right) {
        const leftDom = buildActionRow(left.text, left.value, gameObj.getTime() + "s");
        const rightDom = buildActionRow(right.text, right.value);
        $(".game .gameBot .left").append(leftDom);
        $(".game .gameBot .right").append(rightDom);
        this.scroll();
    }
    static notice(text) {
        const dom = buildActionRow(text, "", "0s")
        dom.find("*").css({
            "font-weight": "bold"
        })
        $(".game .gameBot .left").append(dom);
        this.scroll();
    }
    static scroll() {
        $('.game .gameBot').scrollTop($('.game .gameBot')[0].scrollHeight);
    }
}

function registerEvents(gameObj) {
    gameObj.on("attack", function(attacker, target) {
        Logger.stats({
            text: attacker.name + " lyö ja tekee",
            value: attacker.damageDealt + " vahinkoa"
        }, {
            text: target.name + " health:",
            value: target.health
        })
    })
    gameObj.on("start", function() {
        const players = gameObj.getPlayers();
        Logger.notice("Taistelu alkaa! " + players[0].name + " vs " + players[1].name)
    })
    gameObj.on("end", function(winner) {
        showModal(winner.name + " voitti!");
    })
}

function startGame() {
    const selectors = $(".selector");
    const player1 = $(selectors[0]).find(".selected").attr("data-name");
    const player2 = $(selectors[1]).find(".selected").attr("data-name")
    gameObj = new Game(player1, player2);
    registerEvents(gameObj)
    gameObj.start(() => {
        buildStats(gameObj.player1, gameObj.player2)
        $(".game").animate({
            "height": "550px"
        }, 1500, function() {
            $("#exit").css("display", "flex");
        })
    });
}

$(function() {
    $("#startButton").on("click", function() {
        const selectors = $(".selector")
        const name1 = $(selectors[0]).find(".selected").attr("data-name");
        const name2 = $(selectors[1]).find(".selected").attr("data-name");
        if(name1 == name2) {
            return;
        }
        startGame();
    })
})