import axios from "axios";
import {API_CONFIG} from "@/config/api.ts";

interface IMapPointBody {
    latitude: number,
    longitude: number,
    label: string
}

export default function addMapPoint(data: IMapPointBody) {
    return axios.put(API_CONFIG.url + "/map", data);
}