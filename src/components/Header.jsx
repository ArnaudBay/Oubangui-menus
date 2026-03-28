import { Link, useLocation } from 'react-router-dom'

export default function Header({ search, onSearch }) {
  const location = useLocation()
  const isAfiche = location.pathname === '/affiche'

  return (
    <header
      className="sticky top-0 z-40 glass border-b border-slate-200"
      style={{ boxShadow: '0 1px 20px rgba(30,58,138,0.07)' }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-md shrink-0">
            <img
              src="/oubanguiLogo.jpg"
              alt="Oubangui Hôtel"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h1
              className="font-display text-hotel-950 font-bold leading-none truncate"
              style={{ fontSize: 18 }}
            >
              Oubangui Hôtel
            </h1>
            <p className="text-hotel-400 text-xs font-medium" style={{ letterSpacing: 2 }}>
              RESTAURANT
            </p>
          </div>
        </Link>
      </div>

      {/* Search bar — only on menu page */}
      {!isAfiche && (
        <div className="max-w-6xl mx-auto px-4 pb-3">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Rechercher un plat, une spécialité…"
              className="w-full pl-10 pr-10 py-2.5 text-sm text-gray-700 rounded-full outline-none
                         transition-all bg-hotel-50 border border-hotel-200
                         focus:ring-2 focus:ring-hotel-300 focus:border-transparent placeholder:text-slate-400"
            />
            {search && (
              <button
                onClick={() => onSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Effacer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
