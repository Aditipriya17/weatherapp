import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import pin from "../assets/images/pin.png";
import humidity from "../assets/images/water-drop.png";
import wind from "../assets/images/wind.png";
import cloud from "../assets/images/cloud.png";

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

    map.current.on("click", async function (e) {
      if (marker != null) {
        marker.remove();
      }

      const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=976ddd37cda349fc971170736233105&q=${e.lngLat.lat},${e.lngLat.lng}`
      );

      let data = await res.json();
      console.log(data);

      const date = new Date(data.current.last_updated);
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      const formattedDate = date.toLocaleString('en-US', options);

      console.log(formattedDate);

      const div = document.createElement("div");
      div.innerHTML = 
      <div style="width: 300px;background-color: #99dddd99;border-radius: 20px; text-align: center; padding-bottom: 20px;">
      <div style="display: flex; margin: auto; width: fit-content;">
          <img src="${pin}" style="width: 30px; margin: auto 10px;" />
          <p style="font-size: 30px;">${data.location.name}</p>
      </div>

      <img src="${data.current.condition.icon}" style="width: 150px; margin: auto;" />
      <p style="font-size: 30px; font-weight: 600;">${data.current.feelslike_c}°</p>
      <p style="font-size: 24px; font-weight: 700;">${data.current.condition.text}</p>
      <p>${formattedDate}</p>
      <hr style="width: 80%; border-color: black;border-width: 1px;" />
      <div style="display: flex; margin: auto; width: fit-content;">
          <div style="display: grid; margin: auto 20px;">
              <img src=${humidity} style="width: 40px;" />
              <span>${data.current.humidity}%</span>
              <span>Humdity</span>
          </div>

          <div style="display: grid; margin: auto 20px;">
              <img src=${wind} style="width: 40px;" />
              <span>${data.current.wind_kph}km/h</span>
              <span>Wind</span>
          </div>

          <div style="display: grid; margin: auto 20px;">
              <img src=${cloud} style="width:40px;" />
              <span>${data.current.cloud}%</span>
              <span>Cloud</span>
          </div>
      </div>


  </div>
      `;

      marker = new maplibregl.Marker(div)
        .setLngLat(e.lngLat)
        .addTo(map.current);
    });
  });

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      <button class="Button" role="button"></button>
      <div></div>
    </div>
  );
}
