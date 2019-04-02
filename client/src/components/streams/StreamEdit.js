import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        // fetches the pertaining stream to the state
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = formValues => {
        // the editStream action creator requires two parameters
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        if(!this.props.stream){
            return <div>'...loading'</div>;
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    /* the first set of brackets indicate JavaScript, the inner set indicates an object, 
                    this can be destructured or done by lodash
                    the important thing is only to pass the items to be updated, excluding the ID or the UserID*/
                    initialValues={{ title: this.props.stream.title,
                                    description: this.props.stream.description }} 
                    onSubmit={this.onSubmit} 
                />
            </div>
        )
    };
};

const mapStateToProps = (state, ownProps) => {
    // brings in the pertaining stream that was fetched into the state into the component as props. 
    // Cannot use regular props since this fn is not in the component
    return ({
        stream: state.streams[ownProps.match.params.id]
    });
};

export default connect(
    mapStateToProps, 
    { fetchStream, editStream }
    )(StreamEdit);