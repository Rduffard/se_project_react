import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import { defaultClothingItems } from "../../utils/constants.js";

function App() {
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = (event) => {
    event.preventDefault();
    setActiveModal("add-garment");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          clothingItems={clothingItems}
          weatherData={weatherData}
          handleCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <ModalWithForm
        name="add-garment"
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            placeholder="Name"
            id="name"
            type="text"
            className="modal__input"
          ></input>
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            placeholder="Image URL"
            id="imageUrl"
            type="url"
            className="modal__input"
          ></input>
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              name="weather"
              value="hot"
              className="modal__radio-input"
            />{" "}
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              name="weather"
              value="warm"
              className="modal__radio-input"
            />{" "}
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              name="weather"
              value="cold"
              className="modal__radio-input"
            />{" "}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;
