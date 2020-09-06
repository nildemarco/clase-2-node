const fs = require('fs');
const express = require('express');
const { restart } = require('nodemon');
const app = express();

const port = 8080;

app.use(express.json());

// app.get('/', ((req, res) => {
//     res.send("Hola desde express")
// }))

app.get('/gatitos', ((req, res) => {
    fs.readFile(`${__dirname}/assets/gatitos.txt`, ((err, data) => {

        dataJSON = JSON.parse(data);

        res.json({
            status: 'success',
            data: dataJSON,
        })
        if (err) {
            res.sendStatus(500).send("Algo anda mal");
        }
    }))
}))


app.post('/gatitos', ((req, res) => {
    let nuevoGatitoAGuardar = req.body;

    if (nuevoGatitoAGuardar) {
        fs.readFile(`${__dirname}/assets/gatitos.txt`, ((err, data) => {
            const dataJSON = JSON.parse(data);
            nuevoGatitoAGuardar.id = dataJSON.length;

            dataJSON.push(nuevoGatitoAGuardar)

            fs.writeFile(`${__dirname}/assets/gatitos.txt`, JSON.stringify(dataJSON), (err) => {
                res.status(201).json({
                    estado: "success",
                    data: {
                        nuevoGatitoAGuardar,
                        createAt: new Date(),
                    }
                })
            })
        }))
    }
}))

app.delete('/gatitos/:id', ((req, res) => {
    fs.readFile(`${__dirname}/assets/gatitos.txt`, ((err, data) => {
        const dataJSON = JSON.parse(data);
        idGatitoABorrar = Number(req.params.id);

        const arrGatitosFiltrados = dataJSON.filter(gato => gato.id !== idGatitoABorrar);

        fs.writeFile(`${__dirname}/assets/gatitos.txt`, JSON.stringify(arrGatitosFiltrados), (err) => {
            res.status(202).json({
                status: 'success',
                data: arrGatitosFiltrados,
            })
        })
    }))

}))


app.put('/gatitos/:id', ((req, res) => {
    fs.readFile(`${__dirname}/assets/gatitos.txt`, ((err, data) => {
        const dataJSON = JSON.parse(data);
        const idGatitoAEditar = Number(req.params.id);
        const nuevoGatito = req.body;

        let gatoEncontrado = dataJSON.find(gato => gato.id === idGatitoAEditar)

        if (gatoEncontrado) {
            let gatoActualizado = {
                id: gatoEncontrado.id,
                name: nuevoGatito.name,
                shortDesc: nuevoGatito.shortDesc,
                longDesc: nuevoGatito.longDesc,
                img: nuevoGatito.img,
                colores: nuevoGatito.colores,
                sexo: nuevoGatito.sexo,
                disponible: nuevoGatito.disponible,
            }
            let targetIndex = dataJSON.indexOf(gatoEncontrado);

            dataJSON.splice(targetIndex, 1, gatoActualizado);

            fs.writeFile(`${__dirname}/assets/gatitos.txt`, JSON.stringify(dataJSON), (err) => {
                res.status(201).json({
                    status: 'success',
                    data: dataJSON
                });
            })
        } else {
            res.sendStatus(404);
        }




    }))
}))

app.listen(port, () => {
    console.log(`App esta corriendo en el puerto ${port}`);
})

