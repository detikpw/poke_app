import { makeVar, useReactiveVar } from "@apollo/client";

const catchedPokemonsVar = makeVar({});

const initCatchedPokemons = (initialData) => catchedPokemonsVar(initialData);

const setCatchedPokemons = (catchedPokemons) => (id, nickname) => {
  catchedPokemonsVar({
    ...catchedPokemons,
    [id]: [...(catchedPokemons[id] || []), nickname],
  });
  localStorage.setItem("catchedPokemons", JSON.stringify(catchedPokemons));
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
