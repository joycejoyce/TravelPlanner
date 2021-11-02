// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import MyTable from "../components/MyTable.js";
import { selectLanguage } from "../languageSlice.js";

// React
import { useSelector } from "react-redux";
import { SectionItem } from "./Sections";

const useStyles = makeStyles((theme) => {
    return ({
    });
});

const TableHeadObj = {
    english: ["Item", "Tools"],
    chinese: ["項目", "工具"]
};

const Rows = [
    {
        key: "ui-design",
        item: {
            english: "UI Design",
            chinese: "介面設計"
        },
        tools: [<ToolList toolList={["Figma", "XMind"]} />]
    },
    {
        key: "programming-languages",
        item: {
            english: "Programming Languages",
            chinese: "程式語言"
        },
        tools: [<ToolList toolList={["HTML / JavaScript / CSS"]} />]
    },
    {
        key: "framework",
        item: {
            english: "Framework",
            chinese: "開發框架"
        },
        tools: [<ToolList toolList={["React (with Redux)"]} />]
    },
    {
        key: "test-framework",
        item: {
            english: "Test Framework",
            chinese: "測試框架"
        },
        tools: [<ToolList toolList={["Jest"]} />]
    },
    {
        key: "serverless-related",
        item: {
            english: "Serverless-Related",
            chinese: "無伺服器運算技術"
        },
        tools: [<ToolList toolList={["Google Cloud Platform", "Google Maps API"]} />]
    },
    {
        key: "project-management",
        item: {
            english: "Project Management",
            chinese: "專案管理"
        },
        tools: [<ToolList toolList={["Google Sheets"]} />]
    },
    {
        key: "app-deployment",
        item: {
            english: "App Deployment",
            chinese: "應用程式部署"
        },
        tools: [<ToolList toolList={["Heroku"]} />]
    }
]

function ToolList({ toolList }) {
    return (
        <>
        {
            toolList.map((text, idx) => {
                return (
                    <div key={idx}>．{text}</div>
                );
            })
        }
        </>
    )
}

export default function AppIdea() {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);
    const tableHead = TableHeadObj[language];
    const rows = Rows.map(row => {
        const head = row.item[language];
        return [head, ...row.tools];
    });

    return (
        <div id={SectionItem.tools.ref} className={classes.tools}>
            <MyTable
                tableHead={tableHead}
                rows={rows}
            />
        </div>
    );
}