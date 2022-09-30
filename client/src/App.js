import {
  Routes,
  Route,
} from "react-router-dom";
import Invitation from "./Components/Invitation/Invitation";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ServerPage from "./Pages/ServerPage";
import SignupPage from "./Pages/SignupPage";

function App() {
  
  return (
  <>
    <Routes>
      <Route exact path="/" element={<HomePage />}/>
      <Route exact path="/signup" element={<SignupPage/>} />
      <Route exact path="/login" element={<LoginPage/>} />
      <Route exact path="/server/:serverId" element={<ServerPage/>} />
      <Route exact path="/invite/:serverId" element={<Invitation/>} />
    </Routes>
  </>
  )
}

export default App;
