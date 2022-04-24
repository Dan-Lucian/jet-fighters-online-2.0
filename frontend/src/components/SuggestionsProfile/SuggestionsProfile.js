import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// styles
import styles from './SuggestionsProfile.module.scss';

const propTypes = {
  profiles: PropTypes.array,
};

const SuggestionsProfile = ({ profiles }) => {
  const navigate = useNavigate();

  // "pointerDown" used because it fires before the "blur" on the search
  // "blur" removes the search bar and the links
  // "click" not used because it fires after the blur
  const getHandlerPointerDown = (userName) => () =>
    navigate(`/profile/${userName}`);

  return (
    <div className={styles.wrapper}>
      {profiles.map((profile) => (
        // not <Link /> used for navigation because pointerDown event needed
        <a
          onPointerDown={getHandlerPointerDown(profile.userName)}
          className={styles.link}
          key={profile.id}
        >
          {profile.userName}
        </a>
      ))}
    </div>
  );
};

SuggestionsProfile.propTypes = propTypes;

export default SuggestionsProfile;
