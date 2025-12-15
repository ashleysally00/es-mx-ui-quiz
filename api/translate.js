// Vercel Serverless Function for Gemini Translation
// File location: api/translate.js

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phrase } = req.body;

    // Validation
    if (!phrase || typeof phrase !== 'string') {
      return res.status(400).json({ error: 'Phrase is required' });
    }

    if (phrase.length > 500) {
      return res.status(400).json({ error: 'Phrase too long (max 500 characters)' });
    }

    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Detect language
    const isSpanish = /[áéíóúñü]/i.test(phrase) || 
                      /\b(el|la|los|las|un|una|de|del|en|con|por|para|que|como)\b/i.test(phrase);
    
    const prompt = isSpanish 
      ? `You are a professional UX/UI translator specializing in software localization for Latin America (es-MX). Translate this Spanish phrase to English for use in a user interface or app:

"${phrase}"

Requirements:
- Use professional UI/UX terminology
- Keep the tone appropriate for software interfaces
- Provide the translation and a brief explanation of why this translation is appropriate for UI context
- Format: "Translation: [translation]\\n\\nContext: [explanation]"`
      : `You are a professional UX/UI translator specializing in software localization for Latin America (es-MX). Translate this English phrase to Mexican Spanish for use in a user interface or app:

"${phrase}"

Requirements:
- Use professional es-MX UI/UX terminology (not casual Spanish)
- Avoid Spanglish or literal translations
- Keep the tone appropriate for software interfaces
- Prefer the informal "tú" form when appropriate for modern consumer apps
- Provide the translation and a brief explanation of why this translation is appropriate for UI context
- Format: "Translation: [translation]\\n\\nContext: [explanation]"`;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return res.status(response.status).json({ 
        error: 'Translation service error',
        details: errorData.error?.message 
      });
    }

    const data = await response.json();
    const translation = data.candidates[0].content.parts[0].text;

    return res.status(200).json({ translation });

  } catch (error) {
    console.error('Translation error:', error);
    return res.status(500).json({ 
      error: 'Translation failed',
      message: error.message 
    });
  }
}
