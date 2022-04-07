// set the dimensions and margins of the graph
const margin3 = {top: 10, right: 30, bottom: 20, left: 50},
    width3 = 460 - margin3.left - margin3.right,
    height3 = 400 - margin3.top - margin3.bottom;

// append the svg object to the body of the page
const svg3 = d3.select("#page-3")
    .append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
    .append("g")
    .attr("transform",`translate(${margin3.left},${margin3.top})`);

svg3.append("circle").attr("cx",80).attr("cy",60).attr("r", 6).style("fill", "#FFC72C")
svg3.append("circle").attr("cx",220).attr("cy",60).attr("r", 6).style("fill", "#1D428A")
svg3.append("text").attr("x", 90).attr("y", 60).text("Coach Jackson").style("font-size", "12px").attr("alignment-baseline","middle")
svg3.append("text").attr("x", 230).attr("y", 60).text("Coach Kerr").style("font-size", "12px").attr("alignment-baseline","middle")

//Creating title for page
svg3.append("text")
    .attr("transform", "translate(-10, -20)")
    .attr("x", 100)
    .attr("y", 50)
    .attr("font-size", "18px")
    .text("Team DRTG in First 3 Seasons")



// Parse the Data
d3.csv("js/data/mj_vs_sk_drtg.csv").then(function(data) {

    // List of subgroups = header of the csv files = soil condition here
    const subgroups3 = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups3 = data.map(d => d.season)

    console.log(groups3)

    // Add X axis
    const x3 = d3.scaleBand()
        .domain(groups3)
        .range([0, width3])
        .padding([0.2])
    svg3.append("g")
        .attr("transform", `translate(0, ${height3})`)
        .call(d3.axisBottom(x3).tickSize(0));

    // Add Y axis
    const y3 = d3.scaleLinear()
        .domain([130, 90])
        .range([height3, 20 ]);
    svg3.append("g")
        .call(d3.axisLeft(y3));

    // Another scale for subgroup position?
    const xSubgroup3 = d3.scaleBand()
        .domain(subgroups3)
        .range([0, x3.bandwidth()])
        .padding([0.1])

    // color palette = one color per subgroup
    const color3 = d3.scaleOrdinal()
        .domain(subgroups3)
        .range(['#FFC72C','#1D428A'])

    // Show the bars
    svg3.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .join("g")
        .attr("transform", d => `translate(${x3(d.season)}, 0)`)
        .selectAll("rect")
        .data(function(d) { return subgroups3.map(function(key) { return {key: key, value: d[key]}; }); })
        .join("rect")
        .attr("x", d => xSubgroup3(d.key))
        .attr("y", d => y3(d.value))
        .attr("width", xSubgroup3.bandwidth())
        .attr("height", d => height3 - y3(d.value))
        .attr("fill", d => color3(d.key));



})