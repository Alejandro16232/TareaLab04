const express = require('express');
const app = express();

const clientes = [
    { id: 1, nombre: 'Alexis', edad: 21 },
    { id: 2, nombre: 'Alejandro', edad: 20 },
    { id: 3, nombre: 'Vanessa', edad: 26 }
];

const productos = [
    { id: 1, nombre: 'leche', precio: 4 },
    { id: 2, nombre: 'Detergente', precio: 3 },
    { id: 3, nombre: 'aceite', precio: 50 }
];

app.get('/', (req, res) => {
    res.send('Bienvenido a la pagina principal');
});

app.get('/clientes', (req, res) => {
    res.json(clientes);
});

app.get('/productos', (req, res) => {
    res.json(productos);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor Express corriendo en el puerto ${port}');
});
app.use(express.json()); 

app.post('/clientes', (req, res) => {
    const cliente = req.body;
    clientes.push(cliente);
    res.json(cliente);
});

app.put('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const clienteActualizado = req.body;
    const indice = clientes.findIndex(cliente => cliente.id == id);
    if (indice !== -1) {
        clientes[indice] = clienteActualizado;
        res.json(clienteActualizado);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

app.delete('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const indice = clientes.findIndex(cliente => cliente.id == id);
    if (indice !== -1) {
        const clienteEliminado = clientes.splice(indice, 1);
        res.json(clienteEliminado[0]);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    productos.push(nuevoProducto);
    res.json(nuevoProducto); 
});

app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const productoActualizado = req.body;
    const indice = productos.findIndex(producto => producto.id == id);
    
    if (indice !== -1) {
        productos[indice] = productoActualizado;
        res.json(productoActualizado);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    const indice = productos.findIndex(producto => producto.id == id);
    
    if (indice !== -1) {
        const productoEliminado = productos.splice(indice, 1);
        res.json(productoEliminado[0]);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

