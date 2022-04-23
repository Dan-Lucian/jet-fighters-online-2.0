import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import useToggle from '../../hooks/useToggle';

// assets
import srcMagnifyingGlass from '../../assets/magnifying-glass.svg';

// styles
import styles from './Search.module.scss';

const Search = () => {
  const navigate = useNavigate();
  const [isVisibleSearch, toggleIsVisibleSearch] = useToggle(false);
  const refSearch = useRef();
  const refButton = useRef();

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
          className={classNameSearch}
          onBlur={handleBlur}
          placeholder="Search"
          type="search"
          name="search"
          id="search"
        />
      </form>
    </div>
  );
};

export default Search;
