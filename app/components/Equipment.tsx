import type { Equipment as EquipmentEntity } from '@prisma/client'

export default function Equipment(props: Partial<EquipmentEntity>) {
  return <>{props.title}</>
}
