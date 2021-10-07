// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import "./plan.css";
import PlanStepper from "./PlanStepper.js";
import Criteria from "./criteria/Criteria";
import ModifyPOIs from "./modify-pois/ModifyPOIs.js";
import SaveItinerary from "./save-itinerary/SaveItinerary.js";
import Logo from "../../common/components/Logo.js";

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
        "& > *": { // Criteria / ModifyPOIs / ... 
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
    modifyPOIs: "modify-pois",
    saveItinerary: "save-itinerary"
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
                <Link onClick={handleClick} to={`${url}/${URL.criteria}`}>Criteria</Link>
                &nbsp;&nbsp;
                <Link onClick={handleClick} to={`${url}/${URL.modifyPOIs}`}>ModifyPOIs</Link>
                &nbsp;&nbsp;
                <Link onClick={handleClick} to={`${url}/${URL.saveItinerary}`}>SaveItinerary</Link>
            </div>
        )
    };

    return (
        <div className={"plan " + classes.plan}>
            <Logo
                className="logo"
                width="55px"
                margin="3vh auto"
                isDarkMode={false}
            />
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
                            path={`${path}/${URL.modifyPOIs}`}
                            render={() => (<ModifyPOIs setAnimationKey={setKey} />)}
                        />
                        <Route
                            path={`${path}/${URL.saveItinerary}`}
                            render={() => (<SaveItinerary setAnimationKey={setKey} />)}
                        />
                        <Route
                            path={`${path}`}
                            render={() => (<Criteria setAnimationKey={setKey} />)}
                            // render={() => (<ModifyPOIs setAnimationKey={setKey} />)}
                        />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}