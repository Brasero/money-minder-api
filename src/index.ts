import express, {Express} from 'express'

const port: number | string = process.env.PORT || 3000
const app: Express = express()

app.get('/', (req, res): void => {
  res.send('Hello world')
})

app.listen(port, (): void => {
  console.log('API listening on port ' + port)
})