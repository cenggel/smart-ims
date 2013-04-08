
<div id="file-uploader"></div>

<?php

$filesPath = realpath(Yii::app()->basePath . "/../uploads");
$filesUrl = Yii::app()->baseUrl . "/uploads";

$this->widget("ext.ezzeelfinder.ElFinderWidget", array(
		'selector' => "div#file-uploader",
		'clientOptions' => array(
				'lang' => "zh_CN",
				'resizable' => false,
				'wysiwyg' => "ckeditor"
		),
		'connectorRoute' => "home/fileUploaderConnector",
		'connectorOptions' => array(
				'roots' => array(
						array(
								'driver'  => "LocalFileSystem",
								'path' => $filesPath,
								'tmbPath' => $filesPath . DIRECTORY_SEPARATOR . "thumbs",
								'mimeDetect' => "internal",
								'accessControl' => "access"
						)
				)
		)
));

?>