<?php

$img= Yii::app()->baseUrl.'/'.$user->profile->image;
$name = $user->profile->lastname ."&nbsp;" . $user->profile->firstname;
print <<<T
<div class="loginMember clearfix">
	<div class="photo grid_2 alpha omega ">
		<a class="defaultLogo" href="/user/profile">
		<img width="50" height="50" alt="" src="$img"/>
		</a>
	</div>
	<div class="information grid_4 omega alpha">
		<p class="name">
		<a href="/user/profile">$name</a>
		</p>
	 
	
	</div>
</div>

T;
