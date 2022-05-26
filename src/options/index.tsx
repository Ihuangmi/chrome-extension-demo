import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink, Outlet, Route, Routes } from 'react-router-dom';

import Bar from './components/Bar';
import Foo from './components/Foo';

const Options = () => {
  const [color, setColor] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const [like, setLike] = useState<boolean>(false)

  useEffect(() => {
    chrome.storage.sync.get(
      {
        favoriteColor: "red",
        likesColor: true,
      },
      (items) => {
        setColor(items.favoriteColor)
        setLike(items.likesColor)
      }
    )
  }, [])

  const saveOptions = () => {
    chrome.storage.sync.set(
      {
        favoriteColor: color,
        likesColor: like,
      },
      () => {
        setStatus("Options saved.")
      }
    )
  }

  return (
    <BrowserRouter>
      <h1>随便给options的标题</h1>
      <NavLink to="/foo">Foo</NavLink>
      <br />
      <NavLink to="/Bar">Bar</NavLink>
      <br />
      <div className="w-300px h-500px">
        <div>
          Favorite color:{" "}
          <select
            value={color}
            onChange={(event) => setColor(event.target.value)}
          >
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
            <option value="yellow">yellow</option>
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={like}
              onChange={(event) => setLike(event.target.checked)}
            />
            I like colors.
          </label>
        </div>
        <div>{status}</div>
        <button onClick={saveOptions}>Save</button>
      </div>

      <Routes>
        <Route path="/foo" element={<Foo />} />
        <Route path="/bar" element={<Bar />} />
      </Routes>
      <Outlet />
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
)
