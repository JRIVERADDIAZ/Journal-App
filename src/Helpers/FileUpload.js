
export const fileUpload = async( file) => {

    if(!file) throw new Error('there is not a file to upload')
    
    const cloudUlr = // your cloudinary creds here -->

    console.log( import.meta.env.local.VITE_APP_CLOUDFLARE_UPLOAD_URL );   
    
    const formData = new FormData()
    formData.append('upload_preset','journal-app-react')
    formData.append('file', file)
    
    try {
        
        const resp = await fetch( cloudUlr, {
            method: 'POST',
            body: formData
        } )

        if( !resp.ok ){ throw new Error('Cannot upload file or files') }

        const cloudResp = await resp.json()

        return cloudResp.secure_url

    } catch (error) {
        console.log(error);
        throw new Error( error.message)
    }

}