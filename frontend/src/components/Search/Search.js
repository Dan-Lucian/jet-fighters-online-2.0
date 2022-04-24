import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import useToggle from '../../hooks/useToggle';
import useAsync from '../../hooks/useAsync';
import { useDebounce } from '../../hooks/useDebounce';

// services
import accountService from '../../services/account.service';

// assets
import srcMagnifyingGlass from '../../assets/magnifying-glass.svg';

// styles
import styles from './Search.module.scss';

// shared components
import SuggestionsProfile from '../SuggestionsProfile/SuggestionsProfile';

const Search = () => {
  const navigate = useNavigate();
  const [textSearch, setTextSearch] = useState('');
  const [isVisibleSearch, toggleIsVisibleSearch] = useToggle(false);
  const { data: profilesFound, run } = useAsync();
  const refSearch = useRef();
  const refButton = useRef();

  useDebounce(
    () => {
      if (textSearch.length >= 3)
        run(accountService.getManyByUserName(textSearch));
    },
    700,
    [textSearch]
  );

  const handleClickGlass = () => {
    toggleIsVisibleSearch();
    if (!isVisibleSearch) refSearch.current.focus();
  };

  const handleBlur = (event) => {
    if (event.relatedTarget === refButton.current) return;
    toggleIsVisibleSearch(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataFromForm = new FormData(event.target);
    navigate(`/profile/${dataFromForm.get('search')}`);
  };

  const classNameWrapper = `${styles.wrapper} ${
    isVisibleSearch && styles['wrapper--visible']
  }`;

  const classNameSearch = `${styles.search} ${
    isVisibleSearch && styles['search--visible']
  }`;

  return (
    <div className={classNameWrapper}>
      <button
        ref={refButton}
        className={styles.button}
        onClick={handleClickGlass}
        type="button"
      >
        <img
          width="22px"
          height="22px"
          src={srcMagnifyingGlass}
          alt="magnifying glass"
        />
      </button>
      <form onSubmit={handleSubmit}>
        <input
          ref={refSearch}
          value={textSearch}
          onChange={(event) => setTextSearch(event.target.value)}
          className={classNameSearch}
          onBlur={handleBlur}
          placeholder="Search"
          type="search"
          name="search"
          id="search"
          aria-label="Search"
          autoComplete="off"
        />
        {isVisibleSearch && profilesFound && (
          <SuggestionsProfile profiles={profilesFound} />
        )}
      </form>
    </div>
  );
};

export default Search;
