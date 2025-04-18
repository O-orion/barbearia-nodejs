import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Avaliacoes")
export default class {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    rating: number;

    @Column({ nullable: false })
    comment: string;

    @Column({ nullable: false })
    userId: string;

    @Column({ nullable: false })
    barberId: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    constructor (
        id: string,
        rating: number,
        comment: string,
        userId: string,
        barberId: string,
        createdAt: Date
    ) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.userId = userId;
        this.barberId = barberId;
        this.createdAt = createdAt;
    }
}
