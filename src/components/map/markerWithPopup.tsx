import {Marker, Popup} from "react-leaflet";
import {IMarker} from "@/hooks/useMarsMarkers.ts";

interface IMarkerWithPopup {
    marker: IMarker
    title?: string
}

export default function MarkerWithPopup({marker, title}: IMarkerWithPopup) {

    return (
        <Marker position={marker.position}>
            <Popup>
                <h3>{title}</h3>
                <ul>
                    {Object.entries(marker).map(([key, value]) => {
                        if (key === "position") return null;
                        return (
                            <li key={key}>
                                <strong>{key}</strong>: {value}
                            </li>
                        );
                    })}
                </ul>
            </Popup>
        </Marker>
    )
}