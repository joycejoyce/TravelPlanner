import styled, { keyframes } from "styled-components";
import { pageBackground } from "../../colors.json";

const LoaderWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    background: pink;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
`;

const Container = styled.div`
    position: absolute;
    top: 50%;
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
    top: -50px;
    width: 80%;
    height: 80%;
    animation: ${animation} 1s ease-out;
`;

const Part2 = styled.img`
`;

export default function Loading() {
    Part1.defaultProps = {
        src: "img/logo_part1.svg",
        alt: "logo_part1"
    };

    Part2.defaultProps = {
        src: "img/logo_part2.svg",
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
