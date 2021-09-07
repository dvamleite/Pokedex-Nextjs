import React from "react"

export async function getStaticProps(context){

  const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/2/')       
    .then((res) =>{
            if(res.ok){
                return res.json();
            }
        })
    .then((resObj) => {            
          return  resObj.pokemon_entries;
        })

        return{
            props: {
                pokemons
            },
        }
}

 export default function App(props){

    const { pokemons } = props;

     return(
        <>
            <h1>Pokédex Com Nextjs</h1>

            <ul>
                {pokemons.map((pokemon) => (
                    <li key={pokemon.entry_number}>
                        {pokemon.pokemon_species.name}
                    </li>
                ))}
            </ul>
        </>
     )
 }