// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import "./InnerApp.css";
import Home from "../features/home/Home.js";
import Criteria from "../features/criteria/Criteria.js";
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
        // outline: "2px solid red",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        "& > *": {
            // background: "lightGreen"
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
                    <Route path="/criteria" component={Criteria} />
                    <Route path="/about" component={About} />
                    <Route path="/" component={Criteria} />
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