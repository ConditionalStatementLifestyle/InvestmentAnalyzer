function getGraphs() {
  fetch(URL)
    .then(res => res.json())
    .then(json => renderAllGraphs(json))
}

function renderAllGraphs(graphsData) {
  graphsData.forEach(graphData => {
    renderDataToGraph(graphData)
  })
}

function renderDataToGraph(data) {
  let axisData = parseGraphData(data.data_points)
  let chartInstance = new Graph(data, axisData)
  chartInstance.renderGraph()
}

function parseGraphData(dataPoints) {
  let axisData = {
    xaxis: [],
    yaxis: []
  }
  dataPoints.forEach(dataPoint => {
    axisData['xaxis'].push(parseInt(dataPoint.year))
    axisData['yaxis'].push(parseInt(dataPoint.amount))
  })
  return axisData
}

function loadEditParams(chart) {
  let form = document.getElementById('form')
  form.elements.title.value = chart.title
  form.elements.principal.value = chart.principal
  form.elements.monthly_contribution.value = chart.monthlyContribution
  form.elements.interest_rate.value = chart.annualInterestRate
  form.elements.period.value = chart.investmentPeriod
  form.elements.hidden.value = chart.id
}

function clearFormParams() {
  let form = document.getElementById('form')
  form.elements.title.value = ''
  form.elements.principal.value = ''
  form.elements.monthly_contribution.value = ''
  form.elements.interest_rate.value = ''
  form.elements.period.value = ''
  form.elements.hidden.value = ''
}

function editGraph(data) {
  let chartInstance = findChart(data.id)
  let blankDiv = removeChartDivChildren(chartInstance)
  let axisData = parseGraphData(data.data_points)
  chartInstance.graphObject.updateAxisData(axisData)
  chartInstance.graphObject.updateAttributes(data)
  removeChart(data.id)
chartInstance.graphObject.renderGraph(blankDiv.divObject)
}
function removeChartFromPage(data) {
  let chartInstance = findChart(data.id)
  removeChartDivChildren(chartInstance)
  sendDeleteRequest(data.id)
}

function removeChartParentDiv(id) {
  let parentChartParentDiv = document.getElementById(`Graph:${id}`)
  parentChartParentDiv.remove()
}

function displayTotalWorthWithCommas(worth) {
  let stringifiedWorth = worth.toString()
  let commafiedWorth = []
  let length = stringifiedWorth.length
  for (i = 0; i < stringifiedWorth.length; i++) {
    if (i%3===0 && i != 0) {
      commafiedWorth.unshift(',')
    }
    commafiedWorth.unshift(stringifiedWorth[length - 1 - i])
  }
  return commafiedWorth.join('')
}
