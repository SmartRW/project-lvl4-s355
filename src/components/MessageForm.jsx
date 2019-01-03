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
  constructor(props) {
    super(props);
    this.messageInput = React.createRef();
  }

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
    this.messageInput.current.focus();
  }

  renderInput = field => <input {...field.input} className="form-control" required type="text" ref={this.messageInput} />;

  render = () => {
    const { handleSubmit, messageAddingStage } = this.props;
    const disabled = messageAddingStage === 'requested';

    return (
      <form className="form d-flex flex-column" onSubmit={handleSubmit(this.addMessage)}>
        <div className="form-group">
          <Field component={this.renderInput} name="message" />
          {messageAddingStage === 'failed'
            ? <small className="form-text text-mute text-danger">Network error</small>
            : null}
        </div>
        <button className="btn btn-primary ml-auto" disabled={disabled} type="submit">send</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(MessageForm);
