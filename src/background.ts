
chrome.runtime.onInstalled.addListener(function () {
    console.log("插件已被安装");
    // storage中设置值
    chrome.storage.sync.set({ color: "#3aa757" }, function () {
        console.log("storage init color value");
    });

    // 为特定的网址显示图标
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    // 只有打开百度才显示pageAction
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlContains: 'baidu.com' }
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });


    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0]?.id!,
            { greeting: "hello，我是后台，主动发消息给content-script" },
            function (response) {
                console.log(response);
            }
        );
    });
});
