
import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { AwardType, AwardData, AWARD_METADATA } from './models';
import { environment } from './environments/environment';

@Injectable({ providedIn: 'root' })
export class AwardsService {

  private ai = new GoogleGenAI({ apiKey: environment.GEMINI_API_KEY });

  private cache = new Map<string, AwardData>();

  async fetchAwardData(year: number, type: AwardType): Promise<AwardData> {
    const cacheKey = `${type}-${year}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const meta = AWARD_METADATA[type];

    const prompt = `
      You are an entertainment awards expert. For the ${type} ceremony held in ${year} 
      (honoring work from the prior year/season), provide accurate information about 
      the winner of "${meta.topCategory}".
      
      Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks):
      {
        "winner": {
          "title": "The exact winning title",
          "leadCreative": "Director name for films, Creator/Showrunner for TV shows, Composer/Lyricist for musicals",
          "iconicSceneDescription": "A vivid 2-3 sentence description of the most iconic or memorable scene from this winner. Describe the visual elements, characters, setting, and mood in a way that could be turned into a stylized 3D figurine diorama."
        },
        "nominees": [
          { "title": "Nominee 1 title" },
          { "title": "Nominee 2 title" },
          { "title": "Nominee 3 title" },
          { "title": "Nominee 4 title" }
        ]
      }
      
      Important: 
      - Be factually accurate about the actual winner and nominees
      - Include 4-5 actual nominees from that year
      - The iconicSceneDescription should be detailed enough for image generation
      - If the ceremony hasn't happened yet, return the most recent available year's data
      - Return ONLY the JSON, no other text
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          temperature: 0.5,
        },
      });

      const text = response?.text || '';

      const cleanedText = text
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      const data: AwardData = JSON.parse(cleanedText);

      data.imageUrl = await this.generateFigurineImage(data.winner.iconicSceneDescription, type);

      this.cache.set(cacheKey, data);

      return data;
    } catch (error) {
      console.error('Error fetching award data:', error);
      throw new Error('Failed to fetch award data. Please try again.');
    }
  }


  private async generateFigurineImage(sceneDescription: string, awardType: AwardType): Promise<string> {
    const stylePrompt = `
      Create a high-quality 3D render of a collectible vinyl figurine diorama.
      Style: Cute kawaii aesthetic, soft plastic/vinyl texture, glossy finish.
      Lighting: Soft studio lighting with subtle rim light.
      View: Isometric perspective, slightly elevated angle.
      Background: Clean gradient matching the scene mood, no text.
      
      Scene to depict: ${sceneDescription}
      
      Make it look like an official collectible figure you'd buy at a premium store.
      The characters should have slightly oversized heads and simplified cute features.
      Include detailed miniature props and environment elements.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: stylePrompt,
        config: {
          temperature: 0.8,
        },
      });

      const responseData = response as any;

      if (responseData?.candidates?.[0]?.content?.parts) {
        for (const part of responseData.candidates[0].content.parts) {
          if (part.inlineData?.mimeType?.startsWith('image/')) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }

      return this.getPlaceholderImage(sceneDescription, awardType);
    } catch (error) {
      console.warn('Image generation failed, using placeholder:', error);
      return this.getPlaceholderImage(sceneDescription, awardType);
    }
  }

  private getPlaceholderImage(description: string, awardType: AwardType): string {
    const meta = AWARD_METADATA[awardType];
    const bgColor = meta.secondaryColor.replace('#', '');
    const textColor = meta.primaryColor.replace('#', '');
    const shortDesc = encodeURIComponent(description.slice(0, 30) + '...');

    return `https://placehold.co/600x800/${bgColor}/${textColor}?text=${shortDesc}&font=playfair-display`;
  }


  clearCache(): void {
    this.cache.clear();
  }
}