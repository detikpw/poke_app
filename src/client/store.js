import { makeVar, useReactiveVar } from "@apollo/client";
import { get } from "theme-ui";

const catchedPokemonsVar = makeVar({});

const initCatchedPokemons = (initialData) => catchedPokemonsVar(initialData);

const setNickname = (catchedPokemonsById = [], nickname) => {
  if (catchedPokemonsById.find((value) => value === nickname))
    throw Error("You've already give same nickname for this pokemon");
  return [...catchedPokemonsById, nickname];
};

const setCatchedPokemons = (catchedPokemons) => (id, nickname) => {
  localStorage.setItem(
    "catchedPokemons",
    JSON.stringify(
      catchedPokemonsVar({
        ...catchedPokemons,
        [id]: setNickname(catchedPokemons[id], nickname),
      })
    )
  );
};

const releasePokemon = (catchedPokemons) => (id, nickname) => {
  localStorage.setItem(
    "catchedPokemons",
    JSON.stringify(
      catchedPokemonsVar({
        ...catchedPokemons,
        [id]: catchedPokemons[id].filter(
          (pokemonNickname) => nickname !== pokemonNickname
        ),
      })
    )
  );
};

const getAmountOfCatchedPokemonsById = (catchedPokemons) => (id) =>
  (catchedPokemons[id] || []).length;

const getAmountOfCatchedPokemons = (catchedPokemons) => {
  return Object.values(catchedPokemons).reduce((acc, catchedPokemonsById) => {
    return acc + catchedPokemonsById.length;
  }, 0);
};
const useCatchedPokemons = () => {
  const catchedPokemons = useReactiveVar(catchedPokemonsVar);
  return {
    catchedPokemons,
    initCatchedPokemons,
    amountOfCatchedPokemons: getAmountOfCatchedPokemons(catchedPokemons),
    setCatchedPokemons: setCatchedPokemons(catchedPokemons),
    releasePokemon: releasePokemon(catchedPokemons),
    getAmountOfCatchedPokemonsById: getAmountOfCatchedPokemonsById(
      catchedPokemons
    ),
  };
};

export { useCatchedPokemons, catchedPokemonsVar };
