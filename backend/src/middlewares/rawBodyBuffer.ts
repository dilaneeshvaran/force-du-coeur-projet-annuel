import { Request, Response, NextFunction } from 'express';

function rawBodyBuffer(req: Request, res: Response, next: NextFunction) {
    const chunks: Buffer[] = [];
    req.on('data', chunk => {
        chunks.push(chunk);
    });
    req.on('end', () => {
        const rawBody = Buffer.concat(chunks);
        req.body = rawBody;
        next();
    });
    req.on('error', (err) => {
        res.status(500).send('Error processing request');
    });
    req.read();
}
export default rawBodyBuffer;