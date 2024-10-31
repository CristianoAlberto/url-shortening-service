import { Column, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ObjectIdColumn, ObjectId } from "typeorm";
@Entity("url")
export class Url {
    @ObjectIdColumn()
    id: ObjectId;
    @Column()
    originalUrl: string;
    @Column()
    shortUrl: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt: Date;
    constructor(
        id: ObjectId,
        originalUrl: string,
        shortUrl: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
    ) {
        this.id = id;
        this.originalUrl = originalUrl;
        this.shortUrl = shortUrl;
        this.createdAt = createdAt
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}