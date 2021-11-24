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