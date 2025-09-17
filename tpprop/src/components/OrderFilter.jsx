import React from "react";
import PropTypes from "prop-types";

/**
 * Permite elegir un estado para filtrar pedidos.
 * Recibe el estado seleccionado como prop.
 */
export default function OrderFilter({ filter, onChange, options }) {
  return (
    <div className="filter">
      <label htmlFor="filterSel">Filtrar por estado:</label>
      <select
        id="filterSel"
        value={filter}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}

OrderFilter.propTypes = {
  filter: PropTypes.oneOf(["all", "pending", "shipped", "delivered"]).isRequired,
  onChange: PropTypes.func.isRequired,
  // La consigna pide oneOf para el filtro (pending|shipped|delivered),
  // pero como agregamos "all" a la UI del dashboard, lo validamos acá.
};
