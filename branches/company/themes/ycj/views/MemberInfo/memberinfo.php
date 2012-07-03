<?php

$img= Yii::app()->baseUrl.'/'.$user->profile->image;
$name = $user->profile->lastname ."&nbsp;" . $user->profile->firstname;
$admin = Yii::app()->user->isSuperuser?'管理员':'成员';
$profile = Yii::app()->urlManager->createUrl('/user/profile/edit');
$date = date('Y 年  m 月 j 日 ');
print <<<T
<DIV class=ln_per_mess>
<DIV class="img_bg_le ln_per_bg"><IMG src="{$img}" width=48 height=48> </DIV>
<DIV class=per_mess><SPAN>您好！<SPAN>{$admin}</SPAN></SPAN><BR>
<A href="{$profile}" target="black">个人设置</A> </DIV>
<DIV class=cb></DIV>
<DIV class=sys_time>今天是{$date}</DIV>
</DIV>

T;
