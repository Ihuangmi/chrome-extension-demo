import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Button } from "antd"
import "../global.less"
import "windi.css"

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
    <div style={{ width: "360px" }}>
      <Button type="primary">xxx</Button>
      <h1>popup</h1>
      <div className="bg-yellow-100">hhh</div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
)
