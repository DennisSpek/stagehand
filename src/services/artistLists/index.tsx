'use server'

import { fetchTopTracks } from '@/services/spotify/fetchTopTracks';
import { ArtistList, Artist } from '@/types/artistList';
import { auth } from '@/auth';

const userServiceUrl = process.env.NEXT_PUBLIC_STAGEHAND_USER_SERVICE_URL;
//const userServiceUrl = 'http://localhost:3001';
//const apiKey = process.env.NEXT_PUBLIC_USER_SERVICE_API_KEY;

export async function createArtistList(selectedArtists: any, available: number): Promise<ArtistList> {
  const artists: Artist[] = [];
  for (const artist of selectedArtists) {
    const topTracks = await fetchTopTracks(artist.artistId);

    const artistObj: Artist = {
      artistId: artist.artistId,
      name: artist.name,
      image: artist.image,
      tracks: topTracks.map((track: any) => ({ trackId: track.id })),
    }

    artists.push(artistObj);
  }

  const artistList: ArtistList = {
    artists: artists,
    occupied: artists.length,
    available: available,
  }

  return artistList;
}

/**
 * Updates the artist list by ID.
 * @param obj - The artist list data to update.
 * @returns A promise that resolves when the update is complete.
 */
export async function updateListById(obj: ArtistList): Promise<ArtistList | null> {
  try {
    const session = await auth();

    if (!session) {
      throw new Error('Not authenticated');
    }

    const body = {
      userId: session.user?.id,
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
    return null;
  }
}