const apiData = `https://pokeapi.co/api/v2/pokemon/`;
const listProductDiv = document.querySelector(".card");

let pokemonList = [];

// Set Api Data In Html
const setApiData = () => {
  if (pokemonList.length > 0) {
    pokemonList.forEach((showPokemon) => {
      const { id, sprites, name } = showPokemon;
      const addPokemon = document.createElement("div");
      addPokemon.classList.add("card__container");
      addPokemon.innerHTML = `
      <div class="card__inner" >
        <div class="card__image">
            <figure>
               <a href="detail.html/${id}"> <img src="${sprites.other.home.front_default}" alt="${name}"></a>
            </figure>
        </div>
        </div>
            <h2 class="heading" >${name}</h2>
      `;
      listProductDiv.appendChild(addPokemon);
    });
  }
};

// Get Api Data
const initApi = async () => {
  const res = await fetch(apiData);
  const data = await res.json();

  const shwoApiData = data.results.map(async (curPokemon) => {
    const res = await fetch(curPokemon.url);
    const data = await res.json();
    return data;
  });
  const resultData = await Promise.all(shwoApiData);
  pokemonList = resultData;

  setApiData();
};
initApi();
