TECH STACK
🖥️ Frontend
React.js (recommended)
Tailwind CSS
Axios (API calls)
🧠 Backend
Node.js
Express.js
💾 Data Layer (MVP)
Static JSON files (no database)
🧪 Lab Simulation
In-memory command engine
🚀 Dev Tools
VS Code
Nodemon
Git
4. 🗄️ BACKEND SCHEMA (NO DATABASE)

Instead of DB → structured JSON

📄 roadmaps.json
{
  "ethical_hacking": {
    "beginner": {
      "mixed": {
        "phases": [
          {
            "title": "Fundamentals",
            "topics": ["intro_hacking", "types_of_hackers"]
          }
        ]
      }
    }
  }
}
📄 topics.json
{
  "intro_hacking": {
    "title": "What is Ethical Hacking",
    "content": "Full detailed explanation...",
    "lab": false
  },
  "port_scanning": {
    "title": "Port Scanning",
    "content": "Detailed explanation...",
    "lab": true
  }
}
📄 commands.json
{
  "nmap": "PORT 22 open ssh\nPORT 80 open http",
  "ping": "Reply from 192.168.1.1: bytes=32 time<1ms TTL=64",
  "whois": "Domain registered info..."
}