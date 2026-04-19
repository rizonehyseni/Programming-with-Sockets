# UDP File Server (Node.js)

Ky projekt është zhvilluar në kuadër të lëndës Rrjetat Kompjuterike dhe ka për qëllim implementimin e një sistemi klient–server duke përdorur protokollin UDP.

Sistemi përbëhet nga një server UDP që menaxhon komunikimin me klientët dhe një server HTTP që përdoret për monitorimin dhe menaxhimin e gjendjes së sistemit në kohë reale. Përmes këtij sistemi, disa klientë mund të lidhen njëkohësisht me serverin dhe të dërgojnë kërkesa të ndryshme për operacione mbi file-t.

Serveri identifikon çdo klient përmes kombinimit të adresës IP dhe portit, duke ruajtur informacion mbi aktivitetin e tyre, si koha e fundit e komunikimit dhe numri i mesazheve të dërguara. Për shkak se UDP është një protokoll pa lidhje (connectionless), serveri implementon mekanizma shtesë për menaxhimin e klientëve, si kontrolli i timeout-it dhe largimi automatik i klientëve joaktivë.

Sistemi mbështet disa komanda për manipulimin e file-ve, si listimi, leximi, kërkimi, shkarkimi, ngarkimi dhe fshirja e file-ve. Për të garantuar siguri dhe kontroll, është implementuar një sistem rolesh ku vetëm një klient mund të ketë rolin e administratorit (admin), ndërsa klientët e tjerë kanë rol normal me privilegje të kufizuara. Operacionet kritike si upload dhe delete janë të lejuara vetëm për adminin.

---

##  Teknologjitë e përdorura

- Node.js
- UDP (moduli dgram)
- Express.js (për HTTP server)
- File System (fs)
- Komunikim përmes JSON

---

##  Arkitektura e sistemit

Sistemi përbëhet nga:

###  Serveri
- UDP server (komunikimi kryesor)
- HTTP server për monitorim (`/stats`)
- Menaxhimi i file-ve
- Menaxhimi i klientëve (role, aktivitet, timeout)

###  Klienti
- UDP socket klient
- CLI (command-line interface)
- Dërgon komanda në server
- Pranon përgjigje nga serveri

---
## Sistemi i roleve

Sistemi përdor dy lloje përdoruesish:

###  Admin
- Ka qasje të plotë në server
- Mund të përdorë: upload, download, delete, read, list, search, info
- Vetëm 1 admin mund të ekzistojë në të njëjtën kohë

###  User normal
- Ka vetëm lexim të file-ve
- Mund të përdorë: list, read, search, info

## Tabela e komandave

  Komanda     Përshkrimi                Akses
------------------------------------------------
list        Liston file-t             Vetëm Admin
read        Lexon një file            Të gjithë
search      Kërkon file               Vetëm admin
upload      Ngarkon file              Vetëm admin
delete      Fshin file                Vetëm admin
download    Shkarkon file             Vetëm admin
info        Informata                 Vetëm admin


##  Si të ekzekutohet projekti

### Instalimi i dependencies
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

http://localhost:8080/stats

Do shfaqet JSON me statistika në kohë reale.
Ky endpoint kthen të dhëna në format JSON si:
- numri i klientëve aktivë
- lista e klientëve
- numri i mesazheve
- mesazhet e fundit
- koha aktuale e serverit
  
## Struktura e projektit
```
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
```
