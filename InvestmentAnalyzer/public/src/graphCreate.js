class Graph {

  constructor(id, title, data) {
    this.id = id
    this.title = title
    this.data = data
    this.chartObject = {}
  }

  setup() {
    this.chartObject['contents'] = {
      title: `${this.title}`,
      type: 'line',
      data: {
        labels: this.data['xaxis'],
        datasets: [{
          label: '',
          data: this.data['yaxis'],
          backgroundColor: [
            'rgba(50, 99, 250, 0.1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Years'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Total Value In $'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  }

  renderGraph() {
    let graphsDiv = document.getElementById('graphs')
    let div = document.createElement('div')
    div.textContent = 'HELLO?'
    div.setAttribute('class','chart')

    let canvas = document.createElement('canvas')
    canvas.setAttribute('id',`${this.id}`)
    canvas.setAttribute('width','100px')
    canvas.setAttribute('height','100px')
    let ctx = canvas.getContext('2d')
    div.appendChild(canvas)
    graphsDiv.appendChild(div)


    let newChart = new Chart(ctx, this.chartObject['contents'])
    debugger
  }


}
