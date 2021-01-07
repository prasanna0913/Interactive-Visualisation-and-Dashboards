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
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var selectedId = dropdownMenu.property("value");
    console.log(selectedId);
}


