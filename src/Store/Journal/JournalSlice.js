import { createSlice } from '@reduxjs/toolkit';

export const JournalSlice = createSlice({
	name: 'Journal',
	initialState: {
		isSaving: false,
		messageSaved: '',
		notes: [],
	   
	},
	reducers: {

		isSavingNewNote: (state) => {
			state.isSaving = true
		},
		addNewEmptyNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.active = action.payload;
            state.messageSaved = '';
		},
		setNotes: (state, action) => {
			state.notes = action.payload
		},
		setSavingNotes: (state) => {
			state.isSaving = true
			state.messageSaved = ''
		},
		updateNote: (state, action) => {
			state.isSaving = false
			state.notes = state.notes.map((note) => {

				if (note.id === action.payload.id) {
					return action.payload
				}
				return note
			})
			state.messageSaved = `${action.payload.title}, Correctly updated `
		},
		setPhotosActiveNote: (state, action) => {
			state.active.imageUrl = [...state.active.imageUrl, ...action.payload]
			state.isSaving = false
		},
		clearNotesLogOut: (state) => {
			state.isSaving = false
			state.messageSaved = ''
			state.notes = []
			state.active = null
		},
		deleteNoteById: (state, action) => {
			state.active = null
			state.notes = state.notes.filter(note => note.id !== action.payload)
		},
	}
});

export const { addNewEmptyNote, setActiveNote, isSavingNewNote, setNotes, setSavingNotes, updateNote, setPhotosActiveNote, clearNotesLogOut, deleteNoteById } = JournalSlice.actions;

