import './Modal.css';
import { ModalProps } from '../../services/inteface'


const Modal: React.FC<ModalProps> = ({ closeModal, project }) => {
  const handleClose = () => {
    closeModal();
  }
    return (
      <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={closeModal}>&times;</span>

          {project && <h2>{project.title}</h2>}
          {project && <p>{project.id}</p>}
        </div>
      </div>
    );
  }

export default Modal;