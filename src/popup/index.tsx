import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Tabs, Button, Input } from "antd"
import "../global.less"
import "windi.css"

const { TabPane } = Tabs

const Popup = () => {
  const [text, setText] = useState<string>('')
  // const [currentURL, setCurrentURL] = useState<string>()


  // useEffect(() => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     setCurrentURL(tabs[0].url)
  //   })
  // }, [])

  function sendMessageToContentScript(message: any, callback: (response: any) => void) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0]?.id!, message, function (response) {
        if (callback) callback(response);
      });
    });
  }

  function sendMessage() {
    sendMessageToContentScript({ text: text }, (response) => {
      console.log('来自content的回复：' + response);
    })
  }

  return (
    <div className="w-362px h-524px">
      <div>
        <Tabs centered>
          <TabPane tab="工具" key="1">
            <div className="flex justify-around">
              <a onClick={() => chrome.tabs.create({ url: 'https://www.newrank.cn' })} >新榜</a>
              <a onClick={() => chrome.tabs.create({ url: 'https://www.baidu.com' })} >百度</a>
              <a onClick={() => chrome.tabs.create({ url: 'https://www.sina.com.cn' })} >新浪</a>
              <a onClick={() => chrome.tabs.create({ url: 'https://www.qq.com' })} >腾讯</a>
            </div>
          </TabPane>
          <TabPane tab="管理" key="2">
            <p>管理----------</p>
            <Button type="primary" onClick={() => {

              chrome.tabs.update({ url: 'chrome://extensions/?options=' + chrome.runtime.id });

            }}>打开Options</Button>
            <div>
              向content发送消息：<br />
              <Input placeholder="请输入内容" value={text} onChange={(e) => setText(e.target.value)} />
              <Button type="primary" onClick={() => sendMessage()}>发送</Button>
            </div>
          </TabPane>
          <TabPane tab="设置" key="3">
            <p>设置</p>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
)
