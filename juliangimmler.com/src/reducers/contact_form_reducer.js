const INITIAL_STATE = {
    show: false,
    form: {
        name: '',
        email: '',
        subject: '',
        body: ''
    },
    formKey: Math.random()
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'TOGGLE_CONTACT_FORM':
            return {
                ...state,
                show: !action.show
            };
        case 'UPDATE_CONTACT_FORM':
            return {
                ...state,
                form: action.form
            }
        case 'SUBMIT_CONTACT_FORM':
            if(action.payload.status === 200)
                alert("Thank you for reaching out! Your message has been sent successfully and I will get back to you as soon as possible.");
            else alert("Something went wrong.. I may not have gotten your message. To be sure I get, feel free to contact me directly at julian.gimmler@gmail.com. Thank you!");

            return {
                ...state,
                form: {
                    name: '',
                    email: '',
                    subject: '',
                    body: ''
                },
                show: false,
                formKey: Math.random()
            }
        default:
            return state;
    }
}
