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
    addMessage({ channelId: currentChannelId, message, currentUser })
      .then(() => {
        const { messageAddingStage } = this.props;
        if (messageAddingStage === 'successed') {
          reset();
        }
      });
  }

  render = () => {
    const { handleSubmit, messageAddingStage } = this.props;
    const disabled = messageAddingStage === 'requested';

    return (
      <form className="form d-flex flex-column" onSubmit={handleSubmit(this.addMessage)}>
        <div className="form-group">
          <Field className="form-control" required name="message" component="input" type="text" disabled={disabled} />
          {messageAddingStage === 'failed'
            ? <small className="form-text text-muted">Network error</small>
            : null}
        </div>
        <button className="btn btn-primary ml-auto" disabled={disabled} type="submit">Send</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(MessageForm);
