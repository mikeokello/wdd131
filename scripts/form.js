const products = [
    { id: "gw-2025", name: "Golden Watches" },
    { id: "wm-2025", name: "Washing Machines" },
    { id: "tv-2025", name: "Smart TVs" },
    { id: "s24-2025", name: "Samsung S24 Phones" }
];

const productSelect = document.querySelector('#product');

products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = product.name;
    productSelect.appendChild(option);
});
