// my components
import { NavItem } from "../../features/navbar/Navbar.js";
import { changeIdx } from "../../features/navbar/navSlice.js";

// React
import { useDispatch } from "react-redux";

export default function useChangeNavIdx(pageName) {
    const dispatch = useDispatch();
    const navIdx = NavItem[pageName].idx;
    dispatch(changeIdx(navIdx));
}