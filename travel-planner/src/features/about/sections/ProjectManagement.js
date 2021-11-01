// MUI
import { makeStyles } from "@material-ui/styles";
import { IconButton } from "@material-ui/core";

// my components
import { selectLanguage } from "../languageSlice.js";

// React
import { useSelector } from "react-redux";
import { SectionItem } from "./Sections";

const useStyles = makeStyles((theme) => {
    return ({
        projMgt: {

        },
        title: {
            display: "flex",
            gap: theme.spacing(1),
            alignItems: "center"
        },
        titleCircle: {
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: theme.palette.text.primary
        },
        sectionWBS: {
            display: "flex"
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
                    ["The missed project phase", 'Missed the phase of "writing documents"'],
                    ["The unimplemented item", "Dark mode"]
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
                    ["計畫時遺漏的重要階段", '遺漏了 "撰寫專案文件" 的階段'],
                    ["未實作的項目", "深色模式"]
                ]
            },
            likeness: {
                title: "相同之處",
                desc: "此專案的主要階段(1. 學習新技術 2. 介面設計 3. 程式開發)的實際執行時程，皆與專案計畫符合"
            }
        }
    }
};

function Title({ text }) {
    // styles
    const classes = useStyles();

    return (
        <div className={classes.title}>
            <div className={classes.titleCircle}></div>
            <div>{text}</div>
        </div>
    )
}

export default function ProjectManagement() {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);
    const contents = Contents[language];

    return (
        <div className={classes.projMgt}>
            <div className={classes.sectionWBS}>
                <Title text={contents.wbsTitle} />
                <IconButton aria-label="open google sheets">
                    <img src="/img/google-sheets.png" alt="google sheets" />
                </IconButton>
                {/* <img src="/img/google-sheets.png" alt="google sheets" /> */}
            </div>

        </div>
    );
}