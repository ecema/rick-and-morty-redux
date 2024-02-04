import { useDispatch, useSelector } from "react-redux";
import { getCharacterListStart } from "../redux/character/characterSlice";
import { AppState } from "../redux/store";
import { FunctionComponent, useMemo } from "react";
import MultiSelect from "./ui/MultiSelect";
import { SelectOption } from "../types/select";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundryPlaceholder from "./ui/ErrorBoundryPlaceholder";

const RickandMorty: FunctionComponent = () => {
  const dispatch = useDispatch();
  const characterState = useSelector(
    (state: AppState) => state?.characterState
  );
  const { characterList, loading, error } = characterState;

  const handleSearchTermUpdate = (searchTerm: string) => {
    searchTerm && dispatch(getCharacterListStart({ name: searchTerm }));
  };

  const selectOptionList: SelectOption[] = useMemo(() => {
    return characterList?.map((character) => ({
      id: character?.id,
      image: character?.image,
      title: character?.name,
      detail: getEpisodeText(character?.episoceCount),
    }));
  }, [characterList]);

  return (
    <ErrorBoundary fallback={<ErrorBoundryPlaceholder />}>
      <MultiSelect
        loading={loading}
        error={error}
        placeholder="Search character..."
        selectOptionList={selectOptionList}
        handleSearchTermUpdate={handleSearchTermUpdate}
      />
    </ErrorBoundary>
  );
};

export default RickandMorty;

const getEpisodeText = (episoceCount: number) =>
  !episoceCount || episoceCount == 0
    ? "No episode"
    : episoceCount > 1
    ? episoceCount + " episodes"
    : "1 episode";
