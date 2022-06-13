// const express = require('express')
// const zlib = require("zlib");
// const requestLibrary = require("request");
const puppeteer = require('puppeteer');

(async () => {
    try {
        const navegador = await puppeteer.launch()
        const pagina = await navegador.newPage()
        await pagina.goto( 'https://news.ycombinator.com/')

        let tabla = await pagina.evaluate(() => {
            const news = [
                ...document.querySelectorAll('.athing')
            ].map((nodoNews) => nodoNews.innerText);

            const details = [
                ...document.querySelectorAll('.subtext')
            ].map((nodoDetails) => nodoDetails.innerText);

            return news.map((title, i) => ({title: title, details: details[i] }))
        })

        console.log(tabla)
        await navegador.close()

    }catch (e){
        console.log(e);
    }
})()

// const options = {
//   hostname: 'news.ycombinator.com/',
//   method: 'GET',
// };
// const app = express()

// app.get('/', async (request, response)=> {
//     await requestLibrary(
//         { method: 'GET'
//         , uri: 'https://news.ycombinator.com/newest'
//         , gzip: true
//         }
//         , function (error, responseNews, body) {
//             response.send(body);
//         }
//     )
// })

// app.get('/num', (request, response) => {
//     response.send('<p>Segunda página de news</p>')
// // // dirigir a la api con tantas máginas como alla en num
// // })


// const PORT = 3001
// app.listen(PORT, () =>{
//     console.log(`Server running on port ${PORT}`)
// })



// const fetch = require("node-fetch");

// fetch("https://news.ycombinator.com/")
// //.then(promesaFetch => promesaFetch.json())
// .then(contenido => console.log(contenido))