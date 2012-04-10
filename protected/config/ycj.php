<?php 
return array(
		'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
		'name'=>'信息共享平台',

		// preloading 'log' component
		'preload'=>array('log'),
		'language'=>'zh_cn',
		'theme' => 'ycj',
		'defaultController'=>'user/auth/login',

		// autoloading model and component classes
		'import'=>array(
				'application.models.*',
				'application.modules.user.models.User',
				'application.components.*',
				'application.extensions.*',
				'application.modules.rights.*',
				'application.modules.rights.components.*',
				'application.modules.user.models.*',
				'application.modules.user.components.*',
				'application.modules.site.models.*',
				'application.modules.site.components.*',
				
		),

		'modules'=>array(
				// uncomment the following to enable the Gii tool

				'gii'=>array(
						'class'=>'system.gii.GiiModule',
						'password'=>'123',
						// If removed, Gii defaults to localhost only. Edit carefully to taste.
						'ipFilters'=>array('127.0.0.1','::1'),
				),
				'rights'=>array(
					 'install'=>false, // Enables the installer.
					 'superuserName'=>'Admin',
					 'layout'=>'rights.views.layouts.main',
					 'appLayout'=>'application.views.layouts.main',
				),
				'user'=>array(
						'returnUrl'=>array('/member/home'),
						),
				'site'=>array(
						'import'=>array(
								'site.componets.*',
								'site.models.*',
								),
						),
								
				'cal' => array(
						'debug' => true // For first run only!
				),

		),
		
		'aliases' => array(
				'helpers' => 'application.widgets',
				'widgets' => 'application.widgets',
				'site.widgets'=>'application.modules.site.widgets',
		),

		// application components
		'components'=>array(
				'user'=>array(
						// enable cookie-based authentication
						'allowAutoLogin'=>true,
						'class'=>'CWebUser',
						'loginUrl' => array('user/auth/login'),
						
				),

				// uncomment the following to enable URLs in path-format

				'urlManager'=>array(  
					    'urlFormat'=>'path',  
					    'showScriptName'=>false, 
					    'urlSuffix'=>'.html',
					    'rules'=>array(  
					        'posts'=>'post/list',  
					        'post/<id:\d+>'=>array('post/show','urlSuffix'=>'.html'),  
					        'post/<id:\d+>/<mid:\w+>'=>array('post/view','urlSuffix'=>'.xml'),  
					    ),  
					), 

				/*'db'=>array(
						'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
						'tablePrefix'=>'tbl_',
				),*/
				// uncomment the following to use a MySQL database
				
				'db'=>array(
						'connectionString' => 'mysql:host=localhost;dbname=smart_ims',
						'emulatePrepare' => true,
						'username' => 'root',
						'password' => 'root',
						'charset' => 'utf8',
						'tablePrefix'=>'',
				),

				'errorHandler'=>array(
						// use 'site/error' action to display errors
						'errorAction'=>'/site/home/error',
				),
				'log'=>array(
						'class'=>'CLogRouter',
						'routes'=>array(
								array(
										'class'=>'CFileLogRoute',
										'levels'=>'error, warning',
								),
						),
				),
		),

		// application-level parameters that can be accessed
		// using Yii::app()->params['paramName']
		'params'=>array(
				// this is used in contact page
				'adminEmail'=>'webmaster@example.com',
				'editor'=>'fckeditor',
				'allowedImages'=>array('jpg','jpeg','gif','png'),
				'upload_path'=>'/uploads',
				'menus'=>$menus,
		),
);