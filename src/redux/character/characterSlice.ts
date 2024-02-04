import { CharacterState } from "../../types/character";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CharacterState = {
  loading: true,
  characterList: [],
  error: "",
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    getCharacterListStart: (
      state,
      action: PayloadAction<{ name?: string }>
    ) => {
      state.loading = true;
    },
    getCharacterListSuccess: (state, action: PayloadAction<any>) => {
      state.characterList = action?.payload?.results?.map((character: any) => ({
        id: character.id,
        name: character?.name,
        image: character?.image,
        episoceCount: character?.episode?.length,
      }));
      state.loading = false;
      state.error = "";
    },
    getCharacterListFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action?.payload?.response?.data?.error;
      state.characterList = [];
    },
  },
});

export const {
  getCharacterListStart,
  getCharacterListSuccess,
  getCharacterListFailure,
} = characterSlice.actions;

export default characterSlice.reducer;
