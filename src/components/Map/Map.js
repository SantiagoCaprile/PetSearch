import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./DynamicMap"), {
	ssr: false,
});

const Map = (props) => {
	return (
		<div className="w-full h-full">
			<DynamicMap {...props} />
		</div>
	);
};

export default Map;
