import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Login } from "./screens/Login";
import { Home } from "./screens/Home";
import { AddUser } from "./screens/AddUser";
import Layout from "./components/Layout";
import { Memberdetails } from "./components/main/Memberdetails";
import { ChangePassword } from "./screens/ChangePassword"
import { ForgotPassword } from "./screens/ForgotPassword"
import { Gallery } from "./screens/Gallery";

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/gallery" element={<Gallery />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/memberdetail/:id" element={<Memberdetails />} />
          <Route exact path="/changepassword" element={<ChangePassword />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
