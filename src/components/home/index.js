import React from "react"
import Link from 'next/link'

export default async function getStaticProps(context){

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

 export default function Home(props){

    const { pokemons } = props;

     return(
        <>
            <h1>Pokédex Com Nextjs</h1>

            <ul>
                {pokemons.map((pokemon) => (
                    <li key={pokemon.entry_number}>
                       <Link href={`/pokemon/${pokemon.entry_number}`}>
                           <a>
                                {pokemon.pokemon_species.name}
                           </a>
                       </Link>
                    </li>
                ))}
            </ul>
        </>
     )
 }