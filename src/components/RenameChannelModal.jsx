import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { Field, reduxForm } from 'redux-form';
import connect from '../utils/connect';
import { checkForEmptyString, checkForAlphaNumeric } from '../utils/validators';

const mapStateToProps = ({ channels, channelRenamingSucceeded }) => ({
  channels,
  channelRenamingSucceeded,
});

@connect(mapStateToProps)
@reduxForm({ form: 'renameChannel' })
class NewChannelModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.channelNewNameInput = React.createRef();
  }

  handleShow = () => {
    this.setState({ showModal: true });
    setTimeout(() => this.channelNewNameInput.current.focus(), 0);
  };

  handleClose = () => {
    const { reset } = this.props;
    this.setState({ showModal: false });
    reset();
  };

  renameChannel = async ({ channelNewName, channelId }) => {
    const { renameChannel } = this.props;
    await renameChannel({ channelNewName, channelId, closeModal: this.handleClose });
  }

  renderInput = ({ input, meta: { touched, error } }) => {
    const { submitting } = this.props;
    return (
      <>
        <input {...input} className="form-control" type="text" ref={this.channelNewNameInput} disabled={submitting} />
        {touched && (error && <small className="form-text text-mute text-danger">{error}</small>)}
      </>
    );
  }

  render = () => {
    const { showModal } = this.state;
    const {
      handleSubmit,
      submitting,
      channelRenamingSucceeded,
    } = this.props;
    return (
      <>
        <button type="button" onClick={this.handleShow}>
          rename
        </button>

        {showModal && (
          <Modal show={showModal} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title>
                new name
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form className="form d-flex flex-column" onSubmit={handleSubmit(this.renameChannel)}>
                <div className="form-group">
                  <Field
                    component={this.renderInput}
                    name="channelNewName"
                    validate={[
                      checkForEmptyString,
                      checkForAlphaNumeric,
                      // checkForUniqueName(channels),
                    ]}
                  />
                  {!channelRenamingSucceeded && <small className="form-text text-mute text-danger">Network error</small>}
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

export default NewChannelModal;
