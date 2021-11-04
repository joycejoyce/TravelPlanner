import Confirm from "./Confirm.js";
import { act, render, screen, waitFor } from './test-utils.jsx';
import { findByText } from '@testing-library/dom'
import { FormatAlignJustify } from "@material-ui/icons";

jest.setTimeout(300000);

test('renders element id="confirm"', () => {
    const component = render(<Confirm />);
    const rootElem = component.container.querySelector("#confirm");
    expect(rootElem).toBeInTheDocument();
});

test('renders element className="contents"', async () => {
    await act(async () => {
        const component = render(<Confirm />);
        const contentsElem = component.container.querySelector(".contents");
        expect(contentsElem).toBeInTheDocument();
    });
});

// test('renders text="Give it a name"', async () => {
//     const container = render(<Confirm />);
//     const elem = await screen.findByText(
//         'Give it a name',
//         undefined,
//         {
//             timeout: 50000
//         }
//     );
// });