import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import ProjectDetail from './ProjectDetail'
import EV_Project from './projects/EV_Project_00.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Energy_System from './projects/Energy_System.jsx'
import Medusa from './projects/Medusa.jsx'
import Crypto from './projects/Crypto.jsx'
import Student_Attendence from './projects/Student_Attendence.jsx'
import C_Chat from './projects/C_Chat.jsx'
import ALU from './projects/ALU.jsx'
import NIC from './projects/NIC.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/projects/:slug" element={<ProjectDetail />} /> */}
        <Route path="/projects/ev-charging" element={<EV_Project />} />
        <Route path="/projects/energy-system" element={<Energy_System />} />
        <Route path="/projects/medusa" element={<Medusa />} />
        <Route path="/projects/crypto" element={<Crypto />} />
        <Route path="/projects/student-attendance" element={<Student_Attendence />} />
        <Route path="/projects/c-chat" element={<C_Chat />} />
        <Route path="/projects/alu-design" element={<ALU />} />
        <Route path="/projects/nic" element={<NIC />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
