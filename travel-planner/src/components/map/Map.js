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

    return map;
}

// input:
// props = {
//     action: MapOperations.GetMap,
//     center: places.myHome,
//     mapName: MapNames.CenterPointMap,
//     zoom: 1
// }
export default async function doMapOperations(props) {
    console.log({ props });
    const loader = getLoader();
    const google = await loader.load();
    switch (props.action) {
        case MapOperations.GetMap:
            const map = getMap(google, props);
            return {google, map};
        default:
            return null;
    }
    // loader.load().then(google => {
    //     console.log("loaded");
    //     const map = getMap(google, props);
    //     switch (props.action) {
    //         case MapOperations.GetMap:
    //             console.log("going to return");
    //             return [google, map];
    //         default:
    //             return null;
    //     }
    // });
}