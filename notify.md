#全局提醒功能
# Introduction #

notify 模块用法及相关说明。
本模块依赖 bootstrap 扩展，在页面展示提醒时用到了 bootstrap 扩展功能。

# Details #

## 模块基本配置和用法 ##
启用提醒模块步骤
### 创建表 ###
CREATE TABLE IF NOT EXISTS `notify` (
> `id` int(11) NOT NULL AUTO\_INCREMENT,
> `owner_class` varchar(100) NOT NULL,
> `notify_class` varchar(45) NOT NULL,
> `notify_event` varchar(45) DEFAULT NULL,
> `notify_type` int(11) DEFAULT NULL,
> `title` varchar(200) DEFAULT NULL,
> `summary` text,
> `item_id` varchar(45) DEFAULT NULL,
> `user_id` varchar(45) NOT NULL,
> `status` int(11) DEFAULT '0' COMMENT '0:unread  1:read',
> `params` text,
> `url` varchar(255) DEFAULT NULL,
> `create_user` int(11) DEFAULT NULL,
> `create_date` int(11) DEFAULT NULL,
> `read_date` int(11) DEFAULT NULL,
> PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

### 修改config 文件 ###
  * modules  部分增加 notify 模块配置
```
'modules'=>array(
.....
   'notify'=>array(
	'import'=>array(
	'notify.componets.*',
	'notify.models.*',
	),
	//用户类配置
	'userConfig'=>array(
	'class'=>'User',						),
	// 提醒相关配置
	'notifyConfig'=>array(
	//用 owner_class 配置 用ar behavior 增加时有效
	'Article'=>array(
	//提醒类型编码名字转换，可以动态执行代码来转换，下面的配置是用枚举表转换。转换时 $label 会用具体编码替换执行 Enumeration::item 函数	'classLabel'=>'Enumeration::item("ARTICLE_CLASS", $label)',	//事件编辑转换	
	//'eventLabel'=>'Enumeration::item("ARTICLE_EVENT", $label)',
	//访问 url ，如果item_id 不为空会 用 urlManager->createUrl 方法生成 url item_id 作为 id 参数传递
	//'url'=>'site/article/view'
	),
	/*
	// notify_class 提醒类型单独配置
	'notice'=>array(
	//也支持 'Enumeration::item("ARTICLE_CLASS", $label)' 这样动态执行语句	
	'label'=>'通知',	
	'url'=>'site/article/view'),	
	//event 事件配置	
	'NEW'=>array(
		'label'=>'新增',
		'url'=>'xxx/xx'							),
	*/
)

```

如果有提醒中没有指定url 用配置中的 url 生成访问路径。

  * components 部分增加 notifier 组建配置
```
'components'=>array(
.....
'notifier'=>array('class'=>'application.modules.notify.components.Notifier'),

}
```

> 完成以上两步就可以用 Yii::app()->notifier->event(...); 增加提醒了。

event 函数参数说明
$notify\_class 字符串 提醒类型
$event        字符串 提醒事件
$users        mixed
  * `*` 所以用户 'userConfig' 中配置的 class 调用 findAll 获取所以用户
  * 数字 给指定 id 用户增加系统
  * 数字数组 array(1,2,4) 给数组中的用户增加提醒
  * CActiveRecord数组 给列表中的用户对象取id 增加提醒
$notify       数组可用key 包括【 title,summary,url,notify\_type,params,item\_id】



---

**需要完善内容** 还没有增加邮件提醒功能。

---


### 页面中展示未读提醒 ###
在需要显示未读提醒部分增加下面代码
```
<?php $this->widget('notify.widgets.NotifyList',
array(
'type'=>'unread',// unread 未读， all 所以提醒
));?>
```


## 模型 behavior 配置 ##
在模型的behaviors 函数中增加下面的代码
```
 public function behaviors(){
  return array(
....
  'notifier'=>array(
						'class'=>'application.modules.notify.components.NotifyArBehavior',
	'notifyClass'=>'$data->class_code',
 	//自动生成提醒场景
	'notifyEvents'=>array('insert'=>'NEW','update'=>'UPDATE'),
	//用户取 group 关联模型的 members 关联数据 ，也可以配置 模型的一个函数	
	'users'=>'group.members',
	//title 取模型的 title 属性
	'title'=>'title',
	// 概要取 content 属性300 字符
	'summary'=>'substr(strip_tags($data->content),0,300)'),
);
}
```

这样配置完后 Arctile 模型新增数据和更新数据时会自动生成提醒数据。
也可以 模型中增加 getNotifyInfo 函数来生成提醒数据。