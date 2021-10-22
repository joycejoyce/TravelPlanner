import styled, { keyframes } from "styled-components";
import { lightColors } from "../styles/colors.json";

const LoaderWrapper = styled.div`
`;

const Container = styled.div`
    position: absolute;
    top: 20vh;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const animation = keyframes`
    20%,50%,80%,to{
        transform: translateY(0);
    }
    40%{
        transform: translateY(-30px);
    }
    70%{
        transform: translateY(-15px);
    }
    90%{
        transform: translateY(-4px);
    }
`;

const Part1 = styled.img`
    position: absolute;
    top: -38px;
    left: 13px;
    animation: ${animation} 1.5s infinite;
`;

const Part2 = styled.img`
`;

export default function Loading() {
    Part1.defaultProps = {
        src: "/img/logo_part1.svg",
        alt: "logo_part1"
    };

    Part2.defaultProps = {
        src: "/img/logo_part2.svg",
        alt: "logo_part2"
    };

    return (
        <LoaderWrapper className="loaderWrapper">
            <Container className="loading">
                <Part1 className="part1" />
                <Part2 className="part2" />
            </Container>
        </LoaderWrapper>
    );
}
