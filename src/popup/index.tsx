import React from "react"
import ReactDOM from "react-dom"
import { HashRouter, Route, Routes, Outlet } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/home"
import "../global.less"
import "windi.css"

const Popup = () => {
  return (
    <HashRouter>
      <div className="w-362px h-524px">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Outlet />
      </div>
    </HashRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
)
