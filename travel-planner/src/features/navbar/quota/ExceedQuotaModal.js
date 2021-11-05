// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";

// my components
import MyModal from "../../../common/components/MyModal.js";
import { selectIsOpen, closeModal } from "./exceedQuotaModalSlice.js";
import Logo from "../../../common/components/Logo.js";
import { SectionItem } from "../../about/sections/Sections.js";
import { RootURL } from "../../../config.json";

// React
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { HashLink as RouteLink } from "react-router-hash-link";

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
        },
        learnMore: {
            marginTop: theme.spacing(2),
            cursor: "pointer"
        },
        watchVideo: {
            color: theme.palette.background.paper,
            textDecoration: "none"
        }
    });
});

function ModalContent() {
    const classes = useStyles();

    return (
        <div className={classes.modalContent}>
            <div className={classes.desc}>
                The quota of using<br />
                <span className={classes.google}>Google Maps APIs</span><br />
                within 24 hours is exceeded
            </div>
            <div className={classes.instruction}>
                You may try using
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

function LearnMoreLink() {
    // styles
    const classes = useStyles();

    // tool
    const dispatch = useDispatch();
    const history = useHistory();

    // ctrl
    const goAboutPage = () => {
        const url = `/${RootURL.about}`;
        history.push(url);
        dispatch(closeModal());
    };

    return (
        <Link
            className={classes.learnMore}
            onClick={goAboutPage}
        >
            Learn more about this app
        </Link>
    );
}

function DemoVideoLink() {
    // styles
    const classes = useStyles();

    // data
    const refUrl = SectionItem.demoVideo.ref
    const url = `/${RootURL.about}#${refUrl}`;

    return (
        <RouteLink
            className={classes.watchVideo}
            to={url}
        >
            Watch demo video
        </RouteLink>
    );
}

export default function ExceedQuotaModal() {
    const isOpen = useSelector(selectIsOpen);

    // ctrl
    const dispatch = useDispatch();
    const doCloseModal = () => {
        dispatch(closeModal());
    };

    const getBtnSetting = () => {
        return ({
            rightBtn: {
                callback: null,
                text: <DemoVideoLink />
            }
        });
    };

    return (
        <MyModal
            isOpen={isOpen}
            content={<ModalContent />}
            btnSettings={getBtnSetting()}
            closeModal={doCloseModal}
            otherComponents={<LearnMoreLink />}
            modalBodyStyles={null}
            modalContentStyles={null}
        />
    );
}