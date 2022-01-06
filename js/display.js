// loader display
const loadingOn = () => {
    $("#loader").show()
}

const loadingOff = () => {
    $("#loader").hide()
}

// show/hide elements on main display
$(".about_div").hide()
$(".live_reports_div").hide()
$(".moreInfoDiv").hide()

$("#about_btn").on('click', () => {
    $(".about_div").slideDown()
    $(".live_reports_div").hide()
    $(".coins_div").hide()
    $(".moreInfoDiv").hide()
    clearInterval(createChart)
})

$("#live_charts_btn").on('click', () => {
    $(".live_reports_div").slideDown()
    $('.about_div').hide()
    $(".coins_div").hide()
    $(".moreInfoDiv").hide()
    createChartOn()
})

$("#coins_btn").on('click', () => {
    $(".coins_div").slideDown()
    $(".about_div").hide()
    $(".live_reports_div").hide()
    $(".moreInfoDiv").hide()
    clearInterval(createChart)
})

// parallax background-image
const parallax = document.querySelector(".parallax")
window.addEventListener('scroll', () => {
    let offset = window.pageYOffset
    parallax.style.backgroundPositionY = offset * 0.7 + "px"
})

// more info button X action
$(".btnX").on('click', () => {
    $(".moreInfoDiv").hide()
    $(".coins_div").slideDown()
})

// search coin on page
const searchBar = document.querySelector("#search")
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()
    const filteredCoins = coinsList.filter(coin => {
        return coin.symbol.toLowerCase().includes(searchString) || coin.name.toLowerCase().includes(searchString)
    })
    $("#cardsCon").empty()
    createCards(filteredCoins.slice(0,30))
})
