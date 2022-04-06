// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

svg.append("circle").attr("cx",80).attr("cy",60).attr("r", 6).style("fill", "#FFC72C")
svg.append("circle").attr("cx",220).attr("cy",60).attr("r", 6).style("fill", "#1D428A")
svg.append("text").attr("x", 90).attr("y", 60).text("Coach Jackson").style("font-size", "12px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 230).attr("y", 60).text("Coach Kerr").style("font-size", "12px").attr("alignment-baseline","middle")

//Creating title for page
svg.append("text")
    .attr("transform", "translate(-10, -20)")
    .attr("x", 100)
    .attr("y", 50)
    .attr("font-size", "18px")
    .text("Team PPG in First 3 Seasons")



// Parse the Data
d3.csv("data/mj_vs_sk_ppg.csv").then(function(data) {

    // List of subgroups = header of the csv files = soil condition here
    const subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = data.map(d => d.season)

    console.log(groups)

    // Add X axis
    const x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([80, 130])
        .range([height, 20 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Another scale for subgroup position?
    const xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.1])

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#FFC72C','#1D428A'])

    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .join("g")
        .attr("transform", d => `translate(${x(d.season)}, 0)`)
        .selectAll("rect")
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .join("rect")
        .attr("x", d => xSubgroup(d.key))
        .attr("y", d => y(d.value))
        .attr("width", xSubgroup.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", d => color(d.key));



})