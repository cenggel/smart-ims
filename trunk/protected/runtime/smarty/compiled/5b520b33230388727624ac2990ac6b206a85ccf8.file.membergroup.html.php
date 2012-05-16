<?php /* Smarty version Smarty-3.0.5, created on 2012-03-29 01:55:43
         compiled from "D:\web\wwwdocs\smart-ims\themes\ycj\views\MemberGroup\membergroup.html" */ ?>
<?php /*%%SmartyHeaderCode:62834f73c11f4e08a9-77427149%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '5b520b33230388727624ac2990ac6b206a85ccf8' => 
    array (
      0 => 'D:\\web\\wwwdocs\\smart-ims\\themes\\ycj\\views\\MemberGroup\\membergroup.html',
      1 => 1332984483,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '62834f73c11f4e08a9-77427149',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<div id="group-list" >
dddddddddddddddddddddddddddd
<ul class="operations-new side-group-list">
  <?php  $_smarty_tpl->tpl_vars['g'] = new Smarty_Variable;
 $_from = $_smarty_tpl->getVariable('groups')->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
if ($_smarty_tpl->_count($_from) > 0){
    foreach ($_from as $_smarty_tpl->tpl_vars['g']->key => $_smarty_tpl->tpl_vars['g']->value){
?>
   <li><a href="<?php echo $_smarty_tpl->getVariable('g')->value->getUrl();?>
" ><?php echo $_smarty_tpl->getVariable('g')->value->group_name;?>
</a></li>
  <?php }} ?>
</ul>
<br>
<div class="floatright">
   <a href="<?php echo Groups::getCreateUrl();?>
">创建工作组</a>
</div>
</div>