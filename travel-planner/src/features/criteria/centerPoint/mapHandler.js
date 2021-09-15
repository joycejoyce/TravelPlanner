// my components
import InfoWindow, { getContainerDiv } from "./InfoWindow.js";
import { store } from "../../../app/store.js";
import { getMap } from "../../../common/map/map.js";

// React
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

let google = null;
let map = null;
let infoWindowId = "";
let mapClickListener = null;
let dispatch = null;
let openModal = null;
let changePosition = null;

export async function setupMap(mapProps) {
    const mapCtrl = await getMap(mapProps);
    google = mapCtrl.google;
    map = mapCtrl.map;
    infoWindowId = mapProps.infoWindowId;
}

export function addMapListener(inputDispatch, inputOpenModal, inputChangePosition) {
    mapClickListener = map.addListener("click", (mapsMouseEvent) => {
        const latLng = mapsMouseEvent.latLng.toJSON();
        const geocoder = new google.maps.Geocoder();

        if (inputDispatch) {
            dispatch = inputDispatch;
            openModal = inputOpenModal;
            changePosition = inputChangePosition;
        }

        geocoder
            .geocode({ location: latLng })
            .then(({ results }) => {
                const address = results[0].formatted_address;
                dispatch(changePosition({address, latLng}));
                dispatch(openModal());
            });
    });
}

export function setMapToReadOnly() {
    map.setOptions({
        zoomControl: false,
        gestureHandling: "none"
    });
    clearListeners();
}

export function clearListeners() {
    // google.maps.event.clearListeners(map, "click");
    mapClickListener.remove();
}

export function setMapToModifiable() {
    map.setOptions({
        zoomControl: true,
        gestureHandling: "auto"
    });
    addMapListener();
}

export function addInfoWindow(latLng) {
    const infoWindowDivSelector = "#" + infoWindowId;
    const rootDiv = document.querySelector(infoWindowDivSelector);

    ReactDOM.render(
        <Provider store={store}>
            <InfoWindow />
        </Provider>,
        rootDiv
    );

    class Popup extends google.maps.OverlayView {
        position;
        containerDiv = getContainerDiv();
        infoWindowDivSelectorl
        constructor(position, content, infoWindowDivSelector) {
            super();
            this.position = position;
            Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
            this.infoWindowDivSelector = infoWindowDivSelector;
        }
    
        onAdd() {
            this.onRemove();
            this.getPanes().floatPane.appendChild(this.containerDiv);
        }
    
        onRemove() {
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

    const { lat, lng } = latLng;
    const newLatLng = new google.maps.LatLng(lat, lng);
    const popup = new Popup(
        newLatLng,
        rootDiv
    );
    popup.setMap(map);
    map.setCenter(newLatLng);
}

export function addClickListener(div, callback, params) {
    google.maps.event.addDomListener(
        div,
        "click",
        () => callback(params)
    );
}