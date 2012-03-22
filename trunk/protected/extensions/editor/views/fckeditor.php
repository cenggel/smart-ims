<script type="text/javascript" src="<?php echo $this->path; ?>/fckeditor.js"></script>

<script type="text/javascript">
        var oFCKeditor = new FCKeditor("<?php echo $this->name; ?>");
        oFCKeditor.ToolbarSet="<?php echo $this->toolbar; ?>";
		oFCKeditor.Height = <?php echo $this->height; ?>;
        oFCKeditor.Width = '<?php echo $this->width; ?>';
        oFCKeditor.BasePath="<?php echo $this->path; ?>/";
        
        oFCKeditor.ReplaceTextarea();
</script>
