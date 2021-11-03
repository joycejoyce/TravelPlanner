// MUI
import { makeStyles } from "@material-ui/styles";
import { OpenInNew as OpenIcon } from "@material-ui/icons";
import { Button } from "@material-ui/core";

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
        contents: {
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(2)
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
        },
        githubLink: {
            width: "220px"
        }
    });
});

function FeatureTitle({ num, title }) {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);
    const FeatureText = {
        english: "Feature",
        chinese: "特色"
    }
    const featureText = FeatureText[language];

    const contents = (
        <div className={classes.featureTitle}>
            <div className={classes.featureNum}>{featureText} #{num}</div>
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
    const paddedContents = (
        <MyTable
            tableHead={tableHead}
            rows={rows}
        />
    );

    return (
        <div>
            <FeatureTitle num={1} title={title} />
            <Padded component={paddedContents} />
        </div>
    );
}

function Feature2({ data }) {
    // styles
    const classes = useStyles();

    // data
    const Files = [
        "mapHandler.js",
        "quotaHandler.js",
        "poiDataHandler.js"
        // "~/src/features/plan/criteria/centerPoint/mapHandler.js",
        // "~/src/features/navbar/quota/quotaHandler.js",
        // "~/src/features/plan/confirm/poiDataHandler.js"
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
        "colors.json",
        "fonts.json",
        "App.js"
        // "~/src/common/styles/colors.json",
        // "~/src/common/styles/fonts.json",
        // "~/src/app/App.js"
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
    );

    return (
        <div>
            <FeatureTitle num={3} title={title} />
            <Padded component={paddedContents} />
        </div>
    );
}

function GitHubLink() {
    // styles
    const classes = useStyles();

    const handleClick = () => {
        window.open("https://github.com/joycejoyce/TravelPlanner.git", "_blank").focus();
    };

    return (
        <Button
            className={classes.githubLink}
            startIcon={<img src="/img/tools/github.png" />}
            endIcon={<OpenIcon />}
            variant="outlined"
            onClick={handleClick}
        >
            GitHub Source Codes
        </Button>
    )
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
            title: "軟體架構",
            feature1: {
                title: "邏輯分明的資料夾結構",
                tableHead: ["資料夾", "子資料夾", "用途"],
                descriptions: [
                    "程式進入點",
                    "共用元件, 例如: CSS樣式, 小工具, React元件..., 等等",
                    "主要頁面 和 導覽列",
                    '"Home" 頁面',
                    '"Plan" 頁面',
                    '"My Itineraries" 頁面',
                    '"About" 頁面',
                    '導覽列'
                ]
            },
            feature2: {
                title: '分離 "使用者介面元件" 以及 "程式邏輯元件" 的程式碼',
                subTitles: [
                    <ComponentTitle title="使用者介面元件" desc="非下列程式邏輯元件之元件" />,
                    <ComponentTitle title="程式邏輯元件" desc="" />
                ],
                tableData: {
                    tableHead: ["處理範疇", "功能", "檔案"],
                    tableRows: [
                        {
                            category: "地圖",
                            functions: "處理地圖相關邏輯, 例如: 載入地圖、監聽地圖點擊事件..., 等等"
                        },
                        {
                            category: "Google Map APIs 使用配額",
                            functions: "計算並限制使用者發出的API次數"
                        },
                        {
                            category: "行程規劃",
                            functions: "使用Google Maps API取得資訊後, 產生行程規劃"
                        }
                    ]
                }
            },
            feature3: {
                title: "集中管理CSS樣式",
                tableData: {
                    tableHead: ["樣式類別", "描述", "檔案"],
                    tableRows: [
                        {
                            category: "顏色",
                            desc: "專案中用到的顏色"
                        },
                        {
                            category: "字體",
                            desc: "專案中用到的字體"
                        },
                        {
                            category: "主題",
                            desc: (
                                <div>
                                    用 <span className={classes.linkText} onClick={handleClickMUILink}>Material UI’s Theme Provider</span> 統一控制專案的使用者介面樣式
                                </div>
                            )
                        }
                    ]
                }
            }

        }
    };
    const language = useSelector(selectLanguage);
    const contents = Contents[language];
    const { title, feature1, feature2, feature3 } = contents;

    return (
        <div className={classes.softwareArchitecture}>
            <SubTitle text={title} />
            <div className={classes.contents}>
                <GitHubLink />
                <Feature1 data={feature1} />
                <Feature2 data={feature2} />
                <Feature3 data={feature3} />
            </div>
        </div>
    );
}