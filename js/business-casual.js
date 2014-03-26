/*
 *  business-casual.js
 *  The JavaScript portion of Business Casual. You
 *  need this file to add Business Casual's dynamic 
 *  content to your webpage.
 *
 *  I strongly advise that you do not modify this file
 *  in any way! It's way too complicated, even with my
 *  lovely comments. :)
 *
 *  (C)2014 Jonathan Ballands
 */

/*
 *  Class Initializations
 */

// Note: Change this to change speed of Crossfaders
var cf_milliseconds = 5000;

// Note: Change this to change the parallax dampening
var parallax_dampening = 3;

// Used to detect if the window is scrolling up or down
// Should start at 0
var scrollPosition = window.pageYOffset;
var isScrollingUp = false;
var isScrollingDown = false;

// Crossfader constructor
function Crossfader(frm, imgList, currImage) {
    this.frame = frm;
    this.imageList = imgList;
    this.currentImage = currImage;
}

// Public method, Crossfader.start();
Crossfader.prototype.start = function () {
    
    // this-that syntax for proper scoping
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

// Business Casual object constructor so that the user
// can incorporate more scripts into their project and
// those scripts won't bump heads with Business Casual
function BusinessCasual() {
    var version = 1.0;
};

/*
 *  go() is the runtime function
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
    var navigationBarHeight = 0;
    var allElements = [];
    var stuckElements = [];
    
    
    // Know where all the tops are for each element before scrolling
    for (var i = 0 ; i < stickyElementList.length ; i++) {
        var stickyElement = stickyElementList[i];
        
        // Subtract 12 due to padding
        var thisTop = stickyElement.offsetTop - 12;
        
        // If there is no fade out attribute, undefined will be used
        var fadeOutId = document.getElementById(stickyElement.getAttribute("fadeOut"));
        
        var fadeOut = undefined;
        if (fadeOutId != null) {
            var fadeOut = fadeOutId.offsetTop;
        }
        
        // Compute the next line height
        var nextLineHeight = getComputedStyle(stickyElement.nextElementSibling, null)
            .getPropertyValue("font-size");
        nextLineHeight = nextLineHeight.replace("px", "");
        nextLineHeight = parseInt(nextLineHeight);
        
        // Push element into list
        allElements.push({"element": stickyElement, "top": thisTop, "bottom": fadeOut, 
            "nextLineHeight": parseInt(nextLineHeight)});
    }
    
    // Find all the magnetics and adjust them
    var magneticElementList = document.querySelectorAll(".magnetic");
    for (var i = 0 ; i < magneticElementList.length ; i++) {
        var magneticElement = magneticElementList[i];
        magneticElement.style.top = currentOffset;
        
        currentOffset = currentOffset + magneticElement.offsetHeight - 1;
    }
    
    // Establish a navigation bar height, if one exists
    if (stickyElementList.length > 0) {
        navigationBarHeight = stickyElementList[0].offsetHeight;
    }
    else if (magneticElementList.length > 0) {
        navigationBarHeight = magneticElementList[0].offsetHeight;
    }
    
    /*
     *  Parallax Stuff
     */
    
    // Get all the parallax backgrounds
    var parallaxElementList = document.querySelectorAll(".parallax");
    
    // When the window scrolls, fire an event
    window.onscroll = function(e) {
        
        // Falsify scrolling for safety         
        isScrollingUp = false;
        isScrollingDown = false;
        
        // Determine direction of scroll
        var scroll = window.pageYOffset;
        if (scroll > scrollPosition) {
            isScrollingDown = true;
        }
        else if (scroll < scrollPosition) {
            isScrollingUp = true;
        }
        
        // For every sticky
        for (var i = 0 ; i < allElements.length ; i++) {
        
            // Unpack kvp
            var kvpSticky = allElements[i];
            var thisTop = kvpSticky["top"];
            
            // Check to see if there sound be a 12 pixel pad or not
            if (stuckElements.length <= 0) {
                thisTop = thisTop + 12;
            }
            
            var stickyElement = kvpSticky["element"];
            var fadeOut = kvpSticky["bottom"];
            var nextLineHeight = kvpSticky["nextLineHeight"];
        
            // Determine if sticky is in range
            var isBelowTop = window.pageYOffset + currentOffset >= thisTop;
            var isAboveFade = window.pageYOffset < fadeOut;     // False when fadeOut is undefined
            var doesExist = stuckElements.indexOf(stickyElement) > -1;
            
            // Override boolean if there is no fade out
            if (fadeOut == undefined) {
                isAboveFade = true;
            }
            
            // Boolean algebra
            var isInRange = isBelowTop && isAboveFade;
            
            // Activate sticky (scrolling down and the navi isn't "stuck")
            if (isInRange && !doesExist) {
                
                stickyElement.style.position = "fixed";
                stickyElement.style.top = currentOffset;
                stickyElement.style.width = "100%";
                
                // Don't overwrite old padding, if it exists
                var currentPadding = stickyElement.nextElementSibling.style.paddingTop;
                if (currentPadding != "") {
                    currentPadding = parseInt(currentPadding);
                }
                else {
                    currentPadding = 0;
                }
                stickyElement.nextElementSibling.style.paddingTop = currentPadding + nextLineHeight + 
                    Math.floor(nextLineHeight / 2);
                
                // Subtract one for prettiness 
                currentOffset = currentOffset + stickyElement.offsetHeight - 1;
                stuckElements.push(stickyElement);
            }
            
            // Already sticky but needs fading (scrolling up and the element is already "stuck")
            else if (isInRange && stickyElement.className.indexOf("hidden") != -1) {
            
                // Increase before revealing the navi
                stuckElements.push(stickyElement);
                currentOffset = currentOffset + stickyElement.offsetHeight - 1;
                
                // Reveal
                stickyElement.className = stickyElement.className.replace(" hidden","");
            }
            
            // Deactivate sticky
            else {
                
                // Boolean algebra
                var shouldUnsticky = (
                    (window.pageYOffset + currentOffset - (nextLineHeight / 2) < thisTop + stickyElement.offsetHeight)
                    &&
                    (stuckElements.indexOf(stickyElement) > -1));
                
                // Determine what action to take
                // Should unsticky
                if (shouldUnsticky) {
                    stickyElement.removeAttribute("style");
                    stickyElement.nextElementSibling.removeAttribute("style"); 
                
                    currentOffset = currentOffset - stickyElement.offsetHeight + 1; 
                    stuckElements.splice(stuckElements.indexOf(stickyElement), 1);
                }
                
                var shouldFadeOut = (window.pageYOffset >= fadeOut 
                                    && 
                                    fadeOut != undefined 
                                    &&
                                    stuckElements.indexOf(stickyElement) > -1);
                
                // Should fade out
                if (shouldFadeOut) {
                    stickyElement.className = stickyElement.className.replace(" hidden","");
                    
                    // Hide
                    stickyElement.className = stickyElement.className + " hidden";
                    
                    // Reduce the currentOffset so that the next element slides in nicely
                    stuckElements.splice(stuckElements.indexOf(stickyElement), 1);
                    currentOffset = currentOffset - stickyElement.offsetHeight + 1;
                }
            }
        }
        
        // For every parallax
        for (var i = 0 ; i < parallaxElementList.length ; i++) {
            
            // Get the specific parallax element, then the image element
            var parallaxElement = parallaxElementList[i];
            var imageElement = parallaxElement.getElementsByTagName("img")[0];
            
            // Do some calculations and start the parallax
            var yTop = window.pageYOffset / parallax_dampening;
            var coords = yTop + "px";
            
            imageElement.style.top = coords;
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
