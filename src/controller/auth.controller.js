const fs = require("fs");
const qs = require('qs');
const url = require('url')
const UserModel = require("../model/user.model");

class AuthController {
    UserModel;

    constructor() {
        this.UserModel = new UserModel();
    }

    showList(req, res) {
        fs.readFile('./view/index.html', 'utf8', async (err, data) => {
            if (err) {
                console.log(err.message);
            } else {
                let city = await this.UserModel.getCity();
                let html = '';
                city.map((item, index) => {
                    html += `<tr>`;
                    html += `<td>${index + 1}</td>`;
                    html += `<td>${item.nameCity}</td>`;
                    html += `<td>${item.Nation}</td>`;
                    html += `<td><a href="/details?index=${item.id}">Details</a></td>`;
                    html += `<td><a href="/update?index=${item.id}">Upadte</a></td>`;
                    html += `<td><a onclick="return confirm('Are you sure?')" href="/delete?index=${item.id}" class ="btn btn-danger">DELETE</a></td>`;
                });
                data = data.replace('{list-city}', html);
                res.setHeader('Cache-Control', 'no-store');
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
        })
    }

    async deleteCity(req, res, idDelete) {
        await this.UserModel.deleteCityByID(idDelete);
        res.setHeader('Cache-Control', 'no-store');
        res.writeHead(301, {Location: '/'});
        res.end();
    }

    ShowDetailCity(req, res) {
        fs.readFile('./view/details.html', 'utf8', async (err, data) => {
            if (err) {
                console.log(err.message);
            } else {
                let id = qs.parse(url.parse(req.url).query).id;
                let city = await this.UserModel.getCityDetails();
                let html = '';
                city.map((item, index) => {
                    html += `<tr>`;
                    html += `<td>${index + 1}</td>`;
                    html += `<td>${item.nameCity}</td>`;
                    html += `<td>${item.Nation}</td>`;
                    html += `<td>${item.Area}</td>`;
                    html += `<td>${item.Population}</td>`;
                    html += `<td>${item.GDP}</td>`;
                    html += `<td>${item.Describes}</td>`;
                });
                data = data.replace('{list-citydetails}', html);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
        })
    };

    showFormUpdate(req, res) {
        fs.readFile('./view/form.html', 'utf8', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    };

    updateCity(req, res) {
        let data = ''
        req.on('data', chunk => {
            data += chunk
        });
        req.on('end', async () => {
            let id = qs.parse(url.parse(req.url).query).index;
            let newCity = qs.parse(data);

            if (newCity && id) {
                await this.UserModel.UpdateCityInformation(newCity, id);
                this.ShowDetailCity(req, res)
            }
            res.writeHead(301, {'location': '/'});
            res.end();
        })
    };

    showFormCreateCity(req, res) {
        fs.readFile('./view/form.html', 'utf8', (err, data) => {
            res.setHeader('Cache-Control', 'no-store');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    };

    createCity(req, res) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', async () => {
            let city = qs.parse(data);
            console.log(city
            )
            await this.UserModel.createNewCity(city);
            res.setHeader('Cache-Control', 'no-store');
            res.writeHead(301, {'location': '/'});
            return res.end();
        })
    };


}

module.exports = AuthController;