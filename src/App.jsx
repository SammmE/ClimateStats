import * as React from "react";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { Graph } from "./components/Graph.jsx";

// https://climatestats-api.deta.dev/

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    return (
        <div
            style={{
                alignItems: "center",
                alignSelf: "center",
                overflowX: "hidden",
            }}
        >
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />

                <section>
                    <h1>
                        CO<sub>2</sub> in the Atmosphere Over the Years
                    </h1>
                    <div style={{ textAlign: "center", overflowX: "hidden" }}>
                        <Graph theme={darkTheme} />
                    </div>
                </section>
                <section className="blurple">
                    <h1>
                        What is CO<sub>2</sub>?
                    </h1>

                    <img src="/src/assets/co2.png" />
                    <p>
                        Carbon Dioxide, or CO<sub>2</sub> for short, is a
                        greenhouse gas. Greenhouse gasses are gasses that hold
                        heat in the earth, similar to how a greenhouse maintains
                        the heat in it. Burning fossil fuels (coal, natural gas,
                        and oil), solid waste, trees, and other biological
                        materials release carbon dioxide into the atmosphere,
                        along with other chemical processes (e.g., manufacture
                        of cement). When carbon dioxide is absorbed by plants as
                        part of the biological carbon cycle, it is taken out of
                        the atmosphere (or "sequestered").
                        <br />
                        <br />
                        <br />
                        <br />
                    </p>
                    <div className="curve"></div>
                </section>
                <section className="">
                    <h1>What is PPM?</h1>
                    <p>
                        Parts per million, or ppm, denotes out of a million,
                        similar to how percent denotes out of 100. A part per
                        million (ppm) is equivalent to one milligram per liter
                        (mg/l). 417 ppm, for example, means out of a million air
                        molecules, 417 of those are Carbon Dioxide
                    </p>
                </section>
                <section className="dark">
                    <h1>Why is this data important?</h1>
                    <img src="/src/assets/antarctica.png" />
                    <p>
                        As the Carbon Dioxide levels rise, so do the
                        temperatures. This, and holes in the ozone layer made by
                        CO<sub>2</sub> contribute to melting icecaps in the
                        Artic, and the Antarctic. This causes sea levels to
                        rise, and land to shrink. This, in turn causes habitat
                        loss for wild species and us humans. The rise in
                        temperatures can also cause more drouts and, (worst case
                        senario), human extinction
                    </p>
                </section>
            </ThemeProvider>
        </div>
    );
}

export default App;
