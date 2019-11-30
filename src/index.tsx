import JSX from 'jsxlite'
import Message from './ts/Message'
import Chart from 'chart.js'
import { defaultColors, alpha, hexColor, css } from './colors'
import { request } from './request'

import './css/style.scss'


let graphInterval
// TODO: Make it not overlap with hmr
clearInterval(graphInterval)

const $ = document.querySelector.bind(document)

const root = document.getElementById('root') as HTMLElement

while (root.firstChild) {
    root.removeChild(root.firstChild) // Delete all children from the root element
}

root.appendChild(<Message name="JEFF" />)

let coreCtx = ($('#CoreTemps') as HTMLCanvasElement).getContext('2d')!

const a: Chart = new Chart(coreCtx, {
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'Core 1',
            backgroundColor: css(alpha(defaultColors[0], 0.5)),//'rgba(255, 99, 132, 0.5)',
            borderColor: css(defaultColors[0]),//'rgb(255, 99, 132)',
            data: [],
            fill: true
        },
        {
            label: 'Core 2',
            backgroundColor: css(alpha(defaultColors[1], 0.5)),//'rgba(99, 255, 132, 0.5)',
            borderColor: css(defaultColors[1]),//'rgb(99, 255, 132)',
            data: [],
            fill: true,

        },
        {
            label: 'Core 3',
            backgroundColor: css(alpha(defaultColors[2], 0.5)),//'rgba(99, 255, 132, 0.5)',
            borderColor: css(defaultColors[2]),//'rgb(99, 255, 132)',
            data: [],
            fill: true,

        },
        {
            label: 'Core 4',
            backgroundColor: css(alpha(defaultColors[3], 0.5)),//'rgba(99, 255, 132, 0.5)',
            borderColor: css(defaultColors[3]),//'rgb(99, 255, 132)',
            data: [],
            fill: true,

        },
        {
            label: 'Average',
            backgroundColor: css(alpha(defaultColors[4], 0.5)),//'rgba(99, 255, 132, 0.5)',
            borderColor: css(defaultColors[4]),//'rgb(99, 255, 132)',
            data: [],
            fill: true,

        }]
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }]
        }
    }
})

// TODO: put this in a shared place
interface Sensors {
    cores: {
        data: number[]
        avg: number | null
    },
    DIMMs: {
        data: number[]
        avg: number | null
    }
}

const GRAPH_MAX = 10

graphInterval = setInterval(() => {
    request('GET', '/sensors').then((data: Sensors ) => {
        if(a !== undefined) {
            a.data.datasets?.[0].data?.push(data.cores.data[0]);
            a.data.datasets?.[1].data?.push(data.cores.data[1]);
            a.data.datasets?.[2].data?.push(data.cores.data[2]);
            a.data.datasets?.[3].data?.push(data.cores.data[3]);
            a.data.datasets?.[4].data?.push(data.cores.avg || 0);
            a.data.labels?.push((new Date()).toLocaleTimeString());

            if((a.data.labels?.length || 0) > GRAPH_MAX) {
                console.log('gt')
                a.data.labels?.shift()
                a.data.datasets?.[0].data?.shift()
                a.data.datasets?.[1].data?.shift()
                a.data.datasets?.[2].data?.shift()
                a.data.datasets?.[3].data?.shift()
                a.data.datasets?.[4].data?.shift()
            }

            a.update()
        }
        
    })
}, 2000);


// Accept Webpack HMR
;(module as any) ?.hot ?.accept()
