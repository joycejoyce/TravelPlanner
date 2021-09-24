// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import "./InnerApp.css";
import Home from "../features/home/Home.js";
import Plan from "../features/plan/Plan";
import About from "../features/about/About.js";
import Navbar from "../features/navbar/Navbar.js";

// React
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const useStyles = makeStyles((theme) => ({
    animationPart: {
        "& > *": {
            // background: "lightGreen",
            width: "100vw",
            height: "100vh",
            overflow: "auto",
            position: "absolute",
            top: "0",
            left: "0"
        }
    }
}));

function AnimationPart() {
    const classes = useStyles();
    const location = useLocation();

    return (
        <TransitionGroup
            className={classes.animationPart + " animationPart"}
        >
            <CSSTransition
                timeout={250}
                classNames="fade"
                key={location.key}
            >
                <Switch
                    location={location}
                    className={classes.page}
                >
                    <Route path="/home" component={Home} />
                    <Route path="/plan" component={Plan} />
                    <Route path="/about" component={About} />
                    <Route path="/" component={Home} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default function InnerApp() {
    const classes = useStyles();

    return (
        <Router className="innerApp">
            <Navbar />
            <AnimationPart />
        </Router>
    );
}