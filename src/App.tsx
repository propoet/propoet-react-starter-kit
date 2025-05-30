import { Routes,Route,Link} from 'react-router-dom'
import Home from './views/home'
import About from './views/about'
function App() {
  return (
   <div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
   </div>
  );
}

export default App;
