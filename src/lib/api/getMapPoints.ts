import axios from "axios";
import {API_CONFIG} from "@/config/api.ts";

export default function getMapPoints() {
    return axios.get(API_CONFIG.url + "/map")
}