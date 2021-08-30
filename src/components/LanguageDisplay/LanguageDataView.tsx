import { DetectedLanguage } from 'api/detectLanguage';

type Props = {
  language?: DetectedLanguage;
};

function LanguageDataView({ language }: Props) {
  if (!language) throw new Error('No language to render');

  const { languageCode, confidenceScore } = language;
  return (
    <>
      <div>
        Detected language: <span>{languageCode}</span>
      </div>
      <div>
        Confidence: <span>{confidenceScore}</span>
      </div>
    </>
  );
}

export default LanguageDataView;
