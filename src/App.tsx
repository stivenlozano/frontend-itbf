import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Hotels from './pages/Hotels';
import HotelForm from './pages/HotelForm';
import Rooms from './pages/Rooms';
import RoomForm from './pages/RoomForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/new" element={<HotelForm />} />
        <Route path="/hotels/:id/update" element={<HotelForm />} />

        <Route path="/hotels/:id/rooms" element={<Rooms />} />
        <Route path="/hotels/:id/rooms/new" element={<RoomForm />} />
        <Route path="/hotels/:id/rooms/:idRoom/update" element={<RoomForm />} />

        <Route path="*" element={<Navigate to="/hotels" replace />} />
      </Routes>
    </Router>
  )
}

export default App;