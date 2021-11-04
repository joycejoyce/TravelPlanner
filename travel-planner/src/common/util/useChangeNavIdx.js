// my components
import { NavItem } from "../../features/navbar/Navbar.js";
import { changeIdx, selectIdx } from "../../features/navbar/navSlice.js";

// React
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function useChangeNavIdx(pageName) {
    // data
    const curNavIdx = useSelector(selectIdx);
    const pageNavIdx = NavItem[pageName].idx;

    // tool
    const dispatch = useDispatch();

    // actions
    if (curNavIdx !== pageNavIdx) {
        dispatch(changeIdx(pageNavIdx));
    }
}