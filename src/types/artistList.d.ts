type Artist = {
  artistId: string;
  name: string;
  image: string;
  tracks: { trackId: string }[];
};

type ArtistList = {
  artists: Artist[];
  occupied: number;
  available: number;
};
