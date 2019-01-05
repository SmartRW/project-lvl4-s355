import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import connect from '../utils/connect';

const mapStateToProps = state => state;

@connect(mapStateToProps)
class ButtonAndModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  render = () => {
    const { showModal } = this.state;
    const { modalTitle, buttonName } = this.props;
    return (
      <>
        <Button className="border-0 rounded-0" onClick={this.handleShow} variant="info" type="button" size="sm">
          {buttonName}
        </Button>

        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>
              {modalTitle}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body />

          <Modal.Footer />
        </Modal>
      </>
    );
  }
}

export default ButtonAndModal;
