import { Url } from "./url.entity";

export interface IReturn<T> {
    status: number;
    message: string;
    data?: T
}
export interface IUrl {
    create(url: Url): Promise<IReturn<Url>>;
    updateUrl(shortUrl: string, url: string): Promise<IReturn<Url>>;
    findByShortUrl(shortUrL: string): Promise<IReturn<Url>>;
    delete(shortUrL: string): Promise<IReturn<Url>>;
}