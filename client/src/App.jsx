
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './pages/SignIn';
import Layout2 from './pages/SignUp';
// import SignIn from './pages/SignIn.js';

import Home from './pages/Home';
function App() {
  return (
    <Router>
      
      <div style={{ width: '100vw', height: '100vh' }}>
        <Routes>
          
          <Route path="/signin" element={<Layout/>} />
          <Route path="/signup" element={<Layout2/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;