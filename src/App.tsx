import { Routes,Route,Link} from 'react-router-dom'
import Home from './views/home'
import About from './views/about'
import Store from './views/store'
function App() {
  return (
   <div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/store">Store</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/store" element={<Store />} />
    </Routes>
   </div>
  );
}

export default App;
