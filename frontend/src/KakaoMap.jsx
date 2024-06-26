import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";

const KakaoMap = () => {
  const [geojson, setGeojson] = useState(null);

  useEffect(() => {
    const fetchGeojson = async () => {
      try {
        const response = await axios.get("/api/boundarySet"); // Spring Boot API 호출
        console.log("GeoJSON data:", response.data); // 데이터 확인용 로그
        setGeojson(response.data);
      } catch (error) {
        console.error("Error fetching geojson:", error);
      }
    };

    fetchGeojson();
  }, []);

  useEffect(() => {
    if (!geojson) return;

    // Check if Kakao Maps API is already loaded
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      // Load the Kakao Maps API script dynamically
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d5b3cb3d230c4f406001bbfad60ef4d4&libraries=services,clusterer,drawing`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        initializeMap();
      };
    }
  }, [geojson]);

  const initializeMap = () => {
    const kakao = window.kakao;
    const data = geojson.features; // 이미 파싱된 객체 사용
    const polygons = [];

    const mapContainer = document.getElementById("pollution-map");
    const mapOption = {
      center: new kakao.maps.LatLng(36.2, 128.02025),
      level: 13,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const customOverlay = new kakao.maps.CustomOverlay({});
    const infowindow = new kakao.maps.InfoWindow({ removable: true });

    const displayArea = (coordinates, name) => {
      const path = [];

      coordinates.forEach((polygonCoordinates) => {
        const polygonPath = [];
        polygonCoordinates.forEach((coordinate) => {
          polygonPath.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
        });

        const polygon = new kakao.maps.Polygon({
          map: map,
          path: polygonPath,
          strokeWeight: 2,
          strokeColor: "#004c80",
          strokeOpacity: 0.8,
          strokeStyle: "solid",
          fillColor: "#fff",
          fillOpacity: 0.7,
        });

        polygons.push(polygon);

        kakao.maps.event.addListener(
          polygon,
          "mouseover",
          function (mouseEvent) {
            polygon.setOptions({ fillColor: "#09f" });
            customOverlay.setContent('<div class="area">' + name + "</div>");
            customOverlay.setPosition(mouseEvent.latLng);
            customOverlay.setMap(map);
          },
        );

        kakao.maps.event.addListener(
          polygon,
          "mousemove",
          function (mouseEvent) {
            customOverlay.setPosition(mouseEvent.latLng);
          },
        );

        kakao.maps.event.addListener(polygon, "mouseout", function () {
          polygon.setOptions({ fillColor: "#fff" });
          customOverlay.setMap(null);
        });

        kakao.maps.event.addListener(polygon, "click", function (mouseEvent) {
          const content =
            '<div style="padding:2px;"><p><b>' + name + "</b></p></div>";
          infowindow.setContent(content);
          infowindow.setPosition(mouseEvent.latLng);
          infowindow.setMap(map);
        });
      });
    };

    data.forEach((val) => {
      const coordinates = val.geometry.coordinates;
      const name = val.properties.CTP_KOR_NM; // 속성 이름 수정

      console.log("Coordinates for:", name, coordinates);

      displayArea(coordinates, name);
    });
  };

  return (
    <Box
      id="pollution-map"
      style={{
        width: "100%",
        height: "500px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    ></Box>
  );
};

export default KakaoMap;
