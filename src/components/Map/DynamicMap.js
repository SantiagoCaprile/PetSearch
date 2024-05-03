import { useEffect } from "react";
import Leaflet, { popup } from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";
const imagenMarkerURL = "/leaflet/images/marker-icon.png";

const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, width, height, ...rest }) => {
	let mapClassName = "w-full h-full";
	console.log(rest)

	if (className) {
		mapClassName = `${mapClassName} ${className}`;
	}

	useEffect(() => {
		(async function init() {
			delete Leaflet.Icon.Default.prototype._getIconUrl;

			Leaflet.Icon.Default.mergeOptions({
				iconRetinaUrl: "/leaflet/images/marker-icon.png",
				iconUrl: "/leaflet/images/marker-icon.png",
				shadowUrl: "/leaflet/images/marker-shadow.png",
				iconAnchor: [20, 40],
				shadowSize: [40, 40],
			});
		})();
	}, []);

	return (
		<MapContainer className={mapClassName} {...rest}>
			{children(ReactLeaflet, Leaflet)}
		</MapContainer>
	);
};

export default Map;
