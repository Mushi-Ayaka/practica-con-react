import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/users', (req, res) => {
    // Relative path depends on where 'data' is located.
    // Assuming structure:
    // react-app/
    //   serv/index.js
    //   data/users.json
    const usersPath = path.join(__dirname, '..', 'data', 'users.json');
    fs.readFile(usersPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading user data' });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
