export function getStyles_mapContainer(theme) {
    return ({
        "& > *:not(.MuiButtonBase-root)": {
            width: "85vw",
            [theme.breakpoints.up('md')]: {
                width: "70vw"
            },
            minWidth: "380px",
            maxWidth: "900px"
        },
    });
}

export function getStyles_map(theme) {
    return ({
        height: "450px",
        [theme.breakpoints.up('md')]: {
            height: "515px"
        }
    });
}