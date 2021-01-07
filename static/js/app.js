// Reading and fetching the json data

function init() {
    // Read json data
    d3.json('samples.json').then(function (data) {
        console.log(data);

        var dropdownoption = d3.select("#selDataset");
        for (var i = 0; i < data.names.length; i++) {
            dropdownoption.append("option").text(data.names[i]);

        }
    });
}

function optionChanged(newSample) {
    d3.selectAll("ul").remove();
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    console.log(dataset);
    



}









// Initialize dashboard on page load
init();

