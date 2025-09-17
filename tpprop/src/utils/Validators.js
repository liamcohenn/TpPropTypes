// Reglas de negocio adicionales para el formulario
// (Las de PropTypes se validan al renderizar el OrderItem)
export const emptyItem = (n) => ({
    productId: n,
    name: "",
    quantity: 1,
    price: 0,
  });
  
  // Devuelve string con error, o null si está ok
  export const isValidOrderBusinessRules = (order) => {
    if (!order.customer || order.customer.trim().length < 3) {
      return "El nombre del cliente debe tener al menos 3 caracteres.";
      }
    if (!Array.isArray(order.items) || order.items.length === 0) {
      return "Agregá al menos un producto.";
    }
  
    for (const it of order.items) {
      if (!it.name) return "Cada producto debe tener nombre.";
      if (!(typeof it.quantity === "number") || it.quantity <= 0)
        return "La cantidad debe ser un número mayor a 0.";
      if (!(typeof it.price === "number") || it.price < 0)
        return "El precio debe ser un número mayor o igual a 0.";
    }
  
    const validStatuses = ["pending", "shipped", "delivered"];
    if (!validStatuses.includes(order.status)) {
      return "Estado inválido.";
    }
  
    if (!(order.date instanceof Date) || Number.isNaN(order.date.getTime())) {
      return "Fecha inválida.";
    }
  
    return null;
  };
  