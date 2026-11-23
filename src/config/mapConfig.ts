import type { LatLngExpression, LatLngBoundsExpression } from 'leaflet';

export const TTH_MAP_CONFIG = {
  center: [35.38, -5.25] as LatLngExpression,
  defaultZoom: 9,
  minZoom: 7,
  maxZoom: 18,
  // Loose bounding box around Tanger-Tétouan-Al Hoceïma
  maxBounds: [
    [34.3, -6.6],
    [36.2, -3.5],
  ] as LatLngBoundsExpression,
};