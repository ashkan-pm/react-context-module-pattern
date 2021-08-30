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
      <button type="reset" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}

export default LanguageDetectorForm;
