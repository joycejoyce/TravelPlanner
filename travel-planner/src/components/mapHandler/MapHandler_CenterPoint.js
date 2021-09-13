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

export function addMarkerAndInfoWindow(google, map, mapDivSelector, latLngObj, info) {
    class Popup extends google.maps.OverlayView {
        position;
        containerDiv;
        constructor(position, content) {
            super();
            this.position = position;
            content.classList.add("popup-bubble");
            content.innerHTML = info;

            // This zero-height div is positioned at the bottom of the bubble.
            const bubbleAnchor = document.createElement("div");

            bubbleAnchor.classList.add("popup-bubble-anchor");
            bubbleAnchor.appendChild(content);
            // This zero-height div is positioned at the bottom of the tip.
            this.containerDiv = document.createElement("div");
            this.containerDiv.classList.add("popup-container");
            this.containerDiv.appendChild(bubbleAnchor);
            // Optionally stop clicks, etc., from bubbling up to the map.
            Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
        }
        onAdd() {
            this.getPanes().floatPane.appendChild(this.containerDiv);
        }
        /** Called when the popup is removed from the map. */
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
        document.querySelector(mapDivSelector)
    );
    popup.setMap(map);
    map.setCenter({ lat, lng });
}