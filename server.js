import express from 'express'
import books from './routes/bookRoutes.js'
import review from './routes/reviewRoutes.js'
import connection from './config/db.js'
import cors from 'cors'

connection
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/api', books)
app.use('/api', review)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})