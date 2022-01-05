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

// more info button X action
$(".btnX").on('click', () => {
    $(".moreInfoDiv").hide()
    $(".coins_div").slideDown()
})
