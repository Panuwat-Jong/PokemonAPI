import { Link } from "react-router-dom";
import { colorType, typeColorsArray } from "../../utils/colorType";

export default function PokemonCard({ prop }) {
  return (
    <Link
      to={`/detail/${prop.name}`}
      className={`hover:bg-gray-100  w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow hover:shadow-xl hover:shadow-slate-800  hover:scale-105 transition-all duration-200 ease-linear`}
    >
      <div className="flex justify-center w-full  p-2">
        <img
          style={{ backgroundColor: colorType.typeColor(prop.types)[0] }}
          className={`w-full  object-contain h-60  rounded-t-lg `}
          src={prop.images}
          alt="pokemon"
        />
      </div>
      <div className="p-5 pt-0">
        <div className="flex flex-col items-center  justify-center">
          <p className=" text-xl font-semibold border-b-2 border-black w-fit">
            {prop.id}
          </p>

          <h5 className="mb-2 text-3xl font-bold text-gray-900 text-center capitalize">
            {prop.name}
          </h5>
        </div>

        <div className="flex flex-row gap-x-3 justify-center items-center  w-full">
          {prop.types.map((item, idx) => {
            const types = item.type.name;
            for (const color of typeColorsArray) {
              if (color.name === types) {
                return (
                  <p
                    style={{
                      backgroundColor: color.color,
                    }}
                    key={idx}
                    className={`capitalize py-1 px-2.5  rounded-xl font-semibold `}
                  >
                    {types}
                  </p>
                );
              }
            }
          })}
        </div>
      </div>
    </Link>
  );
}
