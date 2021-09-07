import React from "react"
import Link from 'next/link'

import Menu from '../components/menu'
import Pokemon from '../pages/pokemon/[id]'


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
    console.log(pokemons)

     return(
        <>
        <Menu />
          <div className="content">
                 <h1>Pokédex Com Nextjs</h1>

                    <div className="cardcont">
                        {pokemons.map((pokemon) => (
                            <div key={pokemon.entry_number}>
                            <Link href={`/pokemon/${pokemon.entry_number}`}>

                               <div className="card">                                 
                               <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.entry_number}.png`} />
                                    <a>
                                        {pokemon.pokemon_species.name}
                                    </a>
                               </div>
                            </Link>
                            </div>
                        ))}
                    </div>                
          </div>
        </>
     )
 }

 