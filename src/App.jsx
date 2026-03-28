import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MenuPage from './pages/MenuPage'
import AfichePage from './pages/AfichePage'

export default function App() {
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(150deg,#f0f6ff 0%,#f8fafc 50%,#fff 100%)' }}>
      <Header search={search} onSearch={setSearch} />
      <Routes>
        <Route path="/" element={<MenuPage search={search} />} />
        <Route path="/affiche" element={<AfichePage />} />
      </Routes>
    </div>
  )
}
