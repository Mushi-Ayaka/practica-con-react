import cors from 'cors';
import { Request, Response } from 'express';

export const corsMiddleware = () => cors({
    origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:5173',
            'http://localhost:5174',
        ];

        if (ACCEPTED_ORIGINS.includes(origin || '')) {
            return callback(null, true);
        }

        if (!origin) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});