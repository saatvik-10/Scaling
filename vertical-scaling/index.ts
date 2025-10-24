import express from 'express'

export const app = express();

console.log(`Worker with ID ${process.pid} started`)

app.get("/", (req, res) => {
    res.send("Hello World");
})

//browsers caches the pid
app.get("/pid", (req, res) => {
    res.send("Hello World " + process.pid)
})

app.get("/api/:n", function (req, res) {
    let n = parseInt(req.params.n)
    let cnt = 0

    if (n > 5000000000) n = 5000000000

    for (let i = 0; i <= n; i++) cnt++;

    res.send(`The final count is: ${cnt} ${process.pid}`)
});