import axios from "axios";

export default function getMarsMarkers() {
    return axios.get("https://mars.nasa.gov/maps/location/api/configure/get?mission=M20")
}