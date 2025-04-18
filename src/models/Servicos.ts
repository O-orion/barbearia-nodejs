import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Barberia } from "./Barberia";

@Entity("Servicos")
export default class Servicos {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    duration: number;

    @Column({ nullable: false })
    image: string;

    @Column({ nullable: false })
    barberId: string;

    @ManyToOne(() => Barberia, (barberia) => barberia.servicos, { onDelete: "CASCADE" })
    barberia!: Barberia;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updateAt!: Date;

    constructor( name: string, description: string, price: number, duration: number, image: string, barberId: string ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.image = image;
        this.barberId = barberId;
    }

}
