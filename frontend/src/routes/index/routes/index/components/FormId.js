// shared components
import { useSettings } from '../../../../../providers/ProviderSettings';

// styles
import styles from './FormId.module.scss';

const FormId = () => {
  const [settings, setSettings] = useSettings();
  const { idJoin } = settings;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Id submitted');
  };

  const handleChange = (e) => {
    setSettings((prev) => ({ ...prev, idJoin: e.target.value }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Insert room ID here"
        value={idJoin}
        onChange={handleChange}
      />
    </form>
  );
};

export default FormId;
