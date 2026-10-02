// Estado del carrito compartido entre todas las paginas (localStorage)
(function () {
  const CLAVE = "carritoTinaja";

  function leerCarrito() {
    try { return JSON.parse(localStorage.getItem(CLAVE)) || []; }
    catch (e) { return []; }
  }
  function guardarCarrito(lista) {
    try { localStorage.setItem(CLAVE, JSON.stringify(lista)); } catch (e) {}
    actualizarInsignia();
  }
  function agregarAlCarrito(id, nombre, precio) {
    const lista = leerCarrito();
    const item = lista.find(p => p.id === id);
    if (item) item.cantidad = Math.min(10, item.cantidad + 1);
    else lista.push({ id, nombre, precio: parseFloat(precio), cantidad: 1 });
    guardarCarrito(lista);
    return lista;
  }
  function quitarDelCarrito(id) {
    const lista = leerCarrito().filter(p => p.id !== id);
    guardarCarrito(lista);
    return lista;
  }
  function cambiarCantidad(id, cantidad) {
    const lista = leerCarrito();
    const item = lista.find(p => p.id === id);
    if (item) item.cantidad = Math.max(1, Math.min(10, parseInt(cantidad, 10) || 1));
    guardarCarrito(lista);
    return lista;
  }
  function vaciarCarrito() { guardarCarrito([]); }
  function totalItems(lista) { return (lista || leerCarrito()).reduce((s, p) => s + p.cantidad, 0); }
  function totalPrecio(lista) { return (lista || leerCarrito()).reduce((s, p) => s + p.cantidad * p.precio, 0); }

  function actualizarInsignia() {
    const link = document.getElementById("cartLink");
    const badge = document.getElementById("cartBadge");
    if (!link || !badge) return;
    const n = totalItems();
    if (n > 0) {
      badge.textContent = n;
      badge.hidden = false;
      link.classList.add("tiene-productos");
    } else {
      badge.hidden = true;
      link.classList.remove("tiene-productos");
    }
  }

  document.addEventListener("DOMContentLoaded", actualizarInsignia);

  window.Carrito = {
    leerCarrito, guardarCarrito, agregarAlCarrito, quitarDelCarrito,
    cambiarCantidad, vaciarCarrito, totalItems, totalPrecio, actualizarInsignia
  };
})();
