<?php 
$path = Yii::app()->baseUrl . Yii::app()->params['upload_path'];
if(substr($path, -1)!='/')
	$path = $path.'/';
Yii::app()->session['ckfinder_baseUrl']= $path;

?>


<script
	type="text/javascript" src="<?php echo $this->path; ?>/ckeditor.js"></script>
<script
	type="text/javascript"
	src="<?php echo $this->path; ?>/ckfinder/ckfinder.js"></script>
<script type="text/javascript">

CKEDITOR.config.toolbar_Custom =
	[
	[ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ],
	[ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] ,[ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak' ] ,
	[ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ],

	[ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ],


	[ 'Maximize', 'ShowBlocks','-','About' ],

	[ 'Find','Replace','-','SelectAll' /*,'-','SpellChecker', 'Scayt' */],
	[ 'TextColor','BGColor' ] ,
	'/',
	[ 'Styles','Format','Font','FontSize' ],
	[ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] ,

	[ 'Link','Unlink','Anchor' ] ,



	];

	CKEDITOR.config.toolbar='<?php echo $this->toolbar=="advanced"?'Custom':$this->toolbar;?>';
        $('#<?php echo $this->name; ?>').wrap("<div class='editor'></div>"); 
        editor_<?php echo $this->name; ?> = CKEDITOR.replace( "<?php echo $this->name; ?>" );

        CKFinder.setupCKEditor( editor_<?php echo $this->name; ?>, '<?php echo $this->path; ?>/ckfinder' ) ;
       
</script>
