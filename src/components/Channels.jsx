import React from 'react';
import cn from 'classnames';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { Field, reduxForm } from 'redux-form';
import connect from '../utils/connect';
import {
  checkForEmptyString,
  checkForAlphaNumeric,
  checkForUniqueOrCurrentName,
  checkForMaxLength,
} from '../utils/validators';

const mapStateToProps = ({
  channels,
  currentChannelId,
  currentlyEditedChannelId,
  channelRenamingSucceeded,
  channelRemovalSucceeded,
}) => ({
  channels,
  currentChannelId,
  currentlyEditedChannelId,
  channelRenamingSucceeded,
  channelRemovalSucceeded,
  initialValues: {
    channelNewName: channels[currentlyEditedChannelId]
      ? channels[currentlyEditedChannelId].name
      : null,
  },
});

@connect(mapStateToProps)
@reduxForm({ form: 'renameChannel', enableReinitialize: true })
class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRenameChannelModal: false,
      showRemoveChannelModal: false,
    };
    this.renameChannelInput = React.createRef();
  }

  onClick = id => () => {
    const { switchCurrentChannelId } = this.props;
    switchCurrentChannelId({ newChannelId: id });
  }

  onSelect = (id) => {
    const { setCurrentlyEditedChannelId } = this.props;
    setCurrentlyEditedChannelId({ channelId: id });
  }

  handleShowRenameModal = () => {
    this.setState({ showRenameChannelModal: true });
    setTimeout(() => {
      this.renameChannelInput.current.focus();
      this.renameChannelInput.current.select();
    }, 0);
  }

  handleCloseRenameModal = () => {
    const { reset, resetCurrentlyEditedChannelId } = this.props;
    this.setState({ showRenameChannelModal: false });
    resetCurrentlyEditedChannelId();
    reset();
  };

  handleShowRemoveModal = () => {
    this.setState({ showRemoveChannelModal: true });
  }

  handleCloseRemoveModal = () => {
    const { resetCurrentlyEditedChannelId } = this.props;
    this.setState({ showRemoveChannelModal: false });
    resetCurrentlyEditedChannelId();
  }

  renameChannel = async ({ channelNewName }) => {
    const { renameChannel, currentlyEditedChannelId } = this.props;
    await renameChannel({
      channelNewName,
      channelId: currentlyEditedChannelId,
      closeModal: this.handleCloseRenameModal,
    });
  }

  removeChannel = async () => {
    const { removeChannel, currentlyEditedChannelId } = this.props;
    await removeChannel({
      channelId: currentlyEditedChannelId,
      closeModal: this.handleCloseRemoveModal,
    });
  }

  renderInput = ({ input, meta: { touched, error } }) => {
    const { submitting } = this.props;
    return (
      <>
        <input {...input} className="form-control" type="text" ref={this.renameChannelInput} disabled={submitting} />
        {touched && (error && <small className="form-text text-mute text-danger">{error}</small>)}
      </>
    );
  }

  render = () => {
    const { showRenameChannelModal, showRemoveChannelModal } = this.state;
    const {
      channels,
      currentChannelId,
      handleSubmit,
      submitting,
      channelRenamingSucceeded,
      channelRemovalSucceeded,
      initialValues: { channelNewName },
    } = this.props;

    return (
      <div className="mb-3 p-2 d-flex flex-column">
        {showRenameChannelModal && (
          <Modal show={showRenameChannelModal} onHide={this.handleCloseRenameModal}>
            <Modal.Header>
              <Modal.Title>
                enter new name
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
                      checkForMaxLength,
                      checkForUniqueOrCurrentName(channels, channelNewName),
                    ]}
                  />
                  {!channelRenamingSucceeded && <small className="form-text text-mute text-danger">Network error</small>}
                </div>
                <button className="btn btn-outline-primary ml-auto" disabled={submitting} type="submit">add</button>
              </form>
            </Modal.Body>

            <Modal.Footer />
          </Modal>
        )}
        {showRemoveChannelModal && (
          <Modal show={showRemoveChannelModal} onHide={this.handleCloseRemoveModal}>
            <Modal.Header>
              <Modal.Title>
                are you sure?
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {!channelRemovalSucceeded && <small className="form-text text-mute text-danger">Network error</small>}
              <div className="d-flex">
                <button className="btn btn-outline-secondary mr-auto" onClick={this.handleCloseRemoveModal} disabled={submitting} type="button">please dont</button>
                <button className="btn btn-outline-primary" onClick={this.removeChannel} disabled={submitting} type="button">kill it</button>
              </div>
            </Modal.Body>

            <Modal.Footer />
          </Modal>
        )}
        {Object.values(channels).map(({ id, name, removable }) => (
          <Dropdown key={id} className="d-flex">
            <Button
              variant="info"
              onClick={this.onClick(id)}
              className={cn({
                'mb-1': true,
                'rounded-0': true,
                'text-left': true,
                'overflow-hidden': true,
                'text-nowrap': true,
                'flex-grow-1': true,
                'font-weight-bolder': currentChannelId === id,
              })}
            >
              {`# ${name}`}
            </Button>

            <Dropdown.Toggle split variant="info" className="mb-1 rounded-0 ml-1" id={`channel-${id}`} />

            <Dropdown.Menu>
              <Dropdown.Item
                eventKey={id}
                onSelect={this.onSelect}
                onClick={this.handleShowRenameModal}
              >
                rename
              </Dropdown.Item>
              {removable
                && (
                  <Dropdown.Item
                    eventKey={id}
                    onSelect={this.onSelect}
                    onClick={this.handleShowRemoveModal}
                  >
                    remove
                  </Dropdown.Item>
                )}
            </Dropdown.Menu>
          </Dropdown>
        ))}
      </div>
    );
  }
}

export default Channels;
