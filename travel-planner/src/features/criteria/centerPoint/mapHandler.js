// my components
import InfoWindow from "./InfoWindow.js";
import { store } from "../../../app/store.js";
import { getMap } from "../../../common/map/map.js";

// React
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// [ map controls ]
let google = null;
let map = null;
let mapClickListener = null;

// [ Redux controls ]
let dispatch = null;
let openModal = null;
let changePosition = null;

// [ info window ]
let infoWindow = null;
let infoWindowId = "";

export async function initMap(mapProps, reduxCtrl, infoWindowProps) {
    await setMapProps(mapProps);
    addMapClickListener(reduxCtrl);
    await setInfoWindowProps(infoWindowProps, mapProps.center);
}

export async function setMapProps(props) {
    const mapCtrl = await getMap(props);
    google = mapCtrl.google;
    map = mapCtrl.map;
}

export function addMapClickListener(reduxCtrl) {
    if (mapClickListener) {
        removeMapClickListener();
    }

    mapClickListener = map.addListener("click", (mapsMouseEvent) => {
        const latLng = mapsMouseEvent.latLng.toJSON();
        const geocoder = new google.maps.Geocoder();

        if (reduxCtrl && reduxCtrl.dispatch) {
            // initialize Redux controls
            dispatch = reduxCtrl.dispatch;
            openModal = reduxCtrl.openModal;
            changePosition = reduxCtrl.changePosition;
        }

        geocoder
            .geocode({ location: latLng })
            .then(({ results }) => {
                const address = results[0].formatted_address;
                dispatch(changePosition({ address, latLng }));
                dispatch(openModal());
            });
    });
}

function removeMapClickListener() {
    // google.maps.event.clearListeners(map, "click");
    mapClickListener.remove();
}

function getInfoWindowDiv() {
    return document.getElementById(infoWindowId);
}

function getInfoWindowContentDiv() {
    return document.getElementById([ infoWindowId, "content" ].join("_"));
}

async function renderInfoWindow() {
    if (!getInfoWindowContentDiv()) {
        await ReactDOM.render(
            <Provider store={store}>
                <InfoWindow idPrefix={infoWindowId} />
            </Provider>,
            getInfoWindowDiv()
        );
    }
}

async function setInfoWindowProps(props, latLng) {
    infoWindowId = props.id;
    
    class Popup extends google.maps.OverlayView {
        position;
        containerDiv;
        constructor(position) {
            super();
            this.position = position;
            this.containerDiv = getInfoWindowDiv();
            Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
        }

        onAdd() {
            console.log("onAdd");
            this.getPanes().floatPane.appendChild(this.containerDiv);
        }
        
        onRemove() {
            console.log("onRemove");
            if (this.containerDiv.parentElement) {
                this.containerDiv.parentElement.removeChild(this.containerDiv);
            }
        }
        
        draw() {
            const divPosition = this.getProjection().fromLatLngToDivPixel(
                this.position
            );

            // Hide the popup when it is far out of view.
            const display =
                Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
                    ? "block"
                    : "none";

            if (display === "block") {
                this.containerDiv.style.left = divPosition.x + "px";
                this.containerDiv.style.top = divPosition.y + "px";
            }

            if (this.containerDiv.style.display !== display) {
                this.containerDiv.style.display = display;
            }
        }
    }

    await renderInfoWindow();

    const { lat, lng } = latLng;
    infoWindow = new Popup(
        new google.maps.LatLng(lat, lng)
    );

    infoWindow.setMap(map);
}

export async function showInfoWindow() {
    infoWindow.setMap(map);
}

export function hideInfoWindow() {
    infoWindow.setMap(null);
}

export function changeInfoWindowPosition({ lat, lng }) {
    const newPosition = new google.maps.LatLng(lat, lng);
    infoWindow.position = newPosition;

    const newCenter = new google.maps.LatLng(lat, lng);
    map.setCenter(newCenter);
}

export function setMapToReadOnly() {
    map.setOptions({
        zoomControl: false,
        gestureHandling: "none"
    });

    removeMapClickListener();
}

export function setMapToModifiable() {
    map.setOptions({
        zoomControl: true,
        gestureHandling: "auto"
    });

    addMapClickListener(null);
}

export function addClickDomListener(div, callback, params) {
    google.maps.event.addDomListener(
        div,
        "click",
        () => callback(params)
    );
}