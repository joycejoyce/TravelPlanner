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
import Home from "./components/page/Home.js";
import Criteria from "./components/page/Criteria.js";
import Tech from "./components/page/Tech.js";
import Navbar from "./components/sub/Navbar.js";

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
                    <Route path="/tech" component={Tech} />
                    <Route path="/" component={Home} />
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