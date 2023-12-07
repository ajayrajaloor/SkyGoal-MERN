import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ProfileHome from "./pages/ProfileHome/ProfileHome";

export default function App() {
  return (
 <Routes>
  <Route path="/" element={<ProfileHome/>}/>
<Route path="/register" element={ <Register/>}/>
<Route path="/login" element={ <Login/>}/>
<Route path="*" element ={<Login/>}/>

 </Routes>
  )
}