# Introduction #

附件上传 behavior 的用法


# Details #

附件上传 hehavior 的用法如下：
  * 配置文件中增加导入attachment模型
```
'import'=>array(
    ......
    'application.extensions.attachment.models.*',
		)
```
  * 创建表 SQL 在 extensions\attachment\data
  * 为模型附加 behavior
> > 模型继承自 BaseActiveRecord
> > 或者在模型中的 behaviors 函数中增加下面的代码
```
public function behaviors(){
		return array( 

                 ....
		 'Attachment'=>array(
						'class'=>'ext.attachment.AttachmentArBehavior',
						'class_code'=>get_class($this)));
	}
```

  * 在视图文件中增加下面代码
  1. 查看内容页面
```
<div class="attachments">
	
	   <?php 
	    $this->widget('ext.attachment.widgets.AttachWidget',array(
	    		'model'=>$model,
	    		'type'=>'view',
	    		))
	   ?>
	</div>
```
  1. 修改内容页面
```
	<div class="attachments">
	
	   <?php 
	    $this->widget('ext.attachment.widgets.AttachWidget',array(
	    		'model'=>$model,
	    		'type'=>'admin',
	    		))
	   ?>
	</div>

```

> 修改页面如果用 ext.form.FormGenerator 生成表单在 displayAttribes 属性中增加如下配置
```
   array(
   ...
   'attachment'=>array('type'=>'attach')
   )
```
> 在 attributeLabels 中增加 attachment 字段的 babel 配置 如:
```
   public function attributeLabels()
	{
		return array(
			.....
			'attachment' => Attachment,
		);
		
		
	}
```