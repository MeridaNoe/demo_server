const db = require("./db/connection");
const axios = require("axios");

const createClient = () => {
  axios
    .get("https://randomuser.me/api/")
    .then((response) => {
      const { name } = response.data.results[0];
      const sql = `INSERT INTO clients (name,last_name, created_at) VALUES ('${name.first}','${name.last}', '2024-02-01 19:07:41')`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Cliente creado!");
        /*const sql = `INSERT INTO logs (description, time_stamp) VALUES ('Cliente creado', NOW())`;
                db.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log('Log creado!');
                });*/
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const insertPets = () => {
  const nombresMascotas = [
    "Luna",
    "Max",
    "Bella",
    "Rocky",
    "Coco",
    "Molly",
    "Toby",
    "Daisy",
    "Charlie",
    "Lucy",
  ];

  const mascotas_types = [
    "Dog",
    "Cat",
    "Bird",
    "Rabbit",
    "Hamster",
    "Guinea pig",
    "Ferret",
    "Fish",
    "Turtle",
    "Snake",
    "Lizard",
    "Horse",
  ];

  const numDec = Math.random();
  const numAleatorio = Math.floor(numDec * 9);

  const nombreMascotaRandom = nombresMascotas[numAleatorio];
  const tipoAnimalRandom =
    mascotas_types[Math.floor(Math.random() * mascotas_types.length)];

  let razaRandom;

  switch (tipoAnimalRandom) {
    case "Dog":
      const tiposPerros = [
        "Labrador Retriever",
        "Bulldog",
        "Golden Retriever",
        "Beagle",
        "Poodle",
        "German Shepherd",
        "Siberian Husky",
        "Boxer",
        "Dachshund",
        "Yorkshire Terrier",
      ];
      razaRandom = tiposPerros[Math.floor(Math.random() * tiposPerros.length)];
      break;
    case "Cat":
      const tiposGatos = [
        "Persa",
        "Siamés",
        "Maine Coon",
        "Bengala",
        "Ragdoll",
        "Sphynx",
        "British Shorthair",
        "Abisinio",
        "Siberiano",
        "Angora",
      ];

      razaRandom = tiposGatos[Math.floor(Math.random() * tiposGatos.length)];
      break;
    default:
      razaRandom = "Unknown";
  }

  const sql = `INSERT INTO pets (name, type, breed, owner_id, created_at) VALUES ('${nombreMascotaRandom}', '${tipoAnimalRandom}', '${razaRandom}', '${numAleatorio}', '2024-02-01 19:07:41')`;

  db.query(sql, (err) => {
    if (err) throw err;
    console.log("La mascota fue creada :)");
  });
};

setInterval(createClient, 5000);

setInterval(insertPets, 5000);
