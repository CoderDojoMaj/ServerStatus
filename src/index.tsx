import JSX from 'jsxlite'
import Message from './ts/Message'
import Chart from 'chart.js'
import {defaultColors, alpha, hexColor, css} from './colors'

import './css/style.scss'

const $ = document.querySelector.bind(document)

const root = document.getElementById('root') as HTMLElement

while (root.firstChild) {
    root.removeChild(root.firstChild) // Delete all children from the root element
}

root.appendChild(<Message name="JEFF"/>)

let coreCtx = ($('#CoreTemps') as HTMLCanvasElement).getContext('2d')!

const a = new Chart(coreCtx, {
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

// Accept Webpack HMR
;(module as any)?.hot?.accept()
