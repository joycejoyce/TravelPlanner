// MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography
} from '@material-ui/core';

// my components
import { changePOITypes, selectPOITypes } from "./criteriaSlice";

// React
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        poiTypes: {
            display: "flex",
            gap: theme.spacing(2)
        },
        category: {
            fontSize: "20px",
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            letterSpacing: ".5px"
        },
        label: {
            letterSpacing: "0.5px"
        }
    });
});

export const POITypeName = {
    park: "park",
    amusement_park: "amusement_park",
    zoo: "zoo",
    natural_feature: "natural_feature",
    shopping_mall: "shopping_mall",
    museum: "museum",
    art_gallery: "art_gallery",
    aquarium: "aquarium"
};

export const POITypeInfo = {
    [POITypeName.park]: {
        isOutdoor: true,
        label: "Park"
    },
    [POITypeName.amusement_park]: {
        isOutdoor: true,
        label: "Amusement Park"
    },
    [POITypeName.zoo]: {
        isOutdoor: true,
        label: "Zoo"
    },
    [POITypeName.natural_feature]: {
        isOutdoor: true,
        label: "Natural Feature"
    },
    [POITypeName.shopping_mall]: {
        isOutdoor: false,
        label: "Shopping Mall"
    },
    [POITypeName.museum]: {
        isOutdoor: false,
        label: "Museum"
    },
    [POITypeName.art_gallery]: {
        isOutdoor: false,
        label: "Art Gallery"
    },
    [POITypeName.aquarium]: {
        isOutdoor: false,
        label: "Aquarium"
    }
};

function CategoryItems({ isOutdoor }) {
    // styles
    const classes = useStyles();

    // Redux
    const dispatch = useDispatch();
    const selectedPOITypes = useSelector(selectPOITypes);
    
    // Other data
    const title = isOutdoor ? "Outdoor" : "Indoor";
    const selectedNum = Object.values(selectedPOITypes).filter(value => value).length;

    const handleChange = (e) => {
        const { name, checked } = e.target;
        dispatch(changePOITypes({ name, checked }));
    };

    return (
        <div>
            <Typography
                variant="h3"
                className={classes.category}
            >
                {title}
            </Typography>
            <FormControl
                component="fieldset"
            >
                <FormGroup>
                    {
                        Object.keys(POITypeInfo)
                            .filter(key => (isOutdoor ? POITypeInfo[key].isOutdoor : !POITypeInfo[key].isOutdoor))
                            .map(type => {
                                return (
                                    <FormControlLabel
                                        control={<Checkbox
                                            checked={selectedPOITypes[type]}
                                            onChange={handleChange}
                                            name={type}
                                            disabled={selectedNum === 3 && !selectedPOITypes[type]}
                                        />}
                                        label={
                                            <div className={classes.label}>
                                                {POITypeInfo[type].label}
                                            </div>
                                        }
                                    />
                                );
                            })
                    }
                </FormGroup>
            </FormControl>
        </div>
    );
}

export default function POITypes() {
    const classes = useStyles();

    return (
        <div className={"poiTypes " + classes.poiTypes}>
            <CategoryItems isOutdoor={true} />
            <CategoryItems isOutdoor={false} />
        </div>
    );
}