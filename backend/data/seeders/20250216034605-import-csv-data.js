'use strict';
const fs = require('fs');
const csv = require('csv-parser');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let results = [] ;
    const stream = fs.createReadStream("./data/dataset/diem_thi_thpt_2024.csv").pipe(csv())
    console.time("Execution Time");
    for await (const row of stream) {
      results.push({
        sbd: row.sbd,
        toan: parseFloat(row.toan) || null,
        ngu_van: parseFloat(row.ngu_van) || null,
        ngoai_ngu: parseFloat(row.ngoai_ngu) || null,
        vat_li: parseFloat(row.vat_li) || null,
        hoa_hoc: parseFloat(row.hoa_hoc) || null,
        sinh_hoc: parseFloat(row.sinh_hoc) || null,
        lich_su: parseFloat(row.lich_su) || null,
        dia_li: parseFloat(row.dia_li) || null,
        gdcd: parseFloat(row.gdcd) || null,
        ma_ngoai_ngu: row.ma_ngoai_ngu,        
      })

      if (results.length === 10000) {
        await queryInterface.bulkInsert('scores', results, {});
        results = [] ;
        console.log("insert 10000 records")
      }
    }

    if (results.length > 0) {
      await queryInterface.bulkInsert('scores', results, {});
    }

    console.timeEnd("Execution Time");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('scores', null, {});
  }
};
