import React, { useState } from "react";
import PropTypes from "prop-types";
import { isValidOrderBusinessRules, emptyItem } from "../utils/Validators.js";

/**
 * Formulario de nuevos pedidos con validaciones de reglas de negocio.
 * (La validación de PropTypes ocurre cuando el pedido se renderiza en OrderItem.)
 */
export default function NewOrderForm({ onSubmit }) {
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("pending");
  const [date, setDate] = useState(() =>
    new Date().toISOString().substring(0, 10)
  );

  const [items, setItems] = useState([{ ...emptyItem(1) }]);
  const [error, setError] = useState("");

  const addItem = () => {
    const nextIndex = items.length + 1;
    setItems((prev) => [...prev, emptyItem(nextIndex)]);
  };

  const removeItem = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };    

  const updateItem = (idx, field, value) => {
    setItems((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, [field]: value } : it))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      customer: customer.trim(),
      status,
      date: new Date(date),
      items: items.map((it, i) => ({
        productId: Number(it.productId) || i + 1,
        name: String(it.name || "").trim(),
        quantity: Number(it.quantity),
        price: Number(it.price),
      })),
    };

    const errorMsg = isValidOrderBusinessRules(payload);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setError("");
    onSubmit(payload);
    // Reset
    setCustomer("");
    setStatus("pending");
    setDate(new Date().toISOString().substring(0, 10));
    setItems([{ ...emptyItem(1) }]);
  };

  const total = items.reduce((acc, it) => {
    const q = Number(it.quantity);
    const p = Number(it.price);
    if (!Number.isFinite(q) || !Number.isFinite(p)) return acc;
    return acc + q * p;
  }, 0);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Cliente</label>
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          required
          minLength={3}
        />
      </div>

      <div className="field">
        <label>Estado</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">pending</option>
          <option value="shipped">shipped</option>
          <option value="delivered">delivered</option>
        </select>
      </div>

      <div className="field">
        <label>Fecha</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="items">
        <div className="items-head">
          <h4>Productos</h4>
          <button type="button" className="btn" onClick={addItem}>
            + Agregar producto
          </button>
        </div>

        {items.map((it, idx) => (
          <div key={idx} className="item-row">
            <input
              type="text"
              placeholder="Nombre del producto"
              value={it.name}
              onChange={(e) => updateItem(idx, "name", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={it.quantity}
              onChange={(e) => updateItem(idx, "quantity", e.target.value)}
              min={1}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Precio"
              value={it.price}
              onChange={(e) => updateItem(idx, "price", e.target.value)}
              min={0}
              required
            />
            <button
              type="button"
              className="btn danger"
              onClick={() => removeItem(idx)}
              disabled={items.length === 1}
              title="Quitar producto"
            >
              Quitar
            </button>
          </div>
        ))}

        <div className="total-preview">
          <strong>Total estimado: ${Number(total || 0).toFixed(2)}</strong>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      <button className="btn primary" type="submit">
        Guardar pedido
      </button>
    </form>
  );
}

NewOrderForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
