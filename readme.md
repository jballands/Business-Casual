<h1>BC v1.2 readme.md</h1>

For more information on Business Casual, please go to the <a href="http://jonathanballands.me/bc" target="_blank">Business Casual website</a>.
<br/>
Want to know how Business Casual works? See the shiny new <a href="http://jonathanballands.me/bc/dev" target="_blank">dev page</a> to learn more.

<h2>What's New?</h2>

<ul>
<li>Replaced crossfader elements with glassbox elements</li>
<li>A structured <code>business-casual.js</code> for extensibility</li>
<li>Replaced the <code>build.sh</code> build script with <a href="http://gruntjs.com/" target="_blank">Grunt</a></li>
<li>More detailed documentation</li>
<li>Random bug fixes from v1.1</li>
</ul>

<h2>Quick Start</h2>

<h3>What do I include?</h3>

<p>To include static features on your webpage, use <code>business-casual.css</code>. To include dynamic features on your webpage, use <code>business-casual.min.js</code>.</p>

<h3>How do I build Business Casual?</h3>

<p>BC v1.2 now uses Grunt instead of <code>build.sh</code> to automate the building process. To use Grunt:</p>

<ol>
<li>Install <a href="http://nodejs.org/" target="_blank">Node</a>. If you have <a href-"brew.sh" target="_blank">Homebrew</a> installed, just run:<br/><code>brew install node</code></li>
<br/>
<li>Install <code>grunt-cli</code> using <code>npm</code>:<br/><code>npm install -g grunt-cli</code></li>
<br/>
<li>Install all of Business Casual's build dependencies:<br/><code>npm install </code></li>
<br/>
<li>Run Grunt to build Business Casual:<br/><code>grunt</code></li>
</ol>

<h3>I've used older versions of Business Casual before.</h3>

<p>Here's what you need to know:</p>

<ul>
<li>The minimized version of <code>business-casual.js</code> is now called <code>business-casual.min.js</code></li>
<li>Start <code>business-casual.js</code> by calling <code>bc.bootstrap()</code> instead of <code>bc.go()</code></li>
<li>Business Casual uses Grunt instead of <code>build.sh</code> to build itself (See above)</li>
<li>BC v1.2 is 100% backwards compatible with BC v1.1 and v1.0</li>
<li><a href="http://jonathanballands.me/bc#images" target="_blank">Images & Glassboxes</a></li>
<li><a href="http://jonathanballands.me/bc/dev#javascript" target="_blank">Refactored Javascript</a></li>
</ul>