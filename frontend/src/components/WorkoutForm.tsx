import { useState } from 'react'
import type { Workout } from '../types'
import { getErrorMessage } from '../lib/errors'

type Props = { onCreated: (w: Workout) => void }

const API = 'http://localhost:3000'

export default function WorkoutForm({ onCreated }: Props) {
  const [title, setTitle] = useState('')
  const [performedAt, setPerformedAt] = useState('')
  const [notes, setNotes] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    if (!title || !performedAt) { setErr('Title and time are required.'); return }
    setBusy(true)
    try {
      const res = await fetch(`${API}/workouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: title.trim(),
          notes: notes.trim() || undefined,
          performedAt: new Date(performedAt).toISOString(),
        }),
      })
      const created = await res.json() as Workout
      setTitle(''); setNotes(''); setPerformedAt('')
      onCreated(created)
    } catch (e: unknown) {
      setErr(getErrorMessage(e) || 'Failed to create workout')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="card form">
      <h2>New Workout</h2>
      <label>Title<input value={title} onChange={e=>setTitle(e.target.value)} /></label>
      <label>When<input type="datetime-local" value={performedAt} onChange={e=>setPerformedAt(e.target.value)} /></label>
      <label>Notes<textarea rows={2} value={notes} onChange={e=>setNotes(e.target.value)} /></label>
      {err && <p className="error">{err}</p>}
      <button disabled={busy}>{busy ? 'Saving…' : 'Add Workout'}</button>
    </form>
  )
}
