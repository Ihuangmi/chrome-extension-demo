

// 注意，必须设置了run_at=document_start 此段代码才会生效
document.addEventListener('DOMContentLoaded', function () {
  console.log('这是content script!');

  if (location.href == 'http://test.a.newrank.cn/center/#/user') {
    console.log(`这是新榜有赚测试`);
    initCustomPanel('哈哈哈，这是插件添加的');
  }
});

function initCustomPanel(text: string) {
  let box = document.getElementsByClassName('chrome-plugin-demo-panel')[0]

  if (!box) {
    let panel = document.createElement('div');
    panel.className = 'chrome-plugin-demo-panel';
    panel.innerHTML = `<h1>${text}</h1>`;
    document.body.appendChild(panel);
  } else {
    box.innerHTML = `<h1>${text}</h1>`
  }

}


// 接收来自popup或者background的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
  initCustomPanel(request.text)
  sendResponse('我是content我收到你的消息了：' + JSON.stringify(request));
});
