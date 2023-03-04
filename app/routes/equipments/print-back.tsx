import { Stack, styled } from '@mui/material'
import _ from 'lodash'
import cardBackImg from '../../assets/equipment.png'

export default function CardBackRoute() {
  return (
    <Page>
      {_.range(4).map((index) => (
        <Stack key={index} direction="row">
          <CardBack />
          <CardBack />
        </Stack>
      ))}
    </Page>
  )
}

const Page = styled(Stack)({
  margin: '1cm',
  pageBreakAfter: 'always',
})

const CardBack = styled('img')({
  width: '88mm',
  height: '63mm',
  border: '1px solid black',
  backgroundImage: `url("${cardBackImg}")`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
})
