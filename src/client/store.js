import { makeVar, useReactiveVar } from "@apollo/client";

const catchedPokemonsVar = makeVar({});

const initCatchedPokemons = (initialData) => catchedPokemonsVar(initialData);

const setNickname = (catchedPokemonsById = [], nickname) => {
  if (catchedPokemonsById.find((value) => value === nickname))
    throw Error("Error gan");
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

const getAmountOfCatchedPokemonsById = (catchedPokemons) => (id) =>
  (catchedPokemons[id] || []).length;

const useCatchedPokemons = () => {
  const catchedPokemons = useReactiveVar(catchedPokemonsVar);
  return {
    catchedPokemons,
    initCatchedPokemons,
    setCatchedPokemons: setCatchedPokemons(catchedPokemons),
    getAmountOfCatchedPokemonsById: getAmountOfCatchedPokemonsById(
      catchedPokemons
    ),
  };
};

export { useCatchedPokemons, catchedPokemonsVar };
