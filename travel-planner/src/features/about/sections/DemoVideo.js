// MUI
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

// my components
import { changeLanguage, selectLanguage } from "../languageSlice.js";
import { Language } from "../LanguageSelect.js";
import { RootURL } from "../../../config.json";

// React
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useEffect, useRef } from "react";

const useStyles = makeStyles((theme) => {
    return ({
        btn: {
            display: "block",
            marginBottom: theme.spacing(1)
        },
        btn: {
            width: "150px",
            marginRight: theme.spacing(1)
        }
    });
});

export default function DemoVideo() {
    // styles
    const classes = useStyles();

    // data
    const language = useSelector(selectLanguage);
    const Contents = {
        english: {
            btnText: "English Version",
            videoUrl: "https://youtu.be/0KunYPXrV5Y"
        },
        chinese: {
            btnText: "中文版",
            videoUrl: "https://youtu.be/CLKCVrrEFbo"
        }
    };
    const handleClick = (videoUrl) => {
        window.open(videoUrl, "_blank").focus();
    };

    return (
        <div id="videoWrapper">
            {
                Object.values(Contents).map((content) => {
                    const { btnText, videoUrl } = content;
                    return (
                        <Button
                            className={classes.btn}
                            onClick={() => handleClick(videoUrl)}
                            variant="contained"
                            color="secondary"
                        >
                            {btnText}
                        </Button>
                    );
                })
            }
        </div>
    );
}