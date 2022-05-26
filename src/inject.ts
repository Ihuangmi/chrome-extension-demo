// // 通过postMessage调用content-script
// function invokeContentScript(code: any) {
//     window.postMessage({ cmd: 'invoke', code: code }, '*');
// }
// // 发送普通消息到content-script
// function sendMessageToContentScriptByPostMessage(data: any) {
//     window.postMessage({ cmd: 'message', data: data }, '*');
// }

// // 通过DOM事件发送消息给content-script
// (function () {
//     var customEvent = document.createEvent('Event');
//     customEvent.initEvent('myCustomEvent', true, true);
//     // 通过事件发送消息给content-script
//     function sendMessageToContentScriptByEvent(data: string) {
//         data = data || '你好，我是injected-script!';
//         var hiddenDiv = document.getElementById('myCustomEventDiv');
//         hiddenDiv!.innerText = data
//         hiddenDiv!.dispatchEvent(customEvent);
//     }
//     window.sendMessageToContentScriptByEvent = sendMessageToContentScriptByEvent;
// })();
console.log('insert.js loaded')
