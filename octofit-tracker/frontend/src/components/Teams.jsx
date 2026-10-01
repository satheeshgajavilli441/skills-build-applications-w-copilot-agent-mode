import CollectionView from './CollectionView.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

const columns = [
  { label: 'Team', render: (item) => item.name || item.teamName || 'Team' },
  { label: 'Members', render: (item) => Array.isArray(item.members) ? item.members.length : item.memberCount ?? '-' },
  { label: 'Points', render: (item) => item.points ?? item.score ?? 0 },
  { label: 'Captain', render: (item) => item.captainName || item.captain || '-' },
]

function Teams() {
  return (
    <CollectionView
      title="Teams"
      eyebrow="Better together / 03"
      url={apiUrl}
      columns={columns}
      emptyMessage="No teams have been formed yet."
    />
  )
}

export default Teams