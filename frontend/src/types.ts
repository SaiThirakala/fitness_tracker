export type Workout = {
    id: string;
    title: string;
    performedAt: string;
    notes?: string | null;
  };
  
  export type Entry = {
    id: string;
    workoutId: string;
    exercise: string;
    sets: number;
    reps: number;
    weight?: number | null;
    restSeconds?: number | null;
  };
  
  export type WorkoutWithEntries = Workout & { entries: Entry[] };
  