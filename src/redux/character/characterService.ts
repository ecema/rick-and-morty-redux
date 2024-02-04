import axios from "axios";

export async function getCharacterList(name?: string): Promise<any> {
  return await axios.get(
    `https://rickandmortyapi.com/api/character/?name=${name}`
  );
}
