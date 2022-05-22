

// 注意，必须设置了run_at=document_start 此段代码才会生效
document.addEventListener('DOMContentLoaded', function () {
  console.log('这是content script!');
  // 注入自定义JS
  injectCustomJs();

  // 给谷歌搜索结果的超链接增加 _target="blank"
  if (location.host == 'https://www.baidu.com') {
    console.log(`插件检测到打开了百度-------`);

    var objs = document.querySelectorAll('h3.r a');
    for (var i = 0; i < objs.length; i++) {
      objs[i].setAttribute('_target', 'blank');
    }
    console.log('已处理谷歌超链接！');
  }
  else if (location.host == 'http://test.a.newrank.cn/center/#/user') {
    console.log(`这是新榜有赚测试`);

    initCustomPanel();
  }
});

function initCustomPanel() {
  var panel = document.createElement('div');
  panel.className = 'chrome-plugin-demo-panel';
  panel.innerHTML = `
		<div class="btn-area">
    <a href="javascript:sendMessageToContentScriptByPostMessage('你好，我是普通页面！')">通过postMessage发送消息给content-script</a><br>

      哈哈哈，这是插件添加的
		</div>
		<div id="my_custom_log">
		</div>
	`;
  document.body.appendChild(panel);
}


// 向页面注入JS
function injectCustomJs(jsPath?: string) {
  jsPath = jsPath || 'js/inject.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function () {
    // 放在页面不好看，执行完后移除掉
  };
  document.body.appendChild(temp);
}

// 接收来自popup或者background的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
  alert(request.text)
  sendResponse('我是content我收到你的消息了：' + JSON.stringify(request));
});

