import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Characters from "../component/Characters";
import Planets from "../component/Planets";
import Starships from "../component/Starships";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="p-3 mb-2" style={{
			backgroundImage: 'url(https://lumiere-a.akamaihd.net/v1/images/star-wars-backgrounds-25_bc15ec98.jpeg?download=true)', height: "100vh", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
		}}>
			<div className="container">
				<div className="row flex-nowrap overflow-auto" style={{marginTop: "40px"}}>
					{
						store.characters.map((character, index, value) => {
							return (
								<div className="col-3">
									<Characters key={index}
										name={character.name}
										uidCharacter={character.uid}
									/>
								</div>
							)
						})
					}
				</div>
			</div>
			<div className="container">
				<div className="row flex-nowrap overflow-auto" style={{marginTop: "80px"}}>
					{
						store.planets.map((planet, index, value) => {
							return (
								<div className="col-3">
									<Planets key={index}
										name={planet.name}
										uidPlanet={planet.uid}
									/>
								</div>
							)
						})
					}
				</div>
			</div>
			<div className="container">
				<div className="row flex-nowrap overflow-auto" style={{marginTop: "80px"}}>
					{
						store.starships.map((starship, index, value) => {
							return (
								<div className="col-3">
									<Starships key={index}
										name={starship.name}
										uidStarship={starship.uid}
									/>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
};
