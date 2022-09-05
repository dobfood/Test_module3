const BaseModel = require("./base.model");
class UserModel extends BaseModel {
    async getCityDetails() {
        const sql = 'select * from city';
        return await this.querySQL(sql);
    }
    async getCity() {
        const sql = 'select id,nameCity,Nation from city';
        return await this.querySQL(sql);
    }

    async UpdateCityInformation(newCity,id) {
        let sqlInsert = `UPDATE city SET
 nameCity= '${newCity.nameCity}'
,Nation = '${newCity.Nation}'
,Area = '${newCity.Area}'
,Population = '${newCity.Population}'
,GDP = '${newCity.GDP}'
,Describes = '${newCity.Describes}'
 WHERE id=${id}`;
        return await this.querySQL(sqlInsert);
    }
    async deleteCityByID(idDelete) {
        let sql = `delete from city where id = ${idDelete}`;
        return await this.querySQL(sql);
    }
    async createNewCity(city) {
        let sql = `insert into city(nameCity,Nation,Area,Population,GDP,Describes) VALUES ('${city.nameCity}', '${city.Nation}', '${city.Area}','${city.Population}','${city.GDP}', '${city.Describes}')`;
        return await this.querySQL(sql);
    }
}
module.exports = UserModel;