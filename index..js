import express from 'express';
import path from "path"
import fileupload from "express-fileupload"

const app = express()
app.use(fileupload());
const port = 3000

app.get('/', (req, res) => {
  res.sendFile("index.html", {root: path.join("./")})
})

app.post('/upload', (req, res) => {
  console.log(req.files)
  res.send("done")
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
