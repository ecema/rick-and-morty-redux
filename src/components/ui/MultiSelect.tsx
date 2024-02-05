import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  FunctionComponent,
  useRef,
  MutableRefObject,
} from "react";
import debounce from "lodash.debounce";
import { ChevronDown, XSquare } from "lucide-react";
import { SelectOption } from "../../types/select";

const MultiSelect: FunctionComponent<{
  loading: boolean;
  error: string;
  placeholder?: string;
  selectOptionList: SelectOption[];
  handleSearchTermUpdate: (searchTerm: string) => void;
}> = ({
  loading,
  error,
  placeholder = "Search...",
  selectOptionList,
  handleSearchTermUpdate,
}) => {
  const searchTermRef = useRef() as MutableRefObject<HTMLInputElement>;

  const [displayOptionList, setDisplayOptionList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemList, setselectedItemList] = useState<string[]>([]);

  const handleSearchTermChange = () => {
    setSearchTerm(searchTermRef?.current?.value);
  };

  const updateSelectedList = (id: string) => {
    if (id)
      selectedItemList?.includes(id)
        ? setselectedItemList((prev) => prev.filter((item: any) => item != id))
        : setselectedItemList((prev) => [...prev, id]);
  };

  const handleSelectListItem = useCallback(
    (id: string) => () => {
      updateSelectedList(id);
    },
    [selectedItemList]
  );

  const debounceResults = useMemo(() => {
    return debounce(handleSearchTermChange, 300);
  }, []);

  const getSelectedTitle = useCallback(
    (id: string) => {
      return selectOptionList?.find((item) => item.id == id)?.title || "";
    },
    [selectOptionList]
  );

  const getMentionedTitle = useCallback(
    (name: string) => {
      const index = name.toLowerCase().indexOf(searchTerm.toLowerCase());
      const firstPart = name.substring(0, index);
      const secondPart = name.substring(index, index + searchTerm?.length);
      const thirdPart = name.substring(
        index + searchTerm?.length,
        name?.length
      );
      return (
        <span className="text-slate-700">
          {firstPart}
          <b>{secondPart}</b>
          {thirdPart}
        </span>
      );
    },
    [searchTerm]
  );

  useEffect(() => {
    handleSearchTermUpdate(searchTerm);
    setDisplayOptionList(searchTerm?.length > 0);
  }, [searchTerm]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemList]);

  const handleKeyDown = (e: KeyboardEvent) => {
    const target = e?.target as any;
    if (target?.id == "body") {
      document?.getElementById("search")?.focus();
      document?.getElementById("search")?.scrollIntoView();
    } else if (
      e?.key == "ArrowDown" ||
      e?.key == "ArrowLeft" ||
      e?.key == "ArrowUp" ||
      e?.key == "ArrowRight" ||
      e?.key == "Backspace" ||
      e?.key == "Enter"
    ) {
      if (target?.id == "search") {
        if (e?.key == "ArrowDown") {
          const checkboxList = document?.getElementsByName("checkbox");
          checkboxList[0]?.focus();
        } else if (target?.selectionStart == 0) {
          if (e?.key == "ArrowLeft") {
            target?.previousElementSibling?.lastChild?.focus();
          } else if (e?.key == "Backspace") {
            const selectedElementName =
              target?.previousElementSibling?.id?.split("-")[1];
            updateSelectedList(selectedElementName);
          }
        }
      } else if (target?.name == "checkbox") {
        if (e?.key == "ArrowDown") {
          target?.parentNode?.nextElementSibling?.firstChild?.focus();
        } else if (e?.key == "ArrowUp") {
          if (target?.parentNode?.previousElementSibling) {
            target?.parentNode?.previousElementSibling?.firstChild?.focus();
          } else {
            document?.getElementById("search")?.focus();
          }
        } else if (e?.key == "Enter") {
          updateSelectedList(target?.id);
        }
      } else if (document?.activeElement?.id == "select-button") {
        if (e?.key == "Backspace") {
          const selectedElementName =
            target?.previousElementSibling?.id?.split("-")[1];
          updateSelectedList(selectedElementName);
        } else if (e?.key == "ArrowLeft") {
          (
            document?.activeElement?.parentNode?.previousSibling
              ?.lastChild as HTMLElement
          )?.focus();
        } else if (e?.key == "ArrowRight") {
          if (
            (document?.activeElement?.parentNode?.nextSibling as HTMLElement)
              ?.id == "search"
          ) {
            document?.getElementById("search")?.focus();
          } else {
            (
              document?.activeElement?.parentNode?.nextSibling
                ?.lastChild as HTMLElement
            )?.focus();
          }
        }
      }
    }
  };

  return (
    <div className="w-full sm:w-120 flex flex-col gap-1">
      <div className="border border-slate-400 p-1 rounded-2xl w-full h-12 flex justify-between items-center gap-2 bg-white">
        <div
          id="display-selected"
          className="flex items-center max-w-112 gap-1 overflow-scroll no-scrollbar w-full"
        >
          {selectedItemList?.map((selectedItem) => (
            <div
              id={"selected-" + selectedItem}
              key={selectedItem}
              className="bg-slate-100 border-slate-300 flex items-center p-1.5 rounded-xl gap-1"
            >
              <span className="line-clamp-1 whitespace-nowrap">
                {getSelectedTitle(selectedItem)}
              </span>
              <button
                id="select-button"
                onClick={handleSelectListItem(selectedItem)}
              >
                <XSquare
                  size={24}
                  className="flex-none text-slate-500 cursor-pointer focus:text-slate-700"
                />
              </button>
            </div>
          ))}
          <input
            id="search"
            ref={searchTermRef}
            className="outline-none font-medium ml-2 w-full min-w-32"
            placeholder={placeholder}
            autoFocus
            onKeyDown={debounceResults}
          />
        </div>
        <ChevronDown
          className={`text-slate-400 transition-all duration-200 ease-linear flex-none ${
            displayOptionList ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`absolute mt-16 w-full max-w-100-4rem sm:w-120 transition-all duration-500 ease-linear border rounded-2xl flex flex-col bg-white ${
          displayOptionList
            ? "max-h-96 overflow-scroll border-slate-400"
            : "max-h-0 overflow-hidden border-transparent"
        }`}
      >
        {loading &&
          [0, 1, 2, 3, 4]?.map((item) => (
            <div
              key={item}
              className="flex items-center p-8 gap-2 animate-pulse bg-slate-100 m-2 rounded-xl"
            />
          ))}
        {error && (
          <span className="text-xs font-semibold text-red-600 p-3">
            {error}
          </span>
        )}
        {selectOptionList?.map((selectOption, index) => (
          <div
            key={selectOption?.id}
            className={`flex items-center w-full p-3 gap-2 hover:bg-slate-50 ${
              index > 0 ? "border-t border-slate-400" : ""
            }`}
          >
            <input
              id={selectOption?.id}
              type="checkbox"
              name="checkbox"
              className="w-4 h-4 focus:outline-slate-400 accent-blue-600"
              onChange={handleSelectListItem(selectOption?.id)}
              checked={selectedItemList?.includes(selectOption?.id)}
            />
            <img
              src={selectOption?.image}
              className="w-12 h-12 rounded-md"
              alt={selectOption?.title}
            ></img>
            <div className="flex flex-col gap-1">
              {getMentionedTitle(selectOption?.title)}
              <span className="text-slate-600 text-sm">
                {selectOption?.detail}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
