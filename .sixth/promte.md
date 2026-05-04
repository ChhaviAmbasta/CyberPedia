You are an expert full-stack developer, instructional designer, and system architect.

Build a complete production-ready web application named **Cyberpedia**, an interactive cybersecurity learning platform with structured educational content and simulated labs.

========================
TECH STACK
==========

Frontend:

* React.js
* Tailwind CSS
* Axios

Backend:

* Node.js
* Express.js

Data:

* Static JSON files (no database)

========================
CORE FEATURES
=============

1. LOGIN SYSTEM

* Username: demo
* Password: student
* Redirect to preference page after login

========================

2. PREFERENCE SELECTION
   User selects:

* Domain (Ethical Hacking, Network Fundamentals, Linux Fundamentals)
* Level (Beginner, Intermediate, Advanced)
* Mode (Theory, Practical, Mixed)

========================

3. ROADMAP SYSTEM
   Generate roadmap dynamically using JSON based on user selection.

========================

4. TOPIC CONTENT SYSTEM (VERY IMPORTANT)

Each topic must NOT be plain text.

Each topic must be structured in this format:

* Title
* Introduction
* Detailed Explanation
* Key Concepts (bullet points)
* Real-world Example
* Summary
* Lab Available (true/false)

========================

CREATE topics.json WITH FULL CONTENT BELOW:

{
"intro_hacking": {
"title": "What is Ethical Hacking",
"introduction": "Ethical hacking is the authorized process of identifying vulnerabilities in systems to improve security.",
"detailed_explanation": "Ethical hackers use the same tools and techniques as malicious hackers, but they operate with permission. Their goal is to identify weaknesses before attackers can exploit them. Organizations hire ethical hackers to perform penetration testing and security assessments.",
"key_concepts": [
"Authorized hacking",
"Security testing",
"Vulnerability identification"
],
"example": "A company hires a cybersecurity expert to test their website. The expert finds a vulnerability in login authentication and reports it.",
"summary": "Ethical hacking helps organizations secure systems by identifying weaknesses legally.",
"lab": false
},

"types_of_hackers": {
"title": "Types of Hackers",
"introduction": "Hackers are classified based on their intent and actions.",
"detailed_explanation": "There are three main categories of hackers: White Hat hackers who work ethically, Black Hat hackers who perform illegal activities, and Grey Hat hackers who operate between both worlds.",
"key_concepts": [
"White Hat - ethical",
"Black Hat - malicious",
"Grey Hat - mixed"
],
"example": "A White Hat hacker works for a company, while a Black Hat hacker steals user data.",
"summary": "The difference between hackers lies in their intent, not their skills.",
"lab": false
},

"legal_basics": {
"title": "Legal Concepts in Hacking",
"introduction": "Ethical hacking must always follow legal boundaries.",
"detailed_explanation": "Accessing systems without permission is illegal. Ethical hackers must always have written authorization and defined scope before testing any system.",
"key_concepts": [
"Authorization",
"Legal compliance",
"Responsible disclosure"
],
"example": "Testing your own system is legal, but hacking another company without permission is illegal.",
"summary": "Permission is the most important rule in cybersecurity.",
"lab": false
},

"footprinting": {
"title": "Footprinting",
"introduction": "Footprinting is the process of gathering information about a target.",
"detailed_explanation": "It involves collecting data such as IP addresses, domain details, and employee information. This can be done passively (without interaction) or actively.",
"key_concepts": [
"Passive reconnaissance",
"Active reconnaissance",
"Information gathering"
],
"example": "Finding a company’s email format using LinkedIn.",
"summary": "Footprinting helps attackers understand their target before attacking.",
"lab": true
},

"osint": {
"title": "OSINT",
"introduction": "Open Source Intelligence involves gathering publicly available data.",
"detailed_explanation": "OSINT uses sources like search engines, social media, and public databases to gather intelligence without direct interaction with the target.",
"key_concepts": [
"Public data",
"Intelligence gathering",
"Non-intrusive methods"
],
"example": "Finding sensitive information leaked on GitHub.",
"summary": "OSINT is powerful because it is legal and invisible.",
"lab": true
},

"port_scanning": {
"title": "Port Scanning",
"introduction": "Port scanning identifies open ports on a system.",
"detailed_explanation": "Ports are communication endpoints. By scanning ports, attackers can identify running services and potential vulnerabilities.",
"key_concepts": [
"Open ports",
"Services",
"Attack surface"
],
"example": "Using nmap to scan open ports on a server.",
"summary": "Open ports can expose vulnerabilities.",
"lab": true
},

"network_scanning": {
"title": "Network Scanning",
"introduction": "Network scanning identifies devices on a network.",
"detailed_explanation": "It helps map network structure and detect active hosts using techniques like ping sweep and ARP scanning.",
"key_concepts": [
"Active hosts",
"Network mapping",
"IP ranges"
],
"example": "Scanning all devices in a local network range.",
"summary": "Network scanning reveals the structure of a network.",
"lab": true
}
}

========================

5. LAB SIMULATION SYSTEM

* Create terminal-style UI
* Input command
* Return predefined output

commands.json:

{
"nmap": "PORT 22 open ssh\nPORT 80 open http\nPORT 443 open https",
"ping": "Reply from 192.168.1.1: bytes=32 time<1ms TTL=64",
"whois": "Domain registered to example.com",
"ls": "file1.txt folder/",
"pwd": "/home/user"
}

========================

6. API ENDPOINTS

POST /api/auth/login
POST /api/roadmap/generate
GET /api/content/:id
POST /api/lab/execute

========================

7. UI REQUIREMENTS

* Dark hacker theme
* Responsive
* Clean spacing
* Smooth scroll
* Terminal UI for lab

========================

8. OUTPUT

* Full working frontend + backend
* No errors
* Fully functional
* Ready to run locally

========================

IMPORTANT:

* Do NOT generate placeholder content
* Use the provided structured content exactly
* Maintain clean architecture
* Ensure modular code
* Ensure navigation works perfectly

This must be a fully working educational platform, not just a UI.
