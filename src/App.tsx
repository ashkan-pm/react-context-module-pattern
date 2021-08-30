import LanguageDetector from 'containers/LanguageDetector';
import Geolocation from 'containers/Geolocation';
import { AsyncStateProvider } from 'contexts/AsyncState';
import './App.css';

function App() {
  return (
    <div className="App">
      <LanguageDetector />
      <AsyncStateProvider>
        <Geolocation />
      </AsyncStateProvider>
    </div>
  );
}

export default App;
