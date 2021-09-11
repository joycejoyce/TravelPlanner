// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { secondary as secondaryFont } from "../../fonts.json";

// React
import { useState } from "react";

// my component
import CenterPoint from "../criteria/centerPoint/CenterPoint.js";
import Date from "../criteria/Date.js";
import Radius from "../criteria/Radius.js";

let isDarkMode = false;

const useStyles = makeStyles((theme) => {
    isDarkMode = theme.palette.type === "dark";

    return ({
        accordions: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center"
        },
        accordion: {
            width: "385px"
        },
        summary: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: theme.palette.primary.main
        },
        numCircle: {
            borderRadius: "50%",
            background: theme.palette.secondary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: secondaryFont
        },
        active: {
            "& .circle": {
                width: "40px",
                height: "40px"
            },
            fontSize: "1.2rem"
        },
        nonActive: {
            "& .circle": {
                width: "28px",
                height: "28px"
            }
        }
    });
});

function Summary({num, text, isActive}) {
    const classes = useStyles();
    const summaryClasses = [
        "summary",
        classes.summary,
        (isActive ? classes.active : classes.nonActive)
    ].join(" ");

    return (
        <div className={summaryClasses}>
            <div className={"circle " + classes.numCircle}>{num}</div>
            <div className={"summaryText" + classes.summaryText}>{text}</div>
        </div>
    );
}

export default function Criteria() {
    const classes = useStyles();
    const [criteria, setCriteria] = useState({
        centerPoint: {
            num: 1,
            id: "center-point",
            summary: "Set center point",
            detail: <CenterPoint />,
            isUnlock: true,
            isActive: true,
            isExpanded: true
        },
        date: {
            num: 2,
            id: "date",
            summary: "Set date",
            detail: <Date />,
            isUnlock: false,
            isActive: false,
            isExpanded: false
        },
        radius: {
            num: 3,
            id: "radius",
            summary: "Set radius",
            detail: <Radius />,
            isUnlock: false,
            isActive: false,
            isExpanded: false
        }
    });

    const handleOnChangeAccordion = (e, key, isExpanded) => {
        setCriteria({
            ...criteria,
            [key]: {
                ...criteria[key],
                isExpanded: !isExpanded
            }
        })
    };

    return (
        <div className="criteria">
            <div className={"accordions " + classes.accordions}>
                {
                    Object.keys(criteria).map(key => {
                        const critirion = criteria[key];

                        return (
                            <Accordion
                                key={key}
                                className={classes.accordion}
                                disabled={!critirion.isUnlock}
                                expanded={critirion.isExpanded}
                                onChange={(e) => handleOnChangeAccordion(e, key, critirion.isExpanded)}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    id={critirion.id}
                                >
                                    <Summary
                                        num={critirion.num}
                                        text={critirion.summary}
                                        isActive={critirion.isActive}
                                    />
                                </AccordionSummary>
                                <AccordionDetails>
                                    {critirion.detail}
                                </AccordionDetails>
                            </Accordion>
                        );
                    })
                }
            </div>
        </div>
    );
}