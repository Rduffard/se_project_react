import "./ItemModal.css";

function ItemModal({ activeModal, card, onClose, onDeleteItem }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-item-modal"
        ></button>
        <img src={card.imageUrl} alt="Card Name" className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer_description">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            className="modal__delete-btn"
            onClick={() => onDeleteItem(card)}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
