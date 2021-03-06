var $feelsBtn = $('#feels-btn')
var $resultsKey = $('.results-key')
var $resultsInfo = $('.results-info')
var $feelsItem = $('.feels-item')
var $resultsUl = $('#results-ul')
var $displayFeel = $('.display-feel')
var $strainsLi = $('.strains-li')
var httpClient = axios.create()


$feelsItem.on('click', function() {
    $resultsUl.empty()
    $resultsKey.empty()
    $resultsInfo.empty()
    $resultsKey.removeClass("display-key")
    $resultsInfo.removeClass("display-info")
    const feel = $(this).text()
    $displayFeel.text(feel)
    const options = { url: `/feels/${feel}` }
    httpClient(options).then((serverResponse) => {
        $resultsUl.addClass("display-list")
        $resultsKey.addClass("display-key")
        $resultsKey.html("Sativa:  <span class='sativa'>&#9673</span><br />Indica: <span class='indica'>&#9673</span><br />Hybrid:  <span class='hybrid'>&#9673</span>")
        $resultsUl.append(`<li class="ul-header">Try one of these strains:</li>`)
        var results = serverResponse.data
        var resultsList = []
        $.each( results, function( i, r ){
            if (r.race === "sativa"){
                resultsList.push(`<li class="strains-li sativa">${r.name}</li>`)
            }
            else if (r.race === "indica"){
                resultsList.push(`<li class="strains-li indica">${r.name}</li>`)
            } else {
                resultsList.push(`<li class="strains-li hybrid">${r.name}</li>`)
            }
          })
          $(resultsList.join("")).appendTo($resultsUl)
    })
})

// add desc from api to li title attr (only if the li hasn't already been moused over)
$resultsUl.on('click', 'li', function(){
    let $this = $(this)[0]
    const feel = $(this)[0].innerText
    const options = { url: `/details/${feel}` }
        httpClient(options).then((serverResponse) => {
            console.log($this)
            $resultsInfo.addClass("display-info")
            if (!serverResponse.data){
                $resultsInfo.text("Sorry, no description is available for this strain.")
            }
            else {
                $resultsInfo.text(serverResponse.data)
            }
        })
})


