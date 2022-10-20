function buildSelectorDom(data,selectedIndex=0) {
    data = data.map(function(item) {
        return item.charAt(0).toUpperCase() + item.slice(1);
    })
    const parent = $("<div class='selector'></div>");
    const list = $("<ul></ul>")
    for(let a = 0; a < data.length; a++) {
        const item = data[a];
        const el = $("<li data-name='" + item + "'><span>" + item + "</span></li>")
        list.append(el);
        if(a == selectedIndex) {
            el.hide();
        }
    }
    const selected = $('<div class="selected" data-name="' + data[selectedIndex] + '"><span>' + data[selectedIndex] + '</span><i class="fa-solid fa-chevron-down"></i></div>')
    selected.click(function() {
        $(this).parent().toggleClass("active")
        $(this).parent().removeClass("error")
    })
    parent.append(selected).append(list)
    list.find("li").click(function() {
        const selectedVal = $(this).closest(".selector").find(".selected").attr("data-name")
        $(this).hide()
        list.find("li[data-name='" + selectedVal + "']").show();
        selected.attr("data-name", $(this).attr("data-name"))
        selected.find("span").html($(this).attr("data-name"))
        parent.removeClass("active")
    })
    $(document).mousedown(function(e) {
        if(!parent.is(e.target) && $(parent).has(e.target).length === 0) {
            parent.removeClass("active")
        }
    })
    parent.getValue = function() {
        return parent.find(".selected").attr("data-name");
    }
    return parent;
}

function duildStatsRow(label, value) {
    return $('<div class="row"><span>' + label + ':</span><span>' + value + '</span></div>')
}

function buildActionRow(text = "", result = "", time=null) {
    const parent = $("<div class='action'></div>");
    parent.append('<span class="text">' + text + '</span>');
    parent.append('<span class="result">' + result + '</span>');
    if(time != null) {
        parent.prepend('<span class="time">' + time + '</span>')
    }
    return parent
}