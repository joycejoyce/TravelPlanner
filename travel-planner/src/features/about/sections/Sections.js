// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import AppIdea from "./ProjectIdea.js";
import Tools from "./Tools.js";
import ProjectManagement from "./ProjectManagement.js";
import { secondary as secondaryFont } from "../../../common/styles/fonts.json";
import { Language } from "../LanguageSelect.js";
import { selectLanguage } from "../languageSlice.js";

// React
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        sections: {
            width: "80vw",
            minWidth: "380px",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(3)
        },
        sectionTitle: {
            fontFamily: secondaryFont,
            fontSize: "28px",
            letterSpacing: ".9px",
            fontWeight: "bold"
        }
    });
});

export const SectionItem = {
    appIdea: {
        label: {
            [Language.english.value]: "Project Idea",
            [Language.chinese.value]: "專案發想"
        },
        ref: "app-idea",
        component: <AppIdea />
    },
    tools: {
        label: {
            [Language.english.value]: "Tools",
            [Language.chinese.value]: "開發工具"
        },
        ref: "tools",
        component: <Tools />
    },
    projectManagement: {
        label: {
            [Language.english.value]: "Project Management",
            [Language.chinese.value]: "專案管理"
        },
        ref: "project-management",
        component: <ProjectManagement />
    }
};

export default function Sections() {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);

    return (
        <div className={classes.sections}>
            {
                Object.values(SectionItem).map((item) => {
                    const { label, component } = item;
                    const actualLabel = label[language];

                    return (
                        <div className={classes.section}>
                            <div className={classes.sectionTitle}>{actualLabel}</div>
                            {component}
                        </div>
                    );
                })
            }
        </div>
    );
}