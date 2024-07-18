
import React, { useEffect, useState } from 'react';
import Rescuer from "@classes/Rescuer";
import ChartComponent from "./chart";

export default function MetricsPage() {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        Rescuer.getMetrics().then((metrics) => {
            if (metrics) {
                console.log("METRICS:", metrics);
                setMetrics(metrics);//this will be an array of objects. Each object will contain the data for a chart
            }
        });
    }, []);;

    if (!metrics) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Métricas de Adopción de Mascotas</h1>
            <ChartComponent title="Distribución de Especies" data={metrics.speciesDistribution} />
            <ChartComponent title="Estado de Adopción" data={metrics.adoptionStatus} />
            <ChartComponent title="Distribución de Tamaños" data={metrics.sizeDistribution} />
            {/* Puedes agregar más gráficos según las métricas disponibles */}
        </div>
    );
}