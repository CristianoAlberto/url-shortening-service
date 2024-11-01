import { AppDataSource } from "../../db";
import { Url } from "./url.entity";
import { IUrl } from "./url.interface";
import { IReturn } from "./url.interface";
import shortid from 'shortid';
import _ from "underscore";
export class UrlRepository implements IUrl {
    private readonly urlRepo = AppDataSource.getMongoRepository(Url);
    async create(url: Url): Promise<IReturn<Url>> {
        try {
            const findUrl = await this.urlRepo.findOneBy({ originalUrl: url.originalUrl, deletedAt: null });
            if (findUrl) {
                return { status: 400, message: "Url já existente" };
            }
            url.shortUrl = await this.generateUniqueShortUrl();
            url.accessCount = 0;
            const newUrl = await this.urlRepo.save(url);
            return { status: 201, message: "Sucesso", data: newUrl };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Contactar o administrador" }
        }
    }
    async updateUrl(shortUrl: string, url: string): Promise<IReturn<Url>> {
        try {
            const findUrl = await this.urlRepo.findOneBy({ shortUrl, deletedAt: null });
            if (!findUrl) {
                return { status: 404, message: "Url no encontrada" };
            }
            console.log(url)
            if (findUrl.originalUrl === url) {
                return { status: 400, message: "A url não pode ser igual à original." };
            }
            await this.urlRepo.save({ ...findUrl, originalUrl: url });
            return { status: 200, message: "Url actualizada" };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Contactar o administrador" }
        }
    }
    async findByShortUrl(shortUrl: string): Promise<IReturn<Url>> {
        try {
            if (!shortUrl) {
                return { status: 400, message: "O shortUrl não pode estar vazio." };
            }
            const foundUrl = await this.urlRepo.findOneBy({ shortUrl, deletedAt: null });
            if (!foundUrl) {
                return { status: 404, message: "URL não encontrada." };
            }
            foundUrl.accessCount += 1;
            await this.urlRepo.save(foundUrl);
            return { status: 200, message: "URL encontrada.", data: _.omit(foundUrl, "accessCount") as Url };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Contate o administrador." };
        }
    }

    async delete(shortUrl: string): Promise<IReturn<Url>> {
        try {
            if (!shortUrl) {
                return { status: 400, message: "O shortUrl não pode estar vazio." };
            }
            const findUrl = await this.urlRepo.findOneBy({ shortUrl, deletedAt: null });
            if (!findUrl) {
                return { status: 404, message: "Url não encontrada" };
            }
            await this.urlRepo.save({ ...findUrl, deletedAt: new Date() });
            return { status: 200, message: "Url eliminada" };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Contactar o administrador" }
        }
    }
    async showStats(shortUrl: string): Promise<IReturn<Url>> {
        try {
            if (!shortUrl) {
                return { status: 400, message: "O shortUrl não pode estar vazio." };
            }
            const foundUrl = await this.urlRepo.findOneBy({ shortUrl, deletedAt: null });
            if (!foundUrl) {
                return { status: 404, message: "URL não encontrada." };
            }
            return { status: 200, message: "URL encontrada.", data: foundUrl };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Contate o administrador." };
        }
    }

    private async generateUniqueShortUrl(): Promise<string> {
        let shortUrl: string = '';
        let isDuplicate = true;

        while (isDuplicate) {
            shortUrl = shortid.generate();
            const validateShortUrl = await this.urlRepo.findOneBy({ shortUrl, deletedAt: null });

            if (!validateShortUrl) {
                isDuplicate = false;

            }
        }
        return shortUrl;
    }

}