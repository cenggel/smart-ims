<?php
/**
 *LogCalendar 类文件
 *作者:李福安
 *日期:21:13 2012/5/10
 *
 */
class LogCalendar extends CWidget
{
	/**
	 *字符串
	 *onchangeyear:年份改变时触发
	 *onchangemonth:月份改变时触发
	 *onselectday:选择的某一天改变是触发
	 *onselectweek:选择某一周时触发
	 */
	 public $onchangeyear;
	 public $onchangemonth;
	 public $onselectday;
	 public $onselectweek;
	 
	 /**
	  *与该控件相关的用户model
	  *用于展示相关用户的日志列表
	  */
	 public $userModel;
	 
	 /**
	  *当前所展示的年份,4位
	  */
     public $year;
	 /**
	  *所展示的月份
	  */
	 public $month;
	 
	 
	 /**
	  *有日志的日期
	  */
	 public $hasLogDay = array('5','17');//测试数据
	 private $_weekNames = array('一','二','三','四','五','六','日',);
	 
	 /**
	  *当月所具有的星期数
	  */
	 private $_weekNum;
	 
	 /**
	  *当月1号所在所在月份矩阵下表(1开始)
	  */
	 private $_firstWeekday;
	 
	 /**
	  *当月最后一天所在所在月份矩阵下表(1开始)
	  */
	 private $_lastWeekday;
	 
	 /**
	  *当月的天数
	  */
	 private $_monthDays;
	 
	 /**
	  *根据月份矩阵下表获取单元格日期
	  */
	 private function getDayFromIndex($idx)
	 {
	 	 if($idx>=$this->_firstWeekday&&$idx<=$this->_lastWeekday)
         {
            $day = $idx - $this->_firstWeekday+1;
         }
         else if($idx<$this->_firstWeekday)
         {
         	$day=date('j',mktime(0,0,0,$this->month,0,$this->year))+$this->_firstWeekday-$idx-1;
         }
         else if($idx>$this->_lastWeekday)
         {
         	 $day=$idx-$this->_lastWeekday;
         }
         return $day;
	 }
	 
	 public function init()
	 {
	 	 $this->year = date('Y');
	 	 $this->month = date('n');
	 	 
	 	 $sdate = mktime(0, 0, 0, $this->month, 1, $this->year);
	 	 $edate = mktime(0, 0, 0, $this->month+1, 0, $this->year);
	 	 $this->_monthDays = date('j',$edate);
	 	 $this->_firstWeekday = date('N',$sdate);
	 	 $this->_weekNum = date('W',$edate)-date('W',$sdate) + 1;
	 	 $this->_lastWeekday = $this->_firstWeekday+$this->_monthDays - 1;
	 }
	 
	 public function run()
	 {
	 	 //展示头部分
	 	 echo '<DIV id=show_Calendar>';
	 	 echo '<DIV style="DISPLAY: block" class=calendar_view>';
	 	 echo '<DIV class="ti_bg_nor ti">';
	 	 echo '<B style="CURSOR: pointer" class="ico_le dleftarr_ico" onclick=""></B>';
	 	 echo '<B style="CURSOR: pointer" class="ico_le leftarr_ico" onclick=""></B>';
	 	 echo '<B style="CURSOR: pointer" class="ico_ri drightarr_ico" onclick=""></B>';
	 	 echo '<B style="CURSOR: pointer" class="ico_ri rightarr_ico" onclick=""></B>';
	 	 echo '<DIV>';
	 	 echo '<DIV style="FLOAT: left">&nbsp;&nbsp;&nbsp;&nbsp;</DIV>';
	 	 echo '<DIV style="CURSOR: pointer" class=year>';
	 	 echo '<SPAN id=year onclick="">'.$this->year.'</SPAN>';
	 	 echo '</DIV>';
	 	 echo '<DIV class=fl>年</DIV>';
	 	 echo '<DIV style="CURSOR: pointer" class=month>';
	 	 echo '<INPUT style="DISPLAY: none; COLOR: #808080" id=sele_month_text class=wh value=4>';
	 	 echo '<SPAN id=month onclick="">'.$this->month.'</SPAN>';
	 	 echo '</DIV>';
	 	 echo '<DIV class=fl>月</DIV>';
	 	 echo '<DIV class=cb></DIV>';
	 	 echo '</DIV>';
	 	 echo '<DIV class=cb></DIV>';
	 	 echo '</DIV>';
	 	 echo '<DIV class=cb></DIV>';
	 	 echo '<TABLE class=cont cellSpacing=0 cellPadding=3>';
	 	 echo '<TBODY id=calendarWeek>';
	 	 //星期头部展示
	 	 echo '<TR>';
	 	 echo '<TD class=cont_leti></TD>';
	 	 foreach($this->_weekNames as $key)
	 	 {
	 	 	 echo '<TD class=ti_unline>'.$key.'</TD>';
	 	 }
         echo '<TD class=cont_ri></TD>';
         echo '</TR>';
         //月份展示
         for($i=1;$i<=$this->_weekNum;$i++)
         {
           echo '<TR>';
           echo '<TD id=weekTr'.$i.' class=cont_leti onmouseover="" onmouseout="">';
           echo '<A id=week'.$i.' class=unline onclick="" href="javascript:void(0)" ;>&gt;&gt;</A>';
           echo '</TD>';
           for($j=1;$j<=7;$j++)
           {
           	   $cur_idx = ($i-1)*7+$j;
           	   $cur_day = $cur_idx - $this->_firstWeekday+1;
           	   $cur_txt = '';
           	   $now_day=date('j');
           	   $cur_class = '';

           	   $cur_txt=$this->getDayFromIndex($cur_idx);
           	   //区分过去,现在,将来
           	   if($cur_day<$now_day)
           	   {
           	   	   $cur_class = 'gray_box';
           	   }
           	   else if($cur_day==$now_day)
           	   {
           	   	   $cur_class = 'yell_box';
           	   }
           	   else if($cur_day>$now_day)
           	   {
           	   	   $cur_class = 'future_box';
           	   }
           	   
           	   //日志标注
           	   if(in_array($cur_day,$this->hasLogDay))
           	   {
           	   	   $cur_class = 'blue_box';
           	   }

           	   echo '<TD><LI class='.$cur_class.' onclick="">'.$cur_txt.'</LI></TD>';
           }
           echo '</TR>';
         }
         echo '</TBODY>';
         echo '</TABLE>';
         echo '</DIV>';
         echo '</DIV>';
         
	 }
}
