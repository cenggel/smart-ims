<?php
if(file_exists($user->profile->image)){
$img= Yii::app()->baseUrl.'/'.$user->profile->image;
}
else{
	$img = Yii::app()->theme->baseUrl . '/images/member50.gif';
}
$name = $user->profile->lastname ."&nbsp;" . $user->profile->firstname;

$url = Yii::app()->urlManager->createUrl('user/profile');
$logoutUrl = Yii::app()->urlManager->createUrl('/home/logout');
print <<<T

<div class="loginMember clearfix row-fluid">
	<div class="photo span3 first">
		<a class="defaultLogo" href="{$url}">
		<img width="50" height="50" alt="" src="$img"/>
		</a>
	</div>
	
	<div class="information span9 first last">
		<p class="name">
		<a href="{$url}">$name</a> &nbsp;&nbsp;<a href="$logoutUrl">退出</a>
		
		</p>
	    
	
	</div>

</div>

T;
