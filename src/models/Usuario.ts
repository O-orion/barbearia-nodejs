import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Barberia } from "./Barberia";
import Avaliacoes from "./Avaliacoes";

@Entity('Usuarios')
export class Usuario {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true, nullable: false })
    email!:string;

    @Column({ nullable: true})
    password?: string;

    @Column({ nullable: true })
    googleId?: string;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: true })
    bio?: string;

    @Column({ nullable: true })
    profilePicture?: string;

    @Column({ nullable: false })
    dataNasc!: Date;

    @OneToMany(() => Barberia, (barbearia) => barbearia.owner, { onDelete: "CASCADE" })
    barberias!: Barberia[];

    @OneToMany(() => Avaliacoes, (avaliacoes) => avaliacoes.usuario, { onDelete: "CASCADE" })
    avaliacoes!: Avaliacoes[];

    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @UpdateDateColumn({ type:'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updateAt!: Date;

    @Column({ nullable: false })
    genero!: string;

    async createUsuario(
          email: string,
          password: string,
          googleId: string,
          name: string,
          bio: string = "",
          dataNasc: Date,
          genero: string,
          profilePicture: string = "" ): Promise<void> {
        this.name = name;
        this.email = email;
        this.bio = bio;
        this.dataNasc = dataNasc;
        this.password = password ? password : undefined;
        this.googleId = googleId ? googleId : undefined;
        this.genero = genero;
        this.profilePicture = profilePicture;
    }

}
