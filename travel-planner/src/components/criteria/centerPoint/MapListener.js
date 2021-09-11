export default function addMapListener(google, map, modalCtrl) {
    map.addListener("click", (mapsMouseEvent) => {
        // console.log("lat lng obj", mapsMouseEvent.latLng.toJSON());

        // const latLngObj = mapsMouseEvent.latLng.toJSON();
        // const [lat, lng] = latLngObj;
        modalCtrl.setModalOpen(true);
        // infoWindow = new google.maps.InfoWindow({
        //     position: mapsMouseEvent.latLng
        // });

        // infoWindow.setContent(
        //     JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        // );

        // infoWindow.open(map);
    });
}