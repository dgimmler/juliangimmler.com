const INITIAL_STATE = '';

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case 'UPDATE_ACTIVE_SPLASHPHOTO':
            // get previous and next splashPhotos (for nav)
            const splashPhotos = action.payload.allPhotos;
            const activePhoto = action.payload.activePhoto;
            let previousSplashPhoto = 0;
            let nextSplashPhoto = 0;

            // get array index for active photo
            for(let i=0; i<splashPhotos.length; i++){
                let splashPhoto = splashPhotos[i];
                if(splashPhoto.fields.image.fields.title === activePhoto){
                    // previous and next photo indeces will be index
                    // immediately before and immediately after active array index respectively
                    let previousIndex = i - 1;
                    let nextIndex = i + 1;

                    // if active photo is first item in array, previous will be last
                    if(previousIndex < 0)
                        previousIndex = splashPhotos.length - 1;

                    // if active photo is last item in array, next will be first
                    if(nextIndex > splashPhotos.length - 1)
                        nextIndex = 0;

                    previousSplashPhoto = splashPhotos[previousIndex].fields.image.fields.title;
                    nextSplashPhoto = splashPhotos[nextIndex].fields.image.fields.title;
                }
            }

            return {
                ...state,
                activeSplashPhoto : activePhoto,
                previousSplashPhoto : previousSplashPhoto,
                nextSplashPhoto : nextSplashPhoto
            };
        default:
            return state;
    }

}
