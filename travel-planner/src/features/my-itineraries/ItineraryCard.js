// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    contents: {
        // background: "green"
    }
}));

function MyRating({ rating }) {
    return (
        
    )
}

export function ItineraryCard({ itinerary }) {
    const centerPointAddr = getCenterPointAddr();
    const title = getTitle();
    const date = getDate();
    const rating = getRating();

    return (
        <Card className={classes.root}>
            <CardContent>
                <h3>{title}</h3>
                <div className={classes.date}>{date}</div>
                <MyRating rating={rating} />
                <CenterPointDesc />
            </CardContent>
        </Card>
    )
}