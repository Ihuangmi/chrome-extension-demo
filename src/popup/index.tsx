import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Tabs } from "antd"
import "../global.less"
import "windi.css"

const { TabPane } = Tabs

const Popup = () => {
  const [count, setCount] = useState(0)
  const [currentURL, setCurrentURL] = useState<string>()

  // useEffect(() => {
  //   chrome.action.setBadgeText({ text: count.toString() })
  // }, [count])

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url)
    })
  }, [])

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0]
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg)
          }
        )
      }
    })
  }

  return (
    <div className="w-362px h-524px">
      <div>
        <Tabs centered>
          <TabPane tab="工具" key="1">
            <div className="flex justify-around">
              <a href="https://www.newrank.cn/">新榜</a>
              <a href="https://www.baidu.com/">百度</a>
              <a href="https://www.sina.com.cn/">新浪</a>
              <a href="https://www.qq.com/">腾讯</a>
            </div>
          </TabPane>
          <TabPane tab="管理" key="2">
            <p>管理</p>
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
