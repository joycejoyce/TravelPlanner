// MUI
import { makeStyles } from "@material-ui/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

// my components
import { selectLanguage } from "../languageSlice.js";
import { darkColors } from "../../../common/styles/colors.json";
import { secondary as secondaryFont } from "../../../common/styles/fonts.json";

// React
import { useSelector } from "react-redux";
import { SectionItem } from "./Sections";

const useStyles = makeStyles((theme) => {
    return ({
        container: {
            maxWidth: "585px",
            background: darkColors.background,
            borderRadius: "10px",
            "& *": {
                color: darkColors.primary
            }
            
        },
        head: {
            fontWeight: "bold",
            fontFamily: secondaryFont,
            letterSpacing: ".9px",
            fontSize: "20px"
        }
    });
});

const tableHead = {
    english: ["Item", "Tools"],
    chinese: ["項目", "工具"]
};

const rows = [
    {
        key: "ui-design",
        item: {
            english: "UI Design",
            chinese: "介面設計"
        },
        tools: ["Figma", "XMind (for Functional Map & UI Flow Diagrams)"]
    },
    {
        key: "programming-languages",
        item: {
            english: "Programming Languages",
            chinese: "程式語言"
        },
        tools: ["HTML / JavaScript / CSS"]
    },
    {
        key: "framework",
        item: {
            english: "Framework",
            chinese: "開發框架"
        },
        tools: ["React (with Redux)"]
    },
    {
        key: "test-framework",
        item: {
            english: "Test Framework",
            chinese: "測試框架"
        },
        tools: ["Jest"]
    },
    {
        key: "serverless-related",
        item: {
            english: "Serverless-Related",
            chinese: "無伺服器運算技術"
        },
        tools: ["Google Cloud Platform", "Google Maps API"]
    },
    {
        key: "project-management",
        item: {
            english: "Project Management",
            chinese: "專案管理"
        },
        tools: ["Google Sheets"]
    },
    {
        key: "app-deployment",
        item: {
            english: "App Deployment",
            chinese: "應用程式部署"
        },
        tools: ["Heroku"]
    }
]

export default function AppIdea() {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);
    const actualTableHead = tableHead[language];

    return (
        <div id={SectionItem.tools.ref} className={classes.tools}>
            <TableContainer className={classes.container}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {
                                actualTableHead.map(text => (
                                    <TableCell
                                        key={text}
                                        className={classes.head}
                                    >
                                        {text}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map((row) => (
                                <TableRow key={row.key}>
                                    <TableCell component="th" scope="row">
                                        {row.item[language]}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            row.tools.map((tool, idx) => (
                                                <div key={idx}>．{tool}</div>
                                            ))
                                        }
                                    </TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}