import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {MainPage} from "./pages/MainPage";
import {AboutPage} from "./pages/AboutPage";
import './css/style.css';
import {BookPage} from "./pages/BookPage";
import {AuthorsPage} from "./pages/AuthorsPage";
import {AuthorPage} from "./pages/AuthorPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/book:id" element={<BookPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/author:name" element={<AuthorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
