const fetchQueryStock = () => {
    stockName = document.getElementById('stockQueryField').value

    if (!stockName) return

    resultArea = document.getElementById('stockQueryResult')

    fetch(`/stock?stock=${stockName}`)
    .then(response => {
        response
            .json()
            .then(data => {
                if (data.error) resultArea.innerHTML = data.error
                else resultArea.innerHTML = JSON.stringify(data)
            })
            .catch(err => {
                console.error(err)
                resultArea.innerHTML = "There was an error, sorry!"
            })
    })
    .catch(err => {
        console.error(err)
        resultArea.innerHTML = "There was an error, sorry!"
    })
}
