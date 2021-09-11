import React from "react";
import Menu from "../../components/menu";

export default function Pokemon({ pokemon }) {
  console.log(pokemon);
  return (
    <>
      <Menu />
      <div className="details">
        <div className="detailsCard">
          <img src={pokemon.sprites.front_default} alt="Imagem de um Pokemon" />
          <h3>{pokemon.name}</h3>

          <div className="type">
            <div className="typ">
              <h4>Tipo: {pokemon.types[0].type.name}</h4>
            </div>
          </div>

          <div className="stats">
            <div className="barstatsHP hp">
              <h2>HP: {pokemon.stats[0].base_stat}</h2>
            </div>
            <div className="barstatsSTR hp">
              <h2>STR: {pokemon.stats[1].base_stat}</h2>
            </div>
            <div className="barstatDEF hp">
              <h2>DEF: {pokemon.stats[2].base_stat}</h2>
            </div>
            <div className="barstatsSPEED hp">
              <h2>SPEED: {pokemon.stats[3].base_stat}</h2>
            </div>
          </div>

          <div className="bar">
            {" "}
            <h2 className="barstats">XP: {pokemon.base_experience}</h2>{" "}
          </div>

          <div className="infos">
            <h2>Tamanho: {pokemon.weight}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Deu Erro");
    })
    .then((resobj) => resobj);
  return {
    props: {
      pokemon,
    },
  };
}

export async function getStaticPaths() {
  const pokemons = await fetch("https://pokeapi.co/api/v2/pokedex/2/")
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }
      throw new Error("Deu problema");
    })
    .then((respostaEmObjeto) => respostaEmObjeto.pokemon_entries);

  return {
    paths: pokemons.map((pokemon) => ({
      params: {
        id: pokemon.entry_number.toString(),
      },
    })),
    fallback: false,
  };
}
