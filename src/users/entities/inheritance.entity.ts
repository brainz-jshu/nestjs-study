import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export class SingleBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export class BookModel extends BaseModel {
  @Column()
  title: string;
}

export class CarModel extends BaseModel {
  @Column()
  model: string;
}

export class ComputerModel extends SingleBaseModel {
  @Column()
  brand: string;
}

export class PlanetModel extends SingleBaseModel {
  @Column()
  country: string;
}
