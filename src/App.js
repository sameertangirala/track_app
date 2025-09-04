import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import Dashboard from './components/Dashboard/Dashboard';
import Log from './components/Dashboard/Log';
import Summary from './components/Dashboard/Summary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <LoginSignUp />} />
        
        <Route path="/log" element = { <Log />} />
      </Routes>
    </Router>
  );
}

export default App;
