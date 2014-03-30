<h1>Business Casual readme.md</h1>

For more information on Business Casual, please go to the <a href="http://jonathanballands.me/bc" target="_blank">Business Casual website</a>.

<h2>Quick Start</h2>

For a more detailed explaination, please go to the <a href="http://jonathanballands.me/bc#getting-started"
target="_blank">Getting Started</a> section on the Business Casual website.

For those of you that are impatient, this quick start guide will help you get started with Business Casual rapidly.
To understand this section, you should understand web development fairly well. If you find yourself getting lost,
<a href="http://jonathanballands.me/bc#getting-started" target="_blank">this</a> may be more appropriate.

Let's do this.

Pull this repository to begin. Then, decide if you are going to use Business Casual as is, or if you are
going to customize it. If you wish it customize Business Casual, you will need the LESS compiler <code>lessc</code>
from the <a href="http://lesscss.org" target="_blank">LESS website</a>. Ensure <code>lessc</code> is in your
<code>$PATH</code>. Modify <code>less/customize.less</code> to
customize Business Casual; all variables should be self-explainitory. Use <code>build.sh</code> to build Business
Casual's LESS files. Copy and paste the <code>/css</code> and <code>/js</code> directories whereever you feel like it
and link them to your document as usual. If you are using <code>business-casual.js</code> instantiate the
<code>BusinessCasual</code> class and call the <code>go()</code> method on it.

Enjoy!

<h2>Troubleshooting</h2>

<h4>Business Casual doesn't look right/isn't working.</h4>

<ol>
  <li>Ensure that the <code>/css</code> and <code>/js</code> folders are in the root of your project.</li>
  <li>Each of your pages should reference Business Casual in the following way:
  <code>&lt;link rel="stylesheet" type="text/css" href="css/business-casual.css"&gt;</code></li>
  <li>If you want to use <code>business-casual.js</code>, reference it in the following way in each page:
  <code>&lt;script type="text/javascript" src="js/business-casual.js"&gt;&lt;/script&gt;</code></li>
  <li>If you are using <code>business-casual.js</code>, ensure you are instantiating the
  <code>BusinessCasual</code> class and calling the <code>go()</code> method on it.
  <li>You may want to rebuild Business Casual using <code>build.sh</code>.</li>
</ol>

If none of these resolve the problem, discard your version of Business Casual and repull this repository.

<h4>Errors occured while building Business Casual after customizing it.</h4>

Read the error; it's likely that <code>build.sh</code> was expecting a different type of value than the one that you provided. It is likely that this is the source of your problem.

If you cannot parse the error, discard your version of Business Casual and repull this repository.

<h4>The build script keeps telling me that I don't have a LESS compiler on my machine.</h4>

To determine if you have <code>less</code>, <code>build.sh</code> simply executes <code>which lessc</code> and checks
if Bash returned anything. You will get this error when Bash returns nothing. Either you didn't install
<code>lessc</code> correctly, or you don't have <code>lessc</code> in your <code>$PATH</code>.

You can check to see if <code>lessc</code> is in your path by typing <code>echo $PATH</code> in your Bash shell. If
it is not there, you should probably modify your <code>.bash_profile</code>.

<h4>I found a bug in Business Casual.</h4>

Please open an <a href="https://github.com/jballands/Business-Casual/issues" target="_blank">issue</a> so that I can fix it and make Business Casual better!
