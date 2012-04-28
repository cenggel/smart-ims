<?php
class Highlighter extends CWidget{
	
	public  function init(){
		parent::init();
		
	}
	
	public function run(){
		$baseDir = dirname(__FILE__);
		$assets = Yii::app()->getAssetManager()->publish($baseDir.DIRECTORY_SEPARATOR.'markitup'.DIRECTORY_SEPARATOR.'markitup');
		
		$cs = Yii::app()->getClientScript();
		
		$cs->registerScriptFile($assets.'/highlighter/scripts/shCore.js', CClientScript::POS_END );
		$cs->registerScriptFile($assets.'/highlighter/scripts/shAutoloader.js', CClientScript::POS_END);
		$cs->registerCssFile($assets.'/highlighter/styles/shCoreDefault.css');
		
		$baseUrl = $assets.'/highlighter/scripts/';
		$js = <<<T
		function path(){  var args = arguments,      result = []      ;         for(var i = 0; i < args.length; i++)      result.push(args[i].replace('@', '{$baseUrl}'));         return result}; SyntaxHighlighter.autoloader.apply(null, path(  'applescript            @shBrushAppleScript.js',  'actionscript3 as3      @shBrushAS3.js',  'bash shell             @shBrushBash.js',  'coldfusion cf          @shBrushColdFusion.js',  'cpp c                  @shBrushCpp.js',  'c# c-sharp csharp      @shBrushCSharp.js',  'css                    @shBrushCss.js',  'delphi pascal          @shBrushDelphi.js',  'diff patch pas         @shBrushDiff.js',  'erl erlang             @shBrushErlang.js',  'groovy                 @shBrushGroovy.js',  'java                   @shBrushJava.js',  'jfx javafx             @shBrushJavaFX.js',  'js jscript javascript  @shBrushJScript.js',  'perl pl                @shBrushPerl.js',  'php                    @shBrushPhp.js',  'text plain             @shBrushPlain.js',  'py python              @shBrushPython.js',  'ruby rails ror rb      @shBrushRuby.js',  'sass scss              @shBrushSass.js',  'scala                  @shBrushScala.js',  'sql                    @shBrushSql.js',  'vb vbnet               @shBrushVb.js',  'xml xhtml xslt html    @shBrushXml.js')); 
T;
		$js .="SyntaxHighlighter.defaults['toolbar']=false; SyntaxHighlighter.all();";
		
		$cs->registerScript("syntaxhighlighter",$js);
	}
}