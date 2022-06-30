import { collection, getDocs } from "firebase/firestore/lite"
import { FirbaseDB } from "../FireBaseConfig/FireBase"

export const loadNotes = async( uid = '' ) => {

     if(!uid) throw new Error( 'uid no existe')

    const collectionRef = collection( FirbaseDB, `${uid}/journal/notas`)
    const docs = await getDocs( collectionRef )
    const notes = []

    docs.forEach( doc => {
      notes.push({ id: doc.id, ...doc.data() })
      })
    ;
      return notes  
}