import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {MainPage} from "./pages/MainPage";
import './css/style.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
