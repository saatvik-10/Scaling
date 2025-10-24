import os from 'os'
import cluster from 'cluster';
import { app } from './index';

const OS_NUM = os.cpus().length
const port = 8080;

if (cluster.isPrimary) {
    console.log(`TOTAL AVAILABLE CPU(s)- ${OS_NUM}`)
    console.log(`Primary ${process.pid} is running`)

    for (let i = 0; i < OS_NUM; i++) {
        cluster.fork();
    }

    // cluster.on("exit", (worker) => {
    //     console.log(`Worker ${worker.process.pid} died`)

    //     console.log("Forking another worker")

    //     cluster.fork()
    // })
} else {
    app.listen(`${port}`)
}

