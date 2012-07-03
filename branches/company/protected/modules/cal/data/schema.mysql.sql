
DROP TABLE IF EXISTS `event_log` ;
DROP TABLE IF EXISTS `event_repeats` ;
DROP TABLE IF EXISTS `event_task` ;
DROP TABLE IF EXISTS `event` ;
DROP TABLE IF EXISTS `calendar` ;


-- -----------------------------------------------------
-- Table `calendar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `calendar` ;

CREATE  TABLE IF NOT EXISTS `smart_ims`.`calendar` (

  `id` INT NOT NULL AUTO_INCREMENT ,

  `name` VARCHAR(50) NOT NULL ,

  `color` VARCHAR(45) NULL ,

  `visibility` INT NULL DEFAULT 0 COMMENT '0:public\n1:private' ,

  `user_id` INT NULL ,

  PRIMARY KEY (`id`) )

ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event` ;

CREATE  TABLE IF NOT EXISTS `event` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `calendar_id` INT NOT NULL ,
  `title` VARCHAR(100) NOT NULL ,
  `description` TEXT NULL ,
  `user_id` INT NULL ,
  `allDay` TINYINT NULL ,
  `editable` TINYINT NULL ,
  `start_time` INT NULL ,
  `end_time` INT NULL ,
  `cal_date` INT NULL ,
  `location` VARCHAR(150) NULL COMMENT '地点' ,
  `event_type` VARCHAR(45) NULL COMMENT 'task:待办事\nmeetting:会议' ,
  `completed` INT NULL COMMENT '完成度' ,
  `complete_date` INT NULL ,
  `actor_id` INT NULL ,
  `duration` INT NULL COMMENT '持续时间' ,
  `create_date` INT NULL ,
  `update_date` INT NULL ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `fk_event_calendar1`
    FOREIGN KEY (`calendar_id` )
    REFERENCES `calendar` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;

CREATE INDEX `fk_event_calendar1` ON `event` (`calendar_id` ASC) ;


-- -----------------------------------------------------
-- Table `event_repeats`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event_repeats` ;

CREATE  TABLE IF NOT EXISTS `event_repeats` (
  `repeat_type` VARCHAR(45) NULL COMMENT 'daily:每天\nweekly:每周\nmonthlyByDay:每月按第几周星期几重复\nmonthlyByDate:每月按指定日期' ,
  `end` INT NULL ,
  `endtime` INT NULL COMMENT '结束时间' ,
  `frequency` INT NULL ,
  `months` VARCHAR(100) NULL COMMENT '重复月列表' ,
  `monthdays` VARCHAR(100) NULL COMMENT '日期列表' ,
  `weekdays` VARCHAR(100) NULL COMMENT '重复周\nN*[MO,,,TH,SU]' ,
  `weekno` VARCHAR(45) NULL ,
  `yearday` VARCHAR(45) NULL ,
  `repeat_count` INT NULL COMMENT '重复次数' ,
  `event_id` INT NOT NULL ,
  CONSTRAINT `fk_event_repeats_event1`
    FOREIGN KEY (`event_id` )
    REFERENCES `event` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_event_repeats_event1` ON `event_repeats` (`event_id` ASC) ;


-- -----------------------------------------------------
-- Table `event_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event_users` ;

CREATE  TABLE IF NOT EXISTS `event_users` (
  `event_id` INT NOT NULL ,
  `user_id` INT NOT NULL )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `event_task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event_task` ;

CREATE  TABLE IF NOT EXISTS `event_task` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `event_id` INT NOT NULL ,
  `actor_id` VARCHAR(45) NULL COMMENT '0 开始' ,
  `name` VARCHAR(45) NULL ,
  `description` TEXT NULL ,
  `end_actor_id` INT NULL COMMENT '-1 结束' ,
  `start_date` INT NULL ,
  `end_date` INT NULL ,
  `complete_date` INT NULL ,
  `completed` INT NULL ,
  `actual_start` INT NULL COMMENT '实际开始时间' ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `fk_event_route_event1`
    FOREIGN KEY (`event_id` )
    REFERENCES `event` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_event_route_event1` ON `event_task` (`event_id` ASC) ;


-- -----------------------------------------------------
-- Table `event_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event_log` ;

CREATE  TABLE IF NOT EXISTS `event_log` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `event_id` INT NOT NULL ,
  `task_id` INT NOT NULL DEFAULT -1 ,
  `actor_id` INT NOT NULL ,
  `title` VARCHAR(100) NOT NULL ,
  `description` TEXT NULL ,
  `completed` INT NULL ,
  `create_date` INT NULL ,
  `update_date` INT NULL ,
  `turnouts` TEXT NULL ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `fk_event_log_event1`
    FOREIGN KEY (`event_id` )
    REFERENCES `event` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_log_event_task1`
    FOREIGN KEY (`task_id` )
    REFERENCES `event_task` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_event_log_event1` ON `event_log` (`event_id` ASC) ;

CREATE INDEX `fk_event_log_event_task1` ON `event_log` (`task_id` ASC) ;


-- -----------------------------------------------------
-- Table `monthly_review`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `monthly_review` ;

CREATE  TABLE IF NOT EXISTS `monthly_review` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `month` INT NOT NULL COMMENT '年月 如：201204' ,
  `user_id` INT NOT NULL ,
  `actor_id` INT NOT NULL ,
  `score` INT NULL ,
  `comment` TEXT NULL ,
  `create_date` INT NULL ,
  `update_date` INT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;