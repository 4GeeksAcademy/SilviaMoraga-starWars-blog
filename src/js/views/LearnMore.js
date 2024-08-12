import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext'
import { Route, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "../../styles/home.css";

const LearnMore = () => {
  const { store, actions } = useContext(Context);
  const ubicacion = useLocation();
  const uid = ubicacion.state.elemento[1];
  const category = ubicacion.state.elemento[0];
  // se recibe desde el botón LearnMore de cada 'ficha'

  useEffect(() => {
    if (category == "character") {
      actions.learnMoreCharacters(uid);
    } else if (category == "planet") {
      actions.learnMorePlanets(uid);
    } else if (category == "starship") {
      actions.learnMoreStarships(uid);
    }
  }, []);

  const imageUrl = category == "character"
    ? `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`
    : category == "planet"
      ? `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`
      : category == "starship"
        ? `https://starwars-visualguide.com/assets/img/starships/${uid}.jpg`
        : 'https://starwars-visualguide.com/assets/img/placeholder.jpg';

  return (
    <div className="p-3" style={{
      backgroundImage: 'url(https://lumiere-a.akamaihd.net/v1/images/star-wars-backgrounds-25_bc15ec98.jpeg?download=true)', height: "100vh", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
    }}>

      <div className="card mb-3 text-bg-dark border-warning bg-opacity-50" style={{marginTop: "100px"}}>
        <div className="row g-0">
          <div className="col-md-4 p-3">
            <img src={imageUrl} onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                }} className="img-fluid rounded-start" />
          </div>
          <div className="col-md-8 ">
            <div className="card-body">
              <h1 className="card-title mb-5">{store.learnMore.hasOwnProperty('properties') ? store.learnMore.properties.name : 'Loading...'}</h1>
              <p className="card-text fs-3">{store.learnMore.hasOwnProperty('description') ? store.learnMore.description : 'Loading...'}</p>
              <hr style={{ border: "0", width: "100%", height: "5px", backgroundColor: "#dc3545", margin: "0 auto", boxShadow: "0 0 20px rgb(247, 240, 148)", zIndex: "1000", marginTop: "50px" }} />
              <div class="container text-center" style={{ marginTop: "20px" }}>
                <div class="row align-items-start card-text text-danger fw-semibold fs-5">
                  <div class="col">
                    <p>{category == "character" ? "HEIGHT" : category == "planet" ? "ROTATION PERIOD" : "MODEL"}</p>
                    <p>{store.learnMore.hasOwnProperty('properties') ? (category == "character" ? store.learnMore.properties.height : category == "planet" ? store.learnMore.properties.rotation_period : store.learnMore.properties.model) : 'Loading...'}</p>
                  </div>
                  <div class="col">
                    <p>{category == "character" ? "EYE COLOR" : category == "planet" ? "ORBITAL PERIOD" : "STARSHIP CLASS"}</p>
                    <p>{store.learnMore.hasOwnProperty('properties') ? (category == "character" ? store.learnMore.properties.eye_color : category == "planet" ? store.learnMore.properties.orbital_period : store.learnMore.properties.starship_class) : 'Loading...'}</p>
                  </div>
                  <div class="col">
                    <p>{category == "character" ? "BIRTH YEAR" : category == "planet" ? "POPULATION" : "PASSENGERS"}</p>
                    <p>{store.learnMore.hasOwnProperty('properties') ? (category == "character" ? store.learnMore.properties.birth_year : category == "planet" ? store.learnMore.properties.population : store.learnMore.properties.passengers) : 'Loading...'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnMore