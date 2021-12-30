// loader display
const loadingOn = () => {
    $("#loader").show()
}

const loadingOff = () => {
    $("#loader").hide()
}

let counter = 0
// load pages (30 per click)
$("#pages").html(`display coins: ${counter} to - ${counter + 30}`)
$("#next").on('click', () => {
    counter += 30
    let current = coinsList.slice(counter,counter + 30)
    $("#cardsCon").empty()
    createCards(current)
    console.log(current)
    $("#pages").html(`display coins: ${counter} to - ${counter + 30}`)
})
$("#prev").on('click', () => {
    counter -= 30
    let current = coinsList.slice(counter,counter + 30)
    $("#cardsCon").empty()
    createCards(current)
    console.log(current)
    $("#pages").html(`display coins: ${counter} to - ${counter + 30}`)
})

// show/hide elements on main display
$(".about_div").hide()
$(".live_reports_div").hide()
$(".moreInfoDiv").hide()

$("#about_btn").on('click', () => {
    $(".about_div").slideDown()
    $(".live_reports_div").hide()
    $(".coins_div").hide()
    $(".moreInfoDiv").hide()
})

$("#live_charts_btn").on('click', () => {
    $(".live_reports_div").slideDown()
    $('.about_div').hide()
    $(".coins_div").hide()
    $(".moreInfoDiv").hide()
    displayLiveReports()
})

$("#coins_btn").on('click', () => {
    $(".coins_div").slideDown()
    $(".about_div").hide()
    $(".live_reports_div").hide()
    $(".moreInfoDiv").hide()
})

// parallax background-image
const parallax = document.querySelector(".parallax")
window.addEventListener('scroll', () => {
    let offset = window.pageYOffset
    parallax.style.backgroundPositionY = offset * 0.7 + "px"
})

//more info
const createMoreInfo = (obj) => {
    $(".coins_div").hide()
    $(".moreInfoDiv").slideDown()
    $(".moreInfoDiv2").empty()
    $(".moreInfoDiv2").append(`
    <h4 class="card-header bg-primary">${obj.id}</h4>
    <img class="coinImg" src="${obj.image.large}">
    <ul class="ul">
    <li>Price by USD: <span class="price">${obj.market_data.current_price.usd} $<span></li>
    <li>Price by EUR: <span class="price">${obj.market_data.current_price.eur} €<span></li>
    <li>Price by ILS: <span class="price">${obj.market_data.current_price.ils} ₪<span></li>
    </ul>
    <p> ${obj.description.en} </p>`)
}

// more info button X action
$(".btnX").on('click', () => {
    $(".moreInfoDiv").hide()
    $(".coins_div").slideDown()
})