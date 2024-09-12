import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const baseURL = "https://maps.googleapis.com/map/api/geocode/json";
const API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXO";

declare var google: any;

type GeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(e: Event) {
  e.preventDefault();
  const enteredAddress = addressInput.value;

  //   send this to Google API
  axios
    .get<GeocodingResponse>(
      `${baseURL}?address=${encodeURI(enteredAddress)}&key=${API_KEY}`
    )
    .then((res) => {
      if (res.data.status !== "OK") {
        throw new Error("Could not fetch location");
      }
      const coordinates = res.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates,
        zoom: 13,
      });

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.error(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
