import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = (uid) => {
	const { store, actions } = useContext(Context);
	const count = store.favorites.length;
	const navigate = useNavigate();


	const noFavorite = (name) => {
		actions.deleteFavorite(name);
	};


	return (
		<nav className="navbar fixed-top" style={{ height: '100px', backgroundColor: "black" }}>
			<Link to="/">
				<img src="https://cdn.iconscout.com/icon/free/png-256/free-starwars-225970.png"
					className="position-absolute top-50 start-50 translate-middle" style={{ height: '100%', objectFit: 'contain' }} />
			</Link>
			<div className="btn-group position-absolute top-50 end-0 translate-middle-y me-5" style={{zIndex: "1"}}>
				<button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
					Favorites
					<span class="badge text-bg-secondary">{count}</span>
				</button>
				<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
					{
						store.favorites.length > 0 ? (
							store.favorites.map((favorite, index) => (
								<li className="dropdown-item d-flex" key={index}>
									<div className="me-auto p-2">
										<button type="button" class="btn btn-link" onClick={() => {
											navigate("/learn-more/" + favorite[1][1], {state: {"elemento": favorite[1]}});
										}}>{favorite[0]}</button>
									</div>
									<div className="p-2" onClick={() => noFavorite(favorite[0])}>
										<i className="fa-solid fa-trash" />
									</div>
								</li>
							))
						) : (
							<li className="dropdown-item">No favorites</li>
						)
					}
				</ul>
			</div>
		</nav >
	);
};
