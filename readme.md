<h1>Business Casual readme.md</h1>

For more information on Business Casual, please go to the <a href="http://jonathanballands.me/bc" target="_blank">Business
Casual website</a>.

<h2>Getting Started</h2>

Depending on your ability, choose one of the following setups:

<h3>Basic Setup</h3>

This setup is good if you are not particularly fluent in web development but know enough to write a small website.

<ol>
  <li>Pull this repository.</li>
  <li>Locate the <code>/css</code> and <code>/js</code> folders. Copy them.</li>
  <li>Paste the <code>/css</code> and <code>/js</code> folders into your project.</li>
</ol>

<h3>Advanced Setup</h3>

This setup is good if you want finer control over how Business Casual presents itself. You must have the <code>lessc</code> compiler on your machine to use this setup.

<ol>
  <li>Pull this repository.</li>
  <li>Ensure that you have <code>lessc</code> installed on your machine and that it is in your <code>$PATH</code>.</li>
  <li>Customize Business Casual in <code>less/customize.less</code> to your liking.</li>
  <li>Build with <code>build.sh</code>.</li>
  <li>Copy and paste the <code>/css</code> and <code>/js</code> folders into your project.</li>
</ol>

<h2>Customization</h2>

You must be using the advanced setup described above to customize Business Casual.

Business Casual is designed to be customized using the <code>/less/customize.less</code> file. Simply change the value
of a variable <code>customize.less</code>, build with <code>build.sh</code>, and then copy and paste the <code>/css</code>
and <code>/js</code> folders into your project. Each variable should be fairly self-explanitory.

<h2>Troubleshooting</h2>

<h4>Business Casual doesn't look right/isn't working.</h4>

<ol>
  <li>Ensure that the <code>/css</code> and <code>/js</code> folders are in the root of your project.</li>
  <li>Each of your pages should reference Business Casual in the following way:
  <code>&lt;link rel="stylesheet" type="text/css" href="css/business-casual.css"&gt;</code></li>
  <li>If you want to use <code>business-casual.js</code>, reference it in the following way in each page:
  <code>&lt;script type="text/javascript" src="js/business-casual.js"&gt;&lt;/script&gt;</code></li>
  <li>If you are using Javascript directly in your HTML document, ensure that you are kickstarting Busienss Casual using 
  <code>bc.go();</code>. In other words, insert <code>bc.go();</code> at the end of your <code>&lt;script&gt;</code> tags.</li>
  <li>You may want to rebuild Business Casual using <code>build.sh</code>.</li>
</ol>

If none of these resolve the problem, discard your version of Business Casual and repull this repository.

<h4>Errors occured while building Business Casual after customizing it.</h4>

Read the error; it's likely that <code>build.sh</code> was expecting a different type of value than the one that you provided. It is likely that this is the source of your problem.

If you cannot parse the error, discard your version of Business Casual and repull this repository.

<h4>I found a bug in Business Casual.</h4>

Please open an <a href="https://github.com/jballands/Business-Casual/issues" target="_blank">issue</a> so that I can fix it and make Business Casual better!
