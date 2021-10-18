import { POIName } from "../../features/plan/criteria/POIs";

export default function MapIcon({name}) {
    return (
        <img
            src={MapIconUrl[name]}
        />
    );
}

export const MapIconUrl = Object.keys(POIName).reduce((accu, poiName) => {
    accu[poiName] = getIconUrl(poiName);
    return accu;
}, { center: getIconUrl("center") });

export function getIconUrl(name) {
    return `/img/map-icons/${name}.svg`;
}