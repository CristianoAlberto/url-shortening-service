import { DataSource } from "typeorm"
import { Url } from "../modules/url/url.entity"


export const AppDataSource = new DataSource({
    type: "mongodb",
    database: process.env.MONGO_DB,
    url: process.env.DB_url,
    synchronize: true,
    logging: true,
    entities: [Url],
})

