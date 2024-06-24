import { useEffect, useState } from "react";
import { generationList, sortId, typesList } from "../../utils/optionList";
import { usePokemonStore } from "../../store/store";
import { IPokemonList } from "../../services/pokemonList";

function SearchForm() {
  const [isDetailModel, setIsDetailModel] = useState(false);
  const [namePokemon, setNamePokemon] = useState("");
  const [generation, setGeneration] = useState(0);
  const [sortById, setSortById] = useState(sortId[0]);
  const [typePokemon, setTypePokemon] = useState(typesList[0]);

  const { setPokemonList, setFetchPokemon, fetchPokemon } = usePokemonStore();

  const callData = async (generation) => {
    const result = [];
    const response = await IPokemonList.getPokemonList(
      generation.limit,
      generation.offset
    );
    setFetchPokemon({ data: [], loading: true, error: null });
    if (response.status === 200) {
      const resultData = response.data?.results || [];
      for (const pokeName of resultData) {
        const callPokemonName = await IPokemonList.getPokemonDetail(
          pokeName.name
        );
        const responseData = callPokemonName.data || [];
        if (responseData) {
          result.push({
            ...responseData,
            images:
              responseData.sprites.other.home.front_default ||
              responseData.sprites.other.dream_world.front_default,
          });
        }
      }
      setFetchPokemon({ data: result, loading: false, error: null });
      setPokemonList({ data: result, loading: false, error: null });
    } else {
      setFetchPokemon({
        data: [],
        loading: true,
        error: new Error("Network Error"),
      });
    }
  };

  const handleChangeNamePokemon = (e) => {
    setNamePokemon(e.target.value);
  };
  const handleSelectGeneration = (e) => {
    setGeneration(e.target.value);
  };
  const handleSelectType = (e) => {
    setTypePokemon(e.target.value);
  };
  const handleSelectSortById = (e) => {
    setSortById(e.target.value);
  };

  const filterPokemon = (detailData, name, type, sort) => {
    const keywordSearch = detailData.filter((item) => {
      return (
        item.name.toLowerCase().trim().includes(name?.toLowerCase().trim()) ||
        String(item.id).trim().includes(name?.trim().toLowerCase())
      );
    });
    const typeFilter =
      type !== "all types"
        ? keywordSearch.filter((itemType) => {
            return itemType.types.find((findType) => {
              return findType.type.name
                .toLowerCase()
                .includes(type?.toLowerCase());

              // typeFilter.push(isTypeMatched)
            });
          })
        : keywordSearch;
    return sortFilter(typeFilter, sort);
  };

  const sortFilter = (data, sort) => {
    switch (sort) {
      case "id":
        return data.sort((a, b) => a.id - b.id);
      case "name":
        return data.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
      default:
        return data.sort((a, b) => a.id - b.id);
    }
  };

  useEffect(() => {
    callData(generationList[generation]);
  }, [generation]);

  useEffect(() => {
    const data = filterPokemon(
      fetchPokemon.data,
      namePokemon,
      typePokemon,
      sortById
    );
    setPokemonList({ data: data, loading: false, error: null });
  }, [namePokemon, typePokemon, sortById]);

  return (
    <div className="flex flex-col w-full items-center pb-5 border-b-2 border-white space-y-3">
      <div className="w-full max-w-sm ">
        <label
          htmlFor="name"
          className="block mb-2 text-lg font-medium text-center text-white"
        >
          Pokemon Name
        </label>
        <input
          onChange={handleChangeNamePokemon}
          value={namePokemon}
          type="text"
          id="name"
          placeholder="Search..."
          className="transition-all ease-in-out duration-500 w-full bg-white placeholder:text-black p-1 sm:p-2.5 text-lg rounded-lg block    text-black  ring-4 ring-white "
        />
      </div>

      {isDetailModel ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 sm:gap-5  w-full">
          <div>
            <label
              htmlFor="generation"
              className="block mb-2 text-lg font-medium text-center text-white"
            >
              Generation
            </label>
            <select
              id="generation"
              onClick={handleSelectGeneration}
              className="w-full p-1 sm:p-2.5 rounded-lg bg-transparent ring-4 ring-white text-sm font-medium text-white focus:bg-black"
            >
              {generationList.map((generation, idx) => (
                <option value={idx} key={idx} className="text-xs sm:text-base">
                  {generation.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="type"
              className="block mb-2 text-lg font-medium text-center text-white"
            >
              Type
            </label>
            <select
              onClick={handleSelectType}
              id="type"
              className="w-full capitalize p-1 sm:p-2.5 rounded-lg bg-transparent ring-4 ring-white text-sm font-medium text-white focus:bg-black"
            >
              {typesList.map((type, idx) => (
                <option value={type} key={idx} className="text-xs sm:text-base">
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="sort"
              className="block mb-2 text-lg font-medium text-center text-white"
            >
              SortID
            </label>
            <select
              onClick={handleSelectSortById}
              id="sort"
              className=" capitalize w-full p-1 sm:p-2.5 rounded-lg bg-transparent ring-4 ring-white text-sm font-medium text-white focus:bg-black"
            >
              {sortId.map((item, idx) => (
                <option key={idx} value={item} className="text-xs sm:text-base">
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}
      <button
        className="bg-transparent border-4  border-white hover:bg-white rounded-lg px-5 py-2 font-medium transition-all ease-linear duration-300"
        onClick={() => setIsDetailModel(!isDetailModel)}
      >
        {isDetailModel ? "Hide Advance Search" : "Show Advance Search"}
      </button>
    </div>
  );
}

export default SearchForm;
