import { Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/HomePage'

// 라우트 목록 — 페이지 추가 시 여기에 <Route> 추가
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

