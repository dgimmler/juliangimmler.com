import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    toggleContactForm,
    updateContactform,
    submitContactForm
} from '../../actions/index';
import './contact_form.css';

class ContactForm extends Component {
    componentWillMount(){
        this.props.toggleContactForm(true);
    }

    closeForm(){
        this.props.toggleContactForm(true);
    }

    handleKeyUp(event){
        let form = this.props.contactForm.form;
        let type = event.target.placeholder;
        if(type)
            type = type.toLowerCase().replace(/\*/gi,'');

        form[type] = event.target.value;

        this.props.updateContactform(form);

        /*
        if (event.key === 'Enter' && event.target.value && event.target.value != ''){
            this.props.addBlogFilter(event.target.value,this.props.blogFilter);
            this.props.updateBlogFilterValue('');
            this.refs.filterValue.value = '';
            this.refs.filterValueSmall.value = '';
        }
        */
    }

    submitForm(event){
        let form = this.props.contactForm.form;
        if(!form.name || !form.email || !form.subject || !form.body){
            alert("Please fill out the entire form before submitting");
            event.preventDefault();

            return;
        }

        event.preventDefault();
        this.props.submitContactForm(form);
    }

    render(){
        let showForm = this.props.contactForm.show;
        let hiddenClass = showForm ? '' : ' hidden';
        let key = this.props.contactForm.formKey;

        return (
            <div className={ "contact-form" + hiddenClass } >
                <form className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2" key={ key }>
                    <span
                        className="fa fa-close"
                        onClick={ () => this.closeForm() }
                    />

                    <h4>Contact Me</h4>

                    <div className='form-input'>
                        <input
                            type="text"
                            name="contact-form"
                            placeholder="Name*"
                            autoComplete="Name"
                            onKeyUp={ this.handleKeyUp.bind(this) }
                        />
                    </div>

                    <div className='form-input'>
                        <input
                            type="text"
                            name="contact-form"
                            placeholder="Email*"
                            autoComplete="Email"
                            onKeyUp={ this.handleKeyUp.bind(this) }
                        />
                    </div>

                    <div className='form-input'>
                        <input
                            type="text"
                            name="contact-form"
                            placeholder="Subject*"
                            autoComplete="Subject"
                            onKeyUp={ this.handleKeyUp.bind(this) }
                        />
                    </div>

                    <div className='form-input'>
                        <textarea
                            type="text"
                            name="contact-form"
                            placeholder="Body*"
                            autoComplete="Body"
                            onKeyUp={ this.handleKeyUp.bind(this) }
                        />
                    </div>

                    <div className='form-input submit'>
                        <input
                            type="submit"
                            name="contact-form"
                            onClick={ this.submitForm.bind(this) }
                        />
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        contactForm: state.contactForm
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            toggleContactForm: toggleContactForm,
            updateContactform: updateContactform,
            submitContactForm: submitContactForm
        },
        dispatch
    );
}

export default connect(mapStateToProps,matchDispatchToProps)(ContactForm);
