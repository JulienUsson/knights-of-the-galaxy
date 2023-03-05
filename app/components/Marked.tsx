import type { TypographyProps } from '@mui/material'
import { styled } from '@mui/material'
import { Typography } from '@mui/material'
import { marked } from 'marked'
import { ClientOnly } from 'remix-utils'

interface Props extends TypographyProps {
  children: string
}

export default function Marked({ children, ...props }: Props) {
  return (
    <ClientOnly>
      {() => <Text {...props} dangerouslySetInnerHTML={{ __html: marked(children) }} />}
    </ClientOnly>
  )
}

const Text = styled(Typography)({
  '& p': {
    margin: 0,
  },
})
