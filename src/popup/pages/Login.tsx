// import React from "react"
// import { Button } from "antd"

// const loginUrl = `http://test.main.newrank.cn/user/login/m?type=121&source=181`

// const NotLogin = () => {
//   return (
//     <div className="h-[100%] flex justify-center items-center">
//       <div className="text-center">
//         <div className="mb-10px">要使用小插件，请先登录哦</div>
//         <Button
//           type="primary"
//           onClick={() => {
//             chrome.tabs.update({
//               url: loginUrl,
//             })
//           }}
//         >
//           登录
//         </Button>
//       </div>
//     </div>
//   )
// }
// export default NotLogin

import React from "react"
import { Button, Input } from "antd"
// import { apiReqs } from '@/api'

function Login(props: { history: string[] }) {
  const login = () => {
    // apiReqs.signIn({
    // 	success: (res: { data: { nickname: any } }) => {
    // 		console.log(res)
    // 		alert(res.data.nickname)
    // 		props.history.push('/home')
    // 	},
    // 	fail: (res: any) => {
    // 		alert(res)
    // 	}
    // })
  }

  return (
    <div className="P-login">
      <div className="login-con">
        <div className="ipt-con">
          <Input placeholder="请输入账号" size="large" />
        </div>
        <div className="ipt-con">
          <Input.Password placeholder="请输入密码" size="large" />
        </div>
        <Button type="primary" size="large" onClick={login}>
          登录
        </Button>
      </div>
    </div>
  )
}

export default Login
