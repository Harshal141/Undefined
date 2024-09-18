import { Route, Routes } from "react-router-dom";
import TravelApp from './pages/Landing'
import { Builder } from './pages/Builder';

function App() {

  return (
    <Routes>
      <Route path="/" element={<TravelApp />} />
      <Route path="/build" element={<Builder />} />
    </Routes>
  );
}

export default App
