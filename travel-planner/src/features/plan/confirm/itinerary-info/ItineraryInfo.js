// MUI
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { Favorite as HeartIcon } from "@material-ui/icons";

// my components
import { getImgPath } from "../../../../common/util/PathGetter.js";
import { selectAll } from "../../criteria/criteriaSlice.js";
import { mock_criteria } from "../mockData.js";
import MyRating from "../../../../common/components/MyRating.js";
import { ItineraryFieldName, selectErrMsg, changeErrMsg } from "../validate-itinerary/validateItinerarySlice.js";
import ErrMsg from "../../../../common/components/ErrMsg.js";
import { ItineraryInfoFieldName, changeItineraryInfo } from "./itineraryInfoSlice.js";
import { lightRed } from "../../../../common/styles/colors.json";
import { getDateStr } from "../../../../common/util/DateUtil.js";

// React
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => {
    return ({
        root: {
            position: "relative",
            width: "390px",
            height: "350px",
            background: lightRed,
            borderRadius: "3px",
            margin: "8px 0 32px 0"
        },
        itineraryInfo: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& #itinerary-name": {
                width: "280px",
                paddingLeft: theme.spacing(0.5)
            }
        },
        contents: {
            marginTop: theme.spacing(4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: theme.spacing(4)
        },
        section: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: theme.spacing(2)
        },
        title: {
            fontSize: "20px"
        },
        rating: {
            gap: "10px"
        },
        likeImg: {
            width: "253px"
        }
    });
});

export default function ItineraryInfo() {
    // styles
    const classes = useStyles();

    // React
    // const criteria = useSelector(selectAll);
    const criteria = mock_criteria;

    const getDefaultValue = () => {
        const { centerPoint, date } = criteria;
        const { desc } = centerPoint;
        const dateStr = getDateStr(date);

        const defaultValue = [desc].join(" - ");
        return defaultValue;
    };    

    const src = getImgPath("like-this-itinarary.svg");
    const defaultValue = getDefaultValue();
    const errMsg = useSelector(selectErrMsg);

    // ctrl
    const dispatch = useDispatch();
    const resetErrMsg = (fieldName) => {
        const input = {
            name: fieldName,
            errMsg: ""
        };
        dispatch(changeErrMsg(input));
    }
    const handleChangeName = (e) => {
        const { value } = e.target;
        const input = {
            fieldName: ItineraryInfoFieldName.name,
            value
        };
        resetErrMsg(ItineraryFieldName.name);
        dispatch(changeItineraryInfo(input));
    };
    const handleChangeRating = (e, value) => {
        const input = {
            fieldName: ItineraryInfoFieldName.rating,
            value
        };
        dispatch(changeItineraryInfo(input));
    };

    useEffect(() => {
        const input = {
            fieldName: ItineraryInfoFieldName.name,
            value: defaultValue
        };
        dispatch(changeItineraryInfo(input));
    }, []);

    return (
        <div className={classes.root}>
            <div className={["itineraryInfo", classes.itineraryInfo].join(" ")}>
                <img className={classes.likeImg} src={src} />
                <div className={classes.contents}>
                    <div className={classes.section}>
                        <div className={classes.title}>Give it a name:</div>
                        <TextField
                            id="itinerary-name"
                            // label="name"
                            defaultValue={defaultValue}
                            onChange={handleChangeName}
                        />
                        <ErrMsg errMsg={errMsg[ItineraryFieldName.name]} />
                    </div>
                    <div className={classes.section}>
                        <div className={classes.title}>How much do you like it?</div>
                        <MyRating
                            className={classes.rating}
                            defaultValue={0}
                            icon={<HeartIcon fontSize="24px" />}
                            onChange={handleChangeRating}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}