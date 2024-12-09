import "./App.css";
import "./css/style.css";
import "./css/mobileStyle.css";
import logo from "./images/logo.png";
import Description from "./pages/description.js";
import Logbook from "./pages/logbook.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <header>
          <h1 className="pageHeader">HES-SO Vs - 64-31 - Web Development</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Description</Link>
                <Link to="/logbook">Logbook</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Description />}></Route>
          <Route path="/logbook" element={<Logbook />}></Route>
        </Routes>
        <footer>
          <img id="logo" src={logo} />
        </footer>
      </div>
    </Router>
  );
}

export default App;