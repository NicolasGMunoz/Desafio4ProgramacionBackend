//con este socket establecemos la comunicacion con el servidor
const socket = io();

socket.emit('message', 'cliente conectado')
socket.on('evento_socket_individual', data =>{
    console.log(data);
});

const container = document.getElementById('viewProducts');
const primerForm = document.getElementById('form1');
const segundoForm = document.getElementById('form2');

socket.emit('message', 'Hola es un mensaje desde el cliente');

socket.on('showProducts', data => {
    container.innerHTML = ``;

    data.forEach(prod => {
        container.innerHTML += `
            <ul>
                <li>Title: ${prod.title}</li> 
                <li>Description: ${prod.description}</li>
                <li>Code: ${prod.code}</li>
                <li>Price: ${prod.price}</li>
                <li>Status: ${prod.status}</li>
                <li>Stock: ${prod.stock}</li>
                <li>Category: ${prod.category}</li>
                <li>id: ${prod.id}</li>
            </ul>
        `
    });
});

primerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = JSON.parse(document.getElementById('addproduct').value);
    socket.emit('addProduct', newProduct);
    productIdInput.value = '';
});

segundoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('removeproduct').value;
    socket.emit('removeProduct', id);
    productIdInput.value = '';
});