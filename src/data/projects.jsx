import { details } from "framer-motion/client";

export const projects = [
    {
      name: "EV CHARGING STATION RESERVATION SYSTEM",
      slug: "ev-charging",
      description: "Full-stack web application with modern technologies",
      image: "/ev_project.jpg",
      technologies: ["React", "Tailwind", "Node.js","Vite","Spring Boot", "MongoDB","AWS","Nginx","Stripe","CI/CD","JWT","OAuth","WebSockets","GitHub","Vercel"],
      category: "web",
      details:"Developing a full-stack EV charging platform with real-time slot booking, secure payments, and a userfriendly dashboard for managing schedules and charging history."
    },
    {
      name: "Energy monitoring & controlling system", 
      slug: "energy-system",
      description: "Real-time energy monitoring and control system",
      image: "/energy.png",
      technologies: ["Python", "Machine Learning", "IoT", "ESP32","Hugging Face","GitHub","Docker","ESP Now","Voltage Sensing - ZMPT101B","Current Sensing - ACS712","Supabase","Proteus","Arduino","PCB Design","Simulation"],
      category: "IOT"
    },
    {
      name: "Combat Robot with Weapon System",
      slug: "combat-robot-uok",
      description:
        "Remote-controlled combat robot with an integrated weapon system designed for UOK Robot Battles 2K25.",
        
      image: "/robot.jpeg",

      technologies: [
        "ESP32",
        "Arduino",
        "Motor Drivers",
        "2.4GHz MC6C Transmitter",
        "MC7RB Receiver",
        "Li-Po Battery",
        "DC Motors",
        "Relay Module",
        "Wireless Communication",
        "Power Management",
        "Embedded Systems",
        "Combat Robotics"
      ],

      category: "Embedded Systems",

      details: `
    COMBAT ROBOT WITH WEAPON SYSTEM – UOK ROBOT BATTLES 2K25
    09/2025 - 07/2025

    Designed and developed a remote-controlled combat robot (“Tombstone”) with an integrated weapon system, focusing on motor control, wireless communication, and power management.

    Key Features:
    • High-speed weapon system integration
    • Wireless remote control using 2.4GHz transmitter & receiver
    • Efficient power distribution using Li-Po battery systems
    • Embedded motor control for movement and weapon actuation
    • Robust chassis design for combat performance

    `
    },

    {
      name: "4-Bit ALU Design and Implementation", 
      slug: "alu-design",
      description: "Design and implementation of a 4-bit Arithmetic Logic Unit.",
      image: "/ALU.png",
      technologies: ["Verilog", "VHDL", "Quartus Prime Lite","CPLD","EPM240T100C5","Altera Max Ⅱ","RTL Simulation","", "GitHub"],
      category: "Digital Design"
    },
    {
      name: "Design and Simulation of a Portable 18650 Lithium-Ion Power Bank",
      slug: "power-bank",
      description: "Design and development of a power bank system with charging control, battery protection, and power monitoring Voltmeter Module.",
      image: "/powerbank.jpg",
      technologies: [
        "1S BMS",
        "TP4056 Charging Module",
        "XL6009 Boost DC-DC Converter",
        "Power Optimization",
        "Altium Designer",
        "Proteus Simulation",
        "Voltmeter Module"
      ],
      category: "Electronics"
    },
    {
      name: "Anti-virus software (MEDUSA)", 
      slug: "medusa",
      description: "Anti-virus software with real-time protection and malware detection",
      image: "/medusa.png",
      technologies: ["Visual Studio", "C#", "SQL Server", "WinForms", "GitHub","RDLC","Hashing Algorithms","Real-time Scanning"],
      category: "Desktop Application"
    },
    {
      name: "Real-Time Crypto Signal Platform", 
      slug: "crypto",
      description: "Real-time cryptocurrency signal platform with predictive analytics",
      image: "/crypto.png",
      technologies: ["React", "Node.js","Tailwind CSS","Vite", "WebSocket", "Python","Flask", "Azure", "GitHub","Binance API","Metirial-UI"],
      category: "web"
    },
    {
      name: "Student Attendance System", 
      slug: "student-attendance",
      description: "Students' attendance system with a GUI helps the lecturers to manage student data.",
      image: "/student_attendance.png",
      technologies: ["Java","GitHub","IntelliJ IDEA","NetBeans"],
      category: "Desktop Application"
    },
    {
      name: "C Chat", 
      slug: "c-chat",
      description: "A simple chat application built with C and networking libraries.",
      image: "/c_chat.png",
      technologies: ["C", "Linux", "GitHub"],
      category: "Desktop Application"
    },
    
    {
      name: "ENTER NIC", 
      slug: "nic",
      description: "When the user inputs the NIC number, the user can get the details of the owner of the NIC.",
      image: "/nic.png",
      technologies: ["python","GitHub"],
      category: "Desktop Application"
    },
    
  ];
