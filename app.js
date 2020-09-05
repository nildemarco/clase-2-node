const express = require('express');

const app = express();

const port = 8080;

// app.get('/', ((req, res) => {
//     res.send("Hola desde express")
// }))

app.get('/', ((req, res) => {
    res.json({
        estado: "tu pedido fue exitoso!",
    })
}))


app.post('/hola', ((req, res) => {
    // res.send("Hiciste un post a la ruta hola");

    res.status(200).json({
        estado: "Tu post fue exitoso",
    })
}))

app.listen(port, () => {
    console.log(`App esta corriendo en el puerto ${port}`);
})