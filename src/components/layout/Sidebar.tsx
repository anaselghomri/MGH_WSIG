import { Eye, EyeOff, Layers } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';

export function Sidebar() {
  const { layers, toggleLayer } = useMapStore();

  return (
    <aside className="w-72 border-r bg-pixie-light-panel dark:bg-pixie-dark-panel border-pixie-light-border dark:border-pixie-dark-border flex flex-col z-10 shrink-0 transition-colors">
      <div className="p-4 border-b border-pixie-light-border dark:border-pixie-dark-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-purple-900 dark:text-purple-200">
            TTH Work Layers
          </h2>
        </div>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/20">
          {layers.filter((l) => l.visible).length}/{layers.length}
        </span>
      </div>

      <div className="p-3 space-y-2 overflow-y-auto flex-1">
        {layers.map((layer) => (
          <div
            key={layer.id}
            onClick={() => toggleLayer(layer.id)}
            className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
              layer.visible
                ? 'bg-white dark:bg-pixie-dark-card border-blue-400/60 dark:border-blue-500/50 shadow-sm'
                : 'bg-white/50 dark:bg-pixie-dark-card/40 border-pixie-light-border dark:border-pixie-dark-border hover:border-purple-400 dark:hover:border-purple-500'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-3 h-3 rounded-full shrink-0 ring-2 ring-purple-200 dark:ring-purple-900"
                style={{ backgroundColor: layer.color }}
              />
              <div>
                <p className="text-xs font-medium text-purple-950 dark:text-purple-50">
                  {layer.name}
                </p>
                <p className="text-[10px] text-purple-600/80 dark:text-purple-300/70">
                  {layer.category}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="transition-colors"
              aria-label={`Toggle ${layer.name}`}
            >
              {layer.visible ? (
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              ) : (
                <EyeOff className="w-4 h-4 text-purple-400 dark:text-purple-500" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-pixie-light-border dark:border-pixie-dark-border text-[11px] text-purple-700 dark:text-purple-300/80 flex justify-between">
        <span>CRS: WGS 84 (EPSG:4326)</span>
        <span className="font-medium text-blue-600 dark:text-blue-400">Region: TTH</span>
      </div>
    </aside>
  );
}