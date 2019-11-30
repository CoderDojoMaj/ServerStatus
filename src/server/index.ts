import { Router } from 'express'

export const router = Router()



router.get('/info', function (req, res) {
    res.json({ info: ["1", "2", "3"] })
})

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

router.get('/sensors', (req, res) => {

    const outJSON: Sensors = {
        cores: {
            data: [],
            avg: null
        },
        DIMMs: {
            data: [],
            avg: null
        }
    }

    // TODO: Actually get real time sensor info --> $ sensors
    const sensorsStdout = `
    coretemp-isa-0000
    Adapter: ISA adapter
    Core 0:       +44.0°C  (high = +82.0°C, crit = +100.0°C)
    Core 1:       +39.0°C  (high = +82.0°C, crit = +100.0°C)
    Core 2:       +41.0°C  (high = +82.0°C, crit = +100.0°C)
    Core 3:       +39.0°C  (high = +82.0°C, crit = +100.0°C)
    
    i5k_amb-isa-0000
    Adapter: ISA adapter
    Ch. 0 DIMM 0:  +50.0°C  (low  = +105.0°C, high = +124.0°C)
    Ch. 0 DIMM 1:  +45.0°C  (low  = +105.0°C, high = +120.0°C)
    Ch. 1 DIMM 0:  +54.5°C  (low  = +105.0°C, high = +124.0°C)
    Ch. 1 DIMM 1:  +52.5°C  (low  = +105.0°C, high = +120.0°C)
    Ch. 2 DIMM 0:  +56.0°C  (low  = +105.0°C, high = +120.0°C)
    Ch. 2 DIMM 1:  +45.5°C  (low  = +105.0°C, high = +120.0°C)
    Ch. 3 DIMM 0:  +55.0°C  (low  = +105.0°C, high = +120.0°C)
    Ch. 3 DIMM 1:  +45.0°C  (low  = +105.0°C, high = +120.0°C)
    `

    // Core temps
    const cores = sensorsStdout.matchAll(/Core (\d):\s+([+-]\d+(?:\.\d+)?)/g)
    let coreSum = 0

    for (const core of cores) {
        const [_str, i, temp] = core
        outJSON.cores.data[parseInt(i)] = parseFloat(temp)
        coreSum += parseFloat(temp)
    }

    outJSON.cores.avg = coreSum / outJSON.cores.data.length

    // DIMM temps
    const DIMMs = sensorsStdout.matchAll(/Ch\. (\d) DIMM (\d):\s+([+-]\d+(?:\.\d+)?)/g)
    let dimmSum = 0

    for (const DIMM of DIMMs) {
        const [_str, channel, slot, temp] = DIMM
        outJSON.DIMMs.data[parseInt(channel) * 2 + parseInt(slot)] = parseFloat(temp)
        dimmSum += parseFloat(temp)
    }

    outJSON.DIMMs.avg = dimmSum / outJSON.DIMMs.data.length

    res.json(outJSON)
})