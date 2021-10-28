// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import "./plan.css";
import PlanStepper from "./PlanStepper.js";
import Criteria from "./criteria/Criteria";
import Confirm from "./confirm/Confirm.js";
import GetItinerary from "./get-itinerary/GetItinerary.js";
import { StepInfos, StepNames } from "./PlanStepper.js";
import { toStep } from "./stepSlice";
import { getStyles_routingPage } from "../../common/styles/styles.js";
import { URL as RootURL } from "../../app/InnerApp.js";
import useExceedQuotaNotification from "../navbar/quota/useExceedQuotaNotification.js";

// React
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useLocation
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { checkQuotaExceeded, getCurQuota } from "../navbar/quota/quotaHandler";
import { openModal } from "../navbar/quota/exceedQuotaSlice";

const useStyles = makeStyles((theme) => {
    const animationPartStyles = getStyles_routingPage();

    return ({
        plan: {
        },
        navbar: {
            position: "fixed",
            top: "20px",
            zIndex: "10"
        },
        animationPart: {
            ...animationPartStyles
        }
    });
});

export const URL = {
    criteria: "criteria",
    confirm: "confirm",
    getItinerary: "get-itinerary"
};

export default function Plan({ setAnimationKey: setParentAnimationKey }) {
    const classes = useStyles();
    const [key, setKey] = useState(0);
    const location = useLocation();
    const { path, url } = useRouteMatch();
    const dispatch = useDispatch();

    const NavBar = () => {
        const handleClick = (stepName) => {
            setKey(Math.random);
            const stepNum = StepInfos[stepName].num;
            dispatch(toStep(stepNum));
        };

        return (
            <div className={"navbar " + classes.navbar}>
                <Link onClick={() => handleClick(StepNames.setCriteria)} to={`${url}/${URL.criteria}`}>SetCriteria</Link>
                &nbsp;&nbsp;
                <Link onClick={() => handleClick(StepNames.confirm)} to={`${url}/${URL.confirm}`}>Confirm</Link>
                &nbsp;&nbsp;
                <Link onClick={() => handleClick(StepNames.getItinerary)} to={`${url}/${URL.getItinerary}`}>GetItinerary</Link>
            </div>
        )
    };

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
            <div id="plan" className={"plan " + classes.plan}>
                <Navbar />
                <NavBar />
                <PlanStepper />
                <TransitionGroup
                    className={"animationPart-plan " + classes.animationPart}
                >
                    <CSSTransition
                        timeout={300}
                        classNames="swipe"
                        key={key}
                    >
                        <Switch
                            location={location}
                        >
                            <Route
                                path={`${path}/${URL.criteria}`}
                                render={() => (<Criteria setAnimationKey={setKey} />)}
                            />
                            <Route
                                path={`${path}/${URL.confirm}`}
                                render={() => (<Confirm setAnimationKey={setKey} />)}
                            />
                            <Route
                                path={`${path}/${URL.getItinerary}/:itineraryName`}
                                render={() => (<GetItinerary setAnimationKey={setParentAnimationKey} />)}
                            />
                            <Route
                                path={`${path}/${URL.getItinerary}`}
                                render={() => (<GetItinerary setAnimationKey={setKey} />)}
                            />
                            <Route
                                path={`${path}`}
                                render={() => (<Criteria setAnimationKey={setKey} />)}
                            />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        );
    }

    return (
        <></>
    );

    // return (
    //     !quotaExceeded &&
    //     (<div id="plan" className={"plan " + classes.plan}>
    //         <Navbar />
    //         <NavBar />
    //         <PlanStepper />
    //         <TransitionGroup
    //             className={"animationPart-plan " + classes.animationPart}
    //         >
    //             <CSSTransition
    //                 timeout={300}
    //                 classNames="swipe"
    //                 key={key}
    //             >
    //                 <Switch
    //                     location={location}
    //                 >
    //                     <Route
    //                         path={`${path}/${URL.criteria}`}
    //                         render={() => (<Criteria setAnimationKey={setKey} />)}
    //                     />
    //                     <Route
    //                         path={`${path}/${URL.confirm}`}
    //                         render={() => (<Confirm setAnimationKey={setKey} />)}
    //                     />
    //                     <Route
    //                         path={`${path}/${URL.getItinerary}/:itineraryName`}
    //                         render={() => (<GetItinerary setAnimationKey={setParentAnimationKey} />)}
    //                     />
    //                     <Route
    //                         path={`${path}/${URL.getItinerary}`}
    //                         render={() => (<GetItinerary setAnimationKey={setKey} />)}
    //                     />
    //                     <Route
    //                         path={`${path}`}
    //                         render={() => (<Criteria setAnimationKey={setKey} />)}
    //                     // render={() => (<GenPOIs setAnimationKey={setKey} />)}
    //                     />
    //                 </Switch>
    //             </CSSTransition>
    //         </TransitionGroup>
    //     </div>)
    // );
}