<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
$menus= require(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'admin_menu.php');
return array(
		'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
		'name'=>'信息共享系统',

		// preloading 'log' component
		'preload'=>array('log'),
		//'language'=>'zh_cn',
		'theme' => 'classic',
		'defaultController'=>'/user/auth/login',

		// autoloading model and component classes
		//active Record类型的model都放在protected/下的model目录下。访问方便。
		'import'=>array(
				'application.models.*',
				'application.components.*',
				'application.extensions.*',
				'application.modules.rights.*',
				'application.modules.rights.components.*',
				'application.modules.user.models.*',
				'application.modules.user.components.*',
				'application.modules.site.models.*',
				'application.modules.site.components.*',
				
		),

        //目前只保留cal（任务管理）和user（用户信息管理）俩个模块儿，其他right，site模块功能不明确，暂时冗余
		'modules'=>array(
				'gii'=>array(
						'class'=>'system.gii.GiiModule',
						'password'=>'123',
						// If removed, Gii defaults to localhost only. Edit carefully to taste.
						'ipFilters'=>array('127.0.0.1','::1'),
				)
				'user'=>array(
						'returnUrl'=>array('/site/member/index'),
						),		
				'cal' => array(
						'debug' =>  // For first run only!
				),

		),

        //用户登录认证，暂时用CWebUser基类，等需要的时候，再做封装。
		'components'=>array(
				'user'=>array(
						// enable cookie-based authentication
						'allowAutoLogin'=>true,
						'class'=>'CWebUser',
						'loginUrl' => array('/user/login'),
						
				),
				// uncomment the following to use a MySQL database
				'db'=>array(
						'connectionString' => 'mysql:host=localhost;dbname=smart_ims',
						'emulatePrepare' => true,
						'username' => 'root',
						'password' => 'root',
						'charset' => 'utf8',
						'tablePrefix'=>'tlb_',
				),

				'errorHandler'=>array(
						// use 'site/error' action to display errors
						'errorAction'=>'/site/home/error',
				),
				'urlManager'=>array(
		            'urlFormat'=>'path',
		            'showScriptName' => false,
	            ),

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