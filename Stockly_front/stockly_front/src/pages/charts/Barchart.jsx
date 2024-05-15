import React, {useEffect} from 'react'
import { Chart } from 'chart.js/auto'

const Barchart = ({ donnees }) => {
    useEffect(() => {
        const dates = Object.values(donnees).map(jour => jour.date);
        const nombres = Object.values(donnees).map(jour => parseInt(jour.nombre));

        // Créer le graphe
        const ctx = document.getElementById('vente_chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Nombre',
                    data: nombres,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, [donnees]);

    return (
        <div>
            <canvas id="vente_chart"></canvas>
        </div>
    )
}

export default Barchart
