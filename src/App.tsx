import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Heroes } from './pages/Heroes/Heroes';
import { Buildings } from './pages/Buildings/Buildings';
import { Research } from './pages/Research/Research';
import { Season6 } from './pages/Season6/Season6';
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
            <Route path="/season6"   element={<Season6 />} />
          </Routes>
        </AppShell>
      </HashRouter>
    </AppProvider>
  );
}
