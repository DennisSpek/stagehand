import { ArtistList, Artist } from '@/types/artistList';

const userServiceUrl = process.env.NEXT_PUBLIC_STAGEHAND_USER_SERVICE_URL;
//const userServiceUrl = 'http://localhost:3001';
//const apiKey = process.env.NEXT_PUBLIC_USER_SERVICE_API_KEY;

/**
 * Updates the artist list by ID.
 * @param id - The ID of the user.
 * @param obj - The artist list data to update.
 * @returns A promise that resolves when the update is complete.
 */
export async function updateListById(id: string, obj: ArtistList): Promise<ArtistList> {
  try {
    const body = {
      userId: id,
      artistListData: obj,
    };

    const response = await fetch(`${userServiceUrl}/artist_list/upsert`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update artist list');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}