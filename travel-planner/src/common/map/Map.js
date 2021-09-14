// my components
import { myApiKey } from "../../config.json";

// others
import { Loader } from "@googlemaps/js-api-loader";

async function getGoogle() {
    const loader = new Loader({
        apiKey: myApiKey,
        version: "weekly",
        libraries: ["places"]
    });
    const google = await loader.load();
    return google;
}

export async function getMap({ center, zoom, id }) {
    const google = await getGoogle();
    const mapDivSelector = "#" + id;
    const map = new google.maps.Map(document.querySelector(mapDivSelector), {
        center,
        zoom
    });
    return { google, map };
}

// input:
// props = {
//     action: MapOperations.GetMap,
//     center: places.myHome,
//     mapName: MapNames.CenterPointMap,
//     zoom: 1
// }
// export default async function doMapOperations(props) {
//     console.log({ props });
//     const loader = getLoader();
//     const google = await loader.load();
//     switch (props.action) {
//         case MapOperations.GetMap:
//             const map = getMap(google, props);
//             return {google, map};
//         default:
//             return null;
//     }
//     // loader.load().then(google => {
//     //     console.log("loaded");
//     //     const map = getMap(google, props);
//     //     switch (props.action) {
//     //         case MapOperations.GetMap:
//     //             console.log("going to return");
//     //             return [google, map];
//     //         default:
//     //             return null;
//     //     }
//     // });
// }