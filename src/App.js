import "./App.css";
import "./css/style.css";
import "./css/mobileStyle.css";
import logo from "./images/logo.png";
import Description from "./pages/description.js";
import Logbook from "./pages/logbook.js";
import Sketch from "./pages/sketch.js";
import Mockup from "./pages/mockup.js";
import Flow from "./pages/flow.js";
import Ressources from "./pages/links.js";
import GameMechanics from "./pages/gameMechanics.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <header>
          <h1 className="pageHeader">HES-SO Vs - 64-31 - Web Development</h1>
          <nav>
            <ul className="show-menu">
              <li>
                <Link to="/">Description</Link>
                <Link to="/sketch">Sketch</Link>
                <Link to="/mockup">Mockup</Link>
                <Link to="/flow">Flow</Link>
                <Link to="/logbook">Logbook</Link>
                <Link to="/gameMechanics">Tutorial</Link>
                <Link to="/links">Links</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Description />}></Route>
          <Route path="/sketch" element={<Sketch />}></Route>
          <Route path="/mockup" element={<Mockup />}></Route>
          <Route path="/flow" element={<Flow />}></Route>
          <Route path="/logbook" element={<Logbook />}></Route>
          <Route path="/gameMechanics" element={<GameMechanics />}></Route>
          <Route path="/links" element={<Ressources />}></Route>
        </Routes>
        <footer>
          <img id="logo" src={logo} />
        </footer>
      </div>
    </Router>
  );
}

export default App;
