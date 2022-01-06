
const convertToSymbols = (arrId) => {
    arrSymbols = []
    for (let i in arrId) {
        let obj = coinsList.find(element => element.id === arrId[i])
        arrSymbols.push(obj.symbol)
    }
    return arrSymbols
}

const createChartOn = () => {
    const arrSymbols = convertToSymbols(liveReportList)
    setInterval(() => {
        createChart(arrSymbols)
    }, 2000);
}

const createChartOff = () => {
    clearInterval(createChart)
}

let arrCoin1 = []
let arrCoin2 = []
let arrCoin3 = []
let arrCoin4 = []
let arrCoin5 = []
async function createChart(arrOfSymbols) {

    const liveData = await $.ajax({ url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${arrOfSymbols[0] ? arrOfSymbols[0] + "," : ""}${arrOfSymbols[1] ? arrOfSymbols[1] + "," : ""}${arrOfSymbols[2] ? arrOfSymbols[2] + "," : ""}${arrOfSymbols[3] ? arrOfSymbols[3] + "," : ""}&${arrOfSymbols[4] ? arrOfSymbols[4] + "," : ""}tsyms=USD` })
    let obj1 = arrOfSymbols[0] ? { x: new Date(), y: liveData[`${arrOfSymbols[0].toUpperCase()}`].USD } : { x: new Date(), y: null }
    let obj2 = arrOfSymbols[1] ? { x: new Date(), y: liveData[`${arrOfSymbols[1].toUpperCase()}`].USD } : { x: new Date(), y: null }
    let obj3 = arrOfSymbols[2] ? { x: new Date(), y: liveData[`${arrOfSymbols[2].toUpperCase()}`].USD } : { x: new Date(), y: null }
    let obj4 = arrOfSymbols[3] ? { x: new Date(), y: liveData[`${arrOfSymbols[3].toUpperCase()}`].USD } : { x: new Date(), y: null }
    let obj5 = arrOfSymbols[4] ? { x: new Date(), y: liveData[`${arrOfSymbols[4].toUpperCase()}`].USD } : { x: new Date(), y: null }
    arrCoin1.push(obj1)
    arrCoin2.push(obj2)
    arrCoin3.push(obj3)
    arrCoin4.push(obj4)
    arrCoin5.push(obj5)
    console.log(obj1)

    var options = {
        exportEnabled: true,
        animationEnabled: false,
        title: {
            text: "Live Chart - price in USD"
        },
        subtitles: [{
            text: "Click Legend to Hide or Unhide Data Series"
        }],
        axisX: {
            title: "Time line"
        },
        axisY: {
            title: "Price per $",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },
        axisY2: {
            title: "Profit in USD",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "spline",
            name: arrOfSymbols[0] ? arrOfSymbols[0] : "",
            showInLegend: true,
            xValueFormatString: "HH",
            yValueFormatString: "#,##0 $",
            dataPoints: arrCoin1
        }, {
            type: "spline",
            name: arrOfSymbols[1] ? arrOfSymbols[1] : "",
            showInLegend: true,
            xValueFormatString: "HH",
            yValueFormatString: "#,##0 $",
            dataPoints: arrCoin2
        },
        {
            type: "spline",
            name: arrOfSymbols[2] ? arrOfSymbols[2] : "",
            showInLegend: true,
            xValueFormatString: "HH",
            yValueFormatString: "#,##0 $",
            dataPoints: arrCoin3
        },
        {
            type: "spline",
            name: arrOfSymbols[3] ? arrOfSymbols[3] : "",
            showInLegend: true,
            xValueFormatString: "HH",
            yValueFormatString: "#,##0 $",
            dataPoints: arrCoin4
        },
        {
            type: "spline",
            name: arrOfSymbols[4] ? arrOfSymbols[4] : "",
            showInLegend: true,
            xValueFormatString: "HH",
            yValueFormatString: "#,##0 $",
            dataPoints: arrCoin5
        }
        ]
    };
    $("#chartContainer").CanvasJSChart(options);

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
}