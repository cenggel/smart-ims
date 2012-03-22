<?php $this->beginContent(Rights::module()->appLayout); ?>
<div class="clear"></div>
<div id="rights" class="container clearfix">

	<div id="content">

		<?php if( $this->id!=='install' ): ?>

			<div id="menu">

				<?php $this->renderPartial('/_menu'); ?>

			</div>

		<?php endif; ?>

		<?php $this->renderPartial('/_flash'); ?>

		<?php echo $content; ?>

	</div><!-- content -->

</div>

<?php $this->endContent(); ?>