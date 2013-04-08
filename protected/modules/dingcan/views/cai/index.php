<?php
$this->breadcrumbs=array(
	'每日菜单',
);

$this->menu=array(
	array('label'=>'添加菜单', 'url'=>array('create')),
	array('label'=>'管理菜单', 'url'=>array('admin')),
	array('label'=>'订餐', 'url'=>array('/dingcan/cai/index')),
	array('label'=>'我的今日订购', 'url'=>array('default/mybook')),
);
?>

<script type="text/javascript">
<!--
function book4me(){
	   tr = $(this).parents("tr");
	   id = tr.find("input#cai_id").val();
	   count = tr.find("input.count").val();
	   //alert(id+" count="+ count);
	   book(id,count);
	}
function book(cai,count){
jQuery.ajax({'type':'POST','dataType':'json','data':{"Dingcan":{"count":count,"cai_id":cai}},'success':function(data){
    if(data.result==="success"){
        alert('订购成功！');
    }else{
      //alert(data.msg);
        $("#errormsg").html(data.msg);
    }
},'url':'<?php echo Yii::app()->createUrl("dingcan/cai/book") ?>','cache':false});
}
//-->
</script>
<h1>菜单</h1>

<?php 
//$this->widget('zii.widgets.CListView', array(
//	'dataProvider'=>$dataProvider,
//	'itemView'=>'_view',
//)); ?>

<div id="errormsg"></div>
<?php 
/*$submit = CHtml::ajaxSubmitButton('Save','/dingcan/defualt/index',array(
   'type'=>'POST',
   'dataType'=>'json',
   'data'=>'js:{\"Dingcan\":{\"count\":$(\"#cont_$data->id\").val(),\"cai_id\":$data->id}}',//this one
   'success'=>'js:function(data){
       if(data.result===\"success\"){
          // do something on success, like redirect
       }else{
         $(\"#some-container\").html(data.msg);
       }
   }',
));
*/
//echo "submit code:". '"'.$submit.'"' ;


$this->widget('zii.widgets.grid.CGridView', array(
	'id'=>'cai-grid',
	'dataProvider'=>$dataProvider,
	'filter'=>$model,
    

	'columns'=>array(
	/*	array('name'=>'cai_date',
			'value'=>'date("Y-m-d",$data->cai_date)',
		  'htmlOptions'=>array('width'=>"20%")),*/
		array(
		'name'=>'category',
		'filter'=>$model->categoryList,
		'value'=>'$data->categoryName',
		),
		'description',
		array('name'=>'price', 'filter'=>false),
		array('name'=>'count',
		'value'=>'"<input id=count_{$data->id} name=count_{$data->id} value=1 class=count /> <input type=hidden id=cai_id name=cai_id value={$data->id} class=id />"',
		'type'=>'raw' ,
		'filter'=>false),
		/*array('name'=>'submit',
		'type'=>'raw' ,
		'value'=>'"'.$submit.'"' 
		
		),*/
		array(
			'class'=>'CButtonColumn',
		
		'template'=>'{book1}',
        'buttons'=>array(
	        'book1' => array(
	            'label'=>'订购',
	            //'imageUrl'=>Yii::app()->request->baseUrl.'/images/icons/coins.png',
	            //'url'=>'Yii::app()->createUrl("default/index", array("id"=>$data->id))',
	            'options'=>array('cai_id'=>'$data->id'),
		        'click'=>'js:book4me',
	        ),		
	   )
	   ),
		//---
	),
)); ?>
