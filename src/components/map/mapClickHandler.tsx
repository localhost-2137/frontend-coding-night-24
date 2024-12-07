import {useMapEvents} from "react-leaflet";
import {useAtom} from "jotai";
import {mapAtom,} from "@/atoms/mapAtom.ts";

export default function MapClickHandler() {

    const [mapConfig, setMapConfig] = useAtom(mapAtom)

    useMapEvents(
        {
            click: (e) => {
                if (mapConfig.action === "add") {
                    setMapConfig(prev => {
                        return {
                            ...prev,
                            cords: e.latlng,
                            dialogOpen: true
                        }
                    })
                }
            }
        }
    )

    return (
        <div></div>
    )
}