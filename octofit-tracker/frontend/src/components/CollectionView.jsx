import { useApiCollection } from '../api.js'

function CollectionView({ title, eyebrow, url, columns, emptyMessage }) {
  const { items, count, status, error, retry } = useApiCollection(url)

  return (
    <section className="collection-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="record-count" aria-live="polite">
          <span className="count-light" />
          <strong>{status === 'ready' ? count : '--'}</strong>
          <span>{count === 1 ? 'record' : 'records'}</span>
        </div>
      </div>

      <div className="collection-rule">
        <span />
        <span />
        <span />
      </div>

      {status === 'loading' && (
        <div className="collection-message" role="status">
          <span className="loading-mark" />
          <span>Loading {title.toLowerCase()}...</span>
        </div>
      )}

      {status === 'error' && (
        <div className="collection-message error-message" role="alert">
          <div>
            <strong>Could not load {title.toLowerCase()}.</strong>
            <p>{error}</p>
          </div>
          <button className="retry-button" type="button" onClick={retry}>Retry</button>
        </div>
      )}

      {status === 'ready' && items.length === 0 && (
        <div className="empty-state">
          <span className="empty-index">00</span>
          <p>{emptyMessage}</p>
        </div>
      )}

      {status === 'ready' && items.length > 0 && (
        <div className="table-wrap">
          <table className="table tracker-table">
            <thead>
              <tr>
                {columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? `${title}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.label}>
                      {column.render(item, index)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {status === 'ready' && items.length > 0 && count > items.length && (
        <p className="pagination-note">Showing {items.length} of {count} records</p>
      )}
    </section>
  )
}

export default CollectionView