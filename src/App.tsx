import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Heroes } from './pages/Heroes/Heroes';
import { Buildings } from './pages/Buildings/Buildings';
import { Research } from './pages/Research/Research';
import './styles/tokens.css';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppShell>
          <Routes>
            <Route path="/"          element={<Dashboard />} />
            <Route path="/heroes"    element={<Heroes />} />
            <Route path="/buildings" element={<Buildings />} />
            <Route path="/research"  element={<Research />} />
          </Routes>
        </AppShell>
      </HashRouter>
    </AppProvider>
  );
}
