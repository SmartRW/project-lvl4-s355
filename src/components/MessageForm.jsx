import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ messageAddingStage, currentChannelId, currentUser }) => ({
  messageAddingStage,
  currentChannelId,
  currentUser,
});

@connect(mapStateToProps)
class MessageForm extends React.Component {
  addMessage = ({ message }) => {
    const {
      reset,
      currentChannelId,
      addMessage,
      currentUser,
    } = this.props;
    addMessage({ channelId: currentChannelId, message, currentUser });
    reset();
  }

  render = () => {
    const { handleSubmit } = this.props;
    return (
      <form className="form d-flex flex-column" onSubmit={handleSubmit(this.addMessage)}>
        <div className="form-group">
          <Field className="form-control" required name="message" component="input" type="text" />
        </div>
        <button className="btn btn-primary ml-auto" type="submit">Send</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(MessageForm);
