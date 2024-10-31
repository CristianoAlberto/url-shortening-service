import { Router, Request, Response } from 'express';
const router = Router();
const version = 'api/v1'
import { router as url } from './modules/url/url.router';

// Rota padrão
router.get(`/${version}/`, (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'success',
    });
});

// Usando as rotas
router.use(`/${version}/url`, url);

export default router;