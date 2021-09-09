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
import Navbar from "./components/sub/Navbar.js";

function AnimationPart() {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition
                timeout={250}
                classNames="fade"
                key={location.key}
            >
                <Switch location={location}>
                    <Route path="/home" component={Home} />
                    <Route path="/criteria" component={Criteria} />
                    <Route path="/" component={Home} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

const Container = styled.div`
    width: 80vw;
    height: 80vh;
    background: red;
    margin: 0 auto;
    * {
        width: 50vw;
        background: yellow;
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