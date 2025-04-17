import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('text', { array: true,  nullable:true })
    reviews?: string[];

    @Column({  nullable:false })
    openingHours!: string;

    @Column({  nullable:false })
    closeingHours!: string;

    @Column('jsonb', {  nullable:true })
    location!: { lat: number; lng: number } | null;

    @Column('text', { array: true,  nullable:true })
    images: string[];

    constructor(name: string,
        email: string,
        phone: string,
        adress: string,
        website: string,
        description: string,
        services: string[],
        rating: number,
        reviews: string[],
        openingHours: string,
        closeingHours: string,
        location: { lat: number; lng: number },
        images: string[]) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = adress;
        this.website = website;
        this.description = description;
        this.services = services;
        this.rating = rating;
        this.reviews = reviews;
        this.openingHours = openingHours;
        this.closeingHours = closeingHours;
        this.location = location;
        this.images = images;

    }

}
