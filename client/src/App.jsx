import React from 'react';
import './App.css';
import Signup from './pages/Signup';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SelectSource from './pages/SelectSource';
import ImageEditor from './pages/ImageEditor';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/select-source" element={<SelectSource />} />
                <Route path="/image-editor" element={<ImageEditor />} />
                <Route path="/*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
