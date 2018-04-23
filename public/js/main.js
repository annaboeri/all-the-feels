var $feelsBtn = $('#feels-btn')
var $resultsKey = $('.results-key')
var $feelsItem = $('.feels-item')
var $resultsUl = $('#results-ul')
var $displayFeel = $('.display-feel')
var $strainsLi = $('.strains-li')
var httpClient = axios.create()


$( $resultsUl ).tooltip({   
    position: {
    my: "center bottom-20",
    at: "center top",
    using: function( position, feedback ) {
      $( this ).css( position );
      $( "<div>" )
        .addClass( "arrow" )
        .addClass( feedback.vertical )
        .addClass( feedback.horizontal )
        .appendTo( this );
    }
  }
})

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

// add desc from api to li title attr (only if the li hasn't already been moused over)
$resultsUl.on('mouseenter', 'li', function(){
    let $this = $(this)[0]
    const feel = $(this)[0].innerText
    const options = { url: `/details/${feel}` }
    console.log($($this).attr("title") !== undefined )
    if (!$($this).attr("title")){
        httpClient(options).then((serverResponse) => {
             $($this).attr("title", serverResponse.data)
             console.log($($this).attr("title") )
           })
    }
})


