

const fs = require('fs');

// read JSON object from file
fs.readFile('./paletas.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    let buffer =JSON.parse(data.toString());
    buffer.map( paleta => {

        // paleta.descricao = `Sorvete de ${paleta.titulo}`;
        let str = paleta.foto.split(" (' ")[1];
        str = str.split(" ') ")[1];

    });

    //console.log('paletas:', buffer);

    // stringify JSON Object
    let jsonContent = JSON.stringify(buffer);
    //console.log(jsonContent);    

    // write JSON string to a file
    fs.writeFile('./paletas1.json', jsonContent, (err) => {
        if (err) {
            throw err;
        }
        console.log("./paletas1.json saved.");
    });

});

