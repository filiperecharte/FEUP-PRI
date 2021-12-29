import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {MainPage} from "./pages/MainPage";
import './css/style.css';
import {Footer} from "./components/Footer";

function App() {
  return (
    <>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  <Footer />
    </>
  );
}

export default App;
