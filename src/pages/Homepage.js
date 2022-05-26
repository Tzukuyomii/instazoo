import { FooterShared } from '../components/FooterShared';
import { HeaderShared } from '../components/HeaderShared';
import { CardShared } from '../components/CardShared';
import { useState } from 'react';
import { useEffect } from 'react';
import { Details } from '../components/Details';
import PreferredShared from '../components/PreferredShared';

export function Homepage() {
  const [animals, setAnimals] = useState([]);
  const [detail, setOpenDetail] = useState(false);
  const [preferred, setOpenPreferred] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState();
  const [preferredAnimals, setPreferredAnimals] = useState([]);

  useEffect(() => {
    fetch('https://zoo-animal-api.herokuapp.com/animals/rand/10')
      .then((response) => response.json())
      .then((data) => setAnimals(data));
  }, []);

  useEffect(() => {
    animals.map((animal) => {
      animal.liked = false;
    });
  }, [animals]);

  const openDetail = (currentAnimal) => {
    setOpenDetail(true);
    setCurrentAnimal(currentAnimal);
  };
  const openPreferred = () => {
    setOpenPreferred(true);
  };

  // const closeDetail = () => {
  //   setOpenDetail(false);
  // };

  // const closePreferred = () => {
  //   setOpenPreferred(false);
  // };

  const closeModal = (modalSet) => {
    modalSet(false);
  };

  const addLike = (currentAnimal) => {
    setPreferredAnimals([...preferredAnimals, currentAnimal]);
    currentAnimal.liked = true;
  };

  const removeAnimal = (id) => {
    // console.log(animal);
    // console.log(preferredAnimals);
    const pippo = preferredAnimals.filter((animal) => animal.id !== id);
    console.log(pippo);
    setPreferredAnimals(pippo);
  };

  return (
    <div>
      <HeaderShared openPreferred={openPreferred} />
      <div className='mt-3'>
        <h1 className='px-4'>
          Feed <span className='letterSpacing'>_______</span>
        </h1>
        <div className='d-flex justify-content-evenly align-items-around flex-wrap mt-5'>
          {animals.map((animal) => (
            <li key={animal.id}>
              <CardShared animal={animal} openDetail={openDetail} />
            </li>
          ))}
        </div>
      </div>
      <Details
        show={detail}
        onHide={() => closeModal(setOpenDetail)}
        add_like={addLike}
        current_animal={currentAnimal}
      />

      <PreferredShared
        preferred_animals={preferredAnimals}
        show={preferred}
        onHide={() => closeModal(setOpenPreferred)}
        remove_animal={removeAnimal}
      />
      <FooterShared />
    </div>
  );
}
