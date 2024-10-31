import { Request, Response } from "express";
import { IUrl } from "./url.interface";
export class UrlController {
    constructor(private service: IUrl) { }
    create = async (req: Request, res: Response) => {
        const data = await this.service.create(req.body);
        return res.status(data.status).json(data);
    }
    updateUrl = async (req: Request, res: Response) => {
        const data = await this.service.updateUrl(req.params.shortUrl, req.body.originalUrl);
        return res.status(data.status).json(data);
    }
    findByShortUrl = async (req: Request, res: Response) => {
        const data = await this.service.findByShortUrl(req.params.shortUrl);
        return res.status(data.status).json(data);
    }
    delete = async (req: Request, res: Response) => {
        const data = await this.service.delete(req.params.shortUrl);
        return res.status(data.status).json(data);
    }
}