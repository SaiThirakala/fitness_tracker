# System Architecture

```mermaid
flowchart LR
  subgraph Frontend
    UI[React UI<br/>TypeScript + Vite<br/>:5173]
  end

  subgraph Backend
    Ctr[Controllers<br/>/workouts, /entries]
    Grd[Global Guard<br/>require JSON on writes]
    Pip[ValidationPipe<br/>DTO validation]
    Svc[Services DI]
    Rpo[TypeORM Repositories<br/>Entities & Relations]
  end

  subgraph Database
    DB[(PostgreSQL<br/>Docker<br/>:5432)]
  end

  UI -- HTTP JSON (fetch) --> Ctr
  Ctr --> Grd --> Pip --> Svc --> Rpo -->|SQL| DB
  DB --> Rpo --> Svc --> Ctr
  Ctr -. JSON response .-> UI
