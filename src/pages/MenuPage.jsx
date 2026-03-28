import { useState, useRef } from 'react'
import { MENU, CATEGORIES } from '../data/menu'
import { CATEGORY_IMAGES, imgUrl } from '../data/images'
import ItemRow from '../components/ItemRow'

function CategoryHero({ name, cat, catKey }) {
  const imgs = CATEGORY_IMAGES[catKey]
  return (
    <div className="relative h-52 sm:h-72 rounded-2xl overflow-hidden mb-8 shadow-lg">
      <img
        src={imgUrl(imgs.hero, 1200, 480)}
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5 sm:p-7">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full mb-2 inline-block"
          style={{ color: '#fff', background: cat.color + 'cc' }}
        >
          {cat.tag}
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mt-1">
          {name}
        </h2>
        <p className="text-white/55 text-xs mt-1.5 font-medium">
          {cat.items.length} plat{cat.items.length > 1 ? 's' : ''} disponible{cat.items.length > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}

function SearchResults({ query, results }) {
  if (results.length === 0) {
    return (
      <div className="text-center py-24 animate-fade-in">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-hotel-50 border border-hotel-200 flex items-center justify-center">
          <svg className="w-5 h-5 text-hotel-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <p className="text-gray-400 text-sm">Aucun plat ne correspond à « {query} »</p>
      </div>
    )
  }

  const grouped = CATEGORIES.filter((c) => results.some((r) => r.cat === c))

  return (
    <div className="animate-fade-in space-y-4">
      <p className="text-sm text-gray-400 mb-5">
        <span className="font-semibold text-hotel-600">{results.length}</span>{' '}
        résultat{results.length !== 1 ? 's' : ''} pour « {query} »
      </p>
      {grouped.map((c) => {
        const imgs = CATEGORY_IMAGES[c]
        return (
          <div
            key={c}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
            style={{ border: '1px solid #f1f5f9' }}
          >
            <div
              className="px-5 py-3 flex items-center gap-2.5"
              style={{ background: MENU[c].bg }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: MENU[c].color }}
              />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: MENU[c].color }}
              >
                {c}
              </span>
            </div>
            <div className="px-5 py-2">
              {results
                .filter((r) => r.cat === c)
                .map((item, i) => (
                  <ItemRow
                    key={i}
                    item={item}
                    accentColor={MENU[c].color}
                    image={imgUrl(imgs.items[i % imgs.items.length], 160, 120)}
                  />
                ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function MenuPage({ search }) {
  const [active, setActive] = useState(CATEGORIES[0])
  const tabsRef = useRef(null)

  const cat = MENU[active]
  const imgs = CATEGORY_IMAGES[active]
  const activeIdx = CATEGORIES.indexOf(active)

  const searchResults = search.trim()
    ? CATEGORIES.flatMap((c) =>
        MENU[c].items
          .filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.desc.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => ({ ...item, cat: c }))
      )
    : []

  const handleSelect = (c, idx) => {
    setActive(c)
    if (tabsRef.current) {
      const btn = tabsRef.current.children[idx]
      btn?.scrollIntoView({ inline: 'center', behavior: 'smooth' })
    }
  }

  return (
    <div className="max-w-6xl mx-auto flex">
      {/* ── Sidebar desktop ── */}
      <aside className="hidden lg:block w-64 shrink-0 px-4 py-8">
        <div className="sticky top-36">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-4 px-3">
            Carte du Restaurant
          </p>
          <nav className="space-y-0.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`category-sidebar-btn ${active === c && !search ? 'active' : ''}`}
                style={
                  active === c && !search
                    ? { borderLeft: `3px solid ${MENU[c].color}`, color: MENU[c].color }
                    : {}
                }
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 transition-transform duration-200"
                  style={{ background: active === c && !search ? MENU[c].color : '#cbd5e1' }}
                />
                <span className="truncate flex-1">{c}</span>
                <span className="text-xs opacity-40 shrink-0 font-mono">{MENU[c].items.length}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 min-w-0 px-4 py-6">

        {/* Mobile tabs */}
        {!search && (
          <div
            ref={tabsRef}
            className="hide-scrollbar lg:hidden flex gap-2 overflow-x-auto pb-4 mb-4"
          >
            {CATEGORIES.map((c, i) => (
              <button
                key={c}
                onClick={() => handleSelect(c, i)}
                className={`tab-pill ${active === c ? 'active' : 'inactive'}`}
                style={
                  active === c
                    ? { background: MENU[c].color, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }
                    : {}
                }
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        {search ? (
          <SearchResults query={search} results={searchResults} />
        ) : (
          <div key={active} className="animate-fade-in">
            <CategoryHero name={active} cat={cat} catKey={active} />

            {/* Items */}
            <div
              className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6"
              style={{ border: '1px solid #f1f5f9' }}
            >
              <div className="px-6 py-2">
                {cat.items.map((item, i) => (
                  <ItemRow
                    key={i}
                    item={item}
                    accentColor={cat.color}
                    image={imgUrl(imgs.items[i % imgs.items.length], 160, 120)}
                  />
                ))}
              </div>
            </div>

            {/* Prev / Next */}
            <div className="flex gap-3">
              {activeIdx > 0 && (
                <button
                  onClick={() => setActive(CATEGORIES[activeIdx - 1])}
                  className="btn-ghost"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  {CATEGORIES[activeIdx - 1]}
                </button>
              )}
              {activeIdx < CATEGORIES.length - 1 && (
                <button
                  onClick={() => setActive(CATEGORIES[activeIdx + 1])}
                  className="btn-primary ml-auto"
                >
                  {CATEGORIES[activeIdx + 1]}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="mt-10 text-center py-6 border-t border-slate-100">
              <p className="text-xs text-gray-300 mb-1">
                Prix en Francs CFA &middot; Service non compris &middot; Taxes incluses
              </p>
              <p className="text-xs text-hotel-200 font-display italic">
                Oubangui Hôtel &mdash; Excellence & Tradition &mdash; Bangui
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
