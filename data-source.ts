import path from 'path'
import { DataSource } from 'typeorm'
import { Ennemy } from './app/entities/ennemy.entity'
import { Equipment } from './app/entities/equipment.entity'
import { User } from './app/entities/user.entity'
import { Init1681142011038 } from '~/migrations/1681142011038-init'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: path.join(__dirname, '../database.db'),
  entities: [Ennemy, Equipment, User],
  migrations: [Init1681142011038],
  migrationsRun: true,
})
