import { useEffect, useState } from 'react';
import Button from 'components/Button';
import './styles.css';

type Props = {
  onQueryChange: (query: string) => void;
  resetState: () => void;
  style?: React.CSSProperties;
};
function LanguageDetectorForm({ onQueryChange, resetState, style }: Props) {
  const [sentence, setSentence] = useState('');
  const [magic, setMagic] = useState('');

  useEffect(() => {
    if (magic.toLowerCase() === 'please') {
      onQueryChange(sentence);
    } else {
      resetState();
    }
  }, [magic, sentence, onQueryChange, resetState]);

  return (
    <form
      className="LanguageDetectorForm"
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor="sentence">Query: </label>
        <input
          id="sentence"
          type="text"
          placeholder="Type anything..."
          onChange={(event) => setSentence(event.target.value)}
          value={sentence}
          autoFocus
        />
      </div>
      <div>
        <label htmlFor="magic">Magic word? </label>
        <input
          id="magic"
          type="text"
          placeholder="Come on..."
          onChange={(event) => setMagic(event.target.value)}
          value={magic}
        />
      </div>
      <Button onClick={resetState} style={{ marginLeft: '12px' }}>
        Reset
      </Button>
    </form>
  );
}

export default LanguageDetectorForm;
