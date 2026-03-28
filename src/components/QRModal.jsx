import { useEffect } from 'react'
import QRCode from './QRCode'

export default function QRModal({ onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="animate-modal-in bg-white rounded-3xl p-8 shadow-2xl text-center max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo */}
        <div
          className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg"
          style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)' }}
        >
          <span className="text-white text-3xl font-bold font-display">O</span>
        </div>

        <h3 className="font-display text-2xl font-bold text-hotel-900 mb-1">
          Menu Digital
        </h3>
        <p className="text-xs text-gray-400 mb-6 tracking-widest uppercase">
          Oubangui Hôtel · Restaurant
        </p>

        {/* QR */}
        <div className="flex justify-center mb-5 p-5 bg-slate-50 rounded-2xl border border-slate-100">
          <QRCode size={180} />
        </div>

        <p className="text-sm font-semibold text-hotel-600 mb-1">
          oubanguihotel.com/menu
        </p>
        <p className="text-xs text-gray-400 mb-7 leading-relaxed">
          Pointez l'appareil photo de votre smartphone<br />vers le code pour accéder au menu
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl text-white text-sm font-semibold transition-all
                     hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-hotel-400"
          style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)' }}
        >
          Fermer
        </button>
      </div>
    </div>
  )
}
