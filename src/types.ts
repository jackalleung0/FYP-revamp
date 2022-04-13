export interface UserProfile {
  // should be the firebase's artwork's ID
  likedArtworks: string[];
  skipGettingStarted: boolean;
  preferenceTags: { [key: string]: number };
}
