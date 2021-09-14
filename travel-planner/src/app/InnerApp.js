// css
import "./InnerApp.css";

// other components
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation
} from "react-router-dom";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// my components
import Home from "../features/home/Home.js";
import Criteria from "../features/criteria/Criteria.js";
import About from "../features/about/About.js";
import Navbar from "../features/navbar/Navbar.js";

function AnimationPart() {
    const location = useLocation();

    return (
        <TransitionGroup style={{height: "100%"}}>
            <CSSTransition
                timeout={250}
                classNames="fade"
                key={location.key}
            >
                <Switch location={location}>
                    <Route path="/home" component={Home} />
                    <Route path="/criteria" component={Criteria} />
                    <Route path="/about" component={About} />
                    <Route path="/" component={Criteria} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

const Container = styled.div`
    width: 80vw;
    height: 80vh;
    // outline: 2px solid red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    * {
        // background: lightGreen;        
    };
`;

export default function InnerApp() {
    return (
        <Router>
            <Navbar />
            <Container className="innerApp">
                <AnimationPart />
            </Container>
        </Router>
    );
}