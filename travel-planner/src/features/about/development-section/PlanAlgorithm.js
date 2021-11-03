// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import SubTitle from "../components/SubTitle";
import { selectLanguage } from "../languageSlice";

// React
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        algoImg: {
            width: "80vw",
            minWidth: "600px",
            maxWidth: "900px"
        }
    });
});

export default function PlanAlgorithm() {
    // styles
    const classes = useStyles();

    // data
    const Contents = {
        english: {
            title: "Trip Planning Algorithm"
        },
        chinese: {
            title: "旅程規劃演算法"
        }
    }
    const language = useSelector(selectLanguage);
    const contents = Contents[language];
    const { title } = contents;

    return (
        <div className={classes.planAlgorithm}>
            <SubTitle text={title} />
            <img
                className={classes.algoImg}
                src="/img/algorithm.svg"
            />
        </div>
    );
}