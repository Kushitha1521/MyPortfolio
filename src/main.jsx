import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import ProjectDetail from './ProjectDetail'
import EV_Project from './projects/EV_Project_00.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/projects/:slug" element={<ProjectDetail />} /> */}
        <Route path="/projects/ev-charging" element={<EV_Project />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
