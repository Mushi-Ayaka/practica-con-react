import cors from 'cors';
import { Request, Response } from 'express';

export const corsMiddleware = () => cors({
    origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
        // En producción, ACCEPTED_ORIGINS debe ser una lista separada por comas
        const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS 
            ? process.env.ACCEPTED_ORIGINS.split(',')
            : [
                'http://localhost:5173',
                'http://localhost:5174',
                'http://localhost:5175',
            ];

        if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});