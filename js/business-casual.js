/*
 *  business-casual.js
 *  The JavaScript portion of Business Casual. You need this file to add Business Casual's
 *  dynamic content to your webpage.
 *
 *  If you wish to modify this Javascript file, it is recommended that you
 *  read this carefully, as this is the only documentation on the subject. :)
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
 *  © 2014 Jonathan Ballands
 */

function BusinessCasual() {
    
    this.version = 1.2;

    this.availables = [
        {query : "div.hero-unit", ref : HeroUnit},
        {query : "div.sidekick-unit", ref : SidekickUnit},
        {query : "div.parallax", ref : Parallax}
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
    window.onscroll = function() {
        
        // TODO: Right now, only the last unit will recieve parallax. Somehow you need to register
        // these things with a ScrollerAssistant or something
        
        var imageElement = that.mElem.getElementsByTagName("img")[0];
            
        // If the element isn't viewable yet, don't touch it
        if (that.mElem.offsetTop <= window.innerHeight + window.scrollY) {
                
            // Do some calculations and start the parallax
            var parallaxCoords = (window.pageYOffset - that.mElem.offsetTop) / that.dampening;
            imageElement.style.top = parallaxCoords + "px";
        }
    }
    
}

/*
 *  -------
 *  Helpers
 *  -------
 */

// http://stackoverflow.com/questions/5898656/test-if-an-element-contains-a-class
function hasClass(element, cls) {
    return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
}
