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


.grid-view table.items th{color:#000000;}
.grid-view table.items td.merge{
	background-color:#eeeeee;
}
-->
</style>
<h1>订购统计</h1>
<div id="caibookstat" class="grid-view span4 alpha block">
<table class="items">
<thead>
<tr>
<th><a href="#">菜名</a></th><th ><a href="#">订购数</a></th></tr>
</thead>
<tbody>
<?php 
//var_dump($caiBook);
if(is_array($caiBook))
foreach ($caiBook as $i=>$cai){
	$class = $i%2==0?"odd":"even";
	$name = $cai->description;
	$count = $cai->bookCount;
	echo<<<EOD
	<tr class="odd">
       <td>$name</td><td>$count</td>
    </tr>
	
EOD;
}

?>
</tbody>
</table>
</div>
<!--  每人订购金额统计  -->
<div id="caibookstat" class="grid-view span4 alpha block">
<table class="items">
<thead>
<tr>
<th><a href="#">用户</a></th><th ><a href="#">金额</a></th></tr>
</thead>
<tbody>
<?php 


if(is_array($usersum))
foreach ($usersum as $i=>$user){
	$class = $i%2==0?"odd":"even";
	$name = $user->profile->firstname;
	$count = $user->booksum;
	echo<<<EOD
	<tr class="odd">
       <td>$name</td><td>$count</td>
    </tr>
	
EOD;
}

?>
</tbody>
</table>
</div>
<br>
<!--  
<div class="caidan">
<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'dingcan-form',
	'enableAjaxValidation'=>false,
)); ?>

<?php
echo CHtml::activeRadioButtonList($model, 'cai_id', Cai::getCaiList());
//echo $cai->description
?>

</div>

<div class="book">
  <?php echo $form->labelEx($model,'count'); ?>
		<?php echo $form->textField($model,'count',array('size'=>2,'maxlength'=>2,'class'=>'count')); ?>
		<?php echo $form->error($model,'count'); ?>
<br>
<?php echo $form->hiddenField($model,'book_date'); ?>
<?php echo CHtml::submitButton('预定',array('class'=>'submit')); ?>
</div>

<?php $this->endWidget(); ?>
<div class="book sum">
 今日订餐<br>
 <span class="strong"><?php echo $count['count']?$count['count']:'0';?></span> 份
 <br>
 <span class="strong"><?php echo $count['total_price']?$count['total_price']:'0';?></span> 元
</div>
-->
<div class="clear"></div>
<div class="book-list">

<?php $this->widget('ext.groupgridview.GroupGridView', array(
	'id'=>'dingcan-grid',
	'dataProvider'=>$book,
    'mergeColumns' => array('user_id'),
	'columns'=>array(
		array('name'=>'user_id',
								'value'=>'$data->user->profile->firstname',
								'filter'=>false,
		//'htmlOptions' => array('style' => 'display: none'),
		),
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