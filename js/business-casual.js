/*
 *  business-casual.js
 *  The JavaScript portion of Business Casual. You need this file to add Business Casual's
 *  dynamic content to your webpage.
 *
 *  Firstly, Business Casual abstracts out each dynamic element in the DOM
 *  as a Javascript object that always meets the following requirements:
 *      1) The constructor for each of these objects takes exactly one
 *         parameter called "elem".
 *      2) The object defines one public function called "execute()" that
 *         takes no paramters.
 *  
 *  Furthermore, Business Casual abstracts out one "god object" named
 *  "BusinessCasual" that bootstraps each Javascript object to its corresponding
 *  DOM element and calls the "execute()" function on it.
 *
 *  Here is an overview of the lifecycle:
 *      1) Business Casual user instantiates an instance of "BusinessCasual" and calls
 *         the "bootstrap()" function on it from some other script.
 *      2) The "bootstrap()" function will traverse the DOM and bootstrap a DOM element
 *         to its corresponding Javascript object, using the "availables" array as a
 *         reference. Each Javascript object will be pushed into the "elements" array for
 *         future reference.
 *      3) "bootstrap()" will then call a private function called "run()" on "BusinessCasual"
 *         that will loop through each element and call "execute()" on it.
 *
 *  When designing your own custom Javascript object for use with Business Casual:
 *      1) Your constructor must always take exactly one paramter called "elem", the element
 *         that the Javascript object bootstrapped to. Your constructor should also prep your 
 *         DOM object for the "execute()" function that will be called next by the "BusinessCasual"
 *         object.
 *      2) Your object must contain one public function called "execute()" that takes no parameters.
 *         This is where you will describe what happens in the DOM dynamically. You should only
 *         describe what occurs as the user interacts with your object in the "execute()" function
 *         to avoid a slight delay when a user loads your webpage.
 *      3) Insert a new object into the "availables" array that contains two members: "query", the
 *         query that Business Casual should use when it traverses the DOM for your object, and 
 *         "ref", a referece to your object.
 *
 *  Due to the nature of browser environment variables (window.location, window.onscroll, etc.),
 *  an object that wants to use one of these variables should:
 *      1) Never explicitly define the browser environment variable, as this can cause other parts
 *         of Business Casual to fail.
 *      2) Should subscribe to the relevant service (for example, if you need scrolling, subscribe
 *         to the "ScrollingService").
 *
 *  To use one of the Business Casual services, call "subscribe()" on the service that you want to subscribe.
 *  You will pass one argument to "subscribe()" called "func", a lambda function that you want to run when
 *  the service gets called.
 *
 *  © 2014 Jonathan Ballands
 */

function BusinessCasual() {
    
    this.version = 1.2;

    this.availables = [
        {query : "div.hero-unit", ref : HeroUnit},
        {query : "div.sidekick-unit", ref : SidekickUnit},
        {query : "div.parallax", ref : Parallax},
        {query : "div.magnetic", ref: Magnetic},
        {query : "div.sticky", ref : Sticky},
        {query : "div.glassbox", ref: Glassbox}
    ];
    
    var elements = [];
    
    function run() {
        for (var i = 0 ; i < elements.length ; i++) {
            var element = elements[i];
            element.execute();
        }
    }
    
    this.bootstrap = function() {
        for (var i = 0 ; i < this.availables.length ; i++) {
            var available = this.availables[i];
            var results = document.querySelectorAll(available.query);
            for (var j = 0 ; j < results.length ; j++) {
                var result = results[j];
                elements.push(new available.ref(result));
            }
        }
        run();
    }

}

/*
 *  ---------------
 *  Element Objects
 *  ---------------
 */

function HeroUnit(elem) {
    
    var width = elem.offsetWidth;
    var height = elem.offsetHeight;
    
    var text = elem.querySelectorAll("span.hero-unit-text");
    
    if (text.length > 0) {
        text = text[0];
        
        var heightOffset = (height / 2) - (text.offsetHeight / 2);
        var widthOffset = (width / 2) - (text.offsetWidth / 2);
     
        
        if (hasClass(text, "left")) {
            text.style.left = widthOffset - 2 * (widthOffset / 3);
            text.style.top = heightOffset;
        }
        else if (hasClass(text, "right")) {
            text.style.left = widthOffset + 2 * (widthOffset / 3);
            text.style.top = heightOffset;
        }
        else {
            text.style.left = widthOffset;
            text.style.top = heightOffset;
        }
    }

}
HeroUnit.prototype.execute = function() {
    
    // Nothing to do...
    
}

function SidekickUnit(elem) {
    
    var width = elem.offsetWidth;
    var height = elem.offsetHeight;

    var text =  elem.querySelectorAll("span.sidekick-unit-text");
    
    if (text.length > 0) {
        text = text[0];
    
        var heightOffset = (height / 2) - (text.offsetHeight / 2);
        var widthOffset = (width / 2) - (text.offsetWidth / 2);

        text.style.left = widthOffset;
        text.style.top = heightOffset;
    }
    
}
SidekickUnit.prototype.execute = function() {
    
    // Nothing to do...
    
}

function Parallax(elem) {
    
    this.mElem = elem;
    this.dampening = 3;
    
}
Parallax.prototype.execute = function() {

    var that = this;
    scrollingService.subscribe(function() {
        
        var imageElement = that.mElem.getElementsByTagName("img")[0];
            
        // If the element isn't viewable yet, don't touch it
        if (that.mElem.offsetTop <= window.innerHeight + window.scrollY) {
                
            // Do some calculations and start the parallax
            var parallaxCoords = (window.pageYOffset - that.mElem.offsetTop) / that.dampening;
            imageElement.style.top = parallaxCoords + "px";
        }
        
    });  
}

function Magnetic(elem) {

    // Sanity check
    if (!broadcaster.hasChannel("naviOffset")) {
        broadcaster.setChannel("naviOffset", 0);
    }
    
    // Get the offset channel, set the top value, and reset the channel
    var mOffset = broadcaster.getChannel("naviOffset");
    elem.style.top = mOffset;
    broadcaster.setChannel("naviOffset", mOffset + magneticNavi.offsetHeight - 1);
    
}
Magnetic.prototype.execute = function() {
    
    // Nothing to do...
    
}

function Sticky(elem) {
    
    // Sanity check
    if (!broadcaster.hasChannel("naviOffset")) {
        broadcaster.setChannel("naviOffset", 0);
    }
    
    this.fader = document.getElementById(elem.getAttribute("fadeOut"));
    this.faderTop = undefined;
    if (this.fader != null) {
        this.faderTop = this.fader.offsetTop;
    }
    
    this.top = elem.offsetTop - 12;     // Subtract 12 for padding
    this.isStuck = false;
    this.mElem = elem;
    
}
Sticky.prototype.execute = function() {
    
    var that =  this;
    
    scrollingService.subscribe(function() {

        // Determine if sticky is in range
        var isBelowTop = window.pageYOffset + broadcaster.getChannel("naviOffset") >= that.top;
        var isAboveFade = window.pageYOffset < that.faderTop;     // False when fader is undefined
        
        // Override boolean if there is no fader
        if (that.fader == undefined) {
            isAboveFade = true;
        }
        
        var isInRange = isBelowTop && isAboveFade;
        
        // Already sticky but needs fading (scrolling up and the element is already "stuck")
        if (isInRange && that.mElem.className.indexOf("hidden") != -1) {

            // Increase before revealing the navi
            that.isStuck = true;
            var mOffset = broadcaster.getChannel("naviOffset");
            broadcaster.setChannel("naviOffset", mOffset + that.mElem.offsetHeight - 1);

            // Reveal
            that.mElem.className = that.mElem.className.replace(" hidden","");
        }
        
        // Activate sticky (scrolling down and the navi begins sticking)
        else if (isInRange && !that.isStuck) {
            
            that.mElem.style.position = "fixed";
            that.mElem.style.top = broadcaster.getChannel("naviOffset");
            that.mElem.style.width = "100%";

            var sibling = that.mElem.nextElementSibling;
            sibling.style.paddingTop = "21px";

            // Bug fix: If the first element in the sibling is a flexor, apply 21px of padding
            // to it as well
            var flexorChild = sibling.firstChild;

            // Bug fix: Skip text nodes
            while(flexorChild != null && flexorChild.nodeType == 3) {
                flexorChild = flexorChild.nextSibling;
            }

            // Null check
            if (flexorChild != null && flexorChild != undefined && flexorChild.classList != null
                && flexorChild.classList != undefined) {
                if (flexorChild.classList.contains("flexor")) {
                    flexorChild.style.paddingTop = "21px";
                }     
            }

            // Subtract one for prettiness 
            var mOffset = broadcaster.getChannel("naviOffset");
            broadcaster.setChannel("naviOffset", mOffset + that.mElem.offsetHeight - 1);
            that.isStuck = true;
        }
        
        // Deactivate sticky
        else {

            var shouldUnsticky = (window.pageYOffset + broadcaster.getChannel("naviOffset") 
                                 < that.top + that.mElem.offsetHeight
                                 &&
                                 that.isStuck);

            // Determine what action to take
            // Should unsticky
            if (shouldUnsticky) {
                that.mElem.removeAttribute("style");
                that.mElem.nextElementSibling.removeAttribute("style"); 
                
                var mOffset = broadcaster.getChannel("naviOffset");
                broadcaster.setChannel("naviOffset", mOffset - that.mElem.offsetHeight + 1);
                
                that.isStuck = false;
            }

            var shouldFadeOut = (window.pageYOffset >= that.faderTop
                                && 
                                that.fader != undefined 
                                &&
                                that.isStuck);

            // Should fade out
            if (shouldFadeOut) {
                that.mElem.className = that.mElem.className.replace(" hidden","");

                // Hide
                that.mElem.className = that.mElem.className + " hidden";

                // Reduce the currentOffset so that the next element slides in nicely
                var mOffset = broadcaster.getChannel("naviOffset");
                broadcaster.setChannel("naviOffset", mOffset - that.mElem.offsetHeight + 1);
                
                that.isStuck = false;
            }
        }
        
    });
    
}

function Glassbox(elem) {
    
    // Define variables
    this.width = elem.offsetWidth;
    this.height = elem.offsetHeight;
    // this.isAnimating = false;
    
    // Get all the images
    this.slideList = elem.getElementsByClassName("glassbox-slide");
    this.currentSlide = undefined;
    for (var i = 0 ; i < this.slideList.length ; i++) {
        if (this.slideList[i].className.indexOf("glassbox-present") != -1) {
            this.currentSlide = i;
            this.slideList[i].style.left = 0;
        }
    }
    
    // If the user didn't define a slide to present, default to the first slide
    if (this.currentSlide == undefined) {
        this.slideList[0].className =  this.slideList[0].className.replace(" glassbox-present", "");
        this.slideList[0].className = this.slideList[0].className + " glassbox-present";
        this.currentSlide = 0;
        this.slideList[0].style.left = 0;
    }
    
    // Now, adjust the positions of every other slide so that they slide in neatly
    for (var i = 0 ; i < this.slideList.length ; i++) {
        if (i < this.currentSlide) {
            this.slideList[i].style.left = -1 * parseInt(this.width);
        }
        else if (i > this.currentSlide) {
            this.slideList[i].style.left = parseInt(this.width);
        }
    }
    
    // Place the arrows
    var leftArrow = elem.getElementsByClassName("glassbox-left-arrow")[0];
    var rightArrow = elem.getElementsByClassName("glassbox-right-arrow")[0];
    leftArrow.style.top = (this.height / 2) - (leftArrow.offsetHeight / 2);
    rightArrow.style.top = (this.height / 2) - (rightArrow.offsetHeight / 2);
    rightArrow.style.left = this.width - rightArrow.offsetWidth;
    
    // Format the captions for every slide (the ones that don't need to be shown will automatically hide)
    for (var i = 0 ; i < this.slideList.length ; i++) {
        var caption = this.slideList[i].getElementsByClassName("glassbox-caption")[0];
        var captionPreferredWidth = this.width - 15;
        caption.style.width = captionPreferredWidth + "px";
        var captionHeight = caption.offsetHeight;
        caption.style.top = this.height - captionHeight - 25;
    }
    
    /* vvvvvvvv BROKEN :( vvvvvvvv */
    
    // Handle click events
    var that = this;
    leftArrow.onclick = function() {
        if (that.currentSlide <= 0) {
            that.animateToSlide(0, that.slideList.length - 1);
            that.currentSlide = that.slideList.length - 1;
        }
        else {
            that.animateToSlide(that.currentSlide, that.currentSlide - 1);
            that.currentSlide = that.currentSlide - 1;
        }
    }
    rightArrow.onclick = function() {
        if (that.currentSlide >= that.slideList.length - 1) {
            that.animateToSlide(that.currentSlide, 0);
            that.currentSlide = 0;
        }
        else {
            that.animateToSlide(that.currentSlide, that.currentSlide + 1);
            that.currentSlide = that.currentSlide + 1;
        }
    }
    
    /*
     *  Helper functions for Glassbox
     */
    
    function slideInLeft(elem) {
        elem.style.left = parseInt(elem.offsetWidth) * -1;
        elem.style.transition = "1s";
        elem.style.left = 0;
    }
    function slideOutLeft(elem) {
        elem.style.left = 0;
        elem.style.transition = "1s";
        elem.style.left = parseInt(elem.offsetWidth) * -1;
    }
    function slideInRight(elem) {
        elem.style.left = parseInt(elem.offsetWidth);
        elem.style.transition = "1s";
        elem.style.left = 0;
    }
    function slideOutRight(elem) {
        elem.style.left = 0;
        elem.style.transition = "1s";
        elem.style.left = parseInt(elem.offsetWidth)
    }
    
    this.animateToSlide = function(from, to) {
        
        if (to == 0 && from == this.slideList.length - 1) {
            slideOutLeft(this.slideList[from]);
            slideInRight(this.slideList[to]);
        }
        
        else if (to == this.slideList.length - 1 && from == 0) {
            slideOutRight(this.slideList[from]);
            slideInLeft(this.slideList[to]);
        }
        
        else if (from < to) {
            slideOutLeft(this.slideList[from]);
            slideInRight(this.slideList[to]);
        }
        
        else if (from > to) {
            slideOutRight(this.slideList[from]);
            slideInLeft(this.slideList[to]);
        }
    }
    
    /* ^^^^^^^^ BROKEN :( ^^^^^^^^ */
}
Glassbox.prototype.execute = function() {
    // Nothing to do...
}

/*
 *  --------
 *  Services
 *  --------
 */

function ScrollingService() {
    
    var subscribers = [];
    
    this.subscribe = function(func) {
        subscribers.push(func);
    }
    
    window.onscroll = function() {
        for (var i = 0 ; i < subscribers.length ; i++) {
            subscribers[i]();
        }
    }
}
var scrollingService = new ScrollingService();

/*
 *  -----------
 *  Broadcaster
 *  -----------
 */

function Broadcaster() {
    
    var channels = {};
    
    this.hasChannel = function(c) {
        for (channel in channels) {
            if (c == channel) {
                return true;
            }
        } 
        return false;
    }
    
    this.getChannel = function(name) {
        return channels.name;
    }
    
    this.setChannel = function(name, value) {
        channels.name = value;
    }
    
}

var broadcaster = new Broadcaster();

/*
 *  -------
 *  Helpers
 *  -------
 */

// http://stackoverflow.com/questions/5898656/test-if-an-element-contains-a-class
function hasClass(element, cls) {
    return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
}
