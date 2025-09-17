import React, { useMemo, useState } from "react";
import OrderList from "./components/OrderList.jsx";
import OrderFilter from "./components/OrderFilter.jsx";
import OrderStats from "./components/OrderStats.jsx";
import NewOrderForm from "./components/NewOrderForm.jsx";
import initialOrders from "./data/SampleOrders.js";

const VALID_STATUSES = ["pending", "shipped", "delivered"];

export default function App() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("all"); // "all" | "pending" | "shipped" | "delivered"

  const filteredOrders = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const shipped = orders.filter((o) => o.status === "shipped").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    return { total, pending, shipped, delivered };
  }, [orders]);

  const handleAddOrder = (orderPayload) => {
    // Genero un id incremental basado en el mayor id actual
    const nextId =
      orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1;

    // Normalizo date a Date real
    const date =
      orderPayload.date instanceof Date
        ? orderPayload.date
        : new Date(orderPayload.date);

    // Aseguro status válido
    const status = VALID_STATUSES.includes(orderPayload.status)
      ? orderPayload.status
      : "pending";

    const newOrder = { id: nextId, ...orderPayload, status, date };
    setOrders((prev) => [newOrder, ...prev]);
    setFilter("all");
  };

  return (
    <div className="container">
      <header className="header">
        <h1>PedidosAhora — Sistema de Gestión de Pedidos</h1>
        <p className="subtitle">
          Visualización, filtros por estado y validación con PropTypes.
        </p>
      </header>

      <section className="dashboard">
        <div className="dashboard-top">
          <OrderFilter
            filter={filter}
            onChange={setFilter}
            options={["all", "pending", "shipped", "delivered"]}
          />
          <OrderStats
            total={stats.total}
            pending={stats.pending}
            shipped={stats.shipped}
            delivered={stats.delivered}
          />
        </div>

        <div className="content">
          <div className="left">
            <h2>Lista de pedidos {filter !== "all" ? `(${filter})` : ""}</h2>
            <OrderList orders={filteredOrders} />
          </div>

          <div className="right">
            <h2>Nuevo pedido</h2>
            <NewOrderForm onSubmit={handleAddOrder} />
          </div>
        </div>
      </section>
    </div>
  );
}
