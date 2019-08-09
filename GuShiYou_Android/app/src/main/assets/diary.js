connectWebViewJavascriptBridge(function (bridge) {
    registerHandlers(bridge);
})

function registerHandlers(bridge) {
    bridge.registerHandler("initDiary", function (data, responseCallback) {
        var diary = JSON.parse(data);
        var header = document.getElementById('header');
        var headerHTML = '<p id = "diary_date">' + diary.dateStr + '</p>' + '<p id = "diary_weather">' + diary.weather + '</p>';
        if (diary.location !== null && diary.location !== undefined && diary.location !== '') {
            headerHTML = headerHTML + '<p id = "diary_location">' + diary.location + '</p>';
        }
        header.innerHTML = headerHTML;
        var content = document.getElementById('content');
        content.innerHTML = diary.content;
        responseCallback('');
    });
}

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function () {
                callback(WebViewJavascriptBridge)
            },
            false
        );
    }
}