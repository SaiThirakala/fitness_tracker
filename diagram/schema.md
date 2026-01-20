# Database Schema & Entities

```mermaid
erDiagram
  direction LR
  WORKOUT ||--o{ ENTRY : "has many"

  WORKOUT {
    UUID id PK
    TEXT title
    TIMESTAMPTZ performedAt
    TEXT notes
  }

  ENTRY {
    UUID id PK
    UUID workoutId FK
    TEXT exercise
    INT sets
    INT reps
    NUMERIC weight
    INT restSeconds
  }
