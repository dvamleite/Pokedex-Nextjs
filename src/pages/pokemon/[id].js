import React from 'react'
import Menu from '../../components/menu'

export default function Pokemon({pokemon}){
    console.log(pokemon)    
    return(
        <>  
            <Menu />         
            <div className="details">
                <img src={pokemon.sprites.front_default} alt="Imagem de um Pokemon" />
                <ul>
                    <li>
                        <h2>{pokemon.name}</h2>
                        <h2>XP: {pokemon.base_experience}</h2>                    
                    </li>
                </ul>
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