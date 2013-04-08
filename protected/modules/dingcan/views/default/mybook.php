<?php
$this->breadcrumbs=array(
	'订餐'
);

$this->menu=array(
	array('label'=>'订餐', 'url'=>array('cai/index')),
	array('label'=>'添加菜单', 'url'=>array('cai/create')),
	array('label'=>'我的今日订购', 'url'=>array('default/mybook')),
);
?>

<style>
<!--

H1{ width:300px;}
.caidan{
  	width:200px;
    height:150px;
    background-color:#1BA1E2;
color:#fff;
padding:10px;

float:left;
margin:5px;
overflow:auto;

}

.caidan h2{ color:#ffffff;}

.book{
	width:100px;
    height:150px;
    background-color:#F09609;
    float:left;
    margin:5px;
padding:10px;
    color:#ffffff;
    owerflow:hidden;
}

.book input.count{
	width:30px;

	
}
.book label{
	color:#ffffff;
   width:80px;
   
}
.book input.submit{
	color:#ffffff;
    width:100px;
background:transparent;
}

.book-list{
	width:480px;
    float:left;
    margin:5px;
    
	
}
.sum{
	font-size:16px;
    font-weight:bold;
}
.strong{
	font-size:42px;
}
form input,form label{
	vertical-algin:middle;
    display:inline;
}
.block{
	height:200px;
    overflow:auto;
}
-->
</style>
<h1>今日菜单</h1>

<div class="book-list">

<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id'=>'dingcan-grid',
	'dataProvider'=>$book,
	'columns'=>array(
		array('name'=>'user_id',
								'value'=>'$data->user->profile->firstname',
								'filter'=>false),
		array('name'=>'cai_id',
								'value'=>'$data->cai->description',
								'filter'=>false),
		'count',
		array('name'=>'total_price',
		 'value'=>'$data->total_price'),
		array(
			'class'=>'CButtonColumn',
		    'template'=>'{delete}',
		    //'deleteButtonUrl'='Yii::app()->controller->createUrl("dingcan/delete",array("id"=>$data->id))',
		),
	),
)); ?>
</div>