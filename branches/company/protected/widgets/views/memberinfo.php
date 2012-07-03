<?php
if(file_exists($user->profile->image)){
$img= Yii::app()->baseUrl.'/'.$user->profile->image;
}
else{
	$img = Yii::app()->theme->baseUrl . '/images/member50.gif';
}
$name = $user->profile->lastname ."&nbsp;" . $user->profile->firstname;

$url = Yii::app()->urlManager->createUrl('user/profile');
print <<<T
<div class="loginMember clearfix">
	<div class="photo grid_2 alpha omega ">
		<a class="defaultLogo" href="{$url}">
		<img width="50" height="50" alt="" src="$img"/>
		</a>
	</div>
	<div class="information grid_4 omega alpha">
		<p class="name">
		<a href="{$url}">$name</a>
		</p>
	 
	
	</div>
</div>

T;
