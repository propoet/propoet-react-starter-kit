import { Routes,Route,Link} from 'react-router-dom'
import Home from './views/home'
import About from './views/about'
import Store from './views/store'

function App() {
  return (
   <div className="min-h-screen bg-gray-50">
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex space-x-8">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            About
          </Link>
          <Link 
            to="/store" 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            Store
          </Link>
        </div>
      </div>
    </nav>
    <main className="py-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </main>
   </div>
  );
}

export default App;
