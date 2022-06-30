
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirbaseDB } from '../../FireBaseConfig/FireBase';
import { loadNotes, fileUpload } from '../../Helpers';
import { addNewEmptyNote, setActiveNote, updateNote, isSavingNewNote, setNotes, setSavingNotes, setPhotosActiveNote, deleteNoteById } from './'

export const startNewNote = () => {
	return async (dispatch, getState) => {

		dispatch( isSavingNewNote())
		
		const { uid } = getState().auth;
		
		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime()
		}
		
		const newDoc = doc( collection( FirbaseDB, `${uid}/journal/notas` ) )
		await setDoc(newDoc, newNote)
		
        newNote.id = newDoc.id
		
	    dispatch(addNewEmptyNote( newNote ))
		dispatch(setActiveNote( newNote ))

	}
}

export const startLoadingNotes = ( ) => {
	return async( dispatch, getState ) => {
		
		const { uid } = getState().auth;
       
		 if (!uid) throw new Error('uid de usuario no existe')

		const note = await loadNotes( uid )

		dispatch( setNotes(  note ) )
	}
}

export const startSavingNotes = () => {
	return async(dispatch, getState) => {
       
       dispatch( setSavingNotes())

	   const { uid } = getState().auth
	   const { active:note } = getState().journal

	   const noteToFirestore = { ...note }
	   delete noteToFirestore.id

	   const docRef = doc( FirbaseDB, `${ uid }/journal/notas/${ note.id }` )
	   await setDoc( docRef, noteToFirestore, { merge: true })
	
	   dispatch( updateNote( note ))
	}
}

export const startUploadingFiles = (files = []) => {
	return async(dispatch) => {
		dispatch( setSavingNotes() );
            
		const fileUploadPromises = [];
		for ( const file of files ) {
			 fileUploadPromises.push( fileUpload( file ) )
		}
		const photosUrl = await Promise.all( fileUploadPromises );
		dispatch( setPhotosActiveNote( photosUrl ));
	}
}

export const startDeletingNote = () => {
	return async(dispatch, getState)=> {
       const { uid } = getState().auth
	   const { active: note } = getState().journal
	   const docRef = doc( FirbaseDB, `${ uid }/journal/notas/${ note.id }` )
	  
	   await deleteDoc( docRef )

	   dispatch( deleteNoteById( note.id ))

	}
}