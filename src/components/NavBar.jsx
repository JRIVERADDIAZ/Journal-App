import { useDispatch } from 'react-redux'
import { AppBar, IconButton, Toolbar, Typography, Grid } from '@mui/material'
import { MenuOutlined, LogoutOutlined } from '@mui/icons-material'
import { startLogout } from '../Store/Auth'

export const NavBar = ({ drawerWith = 310 }) => {

  const dispatch = useDispatch()

  const logOut = () => {
    console.log( 'logout' )
    dispatch( startLogout())
  }

  return (
    <AppBar 
    position='fixed'
    sx={{  
        width: { sm: `calc( 100% - ${ drawerWith }px)`},
        ml:{ sm: ` ${ drawerWith }px`}
     }}
    >
<Toolbar>
    <IconButton
    color='inherit'
    edge='start'
    sx={{ mr: 2, display:{ sm: 'none' }}}
    >
        <MenuOutlined />
    </IconButton>

    <Grid 
    container
    direction='row'
    justifyContent='space-between'
    alignItems='center'
    >
      
      <Typography variant='h6' noWrap component='div' > Journal App </Typography>

        <IconButton 
        color='error'
        onClick={logOut}
        >
            <LogoutOutlined />
        </IconButton>
    </Grid>

</Toolbar>
    </AppBar>
  )
}
