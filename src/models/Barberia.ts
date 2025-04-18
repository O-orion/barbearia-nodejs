import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Servicos from "./Servicos";
import Avaliacoes from "./Avaliacoes";
import { Usuario } from "./Usuario";
import { on } from "events";

@Entity('Barberias')
export class Barberia {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({  nullable:false })
    name!: string;

    @Column({  nullable:false })
    address!: string;

    @Column({  nullable:false })
    phone!: string;

    @Column({  nullable:false, unique: true })
    email!: string;

    @Column({  nullable:true })
    website?: string;

    @Column({  nullable:false })
    description!: string;

    @Column('text', { array: true,  nullable:false })
    services!: string[];

    @Column({  nullable: true})
    rating?: number;

    @Column({  nullable:false })
    openingHours!: string;

    @Column({  nullable:false })
    closeingHours!: string;

    @Column('jsonb', {  nullable:true })
    location!: { lat: number; lng: number } | null;

    @Column('text', { array: true,  nullable:true })
    images: string[];

    @ManyToOne(() => Usuario, (usuario) => usuario.id, { onDelete: "CASCADE" })
    owner!: Usuario;

    @ManyToMany(() => Servicos, (servicos) => servicos.barberia, { onDelete: "CASCADE" })
    servicos!: Servicos[];

    @ManyToMany(() => Avaliacoes, (avaliacoes) => avaliacoes.barberia, { onDelete: "CASCADE" })
    avaliacoes!: Avaliacoes[];

    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updateAt!: Date;

    constructor(name: string,
        email: string,
        phone: string,
        adress: string,
        website: string,
        description: string,
        services: string[],
        rating: number,
        openingHours: string,
        closeingHours: string,
        location: { lat: number; lng: number },
        ownerId: string,
        images: string[]) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = adress;
        this.website = website;
        this.description = description;
        this.services = services;
        this.rating = rating;
        this.openingHours = openingHours;
        this.closeingHours = closeingHours;
        this.location = location;
        this.images = images;
        this.owner = { id: ownerId } as Usuario;

    }

}
