import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import mascot from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: 'Activities', path: '/activities', number: '01' },
  { label: 'Leaderboard', path: '/leaderboard', number: '02' },
  { label: 'Teams', path: '/teams', number: '03' },
  { label: 'Athletes', path: '/users', number: '04' },
  { label: 'Workouts', path: '/workouts', number: '05' },
]

function App() {
  return (
    <div className="tracker-shell">
      <aside className="side-rail">
        <NavLink className="brand-lockup" to="/activities" aria-label="OctoFit Tracker home">
          <img src={mascot} alt="" className="brand-mascot" />
          <span className="brand-name">OctoFit <strong>Tracker</strong></span>
        </NavLink>

        <div className="rail-label">Training desk</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-item${isActive ? ' is-active' : ''}`}
              key={item.path}
              to={item.path}
            >
              <span className="nav-number">{item.number}</span>
              <span>{item.label}</span>
              <span className="nav-arrow" aria-hidden="true">&#8599;</span>
            </NavLink>
          ))}
        </nav>

        <div className="rail-footer">
          <span className="rail-pulse" aria-hidden="true" />
          <span>Mergington High</span>
          <span className="rail-year">2026</span>
        </div>
      </aside>

      <main className="main-stage">
        <header className="topline">
          <span><span className="topline-mark" /> Student fitness</span>
          <span className="topline-campus">Mergington High School</span>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
