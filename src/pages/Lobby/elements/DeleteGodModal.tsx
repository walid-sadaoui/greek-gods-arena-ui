import React from 'react';
import Button from 'components/common/Button';
import Modal from 'components/common/Modal';
import { GreekGods } from 'models/Character';

const DeleteGodModal: React.FC<{
  greekGodName: GreekGods;
  onYes: () => void;
  hide: () => void;
  isShowing: boolean;
}> = ({ greekGodName, onYes, isShowing, hide }) => {
  return (
    <Modal isShowing={isShowing} hide={hide} title={`Fire ${greekGodName} ?`}>
      <p className='pb-4 font-sans'>
        You can re-hire your God later, but all the SkillPoints earned will be
        lost !
      </p>
      <Button value='Yes' onClick={onYes} />
    </Modal>
  );
};

export default DeleteGodModal;
