// MUI
import { makeStyles } from "@material-ui/styles";
import { OpenInNew as OpenIcon } from '@material-ui/icons';
import { IconButton } from "@material-ui/core";

// my components
import { selectLanguage } from "../languageSlice";
import SubTitle from "../components/SubTitle.js";
import BulletPoint from "../components/BulletPoint.js";
import SubBulletPoint from "../components/SubBulletPoint.js";
import Padded from "../components/Padded";

// React
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        development: {
        },
        sections: {
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(1)
        },
        api: {
            width: "180px",
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            alignItems: "center"
        }
    });
});

function UsedAPIs() {
    // styles
    const classes = useStyles();

    // data
    const apis = [
        {
            name: "Geocoding",
            link: "https://developers.google.com/maps/documentation/geocoding/overview"
        },
        {
            name: "Maps JavaScript",
            link: "https://developers.google.com/maps/documentation/javascript/overview"
        },
        {
            name: "Maps Static",
            link: "https://developers.google.com/maps/documentation/maps-static/overview"
        },
        {
            name: "Places",
            link: "https://developers.google.com/maps/documentation/places/web-service/overview"
        }
    ];

    return (
        <div>
            {
                apis.map((api, idx) => {
                    const { name, link } = api;

                    const handleClick = () => {
                        window.open(link, "_blank").focus();
                    };

                    return (
                        <div key={idx} className={classes.api}>
                            <div>{name}</div>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                            >
                                <OpenIcon />
                            </IconButton>
                        </div>
                    );
                })
            }
        </div>
    );
}

function CostControlMethods({ methods }) {
    // styles
    const classes = useStyles();

    return (
        <div className={classes.padded}>
            {
                methods.map((method, idx) => {
                    return (
                        <SubBulletPoint key={idx} text={method} />
                    );
                })
            }
        </div>
    );
}

const Contents = {
    english: {
        title: "Utilize Google Maps APIs",
        usedApis: {
            title: "Used APIs"
        },
        costControl: {
            title: "Cost Control Methods",
            methods: [
                "Use Google Cloud Platform to control quota limit",
                "Design the API calling structures to use the minimum requests to get the required data",
                "Calculate and limit the quota for each user"
            ]
        }
    },
    chinese: {
        title: "使用Google Maps APIs",
        usedApis: {
            title: "使用到的APIs"
        },
        costControl: {
            title: "花費控制的機制",
            methods: [
                "用Google雲端平台控制使用配額",
                "設計程式，用最少量的API呼叫次數取得所需資料",
                "計算並限制每個使用者發出的API次數"
            ]
        }
    }
};

export default function UtilizeGMap() {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);
    const { title } = Contents[language];
    const { title: usedApisTitle } = Contents[language].usedApis;
    const { title: costControlMethodsTitle, methods } = Contents[language].costControl;

    return (
        <div className={classes.utilizeGMap}>
            <SubTitle text={title} />
            <div className={classes.sections}>
                <div>
                    <BulletPoint text={usedApisTitle} />
                    <Padded component={<UsedAPIs />} />
                </div>
                <div>
                    <BulletPoint text={costControlMethodsTitle} />
                    <Padded component={<CostControlMethods methods={methods} />} />
                </div>
            </div>
        </div>
    );
}