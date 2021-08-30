type DetectLanguageResponse = {
  data: { detections: Array<{ language: string; confidence: number }> };
};

export type DetectedLanguage = {
  languageCode: string;
  confidenceScore: string;
};

export async function detectLanguage(query: string): Promise<DetectedLanguage> {
  const params = new URLSearchParams({
    q: query
  });

  return fetch('https://ws.detectlanguage.com/0.2/detect?' + params, {
    headers: { Authorization: 'Bearer 805ee14f5d88178b6cf4c4ba5f31ffae' }
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data: DetectLanguageResponse) => {
      return transformResponse(data);
    });
}

function transformResponse(resp: DetectLanguageResponse): DetectedLanguage {
  if (!resp.data.detections.length) throw new Error('Could not detect language');

  return {
    languageCode: resp.data.detections[0].language,
    confidenceScore: String(resp.data.detections[0].confidence)
  };
}
