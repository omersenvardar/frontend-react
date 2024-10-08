import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const BaseModal = (props) => {
  const { modalIsOpen, afterOpenModal, onRequestClose } = props;
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel=""
    >
      {props.children}
    </Modal>
  );
};

export default BaseModal;
