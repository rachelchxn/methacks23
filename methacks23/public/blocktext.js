function blockText(elementId, text){
    var elementHtml = document.getElementById(elementId).innerHTML;
    var tags = [];
    var tagLocations= [];
    var htmlTagRegEx = /<{1}\/{0,1}\w+>{1}/;

    //Strip the tags from the elementHtml and keep track of them
    var htmlTag;
    while(htmlTag = elementHtml.match(htmlTagRegEx)){
        tagLocations[tagLocations.length] = elementHtml.search(htmlTagRegEx);
        tags[tags.length] = htmlTag;
        elementHtml = elementHtml.replace(htmlTag, '');
    }

    //Search for the text in the stripped html
    var textLocation = elementHtml.search(text);
    if(textLocation) {
        //blur the selected text
        var blockHTMLStart = '<span class="blur">';
        var blockHTMLEnd = '</span>';
        elementHtml = elementHtml.replace(text, blockHTMLStart + text + blockHTMLEnd);

        //plug back in the HTML tags
        var textEndLocation = textLocation + text.length;
        for(i=tagLocations.length-1; i>=0; i--){
            var location = tagLocations[i];
            if(location > textEndLocation){
                location += blockHTMLStart.length + blockHTMLEnd.length;
            } else if(location > textLocation){
                location += blockHTMLStart.length;
            }
            elementHtml = elementHtml.substring(0,location) + tags[i] + elementHtml.substring(location);
        }
    }

    //Update the html of the element
    document.getElementById(elementId).innerHTML = elementHtml;
}