import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Signup from "./pages/Signup";
import PasswordReset from "./pages/PasswordReset";
import Home from "./pages/Home";
import Transactions from "./components/Transactions";
import Transfer from "./components/Transfer";
import Alerts from "./effects/Alerts";
import { useState } from "react";
import { useSelector } from "react-redux";
const App = () => {
  const transactions = useSelector((state) => state.userdata.data);
  const [alt, setAlt] = useState('');
  const [sts, setSts] = useState("");
  const showalert=(msg,status)=>{
    setAlt(msg),setSts(status)
  }
  setTimeout(() => {
    setAlt(null)
  }, 3000);

  return (
    <BrowserRouter>
    <Alerts alt={alt} sts={sts}/>
      <Routes>
        <Route path="/" element={<Login showalert={showalert}/>} />
        <Route path="/signup" element={<Signup showalert={showalert}/>} />
        <Route path="/reset" element={<PasswordReset showalert={showalert}/>} />
        <Route path="/home" element={<Home showalert={showalert}/>}>
          <Route path="transactions" element={<Transactions transactions={transactions}/>} />
          <Route path="transfer" element={<Transfer showalert={showalert} transactions={transactions}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;