import { Routes, Route } from "react-router-dom";
import { KeepAlive } from 'react-activation'
import Home from "./views/home";
import About from "./views/about";
import RequireAuth from "./layout/RequireAuth";
import MainLayout from "./layout/MainLayout";
import Login from "./views/login";
import Upload from "./views/upload";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <MainLayout>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <KeepAlive cacheKey="home">
                      <Home />
                    </KeepAlive>
                  } 
                />
                <Route 
                  path="/about" 
                  element={
                    <KeepAlive cacheKey="about">
                      <About />
                    </KeepAlive>
                  } 
                />
                <Route 
                  path="/upload" 
                  element={
                    <KeepAlive cacheKey="upload">
                      <Upload />
                    </KeepAlive>
                  } 
                />
              </Routes>
            </MainLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
