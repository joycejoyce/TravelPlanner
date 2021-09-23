// React
import { useDispatch, useSelector } from "react-redux";

// my components
import { changeDate, selectDate } from "./criteriaSlice.js";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => {
    return ({
        datePicker: {
            width: "70%",
            minWidth: "231px"
        },
        nextBtn: {

        }
    });
});

export default function MaterialUIPickers() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const date = useSelector(selectDate);

    const handleDateChange = (date) => {
        dispatch(changeDate(date));
    };

    const today = new Date();

    return (
        <div className="date">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className={classes.datePicker}
                    disableToolbar
                    variant="inline"
                    format="yyyy/MM/dd"
                    // margin="normal"
                    id="date-picker-inline"
                    label="Date"
                    value={date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        "aria-label": "change date"
                    }}
                    minDate={today}
                />
            </MuiPickersUtilsProvider>
        </div>
    );
}