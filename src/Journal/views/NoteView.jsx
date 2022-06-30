import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Typography, Button, TextField, IconButton } from '@mui/material'
import { DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material'

import { useForm } from '../../Hooks/UseForm'
import { ImageGallery } from "../../components"

import { setActiveNote, startSavingNotes, startUploadingFiles, startDeletingNote } from '../../Store/Journal'

export const NoteView = () => {

    const dispatch = useDispatch()

    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)

    const { body, title, onInputChange, formState, date } = useForm(note)

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString()
    }, [date])

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved])

    const onSaveNote = () => {
        dispatch(startSavingNotes())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files))
    }

    const onDelete = () => {
        dispatch(startDeletingNote())
    }


    return (

        <Grid
            container
            padding={40}
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={39}>{dateString}</Typography>
            </Grid>
            <Grid>

                <input
                    type='file'
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                />

                <IconButton
                    color='primary'
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadFileOutlined />
                </IconButton>

                <Button
                    disabled={isSaving}
                    color='primary'
                    xs={{ padding: 2 }}
                    onClick={onSaveNote}
                >
                    <SaveOutlined xs={{ fontSize: 30, mr: 1 }} />
                    Guardar </Button>
            </Grid>

            <Grid container>

                <TextField
                    type="text"
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese Titulo'
                    label="Titulo"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant='filled'
                    fullWidth
                    placeholder='¿Que sucedio hoy?'
                    label="Descripcion"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />

            </Grid>

            <Grid>
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                </Button>
            </Grid>
{console.table(note.imageUrl)}
  <ImageGallery images={note.imageUrl} />

        
        </Grid>
    )
}