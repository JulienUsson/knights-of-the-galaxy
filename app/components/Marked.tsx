import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'
import { styled } from '@mui/material'
import { marked } from 'marked'
import { ClientOnly } from 'remix-utils'

interface Props extends BoxProps {
  children: string
}

export default function Marked({ children, ...props }: Props) {
  return (
    <ClientOnly>
      {() => <Container {...props} dangerouslySetInnerHTML={{ __html: marked(children) }} />}
    </ClientOnly>
  )
}

const Container = styled(Box)({
  flexDirection: 'column',
  whiteSpace: 'pre',
  '& p': {
    margin: 0,
  },
})
