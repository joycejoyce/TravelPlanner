// MUI
import { makeStyles } from "@material-ui/core/styles";
import { CenterFocusStrong as CenterIcon } from '@material-ui/icons';

// my components
import { lightColors, darkColors } from "../../../colors.json";
import Map, { MapOperations, MapNames } from "../../map/Map.js";
import { places } from "../../map/Place.js";
import ConfirmModal from "./ConfirmModal.js";
import addMapListener from "./MapListener.js";

// others
import { useState, useEffect } from "react";

let isDarkMode = false;

const useStyles = makeStyles((theme) => {
    isDarkMode = theme.palette.type === "dark";
    const palette = isDarkMode ? darkColors : lightColors;

    return ({
        centerPoint: {
            transform: "translateX(-10px)",
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        },
        explanation: {
            borderRadius: "3px",
            width: "365px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            color: palette.primary,
            background: palette.primaryBK
        },
        map: {
            height: "300px"
        }
        // formControl: {
        //     minWidth: 120
        // }
    });
});

// function Country() {
//     const classes = useStyles();
//     const [country, setCountry] = useState("");
//     const countries = ["Taiwan", "United States", "China", "Germany", "France", "Italy"]

//     const handleChange = (e) => {
//         setCountry(e.target.value);
//     }

//     return (
//         <FormControl className={classes.formControl}>
//             <InputLabel id="country-label">Country</InputLabel>
//             <Select
//                 labelId="country-label-id"
//                 id="country"
//                 value={country}
//                 onChange={handleChange}
//             >
//                 <MenuItem value={10}>Ten</MenuItem>
//                 <MenuItem value={20}>Twenty</MenuItem>
//                 <MenuItem value={30}>Thirty</MenuItem>
//             </Select>
//         </FormControl>
//     );
// }

function Explanation() {
    const classes = useStyles();

    return (
        <div className={"explanation " + classes.explanation}>
            <CenterIcon />
            <div className="expText">Choose a center point by tapping on the map</div>
        </div>
    )
}

export default function CenterPoint() {
    const classes = useStyles();

    const [modalOpen, setModalOpen] = useState(false);
    
    const mapProps = {
        action: MapOperations.GetMap,
        center: places.myHome,
        mapName: MapNames.CenterPointMap,
        zoom: 1
    };

    useEffect(async () => {
        // const modalCtrl = {modalOpen, setModalOpen};
        // const [google, map] = await Map(mapProps);
        // addMapListener(google, map, modalCtrl);
    });

    return (
        <div className={"centerPoint " + classes.centerPoint}>
            {/* <Country /> */}
            <Explanation />
            <div className={mapProps.mapName + " " + classes.map}></div>
            {/* <Map {...mapProps} /> */}
            <ConfirmModal
                open={modalOpen}
                setModalOpen={setModalOpen}
            />
        </div>
    );
}