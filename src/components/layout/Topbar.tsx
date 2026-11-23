import { Sun, Moon, Layers, Map as MapIcon } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useMapStore } from '../../store/useMapStore';
import { basemaps, type BasemapId } from '../../config/basemaps';

export function Topbar() {
  const { theme, toggleTheme } = useThemeStore();
  const { basemapId, setBasemapId } = useMapStore();

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    toggleTheme();
    if (basemapId === 'dark' || basemapId === 'osm') {
      setBasemapId(nextTheme === 'dark' ? 'dark' : 'osm');
    }
  };

  return (
    <header className="h-14 px-4 flex items-center justify-between border-b bg-pixie-light-panel dark:bg-pixie-dark-panel border-pixie-light-border dark:border-pixie-dark-border text-purple-950 dark:text-purple-50 z-20 shrink-0 transition-colors">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight leading-none">PIXIE</h1>
          <p className="text-[11px] text-purple-600 dark:text-purple-300/80">
            TTH Web SIG • v1.0
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-white/80 dark:bg-pixie-dark-card px-2.5 py-1.5 rounded-lg border border-pixie-light-border dark:border-pixie-dark-border focus-within:border-blue-500 transition-colors">
          <MapIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <select
            value={basemapId}
            onChange={(e) => setBasemapId(e.target.value as BasemapId)}
            className="bg-transparent text-xs font-medium outline-none cursor-pointer text-purple-950 dark:text-purple-100"
          >
            {(Object.keys(basemaps) as BasemapId[]).map((id) => (
              <option
                key={id}
                value={id}
                className="bg-pixie-light-panel dark:bg-pixie-dark-panel text-purple-950 dark:text-purple-100"
              >
                {basemaps[id].name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleThemeToggle}
          title={`Switch to ${theme === 'dark' ? 'Light Purple' : 'Dark Purple'} Mode`}
          className="p-2 rounded-lg border border-pixie-light-border dark:border-pixie-dark-border bg-white/80 dark:bg-pixie-dark-card hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-blue-400" />
          ) : (
            <Moon className="w-4 h-4 text-purple-700" />
          )}
        </button>
      </div>
    </header>
  );
}