import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MarsMap = () => {
    const wmtsBaseUrl = "https://api.nasa.gov/mars-wmts/catalog";
    const productName = "Mars_Viking_MDIM21_ClrMosaic_global_232m";
    const style = "default";
    const tileMatrixSet = "default028mm";

    const tileUrlTemplate = `${wmtsBaseUrl}/${productName}/1.0.0/${style}/${tileMatrixSet}/{z}/{y}/{x}.jpg`;

    const bounds: [[number, number], [number, number]] = [
        [-90, -180],
        [90, 180],
    ];

    return (
        <MapContainer
            center={[0, 0]}
            zoom={2}
            maxZoom={10}
            className="w-full h-[500px]">
            <TileLayer
                url={tileUrlTemplate}
                bounds={bounds}
                crossOrigin={true}
                tileSize={256}
            />
        </MapContainer>
    );
};

export default MarsMap;
