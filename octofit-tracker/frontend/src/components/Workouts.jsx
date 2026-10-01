import CollectionView from './CollectionView.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const columns = [
  { label: 'Workout', render: (item) => item.name || item.title || 'Workout' },
  { label: 'Type', render: (item) => item.activityType || item.category || item.type || '-' },
  { label: 'Duration', render: (item) => item.duration ? `${item.duration} min` : '-' },
  { label: 'Level', render: (item) => item.level || item.difficulty || '-' },
]

function Workouts() {
  return (
    <CollectionView
      title="Workouts"
      eyebrow="Find your next challenge / 05"
      url={apiUrl}
      columns={columns}
      emptyMessage="No workouts have been added yet."
    />
  )
}

export default Workouts