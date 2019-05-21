import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={props.resetPls}
        onRequestClose={props.dontReset}
        contentLabel="Do you wish to reset?"
        closeTimeoutMS={200}
        className="modal"
        ariaHideApp={false}>
    <h3 className="modal__title">Do you wish to reset?</h3>
    <p className="modal__body">You will gain a bonus of {props.calcBonus}% and will lose {props.count} clicks.</p>
    <button className="button" onClick={props.handleReset}>Yes</button>
    <button className="button" onClick={props.dontReset}>No</button>
    </Modal>
    );

export default OptionModal;