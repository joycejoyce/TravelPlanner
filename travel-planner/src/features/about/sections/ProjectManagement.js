// MUI
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { OpenInNew as OpenIcon } from '@material-ui/icons';

// my components
import { selectLanguage } from "../languageSlice.js";
import MyTable from "../components/MyTable.js";
import BulletPoint from "../components/BulletPoint.js";
import SubBulletPoint from "../components/SubBulletPoint.js";
import Padded from "../components/Padded.js";

// React
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        projMgt: {
            display: "flex",
            flexDirection: "column"
        },
        sectionWBS: {
            marginBottom: theme.spacing(1)
        },
        sectionSummary: {
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(1)
        }
    });
});

function MajorPhases() {
    const language = useSelector(selectLanguage);

    const { majorPhases } = Contents[language];

    return (
        <div>
            {
                majorPhases.map((phase, idx) => {
                    return (
                        <SubBulletPoint key={idx} text={phase} />
                    );
                })
            }
        </div>
    );
}

function ToBeImproved() {
    const language = useSelector(selectLanguage);

    const { tableHead, rows } = Contents[language].tableData;

    return (
        <div>
            <MyTable
                tableHead={tableHead}
                rows={rows}
            />
        </div>
    );
}

const Contents = {
    english: {
        wbsTitle: "Work Breakdown Structure",
        summary: [
            {
                title: "The major phases of this project are on-schedule:",
                contents: <Padded component={<MajorPhases />} />
            },
            {
                title: "Some items are not executed as planned:",
                contents: <Padded component={<ToBeImproved />} />
            }
        ],
        majorPhases: ["Learning", "Development"],
        tableData: {
            tableHead: ["Item", "Plan", "Actual"],
            rows: [
                ["Available development time", "Consider every weekend as available", "Consider every weekend as available"],
                ["Planning for project phases", '"UI Design" and "Development" are separated as 2 phases', '"Design" and "Development" were running in parallel'],
                ["The missed project phase", 'Missed the phase of "writing documents"', ""],
                ["The unimplemented item", "Dark mode", ""]
            ]
        }
    },
    chinese: {
        wbsTitle: "??????????????? WBS",
        summary: [
            {
                title: "????????????????????????????????????????????????????????????????????????:",
                contents: <Padded component={<MajorPhases />} />
            },
            {
                title: "?????????????????????:",
                contents: <Padded component={<ToBeImproved />} />
            }
        ],
        majorPhases: ["??????", "??????"],
        tableData: {
            tableHead: ["??????", "??????", "????????????"],
            rows: [
                ["?????????????????????", "???????????????????????????", "????????????????????????????????????"],
                ["?????????????????????????????????", '"????????????" ??? "????????????" ?????????????????????', '"????????????" ??? "????????????" ?????????????????? (????????????????????????)'],
                ["??????????????????????????????", '????????? "??????????????????" ?????????', ""],
                ["??????????????????", "????????????", ""]
            ]
        }
    }
};

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
            Project Plan
        </Button>
    );
}

export default function ProjectManagement() {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);
    const contents = Contents[language];
    const { summary } = contents;

    return (
        <div className={classes.projMgt}>
            <div className={classes.sectionWBS}>
                <WBSLink />
            </div>
            <div className={classes.sectionSummary}>
                {
                    summary.map((point, idx) => {
                        const { title, contents } = point;

                        return (
                            <div key={idx}>
                                <BulletPoint text={title} />
                                {contents}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}