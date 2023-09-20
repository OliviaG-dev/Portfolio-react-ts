import './Modal.css';
import { ModalProps } from '../../services/inteface'

const Modal: React.FC<ModalProps> = ({ closeModal }) => {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Modal Title</h2>
          <p>Modal Content</p>
        </div>
      </div>
    );
  }

export default Modal;