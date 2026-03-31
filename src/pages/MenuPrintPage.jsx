import { useState, useEffect } from 'react'
import { MENU } from '../data/menu.js'
import { CATEGORY_IMAGES, imgUrl } from '../data/images.js'
import { DISH_IMAGES } from '../data/dishImages.js'

const fmt = (price) =>
  price != null ? price.toLocaleString('fr-FR') + ' F CFA' : 'Inclus'

const CATEGORY_COLORS = {
  "Entrées Froides":  { bg: '#1d4ed8', light: '#eff6ff', border: '#bfdbfe' },
  "Entrées Chaudes":  { bg: '#c2410c', light: '#fff7ed', border: '#fed7aa' },
  "Potages":          { bg: '#0f766e', light: '#f0fdfa', border: '#99f6e4' },
  "Volailles":        { bg: '#92400e', light: '#fffbeb', border: '#fde68a' },
  "Poissons":         { bg: '#1e40af', light: '#eff6ff', border: '#bfdbfe' },
  "Bœuf":             { bg: '#991b1b', light: '#fff1f2', border: '#fecdd3' },
  "Agneau":           { bg: '#6b21a8', light: '#faf5ff', border: '#e9d5ff' },
  "Porc":             { bg: '#9d174d', light: '#fff1f2', border: '#fbcfe8' },
  "Abats":            { bg: '#44403c', light: '#fafaf9', border: '#d6d3d1' },
  "Plats Régionaux":  { bg: '#065f46', light: '#f0fdf4', border: '#bbf7d0' },
  "Pâtes":            { bg: '#0369a1', light: '#f0f9ff', border: '#bae6fd' },
  "Omelettes":        { bg: '#854d0e', light: '#fefce8', border: '#fef08a' },
  "Sandwichs":        { bg: '#78350f', light: '#fffbeb', border: '#fde68a' },
  "Garnitures":       { bg: '#166534', light: '#f0fdf4', border: '#bbf7d0' },
  "Desserts":         { bg: '#881337', light: '#fff1f2', border: '#fecdd3' },
  "Carte des Vins":   { bg: '#701a75', light: '#fdf4ff', border: '#f0abfc' },
}

export default function MenuPrintPage() {
  const categories = Object.entries(MENU)
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)

  // Précharger toutes les images dès l'ouverture de la page
  useEffect(() => {
    const urls = []
    // Images des catégories
    Object.values(CATEGORY_IMAGES).forEach(cat => {
      urls.push(imgUrl(cat.hero, 120, 120))
    })
    // Image spécifique de chaque plat
    const uniqueIds = [...new Set(Object.values(DISH_IMAGES))]
    uniqueIds.forEach(id => urls.push(imgUrl(id, 200, 160)))

    let loaded = 0
    const total = urls.length

    urls.forEach(url => {
      const img = new Image()
      img.onload = img.onerror = () => {
        loaded++
        setProgress(Math.round((loaded / total) * 100))
        if (loaded === total) setReady(true)
      }
      img.src = url
    })
  }, [])

  const handlePrint = () => window.print()

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: '#fff', minHeight: '100vh' }}>

      {/* Bouton impression — masqué à l'impression */}
      <div className="no-print" style={{
        position: 'fixed', top: 16, right: 16, zIndex: 9999,
        display: 'flex', gap: 10,
      }}>
        <button
          onClick={handlePrint}
          disabled={!ready}
          style={{
            background: ready ? '#1d4ed8' : '#64748b', color: '#fff', border: 'none',
            borderRadius: 8, padding: '12px 28px', fontSize: 15,
            fontWeight: 700, cursor: ready ? 'pointer' : 'not-allowed',
            boxShadow: ready ? '0 4px 16px rgba(29,78,216,0.3)' : 'none',
            display: 'flex', alignItems: 'center', gap: 8, minWidth: 260,
            position: 'relative', overflow: 'hidden', transition: 'background 0.3s',
          }}
        >
          {/* Barre de progression */}
          {!ready && (
            <div style={{
              position: 'absolute', left: 0, bottom: 0, height: 3,
              background: '#7dd3fc', width: `${progress}%`,
              transition: 'width 0.15s ease',
            }} />
          )}
          {!ready ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ animation: 'spin 1s linear infinite' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/>
              </svg>
              Chargement… {progress}%
            </>
          ) : (
            <>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" rx="1" />
              </svg>
              Imprimer / Enregistrer en PDF
            </>
          )}
        </button>
        <a href="/" style={{
          background: '#6b7280', color: '#fff', borderRadius: 8,
          padding: '12px 20px', fontSize: 15, fontWeight: 600,
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7-7 7 7 7"/>
          </svg>
          Retour
        </a>
      </div>

      {/* ========== PAGE DE COUVERTURE ========== */}
      <div style={{
        width: '100%', minHeight: '100vh',
        background: 'linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f4c3a 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pageBreakAfter: 'always', breakAfter: 'page',
        padding: '60px 40px', boxSizing: 'border-box', position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Motif décoratif */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.08,
          backgroundImage: 'radial-gradient(circle at 20% 20%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 80%, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Bordure décorative */}
        <div style={{
          position: 'absolute', inset: 30,
          border: '2px solid rgba(212,175,55,0.5)',
          borderRadius: 4,
        }} />

        {/* Logo */}
        <img
          src="/oubanguiLogo.jpg"
          alt="Hôtel Oubangui"
          style={{
            width: 140, height: 140, borderRadius: '50%',
            objectFit: 'cover', border: '4px solid #d4af37',
            boxShadow: '0 0 40px rgba(212,175,55,0.4)',
            marginBottom: 32,
          }}
          onError={e => { e.target.style.display = 'none' }}
        />

        {/* Nom hotel */}
        <p style={{
          color: '#d4af37', fontSize: 13, letterSpacing: 6,
          textTransform: 'uppercase', margin: '0 0 8px',
        }}>
          HÔTEL OUBANGUI — BANGUI
        </p>

        {/* Ligne dorée */}
        <div style={{ width: 80, height: 2, background: '#d4af37', margin: '12px 0 20px' }} />

        {/* Titre principal */}
        <h1 style={{
          color: '#fff', fontSize: 52, fontWeight: 400, margin: '0 0 16px',
          textAlign: 'center', lineHeight: 1.1, letterSpacing: 2,
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          Notre Carte
        </h1>
        <h2 style={{
          color: '#d4af37', fontSize: 26, fontWeight: 400, margin: '0 0 40px',
          letterSpacing: 4, textTransform: 'uppercase',
        }}>
          du Restaurant
        </h2>

        <div style={{ width: 80, height: 2, background: '#d4af37', margin: '0 0 40px' }} />

        {/* Statistiques */}
        <div style={{ display: 'flex', gap: 48, marginBottom: 48 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#d4af37', fontSize: 32, fontWeight: 700, margin: 0 }}>16</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, letterSpacing: 2, margin: '4px 0 0', textTransform: 'uppercase' }}>Catégories</p>
          </div>
          <div style={{ width: 1, background: 'rgba(212,175,55,0.3)' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#d4af37', fontSize: 32, fontWeight: 700, margin: 0 }}>100+</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, letterSpacing: 2, margin: '4px 0 0', textTransform: 'uppercase' }}>Plats</p>
          </div>
          <div style={{ width: 1, background: 'rgba(212,175,55,0.3)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 4 }}>
              {[0,1,2].map(n => (
                <svg key={n} width="22" height="22" viewBox="0 0 24 24" fill="#d4af37">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, letterSpacing: 2, margin: '4px 0 0', textTransform: 'uppercase' }}>Excellence</p>
          </div>
        </div>

        {/* Citation */}
        <p style={{
          color: 'rgba(255,255,255,0.55)', fontSize: 14, fontStyle: 'italic',
          textAlign: 'center', maxWidth: 480, lineHeight: 1.7, margin: 0,
        }}>
          "Un art de vivre, une cuisine raffinée inspirée des saveurs<br/>
          locales et des traditions culinaires françaises."
        </p>

        {/* Pied de couverture */}
        <div style={{ position: 'absolute', bottom: 50, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: 1, margin: 0 }}>
            Tous les prix sont exprimés en Francs CFA · Service compris
          </p>
        </div>
      </div>

      {/* ========== SOMMAIRE ========== */}
      <div style={{
        padding: '60px 60px 40px', pageBreakAfter: 'always', breakAfter: 'page',
        maxWidth: 860, margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ color: '#d4af37', fontSize: 11, letterSpacing: 5, textTransform: 'uppercase', margin: '0 0 12px' }}>
            HÔTEL OUBANGUI
          </p>
          <h2 style={{ fontSize: 36, fontWeight: 400, margin: '0 0 16px', color: '#1a1a1a' }}>Sommaire</h2>
          <div style={{ width: 60, height: 2, background: '#d4af37', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 40px' }}>
          {categories.map(([cat, data]) => {
            const color = CATEGORY_COLORS[cat] || { bg: '#374151' }
            const heroId = CATEGORY_IMAGES[cat]?.hero
            return (
              <div key={cat} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0', borderBottom: '1px solid #f0f0f0',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  overflow: 'hidden', flexShrink: 0,
                  border: `2px solid ${color.bg}`,
                }}>
                  {heroId ? (
                    <img
                      src={imgUrl(heroId, 88, 88)}
                      alt={cat}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: color.bg }} />
                  )}
                </div>
                <span style={{ flex: 1, fontSize: 15, color: '#222', fontWeight: 500 }}>{cat}</span>
                <span style={{ fontSize: 13, color: '#999' }}>{data.items.length} plat{data.items.length > 1 ? 's' : ''}</span>
              </div>
            )
          })}
        </div>

        <div style={{
          marginTop: 48, padding: '24px 32px',
          background: '#f9f7f0', borderLeft: '4px solid #d4af37', borderRadius: 4,
        }}>
          <p style={{ margin: 0, fontSize: 13, color: '#555', lineHeight: 1.8 }}>
            <strong>Note :</strong> Nos plats sont préparés avec des produits frais de saison. Certaines préparations peuvent contenir des allergènes.
            N'hésitez pas à consulter notre équipe pour toute demande particulière.<br />
            <strong>Les garnitures</strong> sont incluses avec les plats principaux sauf mention contraire.
          </p>
        </div>
      </div>

      {/* ========== CATÉGORIES ========== */}
      {categories.map(([cat, data]) => {
        const images = CATEGORY_IMAGES[cat]
        const color = CATEGORY_COLORS[cat] || { bg: '#374151', light: '#f9fafb', border: '#e5e7eb' }

        return (
          <div
            key={cat}
            style={{
              pageBreakBefore: 'always', breakBefore: 'page',
              padding: '0 0 40px',
            }}
          >
            {/* En-tête de catégorie */}
            <div style={{
              background: `linear-gradient(120deg, ${color.bg} 0%, ${color.bg}cc 100%)`,
              padding: '40px 60px',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Image hero en arrière-plan */}
              {images && (
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${imgUrl(images.hero, 800, 300)})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: 0.15,
                }} />
              )}

              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  overflow: 'hidden', flexShrink: 0,
                  border: '3px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                }}>
                  {images ? (
                    <img
                      src={imgUrl(images.hero, 128, 128)}
                      alt={cat}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                      {data.icon}
                    </div>
                  )}
                </div>
                <div>
                  <h2 style={{ color: '#fff', fontSize: 34, fontWeight: 400, margin: 0, letterSpacing: 1 }}>
                    {cat}
                  </h2>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: 0 }}>
                    {data.items.length} plat{data.items.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Grille des plats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: data.items.length <= 3 ? '1fr' : 'repeat(2, 1fr)',
              gap: 1,
              background: '#e5e7eb',
              margin: '0 0',
            }}>
              {data.items.map((item, i) => {
                const imgId = DISH_IMAGES[item.name] || images?.items[i % (images?.items.length || 1)]
                return (
                  <div key={i} style={{
                    background: '#fff',
                    display: 'flex', alignItems: 'stretch',
                    minHeight: 120,
                  }}>
                    {/* Image du plat */}
                    {imgId && (
                      <div style={{ flexShrink: 0, width: 140 }}>
                        <img
                          src={imgUrl(imgId, 200, 160)}
                          alt={item.name}
                          style={{
                            width: '100%', height: '100%',
                            objectFit: 'cover', display: 'block',
                          }}
                          loading="eager"
                        />
                      </div>
                    )}

                    {/* Infos du plat */}
                    <div style={{
                      flex: 1, padding: '18px 24px',
                      display: 'flex', flexDirection: 'column', justifyContent: 'center',
                      borderLeft: `3px solid ${color.bg}`,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                        <h3 style={{
                          margin: 0, fontSize: 15, fontWeight: 700,
                          color: '#1a1a1a', lineHeight: 1.3, flex: 1,
                        }}>
                          {item.name}
                        </h3>
                        {item.price != null ? (
                          <div style={{
                            background: color.bg,
                            color: '#fff',
                            padding: '3px 10px',
                            borderRadius: 4,
                            fontSize: 13,
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}>
                            {fmt(item.price)}
                          </div>
                        ) : (
                          <div style={{
                            background: '#f0fdf4', color: '#15803d',
                            padding: '3px 10px', borderRadius: 4,
                            fontSize: 12, fontWeight: 600, flexShrink: 0,
                          }}>
                            Inclus
                          </div>
                        )}
                      </div>
                      <p style={{
                        margin: 0, fontSize: 13, color: '#666',
                        lineHeight: 1.5, fontStyle: 'italic',
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* ========== PAGE DE FIN ========== */}
      <div style={{
        pageBreakBefore: 'always', breakBefore: 'page',
        background: 'linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f4c3a 100%)',
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '60px 40px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 30,
          border: '2px solid rgba(212,175,55,0.5)', borderRadius: 4,
        }} />

        <img
          src="/oubanguiLogo.jpg"
          alt="Hôtel Oubangui"
          style={{
            width: 100, height: 100, borderRadius: '50%',
            objectFit: 'cover', border: '3px solid #d4af37',
            marginBottom: 28,
          }}
          onError={e => { e.target.style.display = 'none' }}
        />

        <div style={{ width: 60, height: 2, background: '#d4af37', marginBottom: 24 }} />

        <h2 style={{
          color: '#fff', fontSize: 28, fontWeight: 400, margin: '0 0 12px',
          letterSpacing: 2, textAlign: 'center',
        }}>
          Merci de votre confiance
        </h2>
        <p style={{
          color: '#d4af37', fontSize: 14, letterSpacing: 3,
          textTransform: 'uppercase', margin: '0 0 32px',
        }}>
          HÔTEL OUBANGUI · BANGUI
        </p>

        <p style={{
          color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.9,
          textAlign: 'center', maxWidth: 420, fontStyle: 'italic', margin: '0 0 40px',
        }}>
          Notre équipe se tient à votre disposition pour rendre<br/>
          votre séjour inoubliable. Bon appétit !
        </p>

        <div style={{ width: 60, height: 2, background: '#d4af37', marginBottom: 24 }} />

        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: 1, margin: 0 }}>
          Tous les prix incluent les taxes · Service compris
        </p>
      </div>

      {/* Styles CSS pour l'impression */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; padding: 0; }
          @page { size: A4; margin: 0; }
          img { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        @page { size: A4; margin: 0; }
      `}</style>
    </div>
  )
}
