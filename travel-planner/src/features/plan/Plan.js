// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import PlanStepper from "./PlanStepper.js";
import Criteria from "./criteria/Criteria";
import ModifyPOIs from "./modify-pois/ModifyPOIs.js";
import SaveItinerary from "./save-itinerary/SaveItinerary.js";

// React
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    plan: {
    },
    navbar: {
        position: "fixed",
        top: "3vh",
        zIndex: "10"
    },
    page: {
        marginTop: "100px"
    }
}));

function NavBar() {
    const classes = useStyles();
    const { url } = useRouteMatch();

    return (
        <div className={"navbar " + classes.navbar}>
            <Link to={`${url}/criteria`}>Criteria</Link>
            &nbsp;&nbsp;
            <Link to={`${url}/modifyPOIs`}>ModifyPois</Link>
            &nbsp;&nbsp;
            <Link to={`${url}/saveItinerary`}>SaveItinerary</Link>
        </div>
    )
}

const PageNames = {
    criteria: "criteria",
    modifyPOIs: "modifyPOIs",
    saveItinerary: "saveItinerary"
};

export default function Plan({ }) {
    const classes = useStyles();
    const { path } = useRouteMatch();

    return (
        <div className={"plan " + classes.plan}>
            <NavBar />
            <PlanStepper />
            <Switch>
                <Route exact path={path}>
                    <h3 className={classes.page}>Please select a page</h3>
                </Route>
                <Route path={`${path}/${PageNames.criteria}`}>
                    <Criteria cssClassName={classes.page} />
                </Route>
                <Route path={`${path}/${PageNames.modifyPOIs}`}>
                    <ModifyPOIs cssClassName={classes.page} />
                </Route>
                <Route path={`${path}/${PageNames.saveItinerary}`}>
                    <SaveItinerary cssClassName={classes.page} />
                </Route>
            </Switch>
        </div>
    );
}