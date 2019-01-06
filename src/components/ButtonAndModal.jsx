import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { Field, reduxForm } from 'redux-form';
import connect from '../utils/connect';

const checkForEmptyString = value => (!value || !value.trim()
  ? 'name must not be empty'
  : undefined
);

const checkForAlphaNumeric = value => (value && /[^a-zA-Z0-9 ]/i.test(value)
  ? 'name may contain only alphanumeric characters'
  : undefined
);

const mapStateToProps = ({ channels, channelAddingSucceeded }) => ({
  channels,
  channelAddingSucceeded,
});

@connect(mapStateToProps)
@reduxForm({ form: 'newChannel' })
class ButtonAndModal extends React.Component {
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
    const { reset } = this.props;
    this.setState({ showModal: false });
    reset();
  };

  addChannel = async ({ newChannelName }) => {
    const { addChannel, channels } = this.props;
    await addChannel({ newChannelName, channels });
    const { channelAddingSucceeded } = this.props;
    if (channelAddingSucceeded) {
      this.handleClose();
    }
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
      modalTitle,
      buttonName,
      handleSubmit,
      submitting,
      channelAddingSucceeded,
    } = this.props;
    return (
      <>
        <Button className="border-0 rounded-0" onClick={this.handleShow} variant="info" type="button" size="sm">
          {buttonName}
        </Button>

        {showModal && (
          <Modal show={showModal} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title>
                {modalTitle}
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
                    ]}
                  />
                  {!channelAddingSucceeded && <small className="form-text text-mute text-danger">Network error</small>}
                </div>
                <button className="btn btn-primary ml-auto" disabled={submitting} type="submit">add</button>
              </form>
            </Modal.Body>

            <Modal.Footer />
          </Modal>
        )}
      </>
    );
  }
}

export default ButtonAndModal;
