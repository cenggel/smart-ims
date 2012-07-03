<?php $this->pageTitle=Yii::app()->name; ?>
<div>
	<style>
#dialog label,#dialog input {
	display: block;
}

#dialog label {
	margin-top: 0.5em;
}

#dialog input,#dialog textarea {
	width: 95%;
}



#add_tab {
	cursor: pointer;
}
</style>
	<script>

	$(function() {
		var $tab_title_input = $( "#tab_title"),
			$tab_content_input = $( "#tab_content" );
		var tab_counter = 2;


		// tabs init with a custom tab template and an "add" callback filling in the content
		$tabs = $( "#tabs").tabs({
			remoteInFrame:true,
			cache:true			
		}).scrollabletabs({customNavNext:'#n',
			customNavPrev:'#p',
			customNavFirst:'#f',
			customNavLast:'#l'});

		// modal dialog init: custom buttons and a "close" callback reseting the form inside
		var $dialog = $( "#dialog" ).dialog({
			autoOpen: false,
			modal: true,
			buttons: {
				Add: function() {
					addTab();
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			open: function() {
				$tab_title_input.focus();
			},
			close: function() {
				$form[ 0 ].reset();
			}
		});

		// addTab form: calls addTab function on submit and closes the dialog
		var $form = $( "form", $dialog ).submit(function() {
			addTab();
			$dialog.dialog( "close" );
			return false;
		});

		// actual addTab function: adds new tab using the title input from the form above
		function addTab() {
			var tab_title = $tab_title_input.val() || "Tab " + tab_counter; alert(tab_title);
			$tabs.tabs( "add", "http://localhost:8080/web/smart-ims/index.php/rights", tab_title );
			tab_counter++;
		}

		// addTab button: just opens the dialog
		$( "#add_tab" )
			.button()
			.click(function() {
				$dialog.dialog( "open" );
			});

		// close icon: removing the tab on click
		// note: closable tabs gonna be an option in the future - see http://dev.jqueryui.com/ticket/3924
		$( "#tabs span.ui-icon-close" ).live( "click", function() {
			var index = $( "li", $tabs ).index( $( this ).parent() );
			$tabs.tabs( "remove", index );
		});
		
		$("#addUiTab").click(function(){
			$tabs
			.tabs('add','#test','test');
		}
		);
	});
	</script>



	<div class="demo">

		<div id="dialog" title="Tab data">
			<form>
				<fieldset class="ui-helper-reset">
					<label for="tab_title">Title</label> <input type="text"
						name="tab_title" id="tab_title" value=""
						class="ui-widget-content ui-corner-all" /> <label
						for="tab_content">Content</label>
					<textarea name="tab_content" id="tab_content"
						class="ui-widget-content ui-corner-all"></textarea>
				</fieldset>
			</form>
		</div>

		

		<div id="tabs">
			<ul>
				<li><a href="#tabs-1">Nunc tincidunt</a> </li>
			</ul>
			<div id="tabs-1">
				<p>Proin elit arcu, rutrum commodo, vehicula tempus, commodo a,
					risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris.
					Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem.
					Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo.
					Vivamus sed magna quis ligula eleifend adipiscing. Duis orci.
					Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam
					molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut
					dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique
					tempus lectus.</p>
			</div>
		</div>

	</div>
	
	<button id="add_tab">Add Tab</button>
	
	<button id="sel_tab" onclick="$tabs.tabs('select',0);">sel Tab</button>
	<!-- End demo -->



	<div class="demo-description">
		<p>Simple tabs adding and removing.</p>
	</div>
	<!-- End demo-description -->
</div>
