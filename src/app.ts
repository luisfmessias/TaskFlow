import express, { NextFunction } from 'express'

export const app = express();
 
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hloo')
})


app.use((error: Error, req: express.Request, res: express.Response, next: NextFunction) => {
    res.status(500).send(error.message);
});

export default app