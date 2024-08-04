import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';
import "../../styles/home.css";

const Characters = ({ name, uidCharacter }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(store.favorites.includes(name));
    }, [store.favorites, name]);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            actions.deleteFavorite(name);
        } else {
            actions.addFavorite(name);
        }
        setIsFavorite(!isFavorite);
    };


    return (
        <div className="card container p-3 text-bg-dark border-warning bg-opacity-50">
            <h5 className="card-title">{name}</h5>
            <div className='d-flex'>
                <button className='btn btn-outline-primary me-auto p-2'
                    onClick={() => {
                        navigate("/learn-more/" + uidCharacter);
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