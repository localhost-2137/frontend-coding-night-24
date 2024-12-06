import {useQuery} from "@tanstack/react-query";
import getMarsMarkers from "@/lib/nasa/getMarsMarkers.ts";
import {useEffect, useState} from "react";

export interface IMarker {
    position: [number, number];

    [key: string]: string | number | [number, number];
}

export default function useMarsMarkers() {
    const [markers, setMarkers] = useState<IMarker[]>([]);
    const {data, status} = useQuery({
        queryKey: ["marsMarkers"],
        queryFn: getMarsMarkers
    })

    useEffect(() => {
        if (status === "success" && data) {
            const roverPosition = data.data.layers[0];
            const helicopterPosition = data.data.layers[7];

            fetch(roverPosition.url)
                .then(response => response.json())
                .then(data => {
                    const features = data.features;
                    const newMarkers = features.map((feature: {
                        geometry: { coordinates: [number, number] },
                        properties: { site: number, drive: number, sol: number, dist_m: number }
                    }) => ({
                        position: [feature.geometry.coordinates[1], feature.geometry.coordinates[0]] as [number, number],
                        "Notatka": "Końcowa pozycja łazika",
                        "Nr. Miejsca Badawczego": feature.properties.site,
                        "Liczba przejazdów": feature.properties.drive,
                        "Sol": feature.properties.sol,
                        "Przejechany dystans": feature.properties.dist_m + "m",
                    }));
                    setMarkers(newMarkers);
                });

            fetch(helicopterPosition.url).then(response => response.json()).then(data => {
                const features = data.features;
                const newMarkers = features.map((feature: {
                    geometry: { coordinates: [number, number] },
                    properties: { Sol: number, Flight: number, Dist_m: number, Duration_s: number, Earth_Date: string }
                }) => ({
                    position: [feature.geometry.coordinates[1], feature.geometry.coordinates[0]] as [number, number],
                    "Notatka": "Pozycja helikoptera",
                    "Sol": feature.properties.Sol,
                    "Nr. Lotu": feature.properties.Flight,
                    "Odległość przebyta podczas tego lotu": feature.properties.Dist_m + "m",
                    "Czas trwania lotu w sekundach": feature.properties.Duration_s + "s",
                    "Data lotu": feature.properties.Earth_Date,
                }))
                setMarkers(prev => [...prev, ...newMarkers]);
            });
        }
    }, [status, data]);

    return {markers}
}