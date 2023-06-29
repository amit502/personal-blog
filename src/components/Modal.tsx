import React from 'react';
import { Close } from '@carbon/icons-react';
import { CircularProgress } from '@mui/material';
import Button from './Button';
import { Modal } from '@mui/material';

interface ModalProps {
    handleOnClose: () => void;
    handleOnSubmit: () => void;
    modalTitle: string;
    children: React.ReactNode;
    isOpen?: boolean;
    isProgressBar?: boolean;
    showButton?: boolean;
}

const CustomModal = ({
    handleOnClose,
    handleOnSubmit,
    modalTitle,
    children,
    isOpen = true,
    isProgressBar = false,
    showButton = true,
}: ModalProps) => {
    return (
        <Modal open={isOpen}>
            <div
                className="container-fluid modal-box"
                tabIndex={-1}
                role="dialog"
                data-testid="modal-box"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className=" d-flex flex-row">
                            <span className="pl-3 pt-3">
                                <Close
                                    data-testid="close-modal"
                                    className="close-modal"
                                    onClick={() => handleOnClose()}
                                    style={{ cursor: 'pointer' }}
                                />
                            </span>
                            <div
                                className="pt-3 pl-2"
                                style={{
                                    color: 'black',
                                    fontSize: '22px',
                                    fontWeight: 'bold',
                                }}
                                data-testid="modal-title"
                            >
                                {modalTitle}
                            </div>
                        </div>
                        <div
                            className="modal-body modal-form-body"
                            data-testid="modal-body"
                        >
                            {children}
                            <div className="button-section">
                                {isProgressBar ? (
                                    <CircularProgress />
                                ) : showButton ? (
                                    <Button
                                        type={'submit'}
                                        label="Delete"
                                        handleClick={() => handleOnSubmit()}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CustomModal;
