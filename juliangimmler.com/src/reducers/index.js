import { combineReducers } from 'redux';
import SplashPhotoReducer from './splash_photo_reducer';
import UpdateSplashPhotoReducer from './update_splash_photo_reducer';
import MainHeaderReducer from './main_header_reducer';
import AboutMeReducer from './about_me_reducer';
import ResumeItemReducer from './resume_item_reducer';
import PaperResumeReducer from './paper_resume_reducer';
import ToggleResumeReducer from './toggle_resume_reducer';
import BlogPostReducer from './blog_post_reducer';
import GallaryReducer from './gallary_reducer';
import ContactFormReducer from './contact_form_reducer';
import SideHeaderReducer from './side_header_reducer';

const rootReducer = combineReducers ({
    splashPhotos: SplashPhotoReducer,
    activeSplashPhoto: UpdateSplashPhotoReducer,
    mainHeader: MainHeaderReducer,
    aboutMe: AboutMeReducer,
    resumeItems: ResumeItemReducer,
    resume: PaperResumeReducer,
    showPaperResume: ToggleResumeReducer,
    blogPosts: BlogPostReducer,
    gallaryItems: GallaryReducer,
    contactForm: ContactFormReducer,
    sideHeader: SideHeaderReducer
});

export default rootReducer;
