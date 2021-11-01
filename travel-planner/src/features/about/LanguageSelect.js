// MUI
import { makeStyles } from "@material-ui/styles";
import { FormControl, Select, MenuItem } from "@material-ui/core";

// my components
import { selectLanguage, changeLanguage } from "./languageSlice.js";

// React
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        formControl: {
            position: "absolute",
            top: "0",
            right: "0"
        }
    });
});

export const Language = {
    english: {
        label: "English",
        value: "english"
    },
    chinese: {
        label: "繁體中文",
        value: "chinese"
    }
};

export default function LanguageSelect() {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);

    // ctrl
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { value } = e.target;
        dispatch(changeLanguage(value));
    };

    return (
        <FormControl
            variant="outlined"
            className={classes.formControl}
        >
            <Select
                value={language}
                onChange={handleChange}
            >
                {
                    Object.values(Language).map((lagObj) => {
                        const { label, value } = lagObj;
                        return (
                            <MenuItem value={value}>{label}</MenuItem>
                        );
                    })
                }
            </Select>
        </FormControl>
    );
}