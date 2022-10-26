import * as React from "react";
import "./graph.css";

import {
    createTheme,
    Select,
    MenuItem,
    Typography,
    TextField,
    Button,
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
    const [labels, setLabels] = React.useState(
        ClimateData.data.map((data) => data.year)
    );

    const [data, setData] = React.useState(
        ClimateData.data.map((data) => data.co2)
    );
    const [pred, setPred] = React.useState();
    const [mode, setMode] = React.useState(1);
    const [ans, setAns] = React.useState(0);

    var graphData = {
        labels: labels,
        datasets: [
            {
                label: "Carbon Dioxide Levels(ppm)",
                data: data,
                backgroundColor: [theme.palette.primary.dark],
                borderColor: theme.palette.secondary.dark,
            },
        ],
    };

    const predictCO2FromYear = (year) => {
        return 1.62993881 * year - 2886.54746503;
    };

    const predictYearFromPpm = (co2) => {
        return Math.round((parseInt(co2) + 2886.54746503) / 1.62993881);
    };

    const getPrediction = (val) => {
        if (mode === 1) {
            return predictYearFromPpm(val);
        } else {
            return predictCO2FromYear(val);
        }
    };

    const addYear = (year) => {
        var tempLabels = [...labels];
        tempLabels.push(year);
        setLabels(tempLabels);
    };

    const addPpm = (ppm) => {
        var tempData = [...data];
        tempData.push(ppm);
        setData(tempData);
    };

    const reloadGraph = () => {
        graphData = {
            labels: labels,
            datasets: [
                {
                    label: "Carbon Dioxide Levels(ppm)",
                    data: ClimateData.data.map((data) => data.co2),
                    backgroundColor: [theme.palette.primary.dark],
                    borderColor: theme.palette.secondary.dark,
                },
            ],
        };
    };

    const resetGraph = () => {
        setData(ClimateData.data.map((data) => data.co2));
        setLabels(ClimateData.data.map((data) => data.year));

        reloadGraph();
    };

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
                        setPred(event.target.value);
                        setAns(getPrediction(event.target.value));
                    }}
                />
                <Button
                    sx={{
                        marginTop: "20px",
                        marginRight: "2.5px",
                    }}
                    variant="outlined"
                    onClick={() => {
                        var res = getPrediction(pred);
                        var year;
                        var ppm;
                        if (mode === 1) {
                            year = res;
                            ppm = predictCO2FromYear(year);
                        } else {
                            ppm = res;
                            year = predictYearFromPpm(ppm);
                        }
                        addPpm(ppm);
                        addYear(year);
                        reloadGraph();
                    }}
                >
                    Graph It!
                </Button>
                <Button
                    sx={{
                        marginTop: "20px",
                        marginLeft: "2.5px",
                    }}
                    variant="outlined"
                    onClick={() => {
                        resetGraph();
                    }}
                >
                    Reset Graph
                </Button>
                <Typography>&darr;</Typography>
                <Typography>{ans}</Typography>
            </div>
        </div>
    );
};
