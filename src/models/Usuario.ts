import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Usuarios')
export class Usuario {


    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true, nullable: false })
    email!:string;

    @Column({ nullable: false})
    password!: string;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: true })
    bio?: string;

    @Column({ nullable: false })
    dataNasc!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;

    @Column({ nullable: false })
    genero!: string;

    async createUsuario(email: string, password: string, name: string, bio: string = "", dataNasc: Date, genero: string ): Promise<void> {
        this.name = name;
        this.email = email;
        this.bio = bio;
        this.dataNasc = dataNasc;
        this.password = password;
        this.genero = genero;
    }

}
