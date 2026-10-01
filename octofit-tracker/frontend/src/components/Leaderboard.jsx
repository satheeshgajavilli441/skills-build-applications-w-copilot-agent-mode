import CollectionView from './CollectionView.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const columns = [
  { label: 'Rank', render: (item, index) => item.rank ?? index + 1 },
  { label: 'Athlete', render: (item) => item.username || item.name || item.user || 'Athlete' },
  { label: 'Team', render: (item) => item.teamName || item.team || '-' },
  { label: 'Points', render: (item) => item.points ?? item.score ?? 0 },
]

function Leaderboard() {
  return (
    <CollectionView
      title="Leaderboard"
      eyebrow="Friendly competition / 02"
      url={apiUrl}
      columns={columns}
      emptyMessage="The leaderboard is ready for its first score."
    />
  )
}

export default Leaderboard