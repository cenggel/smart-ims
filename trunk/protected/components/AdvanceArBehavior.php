<?php
class AdvancedArBehavior extends CActiveRecordBehavior
{
	public function afterSave($on) {
		$this->writeManyManyTables();
		return TRUE;
	}

	public function writeHasMany() {

	}

	public function writeManyManyTables() {
		Yii::trace('writing MANY_MANY data for '.get_class($this->owner),'system.db.ar.CActiveRecord');

		foreach($this->owner->relations() as $key => $relation)
		{
			if($relation['0'] == CActiveRecord::MANY_MANY) // ['0'] equals relationType
			{
				if(isset($this->owner->$key))
				{
					if(is_object($this->owner->$key) || is_numeric($this->owner->$key))
					{
						$this->executeManyManyEntry($this->makeManyManyDeleteCommand(
								$relation[2],
								$this->owner->{$this->owner->tableSchema->primaryKey}));
						$query = $this->owner->makeManyManyCommand(
								$relation[2],
								$this->owner->{$this->owner->tableSchema->primaryKey},
								(is_object($this->owner->$key))
								?  $this->owner->$key->{$this->owner->$key->tableSchema->primaryKey}
						: $this->owner->{$key});
						$this->owner->executeManyManyEntry($query);
					}
					else if (is_array($this->owner->$key) && $this->owner->$key != array())
					{
						$this->executeManyManyEntry($this->makeManyManyDeleteCommand(
								$relation[2],
								$this->owner->{$this->owner->tableSchema->primaryKey}));
						foreach($this->owner->$key as $foreignobject)
						{
							$query = $this->makeManyManyCommand(
									$relation[2],
									$this->owner->{$this->owner->tableSchema->primaryKey},
									(is_object($foreignobject))
									? $foreignobject->{$foreignobject->tableSchema->primaryKey}
							: $foreignobject);
							$this->executeManyManyEntry($query);
						}
					}
				}
			}
		}
	}

	public function executeManyManyEntry($query) {
		if(!Yii::app()->db->createCommand($query)->execute())
			throw new CException(Yii::t('yii','an Error occured while trying to update MANY_MANY relation table'));

	}
	public function makeManyManyDeleteCommand($model, $rel) {
		return sprintf("delete from %s where %s = '%s'", $this->getManyManyTable($model), $this->owner->tableSchema->primaryKey, $rel);
	}
	public function makeManyManyCommand($model, $rel, $foreignrel) {
		return sprintf("insert into %s values ('%s', '%s')", $model, $rel, $foreignrel);
	}
	public function getManyManyTable($model) {
		if (($ps=strpos($model, '('))!==FALSE)
		{
			return substr($model, 0, $ps);
		}
		else
			return $model;
	}
}