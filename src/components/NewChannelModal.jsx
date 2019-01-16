import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { Field, reduxForm } from 'redux-form';
import connect from '../utils/connect';
import {
  checkForEmptyString,
  checkForAlphaNumeric,
  checkForUniqueName,
  checkForMaxLength,
} from '../utils/validators';

const mapStateToProps = ({ channels, channelEditingState }) => ({
  channels,
  channelEditingState,
});

@connect(mapStateToProps)
@reduxForm({ form: 'newChannel' })
class NewChannelModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.newChannelNameInput = React.createRef();
  }

  handleShow = () => {
    this.setState({ showModal: true });
    setTimeout(() => this.newChannelNameInput.current.focus(), 0);
  };

  handleClose = () => {
    const { reset, channelEditingState } = this.props;
    if (channelEditingState !== 'requesting') {
      this.setState({ showModal: false });
      reset();
    }
  };

  addChannel = async ({ newChannelName }) => {
    const { editChannel } = this.props;
    await editChannel({ type: 'addChannel', data: { newChannelName }, closeModal: this.handleClose });
  }

  renderInput = ({ input, meta: { touched, error } }) => {
    const { submitting } = this.props;
    return (
      <>
        <input {...input} className="form-control" type="text" ref={this.newChannelNameInput} disabled={submitting} />
        {touched && (error && <small className="form-text text-mute text-danger">{error}</small>)}
      </>
    );
  }

  render = () => {
    const { showModal } = this.state;
    const {
      handleSubmit,
      submitting,
      channelEditingState,
      channels,
    } = this.props;
    return (
      <>
        <Button className="rounded-0" onClick={this.handleShow} variant="info" type="button" size="sm">
          + add new channel
        </Button>

        {showModal && (
          <Modal show={showModal} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title>
                enter name for new channel
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form className="form d-flex flex-column" onSubmit={handleSubmit(this.addChannel)}>
                <div className="form-group">
                  <Field
                    component={this.renderInput}
                    name="newChannelName"
                    validate={[
                      checkForEmptyString,
                      checkForAlphaNumeric,
                      checkForMaxLength,
                      checkForUniqueName(channels),
                    ]}
                  />
                  {channelEditingState === 'failure' && <small className="form-text text-mute text-danger">Network error</small>}
                </div>
                <button className="btn btn-outline-primary ml-auto" disabled={submitting} type="submit">add</button>
              </form>
            </Modal.Body>

            <Modal.Footer />
          </Modal>
        )}
      </>
    );
  }
}

export default NewChannelModal;
