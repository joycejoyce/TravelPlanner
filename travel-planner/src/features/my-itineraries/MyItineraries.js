// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import ItineraryDetailWrapper from "./ItineraryDetailWrapper.js";
import AllItineraryCards from "./AllItineraryCards.js";
import { getStyles_routingPage } from "../../common/styles/styles.js";
import Navbar from "../navbar/Navbar.js";
import { checkQuotaExceeded } from "../navbar/quota/quotaHandler.js";
import { URL as RootURL } from "../../app/InnerApp.js";
import { openModal } from "../navbar/quota/exceedQuotaSlice.js";

// React
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => {
    const animationPartStyles = getStyles_routingPage();

    return ({
        animationPart: {
            ...animationPartStyles,
            top: "110px",
            [theme.breakpoints.up('md')]: {
                top: "150px"
            }
        }
    });
});

export default function MyItineraries({ setAnimationKey: setParentAnimationKey }) {
    // styles
    const classes = useStyles();

    // routing data
    const { path } = useRouteMatch();

    const dispatch = useDispatch();
    const history = useHistory();
    const quotaExceeded = checkQuotaExceeded();
    useEffect(() => {
        if (quotaExceeded) {
            history.push(`/${RootURL.about}`);
            setParentAnimationKey();
            dispatch(openModal());
        }
    }, [quotaExceeded]);

    if (!quotaExceeded) {
        return (
            <div>
                <Navbar />
                <div className={classes.animationPart}>
                    <Switch>
                        <Route
                            path={`${path}/:itineraryName`}
                            render={() => (<ItineraryDetailWrapper setParentAnimationKey={setParentAnimationKey} />)}
                        />
                        <Route
                            path={`${path}`}
                            render={() => (<AllItineraryCards />)}
                        />
                    </Switch>
                </div>
            </div>
        );
    }

    return (
        <></>
    );

    // return (
    //     !quotaExceeded &&
    //     (<div>
    //         <Navbar />
    //         <div className={classes.animationPart}>
    //             <Switch>
    //                 <Route
    //                     path={`${path}/:itineraryName`}
    //                     render={() => (<ItineraryDetailWrapper />)}
    //                 />
    //                 <Route
    //                     path={`${path}`}
    //                     render={() => (<AllItineraryCards />)}
    //                 />
    //             </Switch>
    //         </div>
    //     </div>)
    // );
}