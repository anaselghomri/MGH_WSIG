import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from 'react-leaflet';
import { basemaps } from '../../../config/basemaps';
import { useMapStore } from '../../../store/useMapStore';

const TTH_CITIES = [
  { name: 'Tanger', coords: [35.7595, -5.834] as [number, number], info: 'Regional Capital & Tanger Med Hub' },
  { name: 'Tétouan', coords: [35.5889, -5.3626] as [number, number], info: 'Cultural & Administrative Center' },
  { name: 'Al Hoceïma', coords: [35.2517, -3.9372] as [number, number], info: 'Mediterranean Coastal Province' },
  { name: 'Chefchaouen', coords: [35.1688, -5.2636] as [number, number], info: 'Rif Mountain Province' },
  { name: 'Larache', coords: [35.1932, -6.1557] as [number, number], info: 'Atlantic Coastal Province' },
];

const HIGHWAY_AXIS: [number, number][] = [
  [35.7595, -5.834],
  [35.5889, -5.3626],
  [35.1688, -5.2636],
  [35.2517, -3.9372],
];

export function MapContainerWrapper() {
  const { basemapId, layers } = useMapStore();
  const base = basemaps[basemapId];

  const isVisible = (id: string) => layers.find((l) => l.id === id)?.visible ?? false;

  return (
    <div className="relative flex-1 h-full w-full bg-pixie-light-bg dark:bg-pixie-dark-bg">
      <MapContainer
        center={[35.38, -5.25]}
        zoom={9}
        className="h-full w-full z-0"
      >
        <TileLayer
          key={`${basemapId}-base`}
          url={base.url}
          attribution={base.attribution}
        />

        {base.labelsUrl && (
          <TileLayer
            key={`${basemapId}-labels`}
            url={base.labelsUrl}
            pane="overlayPane"
          />
        )}

        {isVisible('tth-cities') &&
          TTH_CITIES.map((city) => (
            <CircleMarker
              key={city.name}
              center={city.coords}
              radius={7}
              pathOptions={{ color: '#2563eb', fillColor: '#60a5fa', fillOpacity: 0.85, weight: 2 }}
            >
              <Popup>
                <div className="text-xs">
                  <strong className="block text-sm">{city.name}</strong>
                  <span>{city.info}</span>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        {isVisible('tth-highways') && (
          <Polyline
            positions={HIGHWAY_AXIS}
            pathOptions={{ color: '#a855f7', weight: 3, dashArray: '6 6' }}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default MapContainerWrapper;