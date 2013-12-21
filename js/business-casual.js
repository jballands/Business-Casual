/*
 *  business-casual.js
 *  The Javascript portion of Business Casual.
 *
 *  (C)2013 Jonathan Ballands
 */

window.onload = function() {
    
    /*
     *  Hero stuff
     */
    var heroUnitWidth = 0;
    var heroUnitHeight = 0;

    var heroUnitList =  document.querySelectorAll("div.hero-unit");
    var heroUnitTextList =  document.querySelectorAll("span.hero-unit-text");

    // Does a hero unit exist on the page?
    if (heroUnitList.length > 0) {
        // Just use the first one since they are all the same dimensions
        heroUnitWidth = heroUnitList[0].offsetWidth;
        heroUnitHeight = heroUnitList[0].offsetHeight;
    }

    for (var i = 0 ; i < heroUnitTextList.length ; i++) {
        var heroUnitText = heroUnitTextList[i];
        
        var fontSize = window.getComputedStyle(heroUnitText, null).getPropertyValue("font-size");
        
        var heightOffset = (heroUnitHeight / 2) - (parseInt(fontSize) / 2);
        var widthOffset = (heroUnitWidth / 2) - (heroUnitText.offsetWidth / 2);
        
        console.log("Width offset = " + widthOffset + ", and heightOffset = " + heightOffset);
     
        heroUnitText.style.left = widthOffset;
        heroUnitText.style.top = heightOffset;
    }
    
};