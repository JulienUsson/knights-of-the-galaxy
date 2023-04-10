import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import type { ReactNode } from 'react'
import { useToggle } from 'react-use'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from '@remix-run/react'

interface Props {
  title: string
  children: ReactNode
}

export function Layout({ title, children }: Props) {
  const [isOpen, toggleOpen] = useToggle(false)
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => toggleOpen()}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        {children}
      </Container>
      <Drawer anchor="left" open={isOpen} onClose={() => toggleOpen(false)}>
        <List sx={{ width: 220 }}>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/equipments">
              <ListItemText primary="Equipements" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/ennemies">
              <ListItemText primary="Ennemies" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}
