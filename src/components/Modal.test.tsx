import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import CustomModal from './Modal';

afterEach(() => {
    cleanup();
});

test('modal renders correctly', () => {
    render(
        <CustomModal
            handleOnClose={() => {}}
            handleOnSubmit={() => {}}
            modalTitle="Test Modal"
            isOpen={true}
        >
            <h1>Modal Text</h1>
        </CustomModal>
    );
    const modalElement = screen.getByTestId('modal-box');
    expect(modalElement).toBeInTheDocument();
});

test('modal title is correct', () => {
    render(
        <CustomModal
            handleOnClose={() => {}}
            handleOnSubmit={() => {}}
            modalTitle="Test Modal"
            isOpen={true}
        >
            <h1>Modal Text</h1>
        </CustomModal>
    );
    const modalTitleElement = screen.getByTestId('modal-title');
    expect(modalTitleElement).toHaveTextContent('Test Modal');
});

test('modal body is correct', () => {
    render(
        <CustomModal
            handleOnClose={() => {}}
            handleOnSubmit={() => {}}
            modalTitle="Test Modal"
            isOpen={true}
        >
            <h1>Modal Text</h1>
        </CustomModal>
    );
    const modalTitleElement = screen.getByTestId('modal-body');
    expect(modalTitleElement).toHaveTextContent('Modal Text');
});

test('modal body is closed correctly', async () => {
    let open = true;

    const handleClose = () => {
        open = false;
    };
    const { rerender } = render(
        <CustomModal
            handleOnClose={handleClose}
            handleOnSubmit={() => {}}
            modalTitle="Test Modal"
            isOpen={open}
        >
            <h1>Modal Text</h1>
        </CustomModal>
    );
    const closeButton = screen.getByTestId('close-modal');
    const modalElement = screen.getByTestId('modal-box');
    fireEvent.click(closeButton);
    rerender(
        <CustomModal
            handleOnClose={handleClose}
            handleOnSubmit={() => {}}
            modalTitle="Test Modal"
            isOpen={open}
        >
            <h1>Modal Text</h1>
        </CustomModal>
    );
    expect(modalElement).not.toBeInTheDocument();
});
