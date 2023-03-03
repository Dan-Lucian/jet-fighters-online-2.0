import { MouseEvent } from 'react';
import Styles from 'modules/Notifications/components/CloseNotificationButton/CloseNotificationButton.module.scss';

interface ICloseNotificationButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const CloseNotificationButton = ({ onClick }: ICloseNotificationButtonProps) => {
  return (
    <button onClick={onClick} className={Styles.button} type="button">
      Close
    </button>
  );
};

export default CloseNotificationButton;
