import {useQuery} from "@tanstack/react-query";
import getMarsMarkers from "@/lib/nasa/getMarsMarkers.ts";
import {useEffect} from "react";
import {mapAtom} from "@/atoms/mapAtom";
import {useAtom} from "jotai";
import getMapPoints from "@/lib/api/getMapPoints.ts";

export interface IMarker {
    position: [number, number];

    [key: string]: string | number | [number, number];
}

export default function useMarsMarkers() {
    const [mapConfig, setMapConfig] = useAtom(mapAtom)

    const {data, status} = useQuery({
        queryKey: ["marsMarkers"],
        queryFn: getMarsMarkers
    })

    const {data: mapPoints, status: mapPointsStatus} = useQuery({
        queryKey: ["customMarkers"],
        queryFn: getMapPoints
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
                    setMapConfig(prev => {
                        return {...prev, markers: [...prev.markers, ...newMarkers]}
                    })
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
                setMapConfig(prev => {
                    return {...prev, markers: [...prev.markers, ...newMarkers]}
                })
            });
        }
    }, [status, data]);

    useEffect(() => {
        if (mapPointsStatus === "success") {
            const points: IMarker[] = mapPoints.data.points.map((point: {
                id: number
                label: string
                latitude: number
                longitude: number
            }) => {
                return {
                    position: [point.latitude, point.longitude],
                    "Notatka": point.label,
                }
            })

            setMapConfig(prev => {
                return {...prev, markers: [...prev.markers, ...points]}
            })
        }
    }, [mapPoints, mapPointsStatus]);

    return {markers: mapConfig.markers}
}