// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import "./InnerApp.css";
import Home from "../features/home/Home.js";
import Plan from "../features/plan/Plan";
import About from "../features/about/About.js";
import MyItineraries from "../features/my-itineraries/MyItineraries";
import ExceedQuotaModal from "../features/navbar/quota/ExceedQuotaModal.js";
import { RootURL } from "../config.json";
import Navbar from "../features/navbar/Navbar.js";

// React
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
    animationPart: {
        "& > *": {
            // background: "lightGreen",
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: "0",
            left: "0"
        }
    },
    navbar: {
        position: "fixed",
        zIndex: "10"
    }
}));

function AnimationPart() {
// function AnimationPart({ key, setKey }) {
    const classes = useStyles();
    const [ key, setKey ] = useState(0);
    const location = useLocation();

    const TempNavbar = () => {    
         const handleClick = () => {
            setKey(Math.random);
         };
    
        return (
            <div className={"navbar " + classes.navbar}>
                <Link onClick={handleClick} to={`/${RootURL.home}`}>Home</Link>
                &nbsp;&nbsp;
                <Link onClick={handleClick} to={`/${RootURL.plan}`}>Plan</Link>
                &nbsp;&nbsp;
                <Link onClick={handleClick} to={`/${RootURL.myItineraries}`}>My Itineraries</Link>
                &nbsp;&nbsp;
                <Link onClick={handleClick} to={`/${RootURL.about}`}>About</Link>
            </div>
        );
    }

    return (
        <>
            {/* <TempNavbar /> */}
            <Navbar />
            <ExceedQuotaModal />
            <TransitionGroup
                className={"animationPart-innerApp " + classes.animationPart}
            >
                <CSSTransition
                    timeout={250}
                    classNames="fade"
                    key={key}
                >
                    <Switch
                        location={location}
                    >
                        <Route
                            path={`/${RootURL.home}`}
                            render={() => <Home setAnimationKey={setKey} />}
                        />
                        <Route
                            path={`/${RootURL.plan}`}
                            render={() => <Plan setAnimationKey={setKey} />}
                        />
                        <Route
                            path={`/${RootURL.myItineraries}`}
                            render={() => <MyItineraries setAnimationKey={setKey} />}
                        />
                        <Route
                            path={`/${RootURL.about}`}
                            render={() => <About setAnimationKey={setKey} />}
                        />
                        <Route
                            path="/"
                            render={() => <Home setAnimationKey={setKey} />}
                        />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </>
    )
}

// const AnimationPart_memorized = React.memo(AnimationPart);

export default function InnerApp() {
    const classes = useStyles();

    // const [ key, setKey ] = useState(0);

    return (
        <Router>
            {/* <AnimationPart_memorized key={key} setKey={setKey} /> */}
            <AnimationPart />
        </Router>
    );
}