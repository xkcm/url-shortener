import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HashRedirect from "../layouts/HashRedirect/HashRedirect";
import HashStats from "../layouts/HashStats/HashStats";
import { Home } from "../layouts/Home/Home";


const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path=":hash">
          <Route index element={<HashRedirect/>} />
          <Route path="stats" element={<HashStats/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter