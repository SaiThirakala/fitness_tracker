import { useState } from 'react'
import type { Entry } from '../types'
import { getErrorMessage } from '../lib/errors';

type Props = { workoutId: string; onCreated: (e: Entry) => void }

const API = 'http://localhost:3000'

export default function EntryForm({ workoutId, onCreated }: Props) {
  const [exercise, setExercise] = useState('')
  const [sets, setSets] = useState(3)
  const [reps, setReps] = useState(10)
  const [weight, setWeight] = useState<number | ''>('')
  const [rest, setRest] = useState<number | ''>('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null); setBusy(true)
    try {
      const res = await fetch(`${API}/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workoutId,
          exercise: exercise.trim(),
          sets: Number(sets),
          reps: Number(reps),
          weight: weight === '' ? undefined : Number(weight),
          restSeconds: rest === '' ? undefined : Number(rest),
        }),
      })
      const created = await res.json() as Entry
      setExercise(''); setSets(3); setReps(10); setWeight(''); setRest('')
      onCreated(created)
    } catch (e: unknown) {
      setErr(getErrorMessage(e) || 'Failed to add entry')
    } finally { setBusy(false) }
  }

  return (
    <form onSubmit={submit} className="card form">
      <h3>Add Entry</h3>
      <label>Exercise<input value={exercise} onChange={e=>setExercise(e.target.value)} /></label>
      <div className="row">
        <label>Sets<input type="number" min={1} value={sets} onChange={e=>setSets(Number(e.target.value))} /></label>
        <label>Reps<input type="number" min={1} value={reps} onChange={e=>setReps(Number(e.target.value))} /></label>
      </div>
      <div className="row">
        <label>Weight<input type="number" min={0} value={weight} onChange={e=>setWeight(e.target.value === '' ? '' : Number(e.target.value))} /></label>
        <label>Rest (s)<input type="number" min={0} value={rest} onChange={e=>setRest(e.target.value === '' ? '' : Number(e.target.value))} /></label>
      </div>
      {err && <p className="error">{err}</p>}
      <button disabled={busy}>{busy ? 'Saving…' : 'Add Entry'}</button>
    </form>
  )
}
