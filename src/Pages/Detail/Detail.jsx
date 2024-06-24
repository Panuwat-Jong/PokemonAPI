import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IPokemonList } from "../../services/pokemonList";
import { colorType, typeColorsArray } from "../../utils/colorType";

function Detail() {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState({
    data: {},
    loading: false,
    error: null,
  });
  const callDataDetail = async (namePokemon) => {
    const response = await IPokemonList.getPokemonDetail(namePokemon);
    if (response.status === 200) {
      const responseDetail = response.data;
      if (responseDetail) {
        setPokemonData({
          data: {
            ...responseDetail,
            images:
              responseDetail.sprites.other.home.front_default ||
              responseDetail.sprites.other.dream_world.front_default,
          },
          loading: true,
          error: null,
        });
      }
    } else {
      setPokemonData({
        data: undefined,
        loading: true,
        error: new Error("Network Error"),
      });
    }
  };
  useEffect(() => {
    if (name) {
      callDataDetail(name);
    }
  }, [name]);

  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="mx-4">
        <div className="py-5">
          {/* Logo */}
          <Link to={"/"} className="flex justify-center">
            <img
              src="/public/images/logo.webp"
              alt="logo"
              className="max-h-[70px] "
            />
          </Link>
          <div className="bg-gray-900 bg-opacity-25 rounded-3xl mt-5">
            {/* Name & Id */}
            <div className=" text-center space-y-3 py-2 bg-white rounded-t-3xl">
              <h1 className="text-3xl font-semibold capitalize">{name}</h1>
              <p className="text-xl"># {pokemonData.data.id}</p>
            </div>
            {/* Content */}
            <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2  gap-x-3 ">
              <div className="p-5">
                {pokemonData.data.types !== undefined ? (
                  <img
                    style={{
                      backgroundColor: colorType.typeColor(
                        pokemonData?.data?.types
                      )[0],
                    }}
                    className="w-full max-w-[450px]  mx-auto z-50 rounded-3xl object-contain"
                    src={pokemonData.data.images}
                    alt="pokemon"
                  />
                ) : null}
              </div>
              <div className="mx-5 py-5 flex flex-col justify-around gap-5">
                {/* top */}
                <div className="grid grid-cols-2 items-center ">
                  {/* Height & Weight */}
                  <div>
                    <p className="text-lg font-semibold">
                      Height: {+pokemonData.data.height / 10} m
                    </p>
                    <p className="text-lg font-semibold">
                      Weight: {+pokemonData.data.weight / 10} kg
                    </p>
                  </div>

                  {/* Type Pokemon */}
                  <div className=" w-full max-w-[150px] space-y-2">
                    {pokemonData?.data?.types?.map((item, idx) => {
                      const types = item.type.name;
                      for (const color of typeColorsArray) {
                        if (color.name === types) {
                          return (
                            <p
                              style={{
                                backgroundColor: color.color,
                              }}
                              key={idx}
                              className={`capitalize py-1 px-2.5 text-center rounded-xl font-semibold `}
                            >
                              {types}
                            </p>
                          );
                        }
                      }
                    })}
                  </div>
                </div>
                {/* bottom */}
                <div className="grid grid-cols-2 items-center gap-x-5">
                  {/* Abilities */}
                  <div className="text-lg space-y-2 self-start">
                    <p className="text-xl font-semibold">Abilities:</p>
                    {pokemonData?.data?.abilities?.map((item, idx) => (
                      <p
                        key={idx}
                        className="w-full rounded-2xl py-1 text-center  bg-slate-300 bg-opacity-50 capitalize font-semibold"
                      >
                        {item.ability.name}
                      </p>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold ">State:</h3>
                    {pokemonData?.data?.stats?.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          className="flex flex-row justify-between text-base md:text-lg space-x-3"
                        >
                          <p className="capitalize font-semibold">
                            {item.stat.name}
                          </p>
                          <p>{item.base_stat}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {<Link to={"/"} className="absolute inset-14 border bg-white w-fit h-fit px-3 py-1 rounded-full hover:bg-slate-100">Back</Link>}
    </section>
  );
}

export default Detail;
