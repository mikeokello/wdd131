document.addEventListener("DOMContentLoaded", () => {

    const products = [
        { id: "sp-2025", name: "Smart Phones" },
        { id: "cl-2025", name: "Clothes" },
        { id: "sw-2025", name: "Smart Watches" },
        { id: "lp-2025", name: "Laptops" },
        { id: "tv-2025", name: "Smart TVs" }
    ];

    const productSelect = document.querySelector('#product');

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });

});
