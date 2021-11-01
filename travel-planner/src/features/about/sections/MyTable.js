// MUI
import { makeStyles } from "@material-ui/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

// my components
import { darkColors } from "../../../common/styles/colors.json";
import { secondary as secondaryFont } from "../../../common/styles/fonts.json";

const useStyles = makeStyles((theme) => {
    return ({
        container: {
            maxWidth: "585px",
            background: darkColors.background,
            borderRadius: "10px",
            "& *": {
                color: darkColors.primary
            }
        },
        rowHead: {
            color: theme.palette.secondary.main
        },
        head: {
            fontWeight: "bold",
            fontFamily: secondaryFont,
            letterSpacing: ".9px",
            fontSize: "20px"
        }
    });
});

export default function MyTable({ tableHead, rows }) {
    // styles
    const classes = useStyles();

    return (
        <TableContainer className={classes.container}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {
                            tableHead.map((item, idx) => (
                                <TableCell
                                    key={idx}
                                    className={classes.head}
                                >
                                    {item}
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell className={classes.rowHead} component="th" scope="row">
                                    {row[0]}
                                </TableCell>
                                {
                                    row.slice(1).map((item, idx) => <TableCell key={idx}>{item}</TableCell>)
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}