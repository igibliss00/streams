import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
    renderInput({input, label, meta}) {
        return (
            <div className="field">
                <label htmlFor="">{label}</label>
                <input {...input} />
                <div>{meta.error}</div>
            </div>
        )
    };

    onSubmit = (formValues) => {
        console.log(formValues);
    };

    render() {
        return (
            <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name='title' component={this.renderInput} label='Enter Title' />
                <Field name='description' component={this.renderInput} label='Enter Description' />
                <button className="ui button primary">Submit</button>
            </form>
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

export default reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);