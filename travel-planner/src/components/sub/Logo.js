import styled from "styled-components";

export default function GetLogo({width, margin}) {
    margin = margin ? margin : "0";
    const Logo = (styled.img`
        width: ${width};
        display: block;
        margin: ${margin};
    `);

    Logo.defaultProps = {
        src: "img/logo.svg",
        alt: "logo"
    };

    return (<Logo />);
}