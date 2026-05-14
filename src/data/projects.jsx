import { details } from "framer-motion/client";

export const projects = [
    {
      name: "EV CHARGING STATION RESERVATION SYSTEM",
      slug: "ev-charging",
      description: "Full-stack web application with modern technologies",
      image: "/ev_project.jpg",
      technologies: ["React", "Tailwind", "Node.js","Vite","Spring Boot", "MongoDB","AWS","Nginx","Stripe","CI/CD","JWT","OAuth","WebSockets","GitHub","Vercel"],
      category: "web",
      LinkedInLink:"",
      GitHubLink1:"https://github.com/RanasingheDD/ev_station_booking",
      GitHubLink2:"https://github.com/RanasingheDD/api-ev-booking-system",
      details:`09/2025-NOW
      
      A full-stack web-based and mobile application platform developed to streamline EV charging station reservations, scheduling, and payment processing for electric vehicle users. The system enables users to locate available charging stations, perform real-time slot reservations, manage charging schedules, and securely complete online payments through an interactive and user-friendly dashboard across both web and mobile platforms.

The platform also provides charging history tracking, authentication-based secure access, and real-time booking management to improve user convenience and charging station efficiency. The project focuses on building a scalable, responsive, and modern system with secure backend services and seamless user experience for both web and app environments.

Key Features
 • Real-time EV charging slot reservation
 • Secure online payment integration
 • User authentication and authorization using JWT
 • Charging schedule management
 • Charging history and booking tracking
 • Responsive and user-friendly dashboard
 • Real-time station availability management
 • Full-stack web application architecture`
    },
    {
      name: "Energy monitoring & controlling system", 
      slug: "energy-system",
      description: "Real-time energy monitoring and control system",
      image: "/energy.png",
      technologies: ["Python", "Machine Learning", "IoT", "ESP32","Hugging Face","GitHub","Docker","ESP Now","Voltage Sensing - ZMPT101B","Current Sensing - ACS712","Supabase","Proteus","Arduino","PCB Design","Simulation"],
      category: "IOT",
      GitHubLink1:"https://github.com/Kushitha1521/Energy_Audit_ML",
      LinkedInLink:"https://www.linkedin.com/posts/kushitha-lakshitha_icaps2025-innovation-smartenergy-activity-7382741595755827200-tcuO?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkaV0MB7CtGiDgsZMfEFKJrugJsTg0c5kU",
      details:`05/2025-09/2025

      An IoT-based smart energy management system developed to monitor and control real-time household power consumption using ESP32 and ESP-01 modules. The system collects voltage and current sensor data to calculate energy usage, enabling users to track live electricity consumption, remotely control connected appliances, and automate power management operations through wireless communication.

The project also integrates an AI-powered prediction model to analyze historical energy usage patterns and estimate future electricity costs, helping users make energy-efficient decisions. Real-time data handling, cloud integration, device switching, and remote monitoring functionalities were implemented to improve system accessibility, automation, and intelligent energy control.

Key Features
• Real-time home energy monitoring
• Remote appliance controlling and switching
• Voltage and current sensing using ZMPT101B and ACS712
• Power consumption calculation and live data visualization
• AI-based future energy cost prediction
• Historical usage analysis and trend monitoring
• Cloud-based data storage and synchronization
• IoT-enabled smart energy management system
      `,
      Huggingfacelink:"https://huggingface.co/spaces/kushitha/prediction/tree/main",
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

      details: `09/2025 - 07/2025

    Designed and developed a remote-controlled combat robot (“Tombstone”) with an integrated weapon system, focusing on motor control, wireless communication, and power management.

    Key Features:
    • High-speed weapon system integration
    • Wireless remote control using 2.4GHz transmitter & receiver
    • Efficient power distribution using Li-Po battery systems
    • Embedded motor control for movement and weapon actuation
    • Robust chassis design for combat performance

    `,
    LinkedInLink:"",
    },

    {
      name: "4-Bit ALU Design and Implementation", 
      slug: "alu-design",
      description: "Design and implementation of a 4-bit Arithmetic Logic Unit.",
      image: "/ALU.png",
      technologies: ["Verilog", "VHDL", "Quartus Prime Lite","CPLD","EPM240T100C5","Altera Max Ⅱ CPLD","RTL Simulation", "GitHub"],
      category: "Digital Design",
      LinkedInLink:"https://www.linkedin.com/posts/kushitha-lakshitha_verilog-rtldesign-digitallogic-activity-7435998764911349760-RIDs?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkaV0MB7CtGiDgsZMfEFKJrugJsTg0c5kU",
      GitHubLink1:"https://github.com/Kushitha1521/4-Bit-ALU",
      details:`2026

      • Designed and implemented a 4-bit Arithmetic Logic Unit (ALU) using Verilog HDL on the Altera MAX II CPLD platform.
      • Developed arithmetic and logical operation modules with integrated status flag generation.
      • Performed RTL modeling, behavioral simulation, synthesis, and timing analysis during the development process.
      • Implemented and validated the design on CPLD hardware for functional verification.
      • Followed the complete digital hardware design workflow from design development to hardware testing.
      
      `
      ,
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
      category: "Electronics",
      LinkedInLink:"https://www.linkedin.com/posts/kushitha-lakshitha_electronicsengineering-powerelectronics-embeddedsystems-activity-7444047958930804736-xnA8?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkaV0MB7CtGiDgsZMfEFKJrugJsTg0c5kU",
      GitHubLink1:"https://github.com/Kushitha1521/Power_Bank",
      MediumLink:"https://medium.com/@kushithalakshitha/design-and-simulation-of-a-portable-18650-lithium-ion-power-bank-58e2851205b5",
      ZenodoLink:"https://zenodo.org/records/19335148?token=eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImJjODhjMWIxLWQzNjUtNDdjZC1hNTFlLWM0YjMyZDhmYmJlZSIsImRhdGEiOnt9LCJyYW5kb20iOiJiMjU5Nzk4MTViZGJkYmY3MmI1MTIyNzc5OTJiZTM4ZiJ9.4RiPDh_IlcP36RmPPrWI0oEMyo9_csWpuyrfS0AVJ4rdlMCYGxejuiYSzKkgIM0Yr11FrByhpw9933A7aFsLRQ",
      details:`10/2025-03/2026

      Designed and developed a portable 18650 lithium-ion power bank system with integrated charging, voltage boosting, and battery protection functionalities to provide a stable and reliable 5V output for portable electronic devices. The project focused on safe lithium-ion battery management, efficient power conversion, and compact portable power delivery.

The system incorporates charging control, overcharge and over-discharge protection, short-circuit protection, and voltage regulation to ensure battery safety and stable operation. Circuit design, simulation, and PCB development were carried out using Altium Designer to optimize performance and hardware reliability.

Features
• Portable lithium-ion power bank system
• Stable 5V regulated output for external devices
• Safe 18650 battery charging management
• Overcharge and over-discharge protection
• Short-circuit and battery protection circuitry
• Efficient DC voltage boost conversion
• Compact and portable hardware design
• Circuit design and simulation using Altium Designer
      `,
    },
    {
      name: "Anti-virus software (MEDUSA)", 
      slug: "medusa",
      description: "Anti-virus software with real-time protection and malware detection",
      image: "/medusa.png",
      technologies: ["Visual Studio", "C#", "SQL Server", "WinForms", "GitHub","RDLC","Hashing Algorithms","Real-time Scanning"],
      category: "Desktop Application",
      GitHubLink1:"https://github.com/RanasingheDD/Medusa-Antivirus",
      LinkedInLink:"https://www.linkedin.com/posts/dishan-ranasinghe_csharp-antivirus-medusaantivirus-ugcPost-7355972378482397184-rOVP?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkaV0MB7CtGiDgsZMfEFKJrugJsTg0c5kU",
      details:`05/2025-09/2025
      Developed a signature-based anti-virus system that detects malicious files by comparing file hashes with a centralized threat database. The system supports real-time updates from a central security server and generates automated detection reports using RDLC for clear analysis and logging.`,
    },
    {
      name: "Real-Time Crypto Signal Platform", 
      slug: "crypto",
      description: "Real-time cryptocurrency signal platform with predictive analytics",
      image: "/crypto.png",
      technologies: ["React", "Node.js","Tailwind CSS","Vite", "WebSocket", "Python","Flask", "Azure", "GitHub","Binance API","Metirial-UI"],
      category: "web",
      LinkedInLink:"",
      GitHubLink1:"",
      details:`02/2025-06/2025
      
      Built a live cryptocurrency trading dashboard with an integrated signal engine that analyzes market data using technical indicators such as MACD and RSI to generate real-time Buy/Sell signals from Binance. The system delivers continuous market insights through a responsive web interface and ensures reliable performance through cloud deployment on Microsoft Azure for real-time data streaming and processing.`,
    },
    {
      name: "Student Attendance System", 
      slug: "student-attendance",
      description: "Students' attendance system with a GUI helps the lecturers to manage student data.",
      image: "/student_attendance.png",
      technologies: ["Java","GitHub","IntelliJ IDEA","NetBeans"],
      category: "Desktop Application",
      GitHubLink1:"",
      details:"",
    },
    {
      name: "C Chat", 
      slug: "c-chat",
      description: "A simple chat application built with C and networking libraries.",
      image: "/c_chat.png",
      technologies: ["C", "Linux", "GitHub"],
      category: "Desktop Application",
      GitHubLink1:"",
      details:"",
    },
    
    {
      name: "ENTER NIC", 
      slug: "nic",
      description: "When the user inputs the NIC number, the user can get the details of the owner of the NIC.",
      image: "/nic.png",
      technologies: ["python","GitHub"],
      category: "Desktop Application",
      GitHubLink1:"",
      details:"",
    },
    
  ];
