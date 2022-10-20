function showModal(winner) {
    $("#modal .modalBody section h3").html(winner);
    $("#modal").fadeIn();
    $("#modal .modalPadding").animate({
        "top": "9vw"
    })
}

function buildSelectors() {
    //Builds custom select fields
    $.ajax({
        url: "/api/getAvailableObjects",
        success: function(data) {
            const domLeft = buildSelectorDom(data);
            const domRight = buildSelectorDom(data, 2);
            $(".selectors").prepend(domLeft).append(domRight)
        }
    })
}

function showAlert(text) {
    $("#alert p").html(text)
    $("#alert").fadeIn()
    setTimeout(function() {
        $("#alert").fadeOut();
    }, 3000)
}

function initStartButton() {
    //The start button and the startup animations
    const button = $("#startButton")
    button.on("click", function() {
        const selectors = $(".selector")
        const name1 = $(selectors[0]).find(".selected").attr("data-name");
        const name2 = $(selectors[1]).find(".selected").attr("data-name");
        if(name1 == name2) {
            showAlert("Et voi taistella samaa ravintoa vastaan")
            $(selectors[1]).addClass("error")
            return;
        }
        $(selectors[0]).hide()
        const header1 = $("<h2 class='nameHeader' style='justify-content: right;'>" + name1 + "</h2>")
        $(".selectors").prepend(header1);
        $(selectors[1]).hide()
        const header2 = $("<h2 class='nameHeader'>" + name2 + "</h2>")
        $(".selectors").append(header2);
        $(".toRemove").hide()
        header1.animate({
            "font-size": "26px"
        }, 1500)
        header2.animate({
            "font-size": "26px"
        }, 1500)
        $(".selectors img").addClass("animate")
    })
}

function reset() {
    window.location.reload();
}
$(function() {
    //Initializes the UI
    buildSelectors()
    initStartButton();
    $("#restartBtn").click(function() {
        reset();
    })
    $("#exit").click(function() {
        reset();
    })
})