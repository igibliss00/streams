import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { createStream } from '../../actions/index'

class StreamCreate extends React.Component {
    
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

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    };

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
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

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped); 