import Button from 'components/Button';
import './styles.css';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  style?: React.CSSProperties;
};

function LanguageDetectorForm({ query, onQueryChange, style }: Props) {
  function handleReset() {
    onQueryChange('');
  }

  return (
    <form
      className="LanguageDetectorForm"
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="query">Query: </label>
      <input
        id="query"
        type="text"
        placeholder="Type anything..."
        onChange={(event) => onQueryChange(event.target.value)}
        value={query}
        autoFocus
      />
      <Button onClick={handleReset} style={{ marginLeft: '12px' }}>
        Reset
      </Button>
    </form>
  );
}

export default LanguageDetectorForm;
