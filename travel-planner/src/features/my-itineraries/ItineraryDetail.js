// React
import { useParams } from "react-router";

export default function ItineraryDetail() {
    const { itineraryName } = useParams();
    return (
        <div>
            <div className={["contents"].join(" ")}>
                ItineraryDetail:
                {itineraryName}
            </div>
        </div>
    );
}