import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../utils/connect';

const mapStateToProps = ({ messageAddingSucceeded, currentChannelId, currentUser }) => ({
  messageAddingSucceeded,
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
    await addMessage({
      channelId: currentChannelId,
      message,
      currentUser,
      reset,
    });
    this.messageInput.current.focus();
  }

  renderInput = (field) => {
    const { submitting } = this.props;
    return <input {...field.input} className="form-control" type="text" ref={this.messageInput} disabled={submitting} autoComplete="off" />;
  };

  render = () => {
    const { handleSubmit, messageAddingSucceeded, submitting } = this.props;

    return (
      <form className="form d-flex" onSubmit={handleSubmit(this.addMessage)}>
        <div className="flex-grow-1 mr-2">
          <Field component={this.renderInput} name="message" />
          {!messageAddingSucceeded && <small className="form-text text-mute text-danger">Network error</small>}
        </div>
        <button className="btn btn-outline-primary ml-auto" disabled={submitting} type="submit">send</button>
      </form>
    );
  }
}

export default MessageForm;
