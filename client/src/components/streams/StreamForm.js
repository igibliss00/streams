import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    renderError = ({error, touched}) => {
        if (error && touched) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }
    
    // {...input} is shortened for onChange={formProps.input.onChange} value={formProps.input.value} 
    // after destructuring out render(formProps.input) into render({input})
    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error':''}`
        return (
            <div className={className}>
                <label htmlFor="">{label}</label>
                <input {...input} autoComplete='on' />
                {this.renderError(meta)}
            </div>
        )
    };

    // e.preventDefault() is not needed, handleSubmit() is a function provided by redux-form
    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <div>
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name='title' component={this.renderInput} label='Enter Title' />
                    <Field name='description' component={this.renderInput} label='Enter Description' />
                    <button className="ui button primary">Submit</button>
                </form>
            </div>
        )
    }
}

const validate = formValue => {
    const error = {};
    if (!formValue.title) {
        error.title = 'You must enter a title'
    }
    if (!formValue.description) {
        error.description = 'You must enter a description'
    }
    return error;
}

// streamForm can be any names, automatically saves the onChange values into Redux
export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);

