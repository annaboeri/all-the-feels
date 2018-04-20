
var $feelsBtn = $('#feels-btn')
var $feelsItem = $('.feels-item')
var $resultsUl = $('#results-ul')
var httpClient = axios.create()


$feelsItem.on('click', function() {
    $resultsUl.empty()
    const feel = $(this).text()
    const options = { url: `/feels/${feel}` }
    httpClient(options).then((serverResponse) => {
        var results = serverResponse.data
        $.each( results, function( i, r ){
             $resultsUl.append(`<li>${r.name}</li>`)
          })
    })
})
