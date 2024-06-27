import React from 'react';
import '../styles/modal.css';

type ModalProps = {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
};

const Modal: React.FC<ModalProps> = ({ show, onClose, onConfirm, message }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="confirm-btn" onClick={onConfirm}>Oui</button>
                    <button className="cancel-btn" onClick={onClose}>Non</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
