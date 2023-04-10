import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import type { EquipmentFields } from '~/schemas/equipmentSchema'

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id!: number
  @Column({ type: 'varchar' })
  name!: string
  @Column({ type: 'varchar' })
  type!: string
  @Column({ type: 'varchar', nullable: true })
  dice1?: string
  @Column({ type: 'varchar', nullable: true })
  dice2?: string
  @Column({ type: 'varchar', nullable: true })
  dice3?: string
  @Column({ type: 'varchar' })
  description!: string

  static fromFields(fields: EquipmentFields, id?: number): Equipment {
    const equipment = new Equipment()
    if (id) equipment.id = id
    equipment.name = fields.name
    equipment.type = fields.type
    equipment.dice1 = fields.dice1
    equipment.dice2 = fields.dice2
    equipment.dice3 = fields.dice3
    equipment.description = fields.description
    return equipment
  }

  duplicate(): Equipment {
    const newEquipment = new Equipment()
    newEquipment.name = this.name
    newEquipment.type = this.type
    newEquipment.dice1 = this.dice1
    newEquipment.dice2 = this.dice2
    newEquipment.dice3 = this.dice3
    newEquipment.description = this.description
    return newEquipment
  }
}
