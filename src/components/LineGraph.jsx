import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export const LineGraph = ({ chartData }) => {
    return (
        <div>
            <Line
                style={{
                    overflowX: "hidden",
                }}
                data={chartData}
            />
        </div>
    );
};
