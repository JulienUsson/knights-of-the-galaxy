import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import type { EnnemyFields } from '~/schemas/ennemySchema'

@Entity()
export class Ennemy {
  @PrimaryGeneratedColumn()
  id!: number
  @Column({ type: 'varchar' })
  name!: string
  @Column({ type: 'int' })
  phase!: number
  @Column({ type: 'varchar' })
  type!: string
  @Column({ type: 'varchar', nullable: true })
  image?: string
  @Column({ type: 'varchar', nullable: true })
  life?: string
  @Column({ type: 'varchar', nullable: true })
  attack?: string
  @Column({ type: 'varchar' })
  description!: string

  public static fromFields(fields: EnnemyFields, id?: number): Ennemy {
    const ennemy = new Ennemy()
    if (id) ennemy.id = id
    ennemy.name = fields.name
    ennemy.phase = fields.phase
    ennemy.type = fields.type
    ennemy.image = fields.image
    ennemy.life = fields.life
    ennemy.attack = fields.attack
    ennemy.description = fields.description
    return ennemy
  }

  duplicate(): Ennemy {
    const newEnnemy = new Ennemy()
    newEnnemy.name = this.name
    newEnnemy.phase = this.phase
    newEnnemy.type = this.type
    newEnnemy.image = this.image
    newEnnemy.life = this.life
    newEnnemy.attack = this.attack
    newEnnemy.description = this.description
    return newEnnemy
  }
}
