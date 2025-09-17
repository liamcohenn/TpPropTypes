// Datos de ejemplo para arrancar la app
const sample = [
    {
      id: 1,
      customer: "Guillermo Levy",
      status: "pending",
      date: new Date("2025-09-10"),
      items: [
        { productId: 101, name: "Teclado mecánico", quantity: 1, price: 45000 },
        { productId: 102, name: "Mouse inalámbrico", quantity: 2, price: 12000 },
      ],
    },
    {
      id: 2,
      customer: "Carolina Pérez",
      status: "shipped",
      date: new Date("2025-09-12"),
      items: [{ productId: 201, name: "Auriculares", quantity: 1, price: 38000 }],
    },
    {
      id: 3,
      customer: "Martín Gómez",
      status: "delivered",
      date: new Date("2025-09-01"),
      items: [
        { productId: 301, name: "Notebook 14”", quantity: 1, price: 900000 },
        { productId: 302, name: "Funda", quantity: 1, price: 12000 },
      ],
    },
  ];
  
  export default sample;
  