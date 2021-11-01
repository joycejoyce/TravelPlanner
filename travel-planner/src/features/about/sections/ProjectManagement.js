// MUI
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { OpenInNew as OpenIcon } from '@material-ui/icons';

// my components
import { selectLanguage } from "../languageSlice.js";
import { lightColors } from "../../../common/styles/colors.json";
import { SectionItem } from "./Sections.js";
import MyTable from "./MyTable.js";

// React
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        projMgt: {
            marginTop: theme.spacing(3),
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(3)
        },
        title: {
            display: "flex",
            gap: theme.spacing(1),
            alignItems: "center",
            // marginBottom: theme.spacing(2)
        },
        titleCircle: {
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: theme.palette.text.primary
        },
        subTitleCircle: {
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: lightColors.navbarBlue
        },
        sectionWBS: {
            // display: "flex"
        },
        titleText: {
            fontWeight: "bold",
            color: lightColors.navbarBlue,
            fontSize: "18px"
        },
        subTitleText: {
            fontSize: "16px",
            color: lightColors.navbarBlue
        },
        tableHead: {
            fontWeight: "bold",
            color: lightColors.navbarBlue
        },
        likenessDesc: {
            fontSize: "14px"
        },
        planActualContents: {
            marginTop: theme.spacing(1),
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(1)
        },
        space: {
            height: "3px"
        }
    });
});

const Contents = {
    english: {
        wbsTitle: "Work Breakdown Structure",
        planActual: {
            title: "Between The Project Plan & The Actual Situation",
            diff: {
                title: "The Differences",
                tableHead: ["Item", "Plan", "Actual"],
                rows: [
                    ["Available development time", "Consider every weekend as available", "Consider every weekend as available"],
                    ["Planning for project phases", '"UI Design" and "Development" are separated as 2 phases', '"Design" and "Development" were running in parallel'],
                    ["The missed project phase", 'Missed the phase of "writing documents"', ""],
                    ["The unimplemented item", "Dark mode", ""]
                ]
            },
            likeness: {
                title: "The Likenesses",
                desc: "The major phases of this project are on-schedule: 1. Learning (new technologies) 2. UI Design 3. Devevelopment"
            }
        }
    },
    chinese: {
        wbsTitle: "專案計畫表 WBS",
        planActual: {
            title: "專案計畫 與 實際情況",
            diff: {
                title: "相異之處",
                tableHead: ["項目", "計畫", "實際情況"],
                rows: [
                    ["可行的開發時間", "將周末視為開發時間", "周末沒有時間可做程式開發"],
                    ["專案主要階段的時程安排", '"介面設計" 和 "程式開發" 被分開為兩階段', '"介面設計" 和 "程式開發" 必須平行執行 (一邊設計一邊開發)'],
                    ["計畫時遺漏的重要階段", '遺漏了 "撰寫專案文件" 的階段', ""],
                    ["未實作的項目", "深色模式", ""]
                ]
            },
            likeness: {
                title: "相同之處",
                desc: "此專案的主要階段 (1. 學習新技術 2. 介面設計 3. 程式開發) 的實際執行時程，皆與專案計畫符合"
            }
        }
    }
};

function Title({ text, isSub }) {
    // styles
    const classes = useStyles();
    const circleStyles = isSub ? classes.subTitleCircle : classes.titleCircle;
    const titleTextStyles = isSub ? classes.subTitleText : classes.titleText;

    return (
        <div className={classes.title}>
            {
                isSub && (<div className={circleStyles}></div>)
            }
            {/* <div className={circleStyles}></div> */}
            <div className={titleTextStyles}>{text}</div>
        </div>
    )
}

function WBSLink() {
    // ctrl
    const handleClickWBS = () => {
        window.open("https://docs.google.com/spreadsheets/d/1BhTBcKYuWmtVdxlsT5XoDw2eepXQYq_i1ggXEC_5vHU/edit?usp=sharing", "_blank").focus();
    };

    return (
        <Button
            startIcon={<img src="/img/google-sheets.png" />}
            endIcon={<OpenIcon />}
            variant="outlined"
            onClick={handleClickWBS}
        >
            WBS
        </Button>
    )
}

export default function ProjectManagement() {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);
    const contents = Contents[language];
    const { planActual } = contents;
    const { diff, likeness } = planActual;
    const { tableHead, rows } = diff;

    return (
        <div id={SectionItem.projectManagement.ref} className={classes.projMgt}>
            <div className={classes.sectionWBS}>
                {/* <Title text={contents.wbsTitle} /> */}
                <WBSLink />
            </div>
            <div className={classes.sectionPlanActual}>
                <Title text={planActual.title} />
                <div className={classes.planActualContents}>
                    <div className={classes.likeness}>
                        <Title text={likeness.title} isSub={true} />
                        <div className={classes.likenessDesc}>{likeness.desc}</div>
                    </div>
                    <div className={classes.diff}>
                        <Title text={diff.title} isSub={true} />
                        <div className={classes.space}></div>
                        <MyTable
                            tableHead={tableHead}
                            rows={rows}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}