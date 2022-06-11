const express = require('express')
const app = express()

app.get('/', (request, response)=> {
    response.send('<h1>Hello World</h1>')
 //dirigir a https://news.ycombinator.com/ con 1 sóla página
})

app.get('/num', (request, response) => {
    response.send('<p>Segunda página de news</p>')
// dirigir a la api con tantas máginas como alla en num
})


const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})



// const fetch = require("node-fetch");

// fetch("https://news.ycombinator.com/")
// //.then(promesaFetch => promesaFetch.json())
// .then(contenido => console.log(contenido))