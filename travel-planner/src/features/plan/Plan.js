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
import { RootURL } from "../../config.json";
import useChangeNavIdx from "../../common/util/useChangeNavIdx.js";
import useQuotaExceeded from "../../common/util/useQuotaExceeded.js";

// React
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useLocation
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => {
    const animationPartStyles = getStyles_routingPage();

    return ({
        plan: {
        },
        tempNavbar: {
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
    // styles
    const classes = useStyles();

    // data
    const [key, setKey] = useState(0);
    const location = useLocation();
    const { path, url } = useRouteMatch();

    // tool
    const dispatch = useDispatch();

    // components
    const TempNavbar = () => {
        const handleClick = (stepName) => {
            setKey(Math.random);
            const stepNum = StepInfos[stepName].num;
            dispatch(toStep(stepNum));
        };

        return (
            <div className={"tempNavbar " + classes.tempNavbar}>
                <Link onClick={() => handleClick(StepNames.setCriteria)} to={`${url}/${URL.criteria}`}>SetCriteria</Link>
                &nbsp;&nbsp;
                <Link onClick={() => handleClick(StepNames.confirm)} to={`${url}/${URL.confirm}`}>Confirm</Link>
                &nbsp;&nbsp;
                <Link onClick={() => handleClick(StepNames.getItinerary)} to={`${url}/${URL.getItinerary}`}>GetItinerary</Link>
            </div>
        )
    };

    // init
    useChangeNavIdx(RootURL.plan);
    const quotaExceeded = useQuotaExceeded(true);

    if (!quotaExceeded) {
        return (
            <div id="plan" className={"plan " + classes.plan}>
                {/* <TempNavbar /> */}
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
}