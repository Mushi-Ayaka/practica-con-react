import 'dotenv/config';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { usersRoute } from './routes/users.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.disable('x-powered-by');

app.use(corsMiddleware());
app.use(express.json());

app.use('/api/users', usersRoute);

app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
