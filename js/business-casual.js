/*
 *  business-casual.js
 *  The JavaScript portion of Business Casual. You
 *  need this file to add Business Casual's dynamic 
 *  content to your webpage.
 *
 *  (C)2013 Jonathan Ballands
 */

/*
 *  Class Initializations
 */

// Note: Change this to change speed of Crossfaders
var cf_milliseconds = 5000;

// Crossfader constructor
function Crossfader(frm, imgList, currImage) {
    this.frame = frm;
    this.imageList = imgList;
    this.currentImage = currImage;
}

// Public method, Crossfader.start();
Crossfader.prototype.start = function () {
    
    // this-that syntax because JS is freaking weird
    var that = this;
    
    // Set up the interval with lambdas; beware of data binding
    setInterval(function() {
            
        // Remove crossfader-show from old image
        var thisImage = that.imageList[that.currentImage];
        thisImage.className = thisImage.className.replace(" crossfader-show","");
            
        // Make sure you go back to the beginning if we are at the last image
        if (that.currentImage == that.imageList.length - 1) {
               that.currentImage = 0;
        }
        else {
            that.currentImage++;
        }
            
         // Add crossfader-show to new image
        thisImage = that.imageList[that.currentImage];
        thisImage.className = thisImage.className.replace(" crossfader-show","");
        thisImage.className = thisImage.className + " crossfader-show";
    }, cf_milliseconds);
};

function BusinessCasual() {
    var version = 1.0;
};

/*
 *  Runtime - starts once page has finished loading
 */

BusinessCasual.prototype.go = function() {
    
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
     
        
        if (hasClass(heroUnitText, "left")) {
            heroUnitText.style.left = widthOffset - 2 * (widthOffset / 3);
            heroUnitText.style.top = heightOffset;
        }
        else if (hasClass(heroUnitText, "right")) {
            heroUnitText.style.left = widthOffset + 2 * (widthOffset / 3);
            heroUnitText.style.top = heightOffset;
        }
        else {
            heroUnitText.style.left = widthOffset;
            heroUnitText.style.top = heightOffset;
        }
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
    
    // Sticky/Magnetic
    
    var stickyElementList = document.querySelectorAll(".sticky");
    var currentOffset = 0;
    var allElements = [];
    var stuckElements = [];
    
    // Know where all the tops are for each element before scrolling
    for (var i = 0 ; i < stickyElementList.length ; i++) {
        var stickyElement = stickyElementList[i];
        var thisTop = stickyElement.getBoundingClientRect().top;
        
        allElements.push({"key": thisTop, "value": stickyElement});
    }
    
    // Find all the magnetics and adjust them
    var magneticElementList = document.querySelectorAll(".magnetic");
    for (var i = 0 ; i < magneticElementList.length ; i++) {
        var magneticElement = magneticElementList[i];
        magneticElement.style.top = currentOffset;
        
        currentOffset = currentOffset + magneticElement.offsetHeight - 1;
    }
    
    // When the window scrolls, fire an event
    window.onscroll = function(e) {
        
        // For every sticky
        for (var i = 0 ; i < allElements.length ; i++) {
        
            // Get the kvp
            var kvpSticky = allElements[i];
            var thisTop = kvpSticky["key"];
            var stickyElement = kvpSticky["value"];
        
            // Activate sticky
            if (window.pageYOffset + currentOffset >= thisTop && 
                stuckElements.indexOf(stickyElement) == -1) {
                
                stickyElement.style.position = "fixed";
                stickyElement.style.top = currentOffset;
                stickyElement.style.width = "100%";
                
                stickyElement.nextElementSibling.style.paddingTop = 21;
                
                // Subtract one for prettiness
                currentOffset = currentOffset + stickyElement.offsetHeight - 1;
                stuckElements.push(stickyElement);
            }
            
            // Deactiviate sticky; add offsetHeight to calculate from the bottom of the div
            else if (window.pageYOffset + currentOffset < thisTop + stickyElement.offsetHeight
                     && stuckElements.indexOf(stickyElement) > -1) {
                
                stickyElement.removeAttribute("style");
                stickyElement.nextElementSibling.removeAttribute("style"); 
                
                currentOffset = currentOffset - stickyElement.offsetHeight + 1; 
                stuckElements.splice(stuckElements.indexOf(stickyElement), 1);
            }
        }
    };
    
    /*
     *  Image stuff
     */
    
    // Crossfader
    
    var crossfaderElementList = document.querySelectorAll(".crossfader-frame");
    
    for (var i = 0 ; i < crossfaderElementList.length ; i++) {
        
        var crossfaderFrameElement = crossfaderElementList[i];
        var crossfaderFrameWidth = crossfaderFrameElement.offsetWidth;
        var crossfaderImageList = crossfaderFrameElement.getElementsByTagName("img");
        var currentlyDisplaying = 0;
        
        // Loop through all the images to find the one to show
        for (var j = 0 ; j < crossfaderImageList.length ; j++) {
            var crossfaderImage = crossfaderImageList[j];
            
            // Should be shown?
            if (hasClass(crossfaderImage, ".crossfader-show")) {
                currentlyDisplaying = j;
            }
            
            // Apply id to each image
            crossfaderImage.width = crossfaderFrameWidth - 2;
            crossfaderImage.height = crossfaderFrameWidth - 2;
            crossfaderImage.id = "cf" + j;
        }
        
        // Make a new crossfader
        var inst = new Crossfader(crossfaderFrameElement, crossfaderImageList, currentlyDisplaying);
        inst.start();
    }
};

/*
 *  Helpers
 */

// For Internet Explorer compatibility
// http://stackoverflow.com/questions/5898656/test-if-an-element-contains-a-class
function hasClass(element, cls) {
    return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
}

// If the user overrides the "onload" attribute for the page,
// business-casual.js will be ignored. You will need to use
// bcgo manually in this case.
var bc = new BusinessCasual();
bc.go();