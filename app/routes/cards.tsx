import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

export const loader = async () => {
  return json({
    cardListItems: await db.card.findMany(),
  })
}

export default function CardsRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      {data.cardListItems.map((card) => (
        <li key={card.id}>
          <Link to={card.id.toString()}>{card.title}</Link>
        </li>
      ))}
    </div>
  )
}
