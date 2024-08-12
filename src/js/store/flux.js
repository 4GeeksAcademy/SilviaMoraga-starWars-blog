const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			characters: [],
			planets: [],
			starships: [],
			favorites: [],
			learnMore: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getAllCharacters: () => {
				fetch("https://www.swapi.tech/api/people")
					.then(response => response.json())
					.then((data) => {
						setStore({ characters: data.results })
					})
					.catch(() => { });
			},
			getAllPlanets: () => {
				fetch("https://www.swapi.tech/api/planets")
					.then(response => response.json())
					.then((data) => {
						setStore({ planets: data.results })
					})
					.catch(() => { });
			},
			getAllStarships: () => {
				fetch("https://www.swapi.tech/api/starships")
					.then(response => response.json())
					.then((data) => {
						setStore({ starships: data.results })
					})
					.catch(() => { });
			},
			addFavorite: (elemento) => {
				const store = getStore();
				setStore({ favorites: [...store.favorites, elemento] });
			},
			deleteFavorite: (name) => {
				const store = getStore();
				setStore({ favorites: store.favorites.filter(favorite => favorite[0] !== name) });
			},
			getFavorites: () => {
				const store = getStore();	
				return store.favorites;
			},
			learnMoreCharacters: (uidCharacter) => {
				fetch("https://www.swapi.tech/api/people/" + uidCharacter)
					.then(response => response.json())
					.then((data) => {
						setStore({learnMore: data.result})
						console.log(data);
					})
					.catch(() => { });
			},
			learnMorePlanets: (uidPlanet) => {
				fetch("https://www.swapi.tech/api/planets/" + uidPlanet)
					.then(response => response.json())
					.then((data) => {
						setStore({learnMore: data.result})
						console.log(data);
					})
					.catch(() => { });
			},
			learnMoreStarships: (uidStarship) => {
				fetch("https://www.swapi.tech/api/starships/" + uidStarship)
					.then(response => response.json())
					.then((data) => {
						setStore({learnMore: data.result})
						console.log(data);
					})
					.catch(() => { });
			}
		}
	}
};

export default getState;
