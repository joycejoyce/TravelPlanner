// MUI
import { makeStyles } from "@material-ui/styles";
import { Link, Typography } from '@material-ui/core';

// my components
import { SectionItem } from './sections/Sections.js';
import { selectLanguage } from "./languageSlice.js";
import { secondary as secondaryFont } from "../../common/styles/fonts.json";

// React
import { useSelector } from "react-redux";
import { DevSections } from "./development-section/Development.js";

const useStyles = makeStyles((theme) => {
    return ({
        tableContents: {
            width: "60vw",
            minWidth: "380px",
            textAlign: "left",
            fontSize: "20px",
            display: "flex",
            flexDirection: "column",
            fontFamily: secondaryFont
        },
        link: {
            width: "fit-content",
            color: theme.palette.text.primary
        },
        subLinks: {
            display: "flex",
            flexDirection: "column",
            paddingLeft: theme.spacing(3),
            fontSize: "16px",
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

                    if (ref === SectionItem.development.ref) {
                        return (
                            <>
                                <Link className={classes.link} href={`#${ref}`}>
                                    {actualLabel}
                                </Link>
                                <div className={classes.subLinks}>
                                    {
                                        Object.values(DevSections).map((section) => {
                                            const { label, ref } = section;
                                            const actualLabel = label[language];
                                            return (
                                                <Link className={classes.link} href={`#${ref}`}>
                                                    {actualLabel}
                                                </Link>
                                            );
                                        })
                                    }
                                </div>
                            </>
                        );
                    }

                    return (
                        <Link className={classes.link} href={`#${ref}`}>
                            {actualLabel}
                        </Link>
                    );
                })
            }
        </Typography>
    );
}