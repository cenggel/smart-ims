<?php
/**
* Rights installer component class file.
*
* @author Christoffer Niska <cniska@live.com>
* @copyright Copyright &copy; 2010 Christoffer Niska
* @since 0.9.3
*/
class Installer extends CApplicationComponent
{
    const ERROR_NONE=0;
    const ERROR_QUERY_FAILED=1;

	
	private $_authManager;
    /**
     * @property boolean whether Rights is installed.
     */
	private $_installed;

	/**
	* @property CDbConnection
	*/
	public $db;
	
	/**
	 * 
	 * @property string schema file name. 
	 */
	public $schema;

	/**
	* Initializes the installer.
	* @throws CException if the authorization manager or the web user
	* is not configured to use the correct class.
	*/
	public function init()
	{
		parent::init();

		if( empty($this->schema))
			throw new CException(Yii::t('install', 'shema file name must be set.'));

		$this->_authManager = Yii::app()->getAuthManager();
		$this->db = $this->_authManager->db;
	}

	/**
	* Runs the installer.
	* @param boolean whether to drop tables if they exists.
	* @return boolean whether the installer ran successfully.
	*/
	public function run()
	{
		$installed = dirname(dirname(__FILE__)).'/data/installed.txt';
      

		
		if(file_exists($installed)) return self::ERROR_NONE;
		
        // Fetch the schema.
        $schema = file_get_contents(dirname(__FILE__).'/../data/'.($this->schema?$this->schema:'schema.sql'));

        echo $schema;
        // Convert the schema into an array of sql queries.
        $schema = preg_split("/;\s*/", trim($schema, ';'));

        // Start transaction
        $txn = $this->db->beginTransaction();

        try
        {
            // Execute each query in the schema.
            foreach( $schema as $sql )
            {
                $command = $this->db->createCommand($sql);
                $command->execute();
            }
            

            file_put_contents($installed, 'installed all tables '+time());

            // All commands executed successfully, commit.
            $txn->commit();
            return self::ERROR_NONE;
        }
        catch( CDbException $e )
        {
            // Something went wrong, rollback.
            $txn->rollback();
            Yii::trace($e->getMessage());
            return self::ERROR_QUERY_FAILED;
        }
	}

	
}
