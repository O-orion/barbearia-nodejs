import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { Barberia } from "./Barberia";

@Entity("Avaliacoes")
export default class {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: false })
    rating: number;

    @Column({ nullable: false })
    comment: string;

    @Column({ nullable: false })
    userId: string;

    @Column({ nullable: false })
    barberId: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updateAt!: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.avaliacoes, { onDelete: "CASCADE" })
    usuario!: Usuario;

    @ManyToOne(() => Barberia, (barberia) => barberia.avaliacoes, { onDelete: "CASCADE" })
    barberia!: Barberia;

    constructor (
        rating: number,
        comment: string,
        userId: string,
        barberId: string,
    ) {
        this.rating = rating;
        this.comment = comment;
        this.userId = userId;
        this.barberId = barberId;
    }
}
