import { create } from 'zustand';
import { basemaps, type BasemapId } from '../config/basemaps';

export interface WorkLayer {
  id: string;
  name: string;
  category: string;
  visible: boolean;
  color: string;
}

interface MapState {
  basemapId: BasemapId;
  setBasemapId: (id: BasemapId) => void;
  layers: WorkLayer[];
  toggleLayer: (id: string) => void;
}

const DEFAULT_LAYERS: WorkLayer[] = [
  { id: 'tth-cities', name: 'Urban Centers & Ports', category: 'Admin', visible: true, color: '#3b82f6' },
  { id: 'tth-highways', name: 'Highways & LGV Corridor', category: 'Transport', visible: true, color: '#a855f7' },
  { id: 'tth-dams', name: 'Strategic Dams', category: 'Hydrology', visible: false, color: '#06b6d4' },
];

const getInitialBasemap = (): BasemapId => {
  const saved = localStorage.getItem('pixie-basemap') as BasemapId | null;
  if (saved && saved in basemaps) return saved;
  const savedTheme = localStorage.getItem('pixie-theme');
  return savedTheme === 'dark' ? 'dark' : 'osm';
};

const getInitialLayers = (): WorkLayer[] => {
  try {
    const saved = localStorage.getItem('pixie-layers');
    if (saved) {
      const parsed = JSON.parse(saved) as WorkLayer[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Fallback to defaults if storage is corrupted
  }
  return DEFAULT_LAYERS;
};

export const useMapStore = create<MapState>((set) => ({
  basemapId: getInitialBasemap(),
  setBasemapId: (basemapId) => {
    localStorage.setItem('pixie-basemap', basemapId);
    set({ basemapId });
  },
  layers: getInitialLayers(),
  toggleLayer: (id) =>
    set((state) => {
      const updated = state.layers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      );
      localStorage.setItem('pixie-layers', JSON.stringify(updated));
      return { layers: updated };
    }),
}));