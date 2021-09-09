import styled from "styled-components";

export default function GetLogo({scale}) {
    console.log("scale", scale);
    scale = scale ? scale : "15%";
    const Logo = (styled.img`
        height: ${scale};
        width: ${scale};
    `);

    Logo.defaultProps = {
        src: "img/logo.svg",
        alt: "logo"
    };

    return (<Logo />);
}