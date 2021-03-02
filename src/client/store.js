import { makeVar } from "@apollo/client";

const catchedPokemons = makeVar({});

const initCatchedPokemons = (initialData) => catchedPokemons(initialData);

const getCatchedPokemonsStore = () => catchedPokemons();

const setCatchedPokemons = (id, nickname) => {
  catchedPokemons({
    ...catchedPokemons(),
    [id]: nickname,
  });
  localStorage.setItem(
    "catchedPokemons",
    JSON.stringify(getCatchedPokemonsStore())
  );
};

export {
  setCatchedPokemons,
  initCatchedPokemons,
  getCatchedPokemonsStore,
  catchedPokemons,
};
