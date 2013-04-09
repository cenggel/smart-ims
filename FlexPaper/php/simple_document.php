<?php
/* This section can be removed if you would like to reuse the PHP example outside of this PHP sample application */
require_once("lib/config.php");
require_once("lib/common.php");

$configManager = new Config();
if($configManager->getConfig('admin.password')==null){
	$url = 'setup.php';
	header("Location: $url");
	exit;
}

$width= $_GET['width']?$_GET['width']:'770px';
$height= $_GET['height']?$_GET['height']:'500px';
?>

<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
    <head>
        <title>FlexPaper AdaptiveUI PHP Example</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css" media="screen">
			html, body	{ height:100%; }
			body { margin:0; padding:0; overflow:auto; }
			#flashContent { display:none; }
        </style>

		
		<script type="text/javascript" src="../js/jquery.min.js"></script>
		<script type="text/javascript" src="../js/flexpaper.js"></script>
		<script type="text/javascript" src="../js/flexpaper_handlers.js"></script>
    </head>
    <body>
    <div style="position:absolute;left:0px;top:0px; width:100%;">
		<div id="documentViewer" class="flexpaper_viewer" style="width:<?php echo $width;?>;height:<?php echo $height;?>"></div>

	        <script type="text/javascript">
		        function getDocumentUrl(document){
					return "services/view.php?doc={doc}&format={format}&page={page}".replace("{doc}",document);
		        }

		        function getDocQueryServiceUrl(document){
		        	return "services/swfsize.php?doc={doc}&page={page}".replace("{doc}",document);
		        }

		        var startDocument = "<?php if(isset($_GET["doc"])){echo $_GET["doc"];}else{?>Paper.pdf<?php } ?>";

	            $('#documentViewer').FlexPaperViewer(
				 { config : {

						 DOC : escape(getDocumentUrl(startDocument)),
						 Scale : 0.6,
						 ZoomTransition : 'easeOut',
						 ZoomTime : 0.5,
						 ZoomInterval : 0.2,
						 FitPageOnLoad : false,
						 FitWidthOnLoad : true,
						 FullScreenAsMaxWindow : false,
						 ProgressiveLoading : false,
						 MinZoomSize : 0.2,
						 MaxZoomSize : 5,
						 SearchMatchAll : false,
						 InitViewMode : 'Portrait',
						 RenderingOrder : '<?php echo ($configManager->getConfig('renderingorder.primary') . ',' . $configManager->getConfig('renderingorder.secondary')) ?>',

						 ViewModeToolsVisible : true,
						 ZoomToolsVisible : true,
						 NavToolsVisible : true,
						 CursorToolsVisible : true,
						 SearchToolsVisible : true,

  						 DocSizeQueryService : 'services/swfsize.php?doc=' + startDocument,
						 jsDirectory : '../js/',
						 localeDirectory : '../locale/',

						 JSONDataType : 'jsonp',
						 key : '<?php echo $configManager->getConfig('licensekey') ?>',

  						 localeChain: 'en_US'

						 }}
			    );
	        </script>
        </div>
   </body>
</html>