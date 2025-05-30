import { Routes, Route, Link } from "react-router-dom";
import Home from "./views/home";
import About from "./views/about";
import RequireAuth from "./layout/RequireAuth";
import Login from "./views/login";
import Upload from "./views/upload";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <div>
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
                        to="/upload" 
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                      >
                        Upload
                      </Link>
                    </div>
                  </div>
                </nav>
                <main className="py-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/upload" element={<Upload />} />
                  </Routes>
                </main>
              </div>
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
