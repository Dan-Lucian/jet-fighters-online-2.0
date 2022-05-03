import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// styles
import styles from './SuggestionsProfile.module.scss';

const propTypes = {
  profiles: PropTypes.array.isRequired,
};

const SuggestionsProfile = ({ profiles }) => {
  const navigate = useNavigate();

  // "pointerDown" used because it fires before the "blur" on the search
  // "blur" removes the search bar and the links
  // "click" not used because it fires after the blur
  const getHandlerPointerDown = (userName) => () =>
    navigate(`/profile/${userName}`);

  const noProfilesFound = profiles.length === 0;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Search</h2>
      {noProfilesFound && (
        <div className={styles.noSuggestions}>Nothing found</div>
      )}
      {!noProfilesFound && (
        <ul className={styles.list}>
          {
            // not <Link /> used for navigation
            // because pointerDown event needed
          }
          {profiles.map((profile) => (
            <li key={profile.id}>
              <a
                onPointerDown={getHandlerPointerDown(profile.userName)}
                className={styles.link}
              >
                {profile.userName}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SuggestionsProfile.propTypes = propTypes;

export default SuggestionsProfile;
