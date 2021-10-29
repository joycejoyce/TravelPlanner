// my components
import { changeIdx } from "../navbar/navSlice";
import { NavItem } from "../navbar/Navbar.js";
import { RootURL } from "../../config.json";

// React
import { useDispatch } from "react-redux";

export default function About() {
    const dispatch = useDispatch();

    const navIdx = NavItem[RootURL.about].idx;
    dispatch(changeIdx(navIdx));

    return (
        <div className="about">
        </div>
    );
}