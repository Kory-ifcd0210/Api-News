const express = require('express');
const app = express();

const puppeteer = require('puppeteer');


const getTabla = async (page) => {
    try {
        const navegador = await puppeteer.launch()
        const pagina = await navegador.newPage()
        var extUrl = "";
        if(page){
            extUrl+="news?p="+page;
        }
        await pagina.goto( 'https://news.ycombinator.com/'+extUrl)

        let tabla = await pagina.evaluate(() => {
            const news = [
                ...document.querySelectorAll('.athing')
            ].map((nodoNews) => nodoNews.innerText);

            const details = [
                ...document.querySelectorAll('.subtext')
            ].map((nodoDetails) => nodoDetails.innerText);

            return  news.map((title, i) => ({title: title, details: details[i] }))
        })
        // await navegador.close()
        // console.log(tabla)
        return tabla;

    }catch (e){
        console.log(e);
    }

}



app.get('/', async (request, response) => {
    var tablaOut = await getTabla();
    response.json(tablaOut)
})

app.get('/:page', async (request, response) => {
    var tablaOut = await getTabla(request.params.page);
    response.json(tablaOut)
})

app.get('/varias/:page', async (request, response) => {
    var tablaOut = await getTabla(request.params.page);
    var tablaOutAnt = await getTabla(request.params.page -1)

    const todas = Object.assign({},tablaOut, tablaOutAnt)
    response.json(todas)
})

const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})

