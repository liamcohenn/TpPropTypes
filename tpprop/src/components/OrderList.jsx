import React from "react";
import PropTypes from "prop-types";
import OrderItem from "./OrderItem.jsx";

/**
 * Renderiza una lista de pedidos. Recibe un array de pedidos como prop.
 */
export default function OrderList({ orders }) {
  if (orders.length === 0) {
    return <p className="muted">No hay pedidos para mostrar.</p>;
  }

  return (
    <div className="order-list">
      {orders.map((o) => (
        <OrderItem
          key={o.id}
          id={o.id}
          customer={o.customer}
          date={o.date}
          status={o.status}
          items={o.items}
        />
      ))}
    </div>
  );
}

OrderList.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      customer: PropTypes.string.isRequired,
      items: PropTypes.array.isRequired,
      status: PropTypes.oneOf(["pending", "shipped", "delivered"]),
      date: PropTypes.instanceOf(Date),
    })
  ).isRequired,
};
