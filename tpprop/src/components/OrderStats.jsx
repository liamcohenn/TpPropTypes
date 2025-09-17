import React from "react";
import PropTypes from "prop-types";

/**
 * Muestra cuántos pedidos hay en total y cuántos por estado.
 */
export default function OrderStats({ total, pending, shipped, delivered }) {
  return (
    <div className="stats">
      <div className="stat">
        <span className="stat-label">Total</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Pending</span>
        <span className="stat-value">{pending}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Shipped</span>
        <span className="stat-value">{shipped}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Delivered</span>
        <span className="stat-value">{delivered}</span>
      </div>
    </div>
  );
}

OrderStats.propTypes = {
  total: PropTypes.number.isRequired,
  pending: PropTypes.number.isRequired,
  shipped: PropTypes.number.isRequired,
  delivered: PropTypes.number.isRequired,
};
