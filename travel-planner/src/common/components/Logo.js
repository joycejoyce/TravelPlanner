import styled from "styled-components";

export default function GetLogo({width, margin, isDarkMode, className, handleClick}) {
    margin = margin ? margin : "0";
    const cursor = handleClick ? "pointer" : "auto";
    const Logo = (styled.img`
        width: ${width};
        display: block;
        margin: ${margin};
        cursor: ${cursor};
    `);

    const imgName = "/img/" + (isDarkMode ? "logo_dark.svg" : "logo.svg");
    Logo.defaultProps = {
        src: imgName,
        alt: "logo"
    };

    return (<Logo onClick={handleClick} className={className} />);
}