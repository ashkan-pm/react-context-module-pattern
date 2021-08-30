import { MouseEvent } from 'react';
import './styles.css';

type Props = {
  children: JSX.Element | string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
};
function Button({ children, onClick, style }: Props) {
  return (
    <button type="reset" onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export default Button;
