import {AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography} from "@mui/material";
import {ChangeEvent} from "react";
import {Link, NavLink} from "react-router-dom";
import {ShoppingCart} from "@mui/icons-material";

interface IProps {
  handleDarkMode: (value: boolean) => void
}

interface ILink {
  title: string
  path: string
}

const navLinks:ILink[] = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
]

const actionLinks:ILink[] = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
]

const navStyles = {
  color: 'inherit',
  typography: 'h6',
  '&:hover' : {
    color: 'grey.500'
  },
  '&.active': {
    color: 'text.secondary'
  }
}

const Header = ({handleDarkMode} : IProps) => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box id="header-name" display='flex' alignItems="center">
          <Typography
            variant="h6"
            component={NavLink}
            to='/'
            sx={{ color: 'inherit', textDecoration: 'none' }}
          >
            Store App
          </Typography>
          <Switch
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleDarkMode(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
        
        <Box id="header-nav-links">
          <List sx={{ display: 'flex' }}>
            {navLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={{...navStyles, typography: 'p'}}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
        
        <Box id="header-actions" display='flex' alignItems="center">
          <IconButton component={Link} to="/basket" size='large' edge='start' color='inherit' sx={{ mr:2 }}>
            <Badge badgeContent='4' color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: 'flex' }}>
            {actionLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header;