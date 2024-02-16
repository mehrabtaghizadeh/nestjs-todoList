/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'todos' })
export default class Todos {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: false })
  body: string;
}
