// my components
import InfoWindow, { getContainerDiv } from "./InfoWindow.js";
import { changePosition, selectPosition } from "./centerPointSlice.js";
import { store } from "../../../app/store.js";

// React
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

export default function addMapListener(google, map, setModalOpen, centerPointCtrl) {
    map.addListener("click", (mapsMouseEvent) => {
        const latLng = mapsMouseEvent.latLng.toJSON();

        const geocoder = new google.maps.Geocoder();
        geocoder
            .geocode({ location: latLng })
            .then(({ results }) => {
                const address = results[0].formatted_address;
                const { dispatch, changePosition } = centerPointCtrl;
                dispatch(changePosition({address, latLng}));
                
                setModalOpen(true);
            });
    });
}

export function addInfoWindow(google, map, mapDivSelector, latLng) {
    const rootDiv = document.querySelector(mapDivSelector);

    ReactDOM.render(
        <Provider store={store}>
            <InfoWindow />
        </Provider>,
        rootDiv
    );

    class Popup extends google.maps.OverlayView {
        position;
        containerDiv = getContainerDiv();
        constructor(position, content) {
            super();
            this.position = position;
            Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
        }

        onAdd() {
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
    const popup = new Popup(
        new google.maps.LatLng(lat, lng),
        rootDiv
    );
    popup.setMap(map);
    map.setCenter({ lat, lng });
}