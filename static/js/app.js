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
        console.log(samplesData)

        // otu values in desc order and slice 10 
        var sortedOtuValues = samplesData[0].sample_values.sort((a, b) => b - a);
        var otuValues = sortedOtuValues.slice(0, 10);
        console.log(otuValues)

        var sortedOtuids = samplesData[0].otu_ids.sort((a, b) => b - a);
        var stringOtuIds = sortedOtuids.map(id => {
            return id.toString()
        });
        var otuIds = stringOtuIds.slice(0, 10);
        console.log(otuIds)



        var otuLabels = samplesData[0].otu_labels.slice(0, 10);
        console.log(otuLabels)

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
        text: otuLabels,
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

    //  gauge cart
    var data = [
        {
            domain: { x: [0, 9], y: [0, 9] },
            value: selectedMetaData[0].wfreq,
            title: { text: "Wash Frequency of an Individual" },
            type: "indicator",
            mode: "gauge+number"
        }
    ];

    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);


}