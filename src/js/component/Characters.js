import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';
import "../../styles/home.css";

const Characters = ({ name, uidCharacter }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(store.favorites.some((element) => JSON.stringify(element) == JSON.stringify([name, uidCharacter])));
    }, [store.favorites, [name, uidCharacter]]);
    //incluye name en el array favorites de flux. Como los elementos dentro de favoritos tienen que ser únicos, usamos la función SOME 
    //(comprueba si algún elemento del array cumple la comparación, si es así, devuelve TRUE)
    //JSON.stringify -> convertimos los elementos del array a string (en JSON) para poderlo comparar

    const handleFavoriteClick = () => {
        if (isFavorite) {
            actions.deleteFavorite(name);
        } else {
            actions.addFavorite([name, uidCharacter]);
        }
        setIsFavorite(!isFavorite);
    };
    //cuando se pincha en favorito se recoge el nombre y el array con [categoría, id]

    return (
        <div className="card container p-3 text-bg-dark border-warning bg-opacity-50">
            <img src={`https://starwars-visualguide.com/assets/img/characters/${uidCharacter[1]}.jpg`}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                }} />
            <h5 className="card-title mt-3">{name}</h5>
            <div className='d-flex'>
                <button className='btn btn-outline-primary me-auto p-2'
                    onClick={() => {
                        navigate("/learn-more/" + uidCharacter[1], {state: {"elemento": uidCharacter}});
                        //al pinchar pasamos un array con el tipo de 'ficha' y el id = uidCharacter
                    }}>Learn more!</button>

                <div className={`btn btn-outline-warning p-2 ${isFavorite ? 'active' : ''}`}
                    onClick={handleFavoriteClick}>
                    {isFavorite ? (
                        <i className="fa-solid fa-heart" style={{ color: "#FFD43B" }} />
                    ) : (
                        <i className="fa-regular fa-heart" style={{ color: "#FFD43B" }} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Characters