import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import { encrypt } from "../../util"

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ unique: true, nullable: false })
    email: string

    @Column()
    password: string

    @UpdateDateColumn()
    updateAt: Date

    @CreateDateColumn()
    createAt: Date

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = encrypt(this.password);
    }
}