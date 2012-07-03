<script type="text/javaSCRIPT" src="<?php echo $this->path; ?>/tiny_mce.js"></script>
<script type="text/javaSCRIPT"> 
$('#<?php echo $this->name; ?>').wrap("<div class='editor'></div>"); 
tinyMCE.init(
              {mode : "exact",
              theme : "<?php echo $this->toolbar; ?>",
              height: "<?php echo $this->height; ?>",
              language : "en",
              plugins : "safari,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,\n\
                        iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,\n\
                        directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,\n\
                        imagemanager,filemanager",
              theme_advanced_buttons1 : "save,newdocument,|,\n\
                        bold,italic,underline,strikethrough,|,\n\
                        justifyleft,justifycenter,justifyright,justifyfull,|,\n\
                        formatselect,fontselect,fontsizeselect",
              theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,\n\
                        search,replace,|,\n\
                        bullist,numlist,|,\n\
                        outdent,indent,blockquote,|,\n\
                        undo,redo,|,\n\
                        link,unlink,anchor,image,cleanup,code",
              theme_advanced_buttons3 : "forecolor,backcolor,|,insertdate,inserttime,preview",
              theme_advanced_buttons4 : "tablecontrols,|,\n\
                        hr,removeformat,visualaid",
              theme_advanced_buttons5 : "sub,sup,|,\n\
                        charmap,emotions,iespell,media,advhr,|,\n\
                        print,|,ltr,rtl,|,fullscreen",
              theme_advanced_buttons6 : "insertlayer,moveforward,movebackward,absolute,|,\n\
                        styleprops,|,\n\
                        cite,abbr,acronym,del,ins,attribs,|,\n\
                        visualchars,nonbreaking,blockquote,pagebreak,|,\n\
                        insertfile,insertimage",
              theme_advanced_resizing : true,
              theme_advanced_toolbar_location : "top",
              theme_advanced_toolbar_align : "left",
              plugin_insertdate_dateFormat : "<?php echo $this->date_format; ?>",
              plugin_insertdate_timeFormat : "<?php echo $this->time_format; ?>",
              elements : "<?php echo $this->name; ?>"});
</script>
