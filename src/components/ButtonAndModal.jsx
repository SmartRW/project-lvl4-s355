import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { Field, reduxForm } from 'redux-form';
import connect from '../utils/connect';

const mapStateToProps = ({ channels, channelAddingSucceedeed }) => ({
  channels,
  channelAddingSucceedeed,
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
    // this.newChannelNameInput.current.focus();
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  addChannel = async ({ newChannelName }) => {
    const { addChannel, channels } = this.props;
    await addChannel({ newChannelName, channels });
    const { channelAddingSuccess } = this.props;
    if (channelAddingSuccess) {
      this.handleClose();
    }
  }

  renderInput = (field) => {
    const { submitting } = this.props;
    return <input {...field.input} className="form-control" type="text" ref={this.newChannelNameInput} disabled={submitting} />;
  }

  render = () => {
    const { showModal } = this.state;
    const {
      modalTitle,
      buttonName,
      handleSubmit,
      submitting,
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
                  <Field component={this.renderInput} name="newChannelName" />
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
