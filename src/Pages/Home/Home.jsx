import SearchForm from "../../Component/searchForm/SearchForm";
import { usePokemonStore } from "../../store/store";
import PokemonCard from "../../Component/Card/PokemonCard";
import ReactLoading from "react-loading";

function Home() {
  const { fetchPokemon, pokemon } = usePokemonStore();

  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="mx-4">
        <div className="pt-5 ">
          <div className="flex justify-center">
            <img
              src="/public/images/logo.webp"
              alt="logo"
              className="max-h-[70px] "
            />
          </div>
          <SearchForm />
          {fetchPokemon.loading ? (
             <div className="flex w-full h-[350px] items-center justify-center">
             <ReactLoading
               type={"spin"}
               color={`#333`}
               height={72}
               width={72}
             />
           </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6 pb-24 place-items-center ">
              {pokemon?.data.map((item, idx) => {
                // console.log(pokemon);
                return <PokemonCard prop={item} key={idx} />;
              })}
            </div>
           
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
