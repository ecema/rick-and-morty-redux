export interface Character {
  id: string;
  name: string;
  image: string;
  episoceCount: number;
}
export interface CharacterState {
  characterList: Character[];
  loading: boolean;
  error: string;
}
