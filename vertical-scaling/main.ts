import express from 'express'
import os from 'os'
import cluster from 'cluster'

const cpu_num = os.cpus().length
const target = 1000_000_000;
const size = Math.floor(target / cpu_num);

if (cluster.isPrimary) {
    let startTime = Date.now();
    let sum = 0;
    let completedWorkers = 0;

    for (let i = 0; i < cpu_num; i++) {
        const worker = cluster.fork();
        const start = i * size;
        const end = (i === cpu_num - 1) ? target : (i + 1) * size - 1;

        setTimeout(() => {
            worker.send({ start, end })
        }, 100);

        worker.on("message", (msg) => {
            sum + msg.pSum;
            completedWorkers++;

            if (completedWorkers === cpu_num) {
                let endTime = Date.now();
                console.log(endTime - startTime)
                process.exit()
            }
        })
    }
} else {
    process.on("message", (msg) => {
        const { start, end }: any = msg;

        let pSum = 0;

        for (let i = start; i <= end; i++) {
            pSum += i;
        }

        process.send!({ pSum: pSum.toString() })
    })
}