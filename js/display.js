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