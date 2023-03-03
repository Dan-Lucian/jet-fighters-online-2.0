import { InputTypeEnum } from 'components/AuthInput/enums/InputTypeEnum';
import Styles from 'components/AuthInput/AuthInput.module.scss';

interface IAuthInputProps {
  id: string;
  type: InputTypeEnum;
  name: string;
  label: string;
  autocomplete?: string;
  pattern?: string;
  undertext?: string;
}

const AuthInput = ({ id, type, label, name, autocomplete, pattern, undertext }: IAuthInputProps) => (
  <div className={Styles.wrapper}>
    <label className={Styles.label} htmlFor={id}>
      {label}
    </label>
    <div className={Styles.innerWrapper}>
      <input
        required
        pattern={pattern}
        className={Styles.input}
        id={id}
        type={type}
        name={name}
        autoComplete={autocomplete}
      />
      <p className={Styles.undertext}>{undertext}</p>
    </div>
  </div>
);

export default AuthInput;
