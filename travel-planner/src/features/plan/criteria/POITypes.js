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

export const POITypeInfo = {
    park: {
        isOutdoor: true,
        label: "Park"
    },
    amusement_park: {
        isOutdoor: true,
        label: "Amusement Park"
    },
    zoo: {
        isOutdoor: true,
        label: "Zoo"
    },
    natural_feature: {
        isOutdoor: true,
        label: "Natural Feature"
    },
    shopping_mall: {
        isOutdoor: false,
        label: "Shopping Mall"
    },
    museum: {
        isOutdoor: false,
        label: "Museum"
    },
    art_gallery: {
        isOutdoor: false,
        label: "Art Gallery"
    },
    aquarium: {
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