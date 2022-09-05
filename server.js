const qs = require('qs');
const port = 4000;
const http = require('http');
const url = require('url');
const AuthController = require("./src/controller/auth.controller");
let authController = new AuthController();
const server = http.createServer((req, res) => {
    let urlParse = url.parse(req.url)
    console.log(urlParse)
    let urlPath = urlParse.pathname;
    let method = req.method;
    switch (urlPath) {
        case'/':
            authController.showList(req, res)
            break;
        case'/create':
            if (method === 'GET') {
                authController.showFormCreateCity(req, res);
            } else {
                authController.createCity(req, res);
            }
            break;
        case'/details':
            authController.ShowDetailCity(req, res)
            break;
        case'/delete':
            let id = qs.parse(urlParse.query).index;
            console.log(id)
            authController.deleteCity(req, res, id).catch();
            break;
        case'/update':
            if (method === 'GET') {
                authController.showFormUpdate(req, res);
            } else {
                authController.updateCity(req, res);
            }
            break
        default:
            res.end()
    }
})
server.listen(port, 'localhost', () => {
    console.log(`Connection https://localhost:${port}`)
})
