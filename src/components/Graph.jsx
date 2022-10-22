import * as React from "react";
import "./graph.css";

import {
    createTheme,
    Select,
    MenuItem,
    Typography,
    TextField,
} from "@mui/material";

import { LineGraph } from "./LineGraph";

import * as ClimateData from "../assets/data";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

export const Graph = ({ theme }) => {
    const [line, setLine] = React.useState(true);
    const [mode, setMode] = React.useState(1);
    const [ans, setAns] = React.useState(0);

    const predictCO2FromYear = (year) => {
        return 1.62993881 * year - 2886.54746503;
    };

    const predictYearFromPpm = (co2) => {
        return Math.round((co2 + 2886.54746503) / 1.62993881);
    };

    const getPrediction = (val) => {
        if (mode === 1) {
            return predictYearFromPpm(val);
        } else {
            return predictCO2FromYear(val);
        }
    };

    const [graphData, setGraphData] = React.useState({
        labels: ClimateData.data.map((data) => data.year),
        datasets: [
            {
                label: "Carbon Dioxide Levels(ppm)",
                data: ClimateData.data.map((data) => data.co2),
                backgroundColor: [theme.palette.primary.dark],
                borderColor: theme.palette.secondary.dark,
            },
        ],
    });

    return (
        <div className="graphContainer">
            <div className="graph">
                <LineGraph chartData={graphData} />
            </div>
            <div className="predict">
                <Select
                    value={mode}
                    label="mode"
                    onChange={(event) => {
                        console.log(event.target.value);
                        setMode(event.target.value);
                    }}
                    variant="filled"
                >
                    <MenuItem value={1}>
                        <Typography>
                            Get year from CO<sub>2</sub> (CO<sub>2</sub> &rarr;
                            year )
                        </Typography>
                    </MenuItem>
                    <MenuItem value={2}>
                        <Typography>
                            Get CO<sub>2</sub> from year (year &rarr; CO
                            <sub>2</sub>)
                        </Typography>
                    </MenuItem>
                </Select>
                <br />
                <br />
                <TextField
                    type="number"
                    sx={{
                        width: "100%",
                    }}
                    variant="filled"
                    placeholder={mode === 1 ? "Enter CO2 ppm" : "Enter year"}
                    onChange={(event) => {
                        console.log(event.target.value);
                        setAns(getPrediction(event.target.value));
                    }}
                />
                <Typography>&darr;</Typography>
                <Typography>{ans}</Typography>
            </div>
        </div>
    );
};
