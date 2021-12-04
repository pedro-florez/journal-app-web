
/* Subir Imagen a Cloudinary
--------------------------------------------------- */
export const fileUpload = async( file ) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dzlxawpcw/upload';

    const formData = new FormData();

    // Agregar Parametros
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        // Realizar Peticion        
        const res = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        // Validar Peticion
        if ( res.ok ) {

            const cloudRes = await res.json();

            // Url de la Imagen Subida
            return cloudRes.secure_url;

        }else {

            throw await res.json();
        }
        
    }catch (err) {

        console.log('🚀 err', err)
    }
}