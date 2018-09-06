import HERO_DATA from "../data/heroes";
// import axios from "axios";

export default function getHeroes() {
  const heroes = HERO_DATA;
  // axios.get(url('heroes')).then(({ data: heroes }) => {
  const heroMap = heroes.reduce((acc, hero) => {
    acc[hero.id] = hero;
    return acc;
  }, {});
  return heroMap;
  // });
}
