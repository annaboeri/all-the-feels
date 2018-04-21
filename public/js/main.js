
var $feelsBtn = $('#feels-btn')
var $feelsItem = $('.feels-item')
var $resultsUl = $('#results-ul')
var $displayFeel = $('.display-feel')
var httpClient = axios.create()


$feelsItem.on('click', function() {
    $resultsUl.empty()
    $resultsUl.removeClass("display-list")
    const feel = $(this).text()
    $displayFeel.text(feel)
    const options = { url: `/feels/${feel}` }
    httpClient(options).then((serverResponse) => {
        $resultsUl.addClass("display-list")
        var results = serverResponse.data
        $.each( results, function( i, r ){
            if (r.race === "sativa"){
                $resultsUl.append(`<li class="sativa">${r.name} (${r.race})</li>`)
            }
            else if (r.race === "indica"){
                $resultsUl.append(`<li class="indica">${r.name} (${r.race})</li>`)
            } else {
                $resultsUl.append(`<li class="hybrid">${r.name} (${r.race})</li>`)
            }
            
          })
    })
})
