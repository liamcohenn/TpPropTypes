import React from "react";
import PropTypes from "prop-types";

/**
 * Muestra la información de un pedido: ID, Cliente, Fecha, Estado,
 * y lista de productos con nombre, cantidad y precio.
 */
export default function OrderItem({ id, customer, date, status, items }) {
  const total = items.reduce((acc, it) => acc + it.quantity * it.price, 0);

  return (
    <article className={`order-card status-${status}`}>
      <div className="order-head">
        <h3>#{id} — {customer}</h3>
        <span className={`badge ${status}`}>{status}</span>
      </div>
      <div className="order-meta">
        <span>Fecha: {date.toLocaleDateString()}</span>
      </div>

      <ul className="order-items">
        {items.map((it) => (
          <li key={it.productId} className="order-item-row">
            <span className="name">{it.name}</span>
            <span className="qty">x{it.quantity}</span>
            <span className="price">${it.price.toFixed(2)}</span>
            <span className="subtotal">
              ${(it.quantity * it.price).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="order-total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </article>
  );
}

// ===== PropTypes (con validaciones y defaults que pide la consigna) =====
const quantityPositive = (props, propName, componentName) => {
  const value = props[propName];
  if (typeof value !== "number" || Number.isNaN(value)) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}': debe ser number.`
    );
  }
  if (value <= 0) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}': debe ser > 0.`
    );
  }
  return null;
};

OrderItem.propTypes = {
  id: PropTypes.number.isRequired, // requerido
  customer: (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value !== "string" || value.trim().length < 3) {
      return new Error(
        `Invalid prop '${propName}' supplied to '${componentName}': string con mínimo 3 caracteres.`
      );
    }
    return null;
  },
  items: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: quantityPositive, // validación custom > 0
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  status: PropTypes.oneOf(["pending", "shipped", "delivered"]),
  date: PropTypes.instanceOf(Date),
};

OrderItem.defaultProps = {
  status: "pending",
  date: new Date(),
};
