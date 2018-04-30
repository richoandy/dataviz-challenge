function readData (cb) {
  d3.csv("astronauts.csv", function (data) {
    return data
  })
  .then(dataJSON => {
    cb(dataJSON)
  })
}

readData(function (data) {
  let active = []
  let retired = []
  let deceased = []

  data.forEach(d => {
    if (d.Status === "Active") {
      active.push(d)
    }
    if (d.Status === "Retired") {
      retired.push(d)
    }
    if (d.Status === "Deceased") {
      deceased.push(d)
    }
  })

  let astronotData = [
    {
      status: "active",
      total: active.length
    },
    {
      status: "retired",
      total: retired.length
    },
    {
      status: "deceased",
      total: deceased.length
    }
  ]

  const svg = d3.select('#container').append('svg')
  .attr('width', 1000)
  .attr('height', 400)
  .style('background', '#cacaca')

  const colorScale = d3.scaleLinear()
    .domain([-12, 255])
    .range(['peru', 'teal'])
  
  svg.selectAll('rect')
    .data(astronotData)
    .enter()
    .append('rect')
    .transition()
    .duration(750)
    .delay(function (d, i) {
      return i * 50
    })
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i*200
    })
    .attr('y', (d) => {
      return 300 - d.total * 1
    })
    .attr('width', 15)
    .attr('height', (d) => {
      return d.total * 10
    })
    .attr('fill', (d) => {
      return colorScale(d.total)
    })
})