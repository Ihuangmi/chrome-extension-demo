import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Tabs, Button, Input, Avatar } from "antd"
import { LoginOutlined, UserOutlined } from "@ant-design/icons"
import styles from "./index.module.less"
import "windi.css"

const { TabPane } = Tabs
const loginUrl = `http://test.main.newrank.cn/user/login/m?type=121&source=181`

const Home = () => {
  const [text, setText] = useState<string>("")

  // const [currentURL, setCurrentURL] = useState<string>()

  // useEffect(() => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     setCurrentURL(tabs[0].url)
  //   })
  // }, [])

  // useEffect(() => {
  //   chrome.tabs.update({
  //     url: loginUrl,
  //   })
  // }, [])

  function sendMessageToContentScript(
    message: any,
    callback: (response: any) => void
  ) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0]?.id!, message, function (response) {
        if (callback) callback(response)
      })
    })
  }

  function sendMessage() {
    sendMessageToContentScript({ text: text }, (response) => {
      console.log("来自content的回复：" + response)
    })
  }

  return (
    <div className={styles.tabsWarper}>
      {/* <NotLogin /> */}
      <Tabs centered className="h-[100%]">
        <TabPane tab="工具" key="1">
          <div className="flex justify-around">
            <a
              onClick={() =>
                chrome.tabs.create({ url: "https://www.newrank.cn" })
              }
            >
              新榜
            </a>
            <a
              onClick={() =>
                chrome.tabs.create({ url: "https://www.baidu.com" })
              }
            >
              百度
            </a>
            <a
              onClick={() =>
                chrome.tabs.create({ url: "https://www.sina.com.cn" })
              }
            >
              新浪
            </a>
            <a
              onClick={() => chrome.tabs.create({ url: "https://www.qq.com" })}
            >
              腾讯
            </a>
          </div>
        </TabPane>

        <TabPane tab="管理" key="2">
          <p>管理----------</p>
          <Button
            type="primary"
            onClick={() => {
              chrome.tabs.update({
                url: "chrome://extensions/?options=" + chrome.runtime.id,
              })
            }}
          >
            打开Options
          </Button>
          <div>向content发送消息：</div>
          <div className="flex">
            <Input
              placeholder="请输入内容"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="primary" onClick={() => sendMessage()}>
              发送
            </Button>
          </div>
        </TabPane>

        <TabPane tab="设置" key="3" className="h-[100%]">
          <div className="h-[100%] flex flex-col">
            <div className="flex-1">
              <Avatar icon={<UserOutlined />} />
              <span>黄蜜</span>
            </div>
            <div
              className="text-center h-50px cursor-pointer"
              onClick={() => {}}
            >
              <LoginOutlined />
              退出登录
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Home
