import Styles from 'components/CloseNotificationButton/CloseNotificationButton.module.scss';

interface ICloseNotificationButtonProps {
  onClick: () => void;
}

const CloseNotificationButton = ({ onClick }: ICloseNotificationButtonProps) => {
  return (
    <button onClick={onClick} className={Styles.button} type="button">
      Close
    </button>
  );
};

export default CloseNotificationButton;
