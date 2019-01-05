import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../utils/connect';

const mapStateToProps = ({ messageAddingSucceedeed, currentChannelId, currentUser }) => ({
  messageAddingSucceedeed,
  currentChannelId,
  currentUser,
});

@connect(mapStateToProps)
@reduxForm({ form: 'newMessage' })
class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.messageInput = React.createRef();
  }

  addMessage = async ({ message }) => {
    const {
      reset,
      currentChannelId,
      addMessage,
      currentUser,
    } = this.props;
    await addMessage({ channelId: currentChannelId, message, currentUser });
    const { messageAddingSucceedeed } = this.props;
    if (messageAddingSucceedeed) {
      reset();
    }
    this.messageInput.current.focus();
  }

  renderInput = (field) => {
    const { submitting } = this.props;
    return <input {...field.input} className="form-control" type="text" ref={this.messageInput} disabled={submitting} />;
  };

  render = () => {
    const { handleSubmit, messageAddingSucceedeed, submitting } = this.props;

    return (
      <form className="form d-flex flex-column" onSubmit={handleSubmit(this.addMessage)}>
        <div className="form-group">
          <Field component={this.renderInput} name="message" />
          {!messageAddingSucceedeed && <small className="form-text text-mute text-danger">Network error</small>}
        </div>
        <button className="btn btn-primary ml-auto" disabled={submitting} type="submit">send</button>
      </form>
    );
  }
}

export default MessageForm;
