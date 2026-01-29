import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddTank from './pages/AddTank';
import TankDetails from './pages/TankDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-tank" element={<AddTank />} />
          <Route path="/tank/:id" element={<TankDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
