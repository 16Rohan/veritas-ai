import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-deep-black text-white font-body">
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
