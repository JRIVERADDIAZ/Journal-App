import { useMemo } from "react";
import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useDispatch } from "react-redux";
import { setActiveNote } from "../Store/Journal/JournalSlice";

export const SideBarItem = ({ title = '', body, id, date, imageUrl = [] }) => {

    const dispatch = useDispatch()
    
    const activateNote = () => {
        dispatch(setActiveNote({ title, body, id, date, imageUrl }))
    }
    
    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [title])


    return (
        <ListItem disablePadding>
            <ListItemButton onClick={activateNote} >
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}