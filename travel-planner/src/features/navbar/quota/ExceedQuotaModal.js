// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import MyModal from "../../../common/components/MyModal.js";
import { selectIsOpen, closeModal } from "./exceedQuotaModalSlice.js";
import Logo from "../../../common/components/Logo.js";
import { SectionItem } from "../../about/sections/Sections.js";
import { RootURL } from "../../../config.json";

// React
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => {
    return ({
        modalContent: {
            textAlign: "center"
        },
        desc: {
            color: theme.palette.primary.main,
            fontSize: "18px"
        },
        google: {
            fontWeight: "bold"
        },
        instruction: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
            display: "flex",
            alignItems: "center"
        }
    });
});

function ModalContent() {
    const classes = useStyles();

    return (
        <div className={classes.modalContent}>
            <div className={classes.desc}>
                The daily quota of using<br />
                <span className={classes.google}>Google Maps APIs</span><br />
                is exceeded
            </div>
            <div className={classes.instruction}>
                You may use
                <Logo
                    className={classes.logo}
                    width="55px"
                    margin="6px"
                />
                after 24 hours
            </div>
        </div>
    )
}

export default function ExceedQuotaModal() {
    const isOpen = useSelector(selectIsOpen);

    // ctrl
    const history = useHistory();
    const dispatch = useDispatch();
    const doCloseModal = () => {
        dispatch(closeModal());
    };
    const goWatchDemoVideo = () => {
        const refUrl = SectionItem.demoVideo.ref
        const url = `/${RootURL.about}#${refUrl}`;

        history.push(url);
        const demoElem = document.getElementById(refUrl);
        if (demoElem) {
            demoElem.scrollIntoView();
        }
    };

    const getBtnSetting = () => {
        return ({
            leftBtn: {
                callback: null,
                text: "Close"
            },
            rightBtn: {
                callback: goWatchDemoVideo,
                text: "Watch demo video"
            }
        });
    };

    return (
        <MyModal
            isOpen={isOpen}
            content={<ModalContent />}
            btnSettings={getBtnSetting()}
            closeModal={doCloseModal}
            otherComponents={null}
            modalBodyStyles={null}
            modalContentStyles={null}
        />
    );
}