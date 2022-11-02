import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
