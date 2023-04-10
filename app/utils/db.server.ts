import { User } from '~/entities/user.entity'
import { Equipment } from '~/entities/equipment.entity'
import { Ennemy } from '~/entities/ennemy.entity'
import { DataSource } from 'typeorm'
import path from 'path'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: path.join(__dirname, '../database.db'),
  entities: [Ennemy, Equipment, User],
})

export function getDataSource(): Promise<DataSource> {
  if (AppDataSource.isInitialized) {
    return Promise.resolve(AppDataSource)
  } else {
    return AppDataSource.initialize()
  }
}

export async function getUserRepository() {
  const dataSource = await getDataSource()
  return dataSource.getRepository(User)
}

export async function getEnnemyRepository() {
  const dataSource = await getDataSource()
  return dataSource.getRepository(Ennemy)
}

export async function getEquipmentRepository() {
  const dataSource = await getDataSource()
  return dataSource.getRepository(Equipment)
}
