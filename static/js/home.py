/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */


// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    // Read the json data


    // Parse and filter the data to get the sample's metadata

    // Specify the location of the metadata and update it

}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data

}
// Parse and filter the data to get the sample's OTU data

// Pay attention to what data is required for each chart

// Create bar chart in correct location

// Create bubble chart in correct location

// Define function that will run on page load
function init() {

    // Read json data
    d3.json('samples.json').then(function (data) {
        console.log(data);
        var selDataset = document.getElementById("selDataset");
        // use for loop to create select object
        for (var i = 0; i < data.names.length; i++) {
            var option = document.createElement("option");
            option.value = data.names[i];
            option.innerHTML = data.names[i];
            selDataset.appendChild(option);
        }
        //
    });







    // Parse and filter data to get sample names

    // Add dropdown option for each sample

    // Use first sample to build metadata and initial plots

}

function optionChanged(newSample) {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    console.log(dataset);
    d3.json('samples.json').then(function (data) {
        var response = data.samples.filter(sample => sample.id === dataset);
        var selectedMetaData = data.metadata.filter(subject => subject.id === Number(dataset));
        console.log(selectedMetaData);

        var description = document.getElementById("sample-metadata");
        var meta_keys = Object.keys(selectedMetaData[0]);
        var meta_values = Object.values(selectedMetaData[0]);
        for (var l = 0; l < meta_keys.length; l++) {
            var item = document.createElement('li');
            var ul = document.createElement('ul');
            var content = meta_keys[l] + ":" + meta_values[l];
            var text = document.createTextNode(content);
            item.appendChild(text);
            ul.appendChild(item);
            description.appendChild(ul);
        };
        var barChartValues = response[0].sample_values.slice(0, 10);
        var barChartotu = response[0].otu_ids.slice(0, 10);
        var otuLabels = response[0].otu_labels.slice(0, 10);
        var trace1 = {
            x: barChartValues,
            y: barChartotu,
            type: "bar"
        };
        // Create the data array for the plot
        var data = [trace1];

        // Define the plot layout
        var layout = {
            title: "Eye Color vs Flicker",
            xaxis: { title: "Eye Color" },
            yaxis: { title: "Flicker Frequency" }
        };

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data, layout);


        // create bubble chart
        var trace2 = {
            x: barChartotu,
            y: barChartValues,
            mode: "markers",
            marker: {
                size: barChartValues,
                color: barChartotu,
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
    });



}

// Initialize dashboard on page load
init();

