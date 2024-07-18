
//this component will have a chart. Will recieve the data as a prop
//Will be a barchart
// eg. data = [ {count, _id}, {count, _id} ]
// count will be the height of the bar
// _id will be the label
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registrando los componentes necesarios para Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color + '60';
};

export default function ChartComponent({ title, data }) {
    const backgroundColors = data.map(() => getRandomColor());
    const borderColors = backgroundColors.map(color => color.replace('60', 'FF'));
    const chartData = {
        labels: data.map(item => item._id || 'Unknown'),
        datasets: [
            {
                label: 'Count',
                data: data.map(item => item.count),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>{title}</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}