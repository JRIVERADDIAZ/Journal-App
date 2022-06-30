import { useSelector } from 'react-redux';

import {
    List,
    Box,
    Divider,
    Drawer,
    Toolbar,
    Typography,
} from '@mui/material'

import { SideBarItem } from './';

export const SideBar = ({ dreawerWidth = 240 }) => {

    const { displayName } = useSelector(state => state.auth)
    const { notes } = useSelector(state => state.journal)
    
    return (
        <Box
            component='nav'
            sx={{ width: { sm: dreawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-Paper': {
                        boxSizing: 'border-box', width: dreawerWidth
                    }
                }}
            >
                <Toolbar >
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                    >
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {
                        notes.map(note => (
                            <SideBarItem key={note.id} {...note} />
                        ))
                    }
                </List>
            </Drawer>

        </Box>
    )
}
