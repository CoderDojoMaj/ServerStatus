/*

import JSX from 'jsxlite'
import chart from 'chart.js'
import body from './indexHTML'
import './styles/style.scss'

let interval

if (document.querySelector('.ROOT')) {
    document.querySelector('.ROOT').replaceWith(body)
    clearInterval(interval)
} else {
    document.body.appendChild(body)
}

let cpuTempCtx = (document.getElementById('CPU_temp_chart') as HTMLCanvasElement).getContext('2d')

const a = new chart(cpuTempCtx, {
	type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'Core 1',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
			data: [],
			fill: true
        },{
            label: 'Core 2',
            backgroundColor: 'rgba(99, 255, 132, 0.5)',
            borderColor: 'rgb(99, 255, 132)',
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

interval = setInterval(() => {
    a.data.datasets[0].data.push(Math.random() * 10 + 20)
	a.data.labels.push((new Date()).toLocaleTimeString())
	a.data.datasets[1].data.push(Math.random() * 15 + 25)
    
    if (a.data.datasets[0].data.length > 20) {
		a.data.datasets[0].data.shift()
		a.data.datasets[1].data.shift()
		a.data.labels.shift()
    }

    a.update()
}, 1500)


if ((module as any).hot) {
    (module as any).hot.accept()
}
  

*/