import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(77.710136);
  const [lat] = useState(13.199379);
  const [zoom] = useState(8.5);
  const [API_KEY] = useState("5asgdR9s42haiAgcsrzO");

  let marker = null;

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "bottom-right");

    map.current.on("click", function (e) {
      if (marker != null) {
        marker.remove();
      }

      const div = document.createElement("div");
      div.innerHTML = "Hello, world!";

      marker = new maplibregl.Marker(div)
        .setLngLat(e.lngLat)
        .addTo(map.current);
    });
  });

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
