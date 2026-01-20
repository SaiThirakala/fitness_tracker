# Frontend Overview: Components & Data Flow

```mermaid
flowchart LR
  %% Main layout: App centered; UI components around it
  subgraph Frontend
    direction LR

    App[App<br/>State: workouts, selectedWorkout, entries<br/>Fetch: GET • POST • PATCH • DELETE]

    subgraph UI_Inputs
      direction TB
      WF[WorkoutForm<br/>creates workout<br/>no fetch]
      EF[EntryForm<br/>creates entry<br/>no fetch]
    end

    subgraph UI_Lists
      direction TB
      WL[WorkoutList<br/>displays workouts<br/>no fetch]
      EL[EntryList<br/>displays entries<br/>no fetch]
    end
  end

  %% Props from App to lists/forms
  App -- props: workouts, selectedId --> WL
  App -- props: entries, workoutId --> EL
  App -- props: selectedId --> EF

  %% Events from forms/lists back to App
  WF -- onCreate(workoutDraft) --> App
  EF -- onCreate(entryDraft) --> App
  WL -- onSelect(id) --> App
  WL -- onDelete(id) --> App
  EL -- onDelete(id) --> App

  %% App side effects (fetch) and re-render note
  App -. updates state & re-renders .- App
