import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useMarsMarkers from "@/hooks/useMarsMarkers.ts";
import {useEffect, useState} from 'react';

interface IMarker {
    position: [number, number];
    popup: string;
}

const MarsMap = () => {
    const wmtsBaseUrl = "https://api.nasa.gov/mars-wmts/catalog";
    const productName = "Mars_Viking_MDIM21_ClrMosaic_global_232m";
    const style = "default";
    const tileMatrixSet = "default028mm";
    const [markers, setMarkers] = useState<IMarker[]>([]);

    const tileUrlTemplate = `${wmtsBaseUrl}/${productName}/1.0.0/${style}/${tileMatrixSet}/{z}/{y}/{x}.jpg`;

    const bounds: [[number, number], [number, number]] = [
        [-90, -180],
        [90, 180],
    ];

    const {status, data} = useMarsMarkers();

    useEffect(() => {
        if (status === "success" && data) {
            const roverPosition = data.data.layers[0];

            fetch(roverPosition.url)
                .then(response => response.json())
                .then(data => {
                    const features = data.features;
                    const newMarkers = features.map((feature: any) => ({
                        position: [feature.geometry.coordinates[1], feature.geometry.coordinates[0]] as [number, number],
                        popup: `Sol: ${feature.properties.sol}, Note: ${feature.properties.Note}`,
                        rmc: feature.properties.RMC,
                        site: feature.properties.site,
                        drive: feature.properties.drive,
                        sol: feature.properties.sol,
                        elevation: feature.properties.elev_geoid,
                        distance: feature.properties.dist_m,
                        imageUrl: feature.properties.images?.[0]?.url
                    }));
                    setMarkers(newMarkers);
                });
        }
    }, [status, data]);

    return (
        <MapContainer
            center={[0, 0]}
            zoom={2}
            maxZoom={10}
            maxBounds={bounds}
            maxBoundsViscosity={1.0}
            className="w-full h-full">
            <TileLayer
                url={tileUrlTemplate}
                bounds={bounds}
                crossOrigin={true}
                tileSize={256}
                noWrap={true}
            />
            {markers.map((marker, index) => (
                <Marker key={index} position={marker.position}>
                    <Popup><div>
                        <p>Sol: {marker.sol}</p>
                        <p>Note: {marker.popup}</p>
                        <p>RMC: {marker.rmc}</p>
                        <p>Site: {marker.site}</p>
                        <p>Drive: {marker.drive}</p>
                        <p>Elevation: {marker.elevation} m</p>
                        <p>Distance: {marker.distance} m</p>
                        {marker.imageUrl && <img src={marker.imageUrl} alt="Panorama" width="100" />}
                    </div></Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MarsMap;