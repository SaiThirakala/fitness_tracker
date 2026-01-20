import { useEffect, useState } from 'react'
import type { Workout } from '../types'
import { getErrorMessage } from '../lib/errors'

type Props = {
  selectedId?: string
  onSelect: (id: string) => void
  refreshKey?: number
  onDeleted?: (id: string) => void
}

const API = 'http://localhost:3000'

export default function WorkoutList({ selectedId, onSelect, refreshKey, onDeleted }: Props) {
  const [data, setData] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => { (async () => {
    setLoading(true); setErr(null)
    try {
      const res = await fetch(`${API}/workouts`)
      const list = await res.json() as Workout[]
      setData(list)
    } catch (e: unknown) {
      setErr(getErrorMessage(e) || 'Failed to load workouts')
    } finally { setLoading(false) }
  })() }, [refreshKey])

  async function del(id: string) {
    if (!confirm('Delete this workout?')) return
    await fetch(`${API}/workouts/${id}`, { method: 'DELETE' })
    setData(d => d.filter(w => w.id !== id))
    onDeleted?.(id)
  }

  if (loading) return <div className="card">Loading workouts…</div>
  if (err) return <div className="card error">{err}</div>

  return (
    <div className="card">
      <h2>Workouts</h2>
      {data.length === 0 && <p>No workouts yet.</p>}
      <ul className="list">
        {data.map(w => (
          <li key={w.id} className={w.id === selectedId ? 'selected' : ''}>
            <button className="link" onClick={() => onSelect(w.id)}>
              <div className="title">{w.title}</div>
              <div className="sub">{new Date(w.performedAt).toLocaleString()}</div>
            </button>
            <button className="danger" onClick={() => del(w.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
