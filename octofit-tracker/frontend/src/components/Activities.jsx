import CollectionView from './CollectionView.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

const columns = [
  { label: 'Activity', render: (item) => item.activityType || item.type || 'Activity' },
  { label: 'Athlete', render: (item) => item.username || item.userName || item.userId || '-' },
  { label: 'Duration', render: (item) => item.duration ? `${item.duration} min` : '-' },
  { label: 'Distance', render: (item) => item.distance ? `${item.distance} km` : '-' },
  { label: 'Calories', render: (item) => item.calories ?? '-' },
  { label: 'Date', render: (item) => item.date ? new Date(item.date).toLocaleDateString() : '-' },
]

function Activities() {
  return (
    <CollectionView
      title="Activities"
      eyebrow="Move every day / 01"
      url={apiUrl}
      columns={columns}
      emptyMessage="No activity logged yet."
    />
  )
}

export default Activities