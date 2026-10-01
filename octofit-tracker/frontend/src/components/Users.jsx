import CollectionView from './CollectionView.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const columns = [
  {
    label: 'Athlete',
    render: (item) => item.username || [item.firstName, item.lastName].filter(Boolean).join(' ') || item.name || 'Athlete',
  },
  { label: 'Email', render: (item) => item.email || '-' },
  { label: 'Team', render: (item) => item.teamName || item.team || '-' },
  { label: 'Age', render: (item) => item.age ?? '-' },
]

function Users() {
  return (
    <CollectionView
      title="Athletes"
      eyebrow="The OctoFit roster / 04"
      url={apiUrl}
      columns={columns}
      emptyMessage="No athletes are on the roster yet."
    />
  )
}

export default Users