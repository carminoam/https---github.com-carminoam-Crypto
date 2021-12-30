
$(async () => {
    try {
        loadingOn()
        const coins = await $.ajax({ url: "https://api.coingecko.com/api/v3/coins/list" })
        const shortList = coins.slice(0, 30)
        coinsList = coins
        createCards(shortList)
        loadingOff()

        $(".moreInfoBtn").on('click', function (e) {
            coinId = $(e.currentTarget).attr("data-id-btn")
            // createMoreInfo(coinId)
            checkLocalStorage(coinId)
            console.log(coinId)
        })
    }
    catch (err) {
        console.log(err)
    }
})
let coinsList = []

// create the cards UI
const createCards = (arrOfObj) => {
    for (let obj in arrOfObj) {
        $("#cardsCon").append(
            `<div class="card c2 col-lg-2 col-md-3 col-xs-12">
            <div class="card-header bg-primary">${arrOfObj[obj].name}</div>
            <div class="card-body">
            <h5 class="card-title">${arrOfObj[obj].symbol}</h5>
            <div class="form-check form-switch in">
                    <input class="form-check-input toggler" type="checkbox" id="${arrOfObj[obj].id}" data-card-inp="${arrOfObj[obj].id}">
                </div>
                <button class="btn btn-primary moreInfoBtn" data-id-btn="${arrOfObj[obj].id}" type="button">More Info</button>
                </div>
                </div>`)
    }
    checkIfToggle()
}


// add/remove coin to live report by toggle button
const checkIfToggle = () => {
    $('.toggler').on('click', function (e) {
        if (liveReportList.length <= 4) {
            if (e.currentTarget.checked === true) {
                // e.currentTarget.setAttribute("checked","checked")
                const itemId = this.id
                liveReportList.push(itemId)
                console.log(liveReportList)
                console.log(e.currentTarget)
            } else {
                const itemId = e.currentTarget.id
                liveReportList = liveReportList.filter((item) => {
                    return item !== itemId
                })
                console.log(liveReportList)
            }
        } else {
            if (e.currentTarget.checked === true) {
                popAlert()
                e.currentTarget.checked = false
            } else {
                const itemId = e.currentTarget.id
                liveReportList = liveReportList.filter((item) => {
                    return item !== itemId
                })
                console.log(liveReportList)
            }
        }
    })
}
let liveReportList = []

// display live reports
const displayLiveReports = () => {
    $(".live_reports_div2").empty()
    for(let i in liveReportList){
        $(".live_reports_div2").append(
            `<div class="live_reports card col-lg-2 col-md-3 col-xs-12">
            <div class="card-header bg-primary">${liveReportList[i]}</div>
            <div class="card-body">
              <h5 class="card-title">${liveReportList[i]}</h5>
              <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
                ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                sapiente ea proident. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                ry richardson ad squid.</p>
            </div>
          </div>`
        )
    }
}

// alert for live report list
const popAlert = () => {
    $(".coins_div").hide()
    $(".moreInfoDiv").slideDown()
    $(".moreInfoDiv2").empty()
    $(".moreInfoDiv2").append(`
    <h4 class="card-header bg-primary">Ooooops!</h4>
    <p>The limit for live reports list is <b>5 coins</b> ...<br>
    if you want to add one you have to remove one of the coins below:</p>`)
    for (let i in liveReportList) {
        $(".moreInfoDiv2").append(
            `<div class="form-check form-switch card-header bg-info">
            <label for="c${liveReportList[i]}">${liveReportList[i]}</label>
            <input class="form-check-input i1" type="checkbox" id="${liveReportList[i]}"checked>
          </div>`
        )
    }
    $(".moreInfoDiv2").append(`<button class="btn btn-primary" onclick="removeByAlert()">Submit</button>`)
}

// remove coins from live report using alert
const removeByAlert = () => {
    // debugger
    liveReportList = []
    const $inputs = $(".i1")
    // console.log($inputs[2])
    for (let i in $inputs) {
        if ($inputs[i].checked === true) {
            const coinId = $inputs[i].id
            liveReportList.push(coinId)
            // console.log($inputs[i].id)
        } else if ($inputs[i].checked === false) {
            // console.log($inputs[i].id)חייב להבין איך עושים שהכרטיסים יקבלו unchecked
            // $(`input[id=${$inputs[i].id}]`).removeAttr("checked")
            console.log($(`input[data-card-inp="${$inputs[i].id}"]`))
        }
    }
    console.log(liveReportList)
    $(".coins_div").slideDown()
    $(".moreInfoDiv").hide()
}

// check local storage
const checkLocalStorage = async (coinId) => {
    debugger
    try {
        let coinLS = JSON.parse(localStorage.getItem(coinId))
        if (coinLS) {
            createMoreInfo(coinLS)
        } else {
            loadingOn()
            const coinObj = await $.ajax({ url: `https://api.coingecko.com/api/v3/coins/${coinId}` })
            createMoreInfo(coinObj)
            localStorage.setItem(coinId, JSON.stringify(coinObj))
            setTimeout(() => localStorage.removeItem(coinId), 120000)
            loadingOff()
        }
    }
    catch (err) {
        console.log(err)
    }
}

// search coin on page
const searchBar = document.querySelector("#search")
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()
    const filteredCoins = coinsList.filter(coin => {
        return coin.symbol.toLowerCase().includes(searchString) || coin.name.toLowerCase().includes(searchString)
    })
    document.querySelector(".coins_div").innerHTML = "<h2>Crypto Coins</h2>"
    createCards(filteredCoins)
})
