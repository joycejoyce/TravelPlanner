export const places = {
    "taiwan": { lat: 24.786764832406874, lng: 120.99961765669231 }
};

export default function getPlace(google, placeName) {
    const isIncluded = Object.keys(places).includes(placeName);
    if (!isIncluded) {
        console.error(`Input placeName = [${placeName}] isn't included in places obj`);
        return null;
    }

    return new google.maps.LatLng(places[placeName].lat, places[placeName].lng);
}