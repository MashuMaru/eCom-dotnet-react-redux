import {AppBar, Switch, Toolbar, Typography} from "@mui/material";
import {ChangeEvent} from "react";

interface IProps {
  handleDarkMode: (value: boolean) => void
}

const Header = ({handleDarkMode} : IProps) => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">
            Store App
        </Typography>
        <Switch
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleDarkMode(e.target.checked)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Toolbar>
    </AppBar>
  )
}

export default Header;