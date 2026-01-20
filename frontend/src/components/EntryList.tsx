import type { Entry } from '../types'
const API = 'http://localhost:3000'

type Props = { entries: Entry[]; onDeleted: (id: string) => void }

export default function EntryList({ entries, onDeleted }: Props) {
  async function del(id: string) {
    if (!confirm('Delete this entry?')) return
    await fetch(`${API}/entries/${id}`, { method: 'DELETE' })
    onDeleted(id)
  }

  if (entries.length === 0) return <div className="card"><p>No entries yet.</p></div>

  return (
    <div className="card">
      <h3>Entries</h3>
      <ul className="list">
        {entries.map(e => (
          <li key={e.id}>
            <div className="title">{e.exercise}</div>
            <div className="sub">
              {e.sets}×{e.reps}{e.weight != null ? ` @ ${e.weight} lb` : ''}{e.restSeconds != null ? ` • rest ${e.restSeconds}s` : ''}
            </div>
            <button className="danger" onClick={() => del(e.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
