import styled from "styled-components";

export default function GetLogo({width, margin, isDarkMode}) {
    margin = margin ? margin : "0";
    const Logo = (styled.img`
        width: ${width};
        display: block;
        margin: ${margin};
    `);

    const imgName = "img/" + (isDarkMode ? "logo_dark.svg" : "logo.svg");
    Logo.defaultProps = {
        src: imgName,
        alt: "logo"
    };

    return (<Logo />);
}