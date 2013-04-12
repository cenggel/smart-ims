<?php
$this->breadcrumbs=array(
		//Yii::t('siteModule.groups','Groups')=>array('index'),
		$model->group_name=>array('home','id'=>$model->id),
);

$this->blocks['left'][]= $this->renderPartial('_groupsidebar',array('group'=>$model),true);

?>

<div class="updates">

<div class="subTitle">
   
</div>
      <div class="category">
			<div class="appTitle">
				<a class="iconLink" title="" href="<?php echo Yii::app()->urlManager->createUrl('site/documents/index',array('group_id'=>$model->id,'class_code'=>'documents'));?>"><img width=30 
					class="icon" alt=""
					src="<?php echo Yii::app()->theme->baseUrl?>/images/doc.png"><span>文档</span>
				</a>
			</div>
			<div class="appAdd">
				<a class="iconLink" title="" href="<?php echo Yii::app()->urlManager->createUrl('site/documents/create',array('group_id'=>$model->id,'class_code'=>'documents'));?>"><img
					class="icon" alt="添加"
					src="<?php echo Yii::app()->theme->baseUrl?>/images/write16.gif"><span>添加</span>
				</a>
			</div>
		</div>
    <?php 
    	$cat = $model->getDocumentsList();
    ?>
	<div >
		

		
		<table class="list latestList">
		   <?php if(count($cat)==0){?>
		   <tr class="last"><td class="notificationTitle"><div class="notfound">没有内容</div></td></tr>
		   <?php }else{
		     foreach ($cat as $a){		     	
		   	?>
		     <tr>
		         <td class="check"></td>
		         <td class="notificationTitle"><div><a href="<?php echo $a->url;?> " ><?php echo $a->doc_name?></a></td>
		         <td class="member"><?php echo $a->author->username?></td>
		         <td class="date"><?php echo date('Y年m月d日 H:i:s', $a->create_date);?></td>
		     	 <td> <a href=" <?php echo $a->hisUrl;?> ">查看历史</a> </td>
		     </tr>
		   <?php } 
		     }?>
		</table>
	</div>
</div>

