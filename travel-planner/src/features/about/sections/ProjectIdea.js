// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import { selectLanguage } from "../languageSlice.js";

// React
import { useSelector } from "react-redux";
import { SectionItem } from "./Sections";

const useStyles = makeStyles((theme) => {
    return ({
        
    });
});

const contents = {
    english: "Use my own way of planning a trip to implement this app, which is simply picking the restaurant for each meal and 3 points-of-interest. This app is for people who have a hard time deciding where to go during a trip to easily get a high quality itinerary.",
    chinese: "依照自己出遊規劃行程的方法開發此App — 抓住早、中、晚餐和三個遊玩景點，就可以規劃一天的行程。此App讓人能夠輕鬆得到一份隨機產生的高品質旅程規劃。"
};

export default function AppIdea() {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);

    return (
        <div id={SectionItem.appIdea.ref} className={classes.appIdea}>
            {contents[language]}
        </div>
    );
}