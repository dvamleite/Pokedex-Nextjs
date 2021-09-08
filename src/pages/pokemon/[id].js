import React from 'react'
import Menu from '../../components/menu'

export default function Pokemon({pokemon}){
    console.log(pokemon)    
    return(
        <>  
            <Menu />         
            <div className="details">

               <div className="detailsCard">
                    <img src={pokemon.sprites.front_default} alt="Imagem de um Pokemon" />
                        <h2>{pokemon.name}</h2>

                        <div className="stats">
                                            
                            <h2>HP: {pokemon.stats[0].base_stat}</h2>
                            <h2>STR: {pokemon.stats[1].base_stat}</h2>
                            <h2>DEF: {pokemon.stats[2].base_stat}</h2>
                            <h2>SPEED: {pokemon.stats[3].base_stat}</h2>

                        </div>

                        <h2>XP: {pokemon.base_experience}</h2>

                        <div className="infos">
                            <h2>ID: {pokemon.id}</h2>
                            <h2>Ordem: {pokemon.order}</h2>
                            <h2>Tamanho: {pokemon.weight}</h2>
                           
                        </div>
               </div>                  
  
            </div>
        </>
    );
}


export async function getStaticProps({ params }){
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    .then((res) =>{
        if(res.ok){
            return res.json();
        }

        throw new Error('Deu Erro')
    })
    .then((resobj) => resobj)
    return{
        props: {
            pokemon
        }
    }
}

export async function getStaticPaths(){

    const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/2/')
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }
      throw new Error('Deu problema');
    })
    .then((respostaEmObjeto) => respostaEmObjeto.pokemon_entries);

    return{      
        paths: pokemons.map((pokemon) => ({ //pra cada pokemon na resposta, um caminho sera gerado
      params: {
        id: pokemon.entry_number.toString(), //necessario usar o toString porque não aceita inteiro como caminho (path)
      },
    })),
    fallback: false,
  };
}