import timeAgo from 'utils/timeAgo';
import Styles from 'modules/Notifications/components/TimeAgo/TimeAgo.module.scss';

interface ITimeAgoProps {
  timestamp: string;
}

const TimeAgo = ({ timestamp }: ITimeAgoProps) => {
  return (
    <span className={Styles.wrapper} title={timestamp}>
      {timeAgo(timestamp)}
    </span>
  );
};

export default TimeAgo;
