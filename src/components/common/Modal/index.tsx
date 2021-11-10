import React from 'react';
import ReactDOM from 'react-dom';
import FocusLock from 'react-focus-lock';
import Button from '../Button';

export const ModalHeader: React.FC<{ onClose: () => void; title: string }> = ({
  onClose,
  title,
}) => {
  return (
    <div className='flex items-center w-full'>
      <div className='flex-1'></div>
      <div className='text-lg'>{title}</div>
      <div className='flex justify-end flex-1'>
        <Button data-dismiss='modal' aria-label='Close' onClick={onClose}>
          <span aria-hidden='true'>&times;</span>
        </Button>
      </div>
    </div>
  );
};

interface ModalProps {
  isShowing: boolean;
  hide: () => void;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isShowing, hide, children, title }) => {
  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && isShowing) {
      hide();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);
    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    };
  }, [isShowing]);

  return isShowing
    ? ReactDOM.createPortal(
        <>
          <div
            className='fixed top-0 left-0 z-20 w-full h-screen bg-black bg-opacity-75'
            aria-hidden
            onClick={hide}
          ></div>
          <FocusLock>
            <div
              className='absolute z-30 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
              aria-modal
              aria-label={title}
              role='dialog'
              tabIndex={-1}
            >
              <div className='flex flex-col items-center justify-between p-4 bg-white border-4 border-black rounded-container'>
                <ModalHeader title={title} onClose={hide} />
                {children}
              </div>
            </div>
          </FocusLock>
        </>,
        document.body
      )
    : null;
};

export default Modal;
