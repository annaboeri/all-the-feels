var $feelsBtn = $('#feels-btn')
var $resultsKey = $('.results-key')
var $feelsItem = $('.feels-item')
var $resultsUl = $('#results-ul')
var $displayFeel = $('.display-feel')
var $strainsLi = $('.strains-li')
var httpClient = axios.create()


$feelsItem.on('click', function() {
    $resultsUl.empty()
    $resultsKey.empty()
    $resultsKey.removeClass("display-key")
    const feel = $(this).text()
    $displayFeel.text(feel)
    const options = { url: `/feels/${feel}` }
    httpClient(options).then((serverResponse) => {
        $resultsUl.addClass("display-list")
        $resultsKey.addClass("display-key")
        $resultsKey.html("Sativa:  <span class='sativa'>&#9673</span><br />Indica: <span class='indica'>&#9673</span><br />Hybrid:  <span class='hybrid'>&#9673</span>")
        $resultsUl.append(`<li class="ul-header">Try one of these strains:</li>`)
        var results = serverResponse.data
        $.each( results, function( i, r ){
            if (r.race === "sativa"){
                $resultsUl.append(`<li class="strains-li sativa">${r.name}</li>`)
            }
            else if (r.race === "indica"){
                $resultsUl.append(`<li class="strains-li indica">${r.name}</li>`)
            } else {
                $resultsUl.append(`<li class="strains-li hybrid">${r.name}</li>`)
            }
            
          })
    })
})

$resultsUl.on('click', 'li', function(){
    const feel = $(this)[0].innerText
    console.log(feel)
})


