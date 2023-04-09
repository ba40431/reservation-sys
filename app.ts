import  express, { Express, Request, Response } from 'express'
import { IndexRouter } from './routers/index'
import dotenv from 'dotenv'

// dotenv.config({path: './config/.env'})

// console.log(process.env.PEOPLE_COUNT)

const PORT = 5000

const app: Express = express()

const indexRouter = new IndexRouter

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/alive', (req, res, next) => {
  return res.status(200).json('alive')
})

app.use(indexRouter.router)


app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)}
)