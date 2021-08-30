import './styles.css';

type Props = {
  children: JSX.Element;
  style?: React.CSSProperties;
};
function Display({ children, style = {} }: Props) {
  return (
    <div className="LanguageDisplay" style={style}>
      {children}
    </div>
  );
}

export default Display;
