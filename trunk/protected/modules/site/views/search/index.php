<?php
/* @var $this SearchController */

$this->breadcrumbs=array(
	'Search',
);
?>
<?php 
$this->widget('ext.solr.widgets.solrListWidget',array('results'=>$results,'page'=>$page,'pageSize'=>$pageSize,));

?>
