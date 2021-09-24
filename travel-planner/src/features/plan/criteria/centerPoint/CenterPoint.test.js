import { render, screen, fireEvent } from "@testing-library/react";
import Criteria from "../Criteria.js";

const getOpenModalBtn = () => screen.getByRole("button", { name: /open modal/i });
const getDescInput = () => screen.getByTestId(/desc/i);
const getConfirmBtn = () => screen.getByRole("button", { name: /confirm/i });
const getCancelBtn = () => screen.getByRole("button", { name: /cancel/i });

test("Change desc when clicking on 'Confirm' button", () => {
    // 1. render
    render(<Criteria />);

    // 2. actions
    const openModalBtn = getOpenModalBtn();
    fireEvent.click(openModalBtn);

    let desc = getDescInput();
    const text = "test123";
    fireEvent.change(desc, { target: { value: text }});

    const confirmBtn = getConfirmBtn();
    fireEvent.click(confirmBtn);

    fireEvent.click(openModalBtn);

    // 3. assertions
    desc = getDescInput();
    expect(desc.value).toBe(text); 
});

test("Not change desc when clicking on 'Cancel' button", () => {
    // 1. render
    render(<Criteria />);

    // 2. actions
    const openModalBtn = getOpenModalBtn();
    fireEvent.click(openModalBtn);

    let desc = getDescInput();
    const text = "test123";
    fireEvent.change(desc, { target: { value: text }});

    const cancelBtn = getCancelBtn();
    fireEvent.click(cancelBtn);

    fireEvent.click(openModalBtn);

    // 3. assertions
    desc = getDescInput();
    expect(desc.value).toBe(""); 
});