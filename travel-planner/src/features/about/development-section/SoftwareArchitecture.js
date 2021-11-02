// MUI
import { makeStyles } from "@material-ui/styles";
import { Link } from "@material-ui/core";

// my components
import SubTitle from "../components/SubTitle.js";
import { selectLanguage } from "../languageSlice.js";
import { lightColors, err } from "../../../common/styles/colors.json";
import BulletPoint from "../components/BulletPoint.js";
import MyTable from "../components/MyTable.js";
import SubBulletPoint from "../components/SubBulletPoint";
import Padded from "../components/Padded.js";

// React
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme) => {
    return ({
        softwareArchitecture: {

        },
        featureNum: {
            fontWeight: "bold",
            minWidth: "83px"
        },
        featureTitle: {
            display: "flex",
            gap: theme.spacing(1)
        },
        componentTitle: {
            display: "flex",
            gap: theme.spacing(1)
        },
        componentTitleText: {
            fontWeight: "bold",
            minWidth: "125px"
        },
        linkText: {
            color: lightColors.navbarLightBlue,
            cursor: "pointer"
        }
    });
});

function FeatureTitle({ num, title }) {
    // styles
    const classes = useStyles();

    const contents = (
        <div className={classes.featureTitle}>
            <div className={classes.featureNum}>Feature #{num}</div>
            <div>{title}</div>
        </div>
    );

    return (
        <BulletPoint text={contents} />
    );
}

function Feature1({ data }) {
    const Folders = [
        "app",
        "common",
        "features",
        "features",
        "features",
        "features",
        "features",
        "features"
    ];

    const SubFolders = [
        "",
        "",
        "",
        "home",
        "plan",
        "my-itineraries",
        "about",
        "navbar"
    ];

    const { title, tableHead, descriptions } = data;
    const rows = descriptions.map((desc, idx) => {
        const folder = Folders[idx];
        const subFolder = SubFolders[idx];
        return [folder, subFolder, desc];
    });

    return (
        <div>
            <FeatureTitle num={1} title={title} />
            <MyTable
                tableHead={tableHead}
                rows={rows}
            />
        </div>
    );
}

function Feature2({ data }) {
    // styles
    const classes = useStyles();

    // data
    const Files = [
        "~/src/features/plan/criteria/centerPoint/mapHandler.js",
        "~/src/features/navbar/quota/quotaHandler.js",
        "~/src/features/plan/confirm/poiDataHandler.js"
    ];
    const { title, subTitles, tableData } = data;
    const { tableHead, tableRows } = tableData;
    const rows = tableRows.map((rowData, idx) => {
        const { category, functions } = rowData;
        const file = Files[idx];
        return [category, functions, file];
    });

    const paddedContents = (
        <>
            {
                subTitles.map((titleComponent) => titleComponent)
            }
            <MyTable
                tableHead={tableHead}
                rows={rows}
            />
        </>
    );

    return (
        <div>
            <FeatureTitle num={2} title={title} />
            <Padded component={paddedContents} />
        </div>
    );
}

function Feature3({ data }) {
    // data
    const Files = [
        "~/src/common/styles/colors.json",
        "~/src/common/styles/fonts.json",
        "~/src/app/App.js"
    ];
    const { title, tableData } = data;
    const { tableHead, tableRows } = tableData;
    const rows = tableRows.map((rowData, idx) => {
        const { category, desc } = rowData;
        const file = Files[idx];
        return [category, desc, file];
    });
    const paddedContents = (
        <MyTable
            tableHead={tableHead}
            rows={rows}
        />
    )

    return (
        <div>
            <FeatureTitle num={3} title={title} />
            <Padded component={paddedContents} />
        </div>
    );
}

export default function SoftwareArchitecture() {
    // styles
    const classes = useStyles();

    // ctrl
    const handleClickMUILink = (e) => {
        window.open("https://v4.mui.com/customization/theming/#theme-provider", "_blank").focus();
    };

    // data
    const ComponentTitle = ({ title, desc }) => {
        const contents = (
            <div className={classes.componentTitle}>
                <div className={classes.componentTitleText}>{title}:</div>
                <div>{desc}</div>
            </div>
        );
        return (
            <SubBulletPoint text={contents} />
        );
    };
    const Contents = {
        english: {
            title: "Software Architecture",
            feature1: {
                title: "Logically-structured folder architecture",
                tableHead: ["Folder", "Sub Folder", "Description"],
                descriptions: [
                    "The program entry",
                    "Shared stuff, such as styles, utilities, and components, etc.",
                    "Main pages & navbar",
                    'The "Home" page',
                    'The "Plan" page',
                    'The "My Itineraries" page',
                    'The "About" page',
                    'The navigation bar'
                ]
            },
            feature2: {
                title: "Separated UI-component codes and logic-component codes",
                subTitles: [
                    <ComponentTitle title="UI Components" desc="Components that are not logic components" />,
                    <ComponentTitle title="Logic Components" desc="" />
                ],
                tableData: {
                    tableHead: ["Handle Category", "Functions", "File"],
                    tableRows: [
                        {
                            category: "Map",
                            functions: "Handle map-related logic, such as loading maps, listen to click events on maps, etc."
                        },
                        {
                            category: "Google Map APIs request quota",
                            functions: "Calculate and limit quota for users"
                        },
                        {
                            category: "Itinerary",
                            functions: "Get information from Google Maps and generate the itinerary"
                        }
                    ]
                }
            },
            feature3: {
                title: "Centralized management for CSS styles",
                tableData: {
                    tableHead: ["Styling Category", "Description", "File"],
                    tableRows: [
                        {
                            category: "Colors",
                            desc: "The used colors"
                        },
                        {
                            category: "Fonts",
                            desc: "The used fonts"
                        },
                        {
                            category: "Theme",
                            desc: (
                                <div>
                                    Utilize <span className={classes.linkText} onClick={handleClickMUILink}>Material UI’s Theme Provider</span> to control the UI theme of this project
                                </div>
                            )
                        }
                    ]
                }
            }
        },
        chinese: {

        }
    };
    const language = useSelector(selectLanguage);
    const contents = Contents[language];
    const { title, feature1, feature2, feature3 } = contents;

    return (
        <div className={classes.softwareArchitecture}>
            <SubTitle text={title} />
            <Feature1 data={feature1} />
            <Feature2 data={feature2} />
            <Feature3 data={feature3} />
        </div>
    );
}