import { Topbar } from './components/layout/Topbar';
import { Sidebar } from './components/layout/Sidebar';
import { MapContainerWrapper } from './features/map-canvas/components/MapContainerWrapper';

export function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-pixie-light-bg dark:bg-pixie-dark-bg text-purple-950 dark:text-purple-50">
      <Topbar />
      <main className="flex-1 flex overflow-hidden">
        <Sidebar />
        <MapContainerWrapper />
      </main>
    </div>
  );
}

export default App;