import 'windi.css';

import { Avatar, Button, Input, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginOutlined, UserOutlined } from '@ant-design/icons';

import styles from './index.module.less';

const { TabPane } = Tabs

const Home = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [text, setText] = useState<string>("")
  const [name, setName] = useState<string>("")

  useEffect(() => {
    // 读取数据，第一个参数是指定要读取的key以及设置默认值
    chrome.storage.sync.get({ username: "", password: "" }, function (items) {
      setName(items.username)
      setIsLogin(items.username ? true : false)
      console.log(items.username, items.password)
    })
  }, [])

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

  function handleLink(e: any) {
    console.log(e.target.innerText)
    switch (e.target.innerText) {
      case "新榜":
        chrome.tabs.create({ url: "https://www.newrank.cn" })
        break
      case "百度":
        chrome.tabs.create({ url: "https://www.baidu.com" })
        break
      case "新浪":
        chrome.tabs.create({ url: "https://www.sina.com.cn" })
        break
      case "腾讯":
        chrome.tabs.create({ url: "https://www.qq.com" })
        break
    }
  }

  return (
    <div className={styles.tabsWarper}>
      {isLogin ? (
        <Tabs centered className="h-[100%]">
          <TabPane tab="工具" key="1">
            <div className="flex justify-around" onClick={handleLink}>
              <a>新榜</a>
              <a>百度</a>
              <a>新浪</a>
              <a>腾讯</a>
            </div>
          </TabPane>

          <TabPane tab="管理" key="2">
            <div className="p-14px text-gray-700">
              <Button
                type="primary"
                onClick={() => {
                  chrome.runtime.openOptionsPage()
                  // chrome.tabs.update({
                  //   url: "chrome://extensions/?options=" + chrome.runtime.id,
                  // })
                }}
              >
                打开Options
              </Button>
              <div className="my-10px">向content发送消息：</div>
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
            </div>
          </TabPane>

          <TabPane tab="设置" key="3" className="h-[100%]">
            <div className="h-[100%] flex flex-col">
              <div className="flex-1 ml-14px">
                <Avatar icon={<UserOutlined />} />
                <span>{name}</span>
              </div>
              <div
                className="text-center h-50px cursor-pointer"
                onClick={() => {
                  chrome.storage.sync.remove("username", function () {
                    setIsLogin(false)
                  })
                }}
              >
                <LoginOutlined />
                退出登录
              </div>
            </div>
          </TabPane>
        </Tabs>
      ) : (
        <div className="h-[100%] flex justify-center items-center">
          <div className="text-center">
            <div className="mb-10px">要使用小插件，请先登录哦</div>
            <Button
              type="primary"
              onClick={() => {
                navigate("/login")
              }}
            >
              登录
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
