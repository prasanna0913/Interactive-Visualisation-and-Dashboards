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






