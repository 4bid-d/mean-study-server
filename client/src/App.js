import {
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import UseLocalstorage from "./Hooks/useLocalstrage"

function App() {
  UseLocalstorage("get","")
  return (
  <>
    <Routes>
      <Route exact path="/" element={<HomePage />}/>
      <Route exact path="/signup" element={<SignupPage/>} />
      <Route exact path="/login" element={<LoginPage/>} />
    </Routes>
  </>
  )
}

export default App;
