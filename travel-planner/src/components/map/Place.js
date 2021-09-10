export const places = {
    "myHome": { lat: 24.78483239597807, lng: 121.00783229775378 },
    "greenHouse": { lat: 24.78787640175999, lng: 121.00956905130698 }, 
};

export default function getPlace(google, placeName) {
    const isIncluded = Object.keys(places).includes(placeName);
    if (!isIncluded) {
        console.error(`Input placeName = [${placeName}] isn't included in places obj`);
        return null;
    }

    return new google.maps.LatLng(places[placeName].lat, places[placeName].lng);
}