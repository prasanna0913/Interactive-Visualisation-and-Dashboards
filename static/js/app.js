// Initialize dashboard on page load
init();

//  step1 : to create content (dropdown menu items) in dropdown 
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

//  step 2: this method triggers only when the users changes the dropdown menu from dropdown 
function optionChanged(newSample) {
    var selectedId;
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var selectedId = dropdownMenu.property("value");
    console.log(selectedId);

    d3.json('samples.json').then(function (data) {
        //    to build demographic data
        var metaData = data.metadata.filter(subject => subject.id === Number(selectedId));
        buildMetadata(metaData);

        //  data to build charts
        var samplesData = data.samples.filter(sample => sample.id === selectedId);
        //  split first 10 records for creating charts
        var otuIds = samplesData[0].otu_ids.slice(0, 10);
        var otuValues = samplesData[0].sample_values.slice(0, 10);
        var otuLabels = samplesData[0].otu_labels.slice(0, 10);
        buildCharts(metaData, otuIds, otuValues, otuLabels)
    });

}

//  step 3: use meta data and construct the demographic info 
function buildMetadata(selectedMetaData) {
    // remove existing list that is already created 
    d3.selectAll("ul").remove();
    //  get keys and values for for the meta data 
    var meta_keys = Object.keys(selectedMetaData[0]);
    var meta_values = Object.values(selectedMetaData[0]);
    var dropdown = d3.select("#sample-metadata");
    var trow;
    trow = dropdown.append("ul");
    for (var i = 0; i < meta_keys.length; i++) {
        trow.append("li").text(meta_keys[i] + ":" + meta_values[i]);
    }
}

//  Step4 : build chaerts with the supplied data
function buildCharts(selectedMetaData, otuIds, otuValues, otuLabels) {
    //  bar chart
    var trace1 = {
        x: otuValues,
        y: otuIds,
        type: "bar",
        orientation: "h"

    };
    // Create the data array for the plot
    var data = [trace1];

    // Define the plot layout
    var layout = {
        title: "Top ten OTU's for each Subject",
        xaxis: { title: "otu_values" },
        yaxis: { title: "otu_ids" },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100,
            h: 400
        }
    };

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", data, layout);

    // create bubble chart
    var trace2 = {
        x: otuIds,
        y: otuValues,
        mode: "markers",
        marker: {
            size: otuValues,
            color: otuIds,
        },
        text: otuLabels,
    };

    var data = [trace2];

    var layout = {
        title: "All OTU's Sample Value",
        height: 500,
        width: 1050,
        xaxis: {
            title: "OTU IDs",
        },
        yaxis: {
            title: "Sample Values",
        },
    };
    Plotly.newPlot("bubble", data, layout);

}