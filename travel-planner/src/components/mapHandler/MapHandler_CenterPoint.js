// my components
import InfoWindow, { getContainerDiv } from "../criteria/centerPoint/InfoWindow.js";

// others
import ReactDOM from "react-dom";

export default function addMapListener(google, map, setModalOpen, centerPointCtrl) {
    map.addListener("click", (mapsMouseEvent) => {
        const latLngObj = mapsMouseEvent.latLng.toJSON();
        const geocoder = new google.maps.Geocoder();
        geocoder
            .geocode({ location: latLngObj })
            .then(({ results }) => {
                const { setCenterPointPosition } = centerPointCtrl.position;
                const position = {
                    address: results[0].formatted_address,
                    latLngObj
                };
                setCenterPointPosition(position);

                setModalOpen(true);
            });
    });
}

export function addInfoWindow(google, map, mapDivSelector, latLngObj, info) {
    const rootDiv = document.querySelector(mapDivSelector);

    ReactDOM.render(
        <InfoWindow info={info} />,
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

    const { lat, lng } = latLngObj;
    const popup = new Popup(
        new google.maps.LatLng(lat, lng),
        rootDiv
    );
    popup.setMap(map);
    map.setCenter({ lat, lng });
}