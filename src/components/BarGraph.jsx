import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export const BarGraph = ({ chartData }) => {
    return (
        <div>
            <Bar data={chartData} />
        </div>
    );
};
