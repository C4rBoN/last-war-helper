import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import { AppProvider } from './store/AppContext';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Heroes } from './pages/Heroes/Heroes';
import { Buildings } from './pages/Buildings/Buildings';
// import { Research } from './pages/Research/Research';
import { ResearchWIP } from './pages/Research/ResearchWIP';
import { Season6 } from './pages/Season6/Season6';
import { Tips } from './pages/Tips/Tips';
import { PrivacyPolicy } from './pages/Legal/PrivacyPolicy';
import { DataDeletion } from './pages/Legal/DataDeletion';
import './styles/tokens.css';

export default function App() {
  return (
    <AuthProvider>
    <AppProvider>
      <HashRouter>
        <Routes>
          {/* Pages légales — sans navigation */}
          <Route path="/privacy"       element={<PrivacyPolicy />} />
          <Route path="/data-deletion" element={<DataDeletion />} />

          {/* App principale */}
          <Route path="*" element={
            <AppShell>
              <Routes>
                <Route path="/"          element={<Dashboard />} />
                <Route path="/heroes"    element={<Heroes />} />
                <Route path="/buildings" element={<Buildings />} />
                <Route path="/research"  element={<ResearchWIP />} />
                <Route path="/season6"   element={<Season6 />} />
                <Route path="/tips"      element={<Tips />} />
              </Routes>
            </AppShell>
          } />
        </Routes>
      </HashRouter>
    </AppProvider>
    </AuthProvider>
  );
}
