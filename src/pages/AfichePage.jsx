import QRCode from '../components/QRCode'

function Divider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.25))' }} />
      <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 18 }}>✦</span>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.25))' }} />
    </div>
  )
}

export default function AfichePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-12 px-4"
      style={{ background: 'linear-gradient(145deg, #0a1854 0%, #1e3a8a 35%, #1d4ed8 65%, #0369a1 100%)' }}
    >
      {/* Print button */}
      <button
        onClick={() => window.print()}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white text-hotel-800
                   text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg transition-all
                   hover:shadow-xl hover:bg-hotel-50 active:scale-95 print:hidden"
      >
        🖨️ Imprimer l'affiche
      </button>

      {/* Poster card */}
      <div
        className="w-full max-w-md text-center relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 36,
          padding: '56px 48px',
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Decorative bubbles */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full"
             style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-56 h-56 rounded-full"
             style={{ background: 'rgba(255,255,255,0.05)' }} />

        {/* Corner accents */}
        {[
          'top-5 left-5 border-t border-l rounded-tl-lg',
          'top-5 right-5 border-t border-r rounded-tr-lg',
          'bottom-5 left-5 border-b border-l rounded-bl-lg',
          'bottom-5 right-5 border-b border-r rounded-br-lg',
        ].map((cls, i) => (
          <div key={i} className={`absolute w-12 h-12 pointer-events-none ${cls}`}
               style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
        ))}

        {/* Logo */}
        <div
          className="w-20 h-20 rounded-3xl mx-auto mb-7 flex items-center justify-center shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #fff, #bfdbfe)' }}
        >
          <span className="font-display text-5xl font-bold text-hotel-900 leading-none">O</span>
        </div>

        {/* Hotel name */}
        <h1
          className="font-display text-white font-normal"
          style={{ fontSize: 34, letterSpacing: 6, textTransform: 'uppercase', lineHeight: 1.1 }}
        >
          Oubangui
        </h1>
        <p className="text-hotel-300 font-light mt-2" style={{ fontSize: 11, letterSpacing: 9, textTransform: 'uppercase' }}>
          Hôtel &nbsp;·&nbsp; Restaurant
        </p>

        <Divider />

        {/* Tagline */}
        <p className="font-display text-hotel-200 font-normal italic mb-7" style={{ fontSize: 16, letterSpacing: 1.5 }}>
          Scannez pour découvrir notre menu
        </p>

        {/* QR code */}
        <div
          className="inline-block p-5 mx-auto"
          style={{
            background: '#fff',
            borderRadius: 24,
            boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
          }}
        >
          <QRCode size={190} />
        </div>

        {/* URL */}
        <p className="mt-6 font-light" style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase' }}>
          oubanguihotel.com/menu
        </p>

        <Divider />

        {/* Second tagline */}
        <p className="font-display italic" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, letterSpacing: 1 }}>
          Excellence &amp; Tradition depuis Bangui
        </p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-7">
          {['📶 WiFi Gratuit', '🕐 12h – 23h', '📞 Réservation', '💳 CB Acceptée'].map((b) => (
            <span
              key={b}
              className="text-hotel-200 font-light"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.13)',
                borderRadius: 20,
                padding: '6px 15px',
                fontSize: 10,
                letterSpacing: 0.5,
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      <p className="text-white/20 text-xs mt-8 text-center print:hidden">
        Cliquez sur « Imprimer l'affiche » · Activez les couleurs d'arrière-plan · Format A4 Portrait
      </p>
    </div>
  )
}
