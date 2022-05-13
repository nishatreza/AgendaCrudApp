import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddAgenda from './components/agendas/AddAgenda';
import EditAgenda from './components/agendas/EditAgenda';
import ViewAgenda from './components/agendas/ViewAgenda';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route exact="true" path="/" element={<Home />} />
          <Route exact="true" path="/agendas/add" element={<AddAgenda />} />
          <Route exact="true" path="/agendas/edit/:id" element={<EditAgenda />} />
          <Route exact="true" path="/agendas/view/:id" element={<ViewAgenda />} />


        </Routes>

      </div>
    </Router>

  );
}

export default App;
