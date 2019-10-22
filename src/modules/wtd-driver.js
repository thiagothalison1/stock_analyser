const request = require('request')

const api_key = 'YLC8uID9mpXX2GDHcfGcMtnENqSiES2oqJlSN10pUMDZ1ISoLiY9iKfzro0O'

const query_stock_price = stock_name => {
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${stock_name}&api_token=${api_key}`

    return new Promise((resolve, reject) => {
        request({ url, json: true}, (err, resp) => {
            if (err) reject(err)
            else if (resp.body.data === undefined) reject('No Data Found!')
            else resolve(resp.body.data[0])
        })
    })
}

module.exports = {
    query_stock_price
}