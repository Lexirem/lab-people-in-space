// ASYNC - AWAIT

// Iteración 1

// Definimos dos variables para utilizar los endpoints de cada API

const astroUrl = "http://api.open-notify.org/astros.json";
const wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";

async function getProfiles() {
  // Aquí escribiremos la función que hará las llamadas a las API
  const astro = await fetch(astroUrl);
  const astrojson = await astro.json();
  let wiki = [];
  for (let i=0; i<astrojson.people.length; i++){
    const person= await fetch(wikiUrl + astrojson.people[i].name);
    const wikijson = await person.json();
    wiki[i] = wikijson;
  };
  let allinformation = {
    astro: astrojson,
    wiki: wiki
  };
  return allinformation;
}
getProfiles();

// Iteración 2

async function generateHTML() {
  // Aquí escribiremos la función que generará los elementos HTML que mostraremos
  let people = document.getElementById('people');
  let allInformation = await getProfiles();
  for (let i=0; i<allinformation.astro.people.length; i++){
    let sectionTag = document.createElement('section');
    sectionTag.innerHTML = `<span>${allinformation.astro.people[2].craft} </span>
    <h2> <nombre-de-la-persona> </h2><img src="${allinformation.wiki[2].thumbnail.source}"/>
    <p> <descripción> </p><p> <extract> /p>`;
    people.appendChild(sectionTag);       
  }

}

// Iteración 3

// Aquí escribiremos el addEventListener que 'escuchará' a nuestro botón
