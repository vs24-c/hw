import fs from 'fs/promises';
// import settings from '../settings.mjs';
import settings from '../settings.json' assert {type: 'json'};

class ManagerFiles {
  constructor(filePath) {
    this.filePath = filePath;
  }

  //-------------------Writing object---------------//
  async saveData(arrData) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(arrData, null, 2), 'utf-8');
    } catch (error) {
      throw new Error(`Error save data: ${error.message}`);
    }
  }
  //-------------------Reading object---------------//
  async loadData() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.saveData([]);
        return [];
      } else {
        throw new Error(`Error reading data: ${error.message}`);
      }
    }
  }
  // -------------adding object--------------------//
  async addNewObj(newObj) {
    try {
      const data = await this.loadData();
      if (!newObj) {
        throw new Error('Object not forworded');
      } else {
        data.push(newObj);
        await this.saveData(data);
      }
    } catch (error) {
      throw new Error(`Error adding new object: ${error.message}`);
    }
  }
  //--------------Find object by id------------------//
  async getTempById(id) {
    try {
      const data = await this.loadData();
      const prod = data.find((prod) => prod.id == id);
      if (!prod) {
        throw new Error(`Product with id ${id} not found`);
      }
      return prod;
    } catch (error) {
      throw new Error(`Error while searching for object ${error.message}`);
    }
  }
  //----------------Update object--------------------//
  async updateObj(id, updateObj) {
    try {
      if (!updateObj) {
        throw new Error('Object not provided for update');
      } else if (!id) {
        throw new Error('Id not provided for update');
      }
      const data = await this.loadData();
      const index = data.findIndex((prod) => prod.id == id);
      if (index === -1) {
        throw new Error(`Product with id ${id} not found`);
      }
      data[index] = {...data[index], ...updateObj};
      await this.saveData(data);
    } catch (error) {
      throw new Error(`Error while updating object: ${error.message}`);
    }
  }

  //--------------Delete object by id------------------//
  async deleteObj(id) {
    try {
      if (!id) {
        throw new Error('Id not provided for delete');
      }
      const data = await this.loadData();
      const newData = data.filter((prod) => prod.id != id);
      if (newData.length === data.length) {
        throw new Error(`Product with id ${id} not found`);
      }
      await this.saveData(newData);
    } catch (error) {
      throw new Error(`Error while deleting object: ${error.message}`);
    }
  }
}

export default new ManagerFiles(settings.dataFilePath);
