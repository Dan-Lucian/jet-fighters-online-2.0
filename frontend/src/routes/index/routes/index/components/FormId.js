import styles from './FormId.module.scss';

const FormId = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Id submitted');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Insert room ID here"
      />
    </form>
  );
};

export default FormId;
