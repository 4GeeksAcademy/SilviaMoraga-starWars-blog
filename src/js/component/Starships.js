import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';
import "../../styles/home.css";

const Starships = ({ name, uidStarship }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(store.favorites.some((element) => JSON.stringify(element) == JSON.stringify([name, uidStarship])));
    }, [store.favorites, name]);
    //explicado en 'Characters'

    const handleFavoriteClick = () => {
        if (isFavorite) {
            actions.deleteFavorite(name);
        } else {
            actions.addFavorite([name, uidStarship]);
        }
        setIsFavorite(!isFavorite);
    };


    return (
        <div className="card container p-3 text-bg-dark border-warning bg-opacity-50 d-flex flex-column justify-content-between" style={{ height: "100%" }}>
            <img src={`https://starwars-visualguide.com/assets/img/starships/${uidStarship[1]}.jpg`}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                }} />
            <div className="d-flex flex-column justify-content-between" >
                <h5 className="card-title mt-5">{name}</h5>
                <div className='d-flex mt-auto'>
                    <button className='btn btn-outline-primary me-auto p-2'
                        onClick={() => {
                            navigate("/learn-more/" + uidStarship[1], {state: {"elemento": uidStarship}});
                        }}>Learn more!</button>

                    <div className={`btn btn-outline-warning p-2 ${isFavorite ? 'active' : ''}`}
                        onClick={handleFavoriteClick}>
                        {isFavorite ? (
                            <i className="fa-solid fa-heart active" style={{ color: "#FFD43B" }} />
                        ) : (
                            <i className="fa-regular fa-heart" style={{ color: "#FFD43B" }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Starships