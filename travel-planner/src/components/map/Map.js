// my components
import { myApiKey } from "../../config.json";

// others
import { Loader } from "@googlemaps/js-api-loader";

function getLoader() {
    return new Loader({
        apiKey: myApiKey,
        version: "weekly",
        libraries: ["places"]
    });
}

export const MapOperations = {
    GetMap: "GetMap"
};

export const MapNames = {
    CenterPointMap: "centerPointMap"
}

function getMap(google, { center, zoom, mapName }) {
    console.log({ center, zoom, mapName });
    const selectName = "." + mapName;

    const map = new google.maps.Map(document.querySelector(selectName), {
        center,
        zoom
    });

    switch (mapName) {
        case MapNames.CenterPointMap:
            doForCenterPointMap(google, map);
            break;
        default:
            break;
    }
}

function doForCenterPointMap(google, map) {
    // let infoWindow = new google.maps.InfoWindow({
    //     content: "Click the map to get Lat/Lng!",
    //     position: myLatlng,
    // });
    // infoWindow.open(map);
    // // Configure the click listener.
    let infoWindow = null;
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        // infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
    });

}

export default function Map(props) {
    console.log({ props });
    const loader = getLoader();
    loader.load().then(google => {
        switch (props.action) {
            case MapOperations.GetMap:
                return getMap(google, props);
            default:
                return null;
        }
    });
}