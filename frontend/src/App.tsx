import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Workout, WorkoutWithEntries, Entry } from './types'
import WorkoutForm from './components/WorkoutForm'
import WorkoutList from './components/WorkoutList'
import EntryForm from './components/EntryForm'
import EntryList from './components/EntryList'

const API = 'http://localhost:3000'

export default function App() {
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [detail, setDetail] = useState<WorkoutWithEntries | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const reloadList = () => setRefreshKey(k => k + 1)

  const loadDetail = useCallback(async (id: string) => {
    const res = await fetch(`${API}/workouts/${id}`)
    const w = await res.json() as WorkoutWithEntries
    setDetail(w)
  }, [])

  useEffect(() => { if (selectedId) loadDetail(selectedId).catch(() => setDetail(null)) }, [selectedId, loadDetail])

  function onWorkoutCreated(w: Workout) { setSelectedId(w.id); reloadList() }
  function onWorkoutDeleted(id: string) { if (detail?.id === id) setDetail(null); if (selectedId === id) setSelectedId(undefined) }
  function onEntryCreated(e: Entry) { setDetail(d => d ? { ...d, entries: [e, ...d.entries] } : d) }
  function onEntryDeleted(id: string) { setDetail(d => d ? { ...d, entries: d.entries.filter(e => e.id !== id) } : d) }

  const header = useMemo(() => detail ? `${detail.title} — ${new Date(detail.performedAt).toLocaleString()}` : 'Select a workout', [detail])

  return (
    <div className="container">
      <header>
        <h1>Fitness Tracker</h1>
        <div className="subtle">API: {API}</div>
      </header>

      <main className="grid">
        <section>
          <WorkoutForm onCreated={onWorkoutCreated} />
          <WorkoutList selectedId={selectedId} onSelect={setSelectedId} onDeleted={onWorkoutDeleted} refreshKey={refreshKey} />
        </section>

        <section>
          <div className="card">
            <h2>{header}</h2>
            {!detail && <p>Pick a workout on the left.</p>}
            {detail && (
              <>
                <EntryForm workoutId={detail.id} onCreated={onEntryCreated} />
                <EntryList entries={detail.entries ?? []} onDeleted={onEntryDeleted} />
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
