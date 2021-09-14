// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

// React
import { useState } from "react";

// my component
import CenterPoint from "./centerPoint/CenterPoint.js";
import Date from "./Date.js";
import Radius from "./Radius.js";
import { secondary as secondaryFont } from "../../common/styles/fonts.json";

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

    // const [centerPointDesc, setCenterPointDesc] = useState("");
    // const [centerPointPosition, setCenterPointPosition] = useState(null);

    const detail = {
        1: <CenterPoint
            // desc={{centerPointDesc, setCenterPointDesc}}
            // position={{centerPointPosition, setCenterPointPosition}}
        />,
        2: <Date />,
        3: <Radius />
    };
    
    const [criteria, setCriteria] = useState({
        centerPoint: {
            num: 1,
            id: "center-point",
            summary: "Set center point",
            isUnlock: true,
            isActive: true,
            isExpanded: true
        },
        date: {
            num: 2,
            id: "date",
            summary: "Set date",
            isUnlock: false,
            isActive: false,
            isExpanded: false
        },
        radius: {
            num: 3,
            id: "radius",
            summary: "Set radius",
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
                                    {detail[critirion.num]}
                                </AccordionDetails>
                            </Accordion>
                        );
                    })
                }
            </div>
        </div>
    );
}