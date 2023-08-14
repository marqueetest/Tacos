import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [userstate, setUserState] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route
            path="/"
            element={
              <>
                {userstate && userstate._id ? (
                  <Home setUserState={setUserState} username={userstate.fname} />
                ) : (
                  <Login setUserState={setUserState} />
                )}
              </>
            }
          ></Route> */}
          <Route path="/" element={<Home path="/" element={<Home />} />}></Route>
          <Route path="/login" element={<Login setUserState={setUserState} />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;