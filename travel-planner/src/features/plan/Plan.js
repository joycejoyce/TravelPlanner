// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import "./plan.css";
import PlanStepper from "./PlanStepper.js";
import Criteria from "./criteria/Criteria";
import Confirm from "./confirm/Confirm.js";
import GetItinerary from "./get-itinerary/GetItinerary.js";

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
import Navbar from "../navbar/Navbar";

const useStyles = makeStyles((theme) => ({
    plan: {
    },
    navbar: {
        position: "fixed",
        top: "20px",
        zIndex: "10"
    },
    animationPart: {
        position: "absolute",
        width: "100vw",
        top: "22vh",
        "& > *": { // Criteria / GenPOIs / ... 
            // animationPart cannot set translateX or it'll effect animation
            // therefore, to center the content, wrap up the contents in ".contents" and center it
            position: "relative",
            width: "100vw",
            "& > .contents": {
                position: "absolute",
                width: "fit-content",
                left: "50%",
                transform: "translateX(-50%)"
            }
        }
    }
}));

export const URL = {
    criteria: "criteria",
    confirm: "confirm",
    getItinerary: "get-itinerary"
};

export default function Plan() {
    const classes = useStyles();
    const [key, setKey] = useState(0);
    const location = useLocation();
    const { path, url } = useRouteMatch();

    const NavBar = () => {
        const handleClick = () => {
            setKey(Math.random);
        };

        return (
            <div className={"navbar " + classes.navbar}>
                <Link onClick={handleClick} to={`${url}/${URL.criteria}`}>SetCriteria</Link>
                &nbsp;&nbsp;
                <Link onClick={handleClick} to={`${url}/${URL.confirm}`}>Confirm</Link>
                &nbsp;&nbsp;
                <Link onClick={handleClick} to={`${url}/${URL.getItinerary}`}>GetItinerary</Link>
            </div>
        )
    };

    return (
        <div className={"plan " + classes.plan}>
            <Navbar />
            {/* <h1>Plan</h1> */}
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
                            path={`${path}/${URL.getItinerary}`}
                            render={() => (<GetItinerary setAnimationKey={setKey} />)}
                        />
                        <Route
                            path={`${path}`}
                            render={() => (<Criteria setAnimationKey={setKey} />)}
                            // render={() => (<GenPOIs setAnimationKey={setKey} />)}
                        />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}