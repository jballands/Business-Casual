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
    
    // Hero units
    
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
        
        var heightOffset = (heroUnitHeight / 2) - (heroUnitText.offsetHeight / 2);
        var widthOffset = (heroUnitWidth / 2) - (heroUnitText.offsetWidth / 2);
     
        heroUnitText.style.left = widthOffset;
        heroUnitText.style.top = heightOffset;
    }
    
    // Sidekick units
    
    var sidekickUnitWidth = 0;
    var sidekickUnitHeight = 0;

    var sidekickUnitList =  document.querySelectorAll("div.sidekick-unit");
    var sidekickUnitTextList =  document.querySelectorAll("span.sidekick-unit-text");

    // Does a hero unit exist on the page?
    if (sidekickUnitList.length > 0) {
        // Just use the first one since they are all the same dimensions
        sidekickUnitWidth = sidekickUnitList[0].offsetWidth;
        sidekickUnitHeight = sidekickUnitList[0].offsetHeight;
    }

    for (var i = 0 ; i < sidekickUnitTextList.length ; i++) {
        var sidekickUnitText = sidekickUnitTextList[i];
        
        var heightOffset = (sidekickUnitHeight / 2) - (sidekickUnitText.offsetHeight / 2);
        var widthOffset = (sidekickUnitWidth / 2) - (sidekickUnitText.offsetWidth / 2);
     
        sidekickUnitText.style.left = widthOffset;
        sidekickUnitText.style.top = heightOffset;
    }
    
    /*
     *  Navigation stuff
     */
    
    // Sticky
    
    // Get the sticky element's top
    var stickyElementList = document.querySelectorAll("div.sticky");
    var currentOffset = 0;
    
    // For every sticky
    for (var i = 0 ; i < stickyElementList.length ; i++) {
        
        // Get some information
        var stickyElement = stickyElementList[i];
        var thisTop = stickyElement.getBoundingClientRect().top;
        
        // When the window scrolls, fire an event
        window.onscroll = function(e) {
            
            // Activate sticky
            if (window.pageYOffset >= thisTop) {
                stickyElement.style.position = "fixed";
                stickyElement.style.top = 0;
                stickyElement.style.width = "100%";
                stickyElement.style.zIndex = 100;
                
                stickyElement.nextElementSibling.style.paddingTop = 22;
            }
            
            // Deactiviate sticky
            else {
                stickyElement.removeAttribute("style");
                stickyElement.nextElementSibling.removeAttribute("style");
            }
        
        };    
    }
    
};