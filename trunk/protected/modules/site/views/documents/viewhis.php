

<div class="updates">

<div class="subTitle">
   
</div>
      <div class="category">
			<div class="appTitle">
				<a class="iconLink" title="" href=""><img width=30 
					class="icon" alt=""
					src="<?php echo Yii::app()->theme->baseUrl?>/images/doc.png"><span>文档"<?php echo $modelnow->doc_name ?>"历史记录</span>
				</a>
			</div>
			
		</div>
   
	<div >
		

		
		<table class="list latestList">
		   <?php if(count($model)==0){?>
		   <tr class="last"><td class="notificationTitle"><div class="notfound">没有历史记录</div></td></tr>
		   <?php }else{
		     foreach ($model as $a){		     	
		   	?>
		     <tr>
			     <td><?php echo $a->version?></td>
			     <td class="notificationTitle"><div><a href="<?php echo $a->fileUrl;?> " ><?php echo $a->doc_name?></a></td>
			     <td class="member"><?php echo $a->author->username?></td>
			     <td><?php echo $a->update_note?></td>
			     <td class="date"><?php echo date('Y年m月d日 H:i:s', $a->update_date);?></td>
		     </tr>
		   <?php } 
		     }?>
		</table>
	</div>
</div>

