// URL API
const API_URL = 'http://localhost:8080/api/v1/product';

// DOM
const productTableBody = document.querySelector('#productTable tbody');
const productForm = document.getElementById('productForm');

// funcion fetch para ver los productos
async function fetchProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();

    // con esto limpiamos la tabla
    productTableBody.innerHTML = '';

    //aqui  rellenamos la tabla con los productoss
    products.forEach(product => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.productName}</td>
            <td>${product.productPrice.toFixed(2)}</td>
            <td>
                <span class="delete-btn" onclick="deleteProduct(${product.productId})">🗑️</span>  
                <span class="edit-btn" onclick="editProduct(${product.productId})">✏️</span>
            </td>
        `;
// boton para eliminar
// boton para editar
        productTableBody.appendChild(row);
    });
}

// function delete product
async function deleteProduct(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE'
        });

        fetchProducts();
    }
}

// function add nuevo producto
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newProduct = {
        productName: document.getElementById('productName').value,
        productPrice: parseFloat(document.getElementById('productPrice').value)
    };

    await fetch(`${API_URL}/insert`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    });

    productForm.reset();


    fetchProducts();
});

// Función para editar un producto
async function editProduct(id) {
    const newProductName = prompt("Introduce  nuevo nombre :");
    const newProductPrice = parseFloat(prompt("Introduce el nuevo precio:"));

    if (newProductName && newProductPrice) {
        const updatedProduct = {
            productName: newProductName,
            productPrice: newProductPrice
        };

        await fetch(`${API_URL}/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });

       // Tras el edit lo volvemos a cargar
        fetchProducts();
    }
}

// Cargar los Productos al iniciar
fetchProducts();
