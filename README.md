# UDP File Server (Node.js)

Ky projekt është zhvilluar për lëndën **Rrjetat Kompjuterike**.

Ai implementon një sistem **klient–server duke përdorur protokollin UDP**, së bashku me një **server HTTP për monitorim**.

Sistemi lejon lidhjen e disa klientëve me serverin, ekzekutimin e komandave për menaxhimin e file-ve dhe kontrollin e aksesit përmes roleve (admin dhe user normal).

---

## ⚙️ Teknologjitë e përdorura

- Node.js
- UDP (moduli dgram)
- Express.js (për HTTP server)
- File System (fs)
- Komunikim përmes JSON

---

##  Arkitektura e sistemit

Sistemi përbëhet nga:

### 🖥️ Serveri
- UDP server (komunikimi kryesor)
- HTTP server për monitorim (`/stats`)
- Menaxhimi i file-ve
- Menaxhimi i klientëve (role, aktivitet, timeout)

### 💻 Klienti
- UDP socket klient
- CLI (command-line interface)
- Dërgon komanda në server
- Pranon përgjigje nga serveri

---
## Sistemi i roleve

Sistemi përdor dy lloje përdoruesish:

### 🟢 Admin
- Ka qasje të plotë në server
- Mund të përdorë: upload, download, delete, read, list, search, info
- Vetëm 1 admin mund të ekzistojë në të njëjtën kohë

### 🔵 User normal
- Ka vetëm lexim të file-ve
- Mund të përdorë: list, read, search, info

##  Si të ekzekutohet projekti

### 1️⃣ Instalimi i dependencies
```bash
npm install
```

### Nisja e serverit
```bash
node server/index.js
```

### Nisja e klientit
```bash
node client/index.js
```
Pas startimit te serverit hap browser-in dhe shko te:
```bash
http://localhost:8080/stats
```
Do shfaqet JSON me statistika në kohë reale.
Ky endpoint kthen të dhëna në format JSON si:
- numri i klientëve aktivë
- lista e klientëve
- numri i mesazheve
- mesazhet e fundit
- koha aktuale e serverit
## Struktura e projektit

Programming-with-sockets/
│
├── server/
│   ├── index.js
│   ├── udpServer.js
│   ├── httpServer.js
│   ├── clientManager.js
│   ├── commandHandler.js
│   ├── fileManager.js
│   ├── utils.js
│   └── config.js
│
├── client/
│   └── index.js
│
├── files/
│   └── (file-t e ruajtura në server)
│
├── package.json
└── README.md
