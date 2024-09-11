import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const baseURL = "https://maps.googleapis.com/map/api/geocode/json";
const geocodingURL = "https://maps.googleapis.com/map/api/geocode/json";

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
      `${baseURL}?address=${encodeURI(enteredAddress)}&key=${geocodingURL}`
    )
    .then((res) => {
      if (res.data.status !== "OK") {
        throw new Error("Could not fetch location");
      }
      const coordinates = res.data.results[0].geometry.location;
    })
    .catch((err) => {
      alert(err.message);
      console.error(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
