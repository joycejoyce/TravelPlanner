// MUI
import { makeStyles } from "@material-ui/styles";
import { Link, Typography } from '@material-ui/core';

// my components
import { SectionItem } from './sections/Sections.js';
import { useSelector } from "react-redux";
import { selectLanguage } from "./languageSlice.js";

const useStyles = makeStyles((theme) => {
    return ({
        tableContents: {
            width: "60vw",
            minWidth: "380px",
            textAlign: "left",
            fontSize: "20px",
            display: "flex",
            flexDirection: "column"
        }
    });
});

export default function TableContents() {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);

    return (
        <Typography className={classes.tableContents}>
            {
                Object.values(SectionItem).map((item) => {
                    const { label, ref } = item;
                    const actualLabel = label[language];

                    return (
                        <Link href={`#${ref}`}>
                            {actualLabel}
                        </Link>
                    );
                })
            }
        </Typography>
    );
}