import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data } from "../store/data";
import { add_order } from "../store/actions";
import "./OrderBasked.css";

const OrderBasked = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [isModalOpen, setModalOpen] = useState(false); 

  const handleAddToOrder = (item) => {
    dispatch(add_order(item));
  };

 
  const totalAmount = order.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handlePurchase = () => {
    setModalOpen(true); 
  };

  return (
    <div className="order-container">
      <div className="menu-container">
        <h2>Меню</h2>
        <ul>
          {data.map((el, id) => (
            <li key={id} onClick={() => handleAddToOrder(el)}>
              {el.title} <b>{el.price}</b>
            </li>
          ))}
        </ul>
      </div>
      <div className="basked-container">
        <h2>Заказ</h2>
        <ul>
          {order.map((el, id) => (
            <li key={id}>
              {el.title}  x {el.quantity || 1}
            </li>
          ))}
        </ul>
        <div className="total-amount">
          <b>Итоговая сумма: {totalAmount} сом</b>
        </div>
        
     
        <button className="purchase-button" onClick={handlePurchase}>Купить</button>
      </div>
      
     
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <p>Спасибо за покупку!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderBasked;
