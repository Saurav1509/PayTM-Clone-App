import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"
import SendMoney from "./pages/SendMoney"
import { RecoilRoot } from "recoil"
function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>

          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/send" element={<SendMoney />}></Route>

        </Routes>
      </BrowserRouter >
    </RecoilRoot>
  )
}

export default App
