chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title": 'Open %s in WhatsApp',
        "contexts": ["selection"],
        "id": "myContextMenuId"
    });
});

var code = "+91";

function returnNumber(s) {
    var number = s.split(" ").join("");
    if (!isNaN(number)) {
        if (number.length > 10) {
            return number;
        } else {
            var withcode = code + number;
            return withcode;
        }
    } else if (number.startsWith("+")) {
        var numbersplit = number.split('+');
        number = numbersplit[1];
        if (number.length > 10) {
            return number;
        } else {
            var withcode = code + number;
            return withcode;
        }
    }
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    var number = info.selectionText;
    number = returnNumber(number);
    console.log(number);
    chrome.tabs.create({
        url: "https://api.whatsapp.com/send/?phone=" + number
    });
})