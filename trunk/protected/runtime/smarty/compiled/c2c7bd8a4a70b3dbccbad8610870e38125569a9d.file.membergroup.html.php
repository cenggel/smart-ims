<?php /* Smarty version Smarty-3.0.5, created on 2012-03-26 03:44:31
         compiled from "D:\web\wwwdocs\smart-ims\protected\modules\site\widgets\views\membergroup.html" */ ?>
<?php /*%%SmartyHeaderCode:90834f6fe61fd34f56-45506217%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'c2c7bd8a4a70b3dbccbad8610870e38125569a9d' => 
    array (
      0 => 'D:\\web\\wwwdocs\\smart-ims\\protected\\modules\\site\\widgets\\views\\membergroup.html',
      1 => 1332733468,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '90834f6fe61fd34f56-45506217',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<div id="group-list" >
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