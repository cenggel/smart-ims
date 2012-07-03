<?php
$rowcnt = 0;
	foreach ( $displayAttribes as $key => $attr ) {
		$attrName = $attr;
		if (is_array ( $attr ) && empty ( $attr ['name'] )) {
			$attr ['name'] = $key;
			$attrName = $key;
		}
//		print_r($attr);
//		echo "<br>".$attr['name']."     name is <br>"; 
		$error = $form ? $form->error($model,$attrName):"";
		$render = new ElementRender ( );
		$render->parse ( $model, $attr );
		
		echo "<tr class=\"row\"><th {$headerHtmlOption} >{$render->label}</th><td {$bodyHtmlOption} >{$render->element}{$error}</td></tr>";
	
	}