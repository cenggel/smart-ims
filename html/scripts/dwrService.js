// JavaScript Document
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;
if (dwrService == null) var dwrService = {};
dwrService._path = './dwr';
dwrService.updateStatus = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateStatus', p0, p1, callback);
}
dwrService.sortChannel = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'sortChannel', p0, p1, p2, callback);
}
dwrService.addChannel = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addChannel', p0, p1, p2, p3, callback);
}
dwrService.changeChannelStatus = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'changeChannelStatus', p0, p1, p2, p3, callback);
}
dwrService.logout = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'logout', callback);
}
dwrService.updatePassword = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updatePassword', p0, p1, p2, p3, callback);
}
dwrService.updatePhone = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updatePhone', p0, p1, callback);
}
dwrService.editLinkman = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editLinkman', p0, p1, p2, callback);
}
dwrService.saveLinkmans = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'saveLinkmans', p0, p1, p2, callback);
}
dwrService.deleteLinkmans = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteLinkmans', p0, p1, callback);
}
dwrService.editGroup = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editGroup', p0, p1, p2, callback);
}
dwrService.deleteGroup = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteGroup', p0, p1, callback);
}
dwrService.getCompanyName = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getCompanyName', p0, callback);
}
dwrService.saveAccount = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'saveAccount', p0, p1, p2, p3, callback);
}
dwrService.updateStatusByEnabled = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateStatusByEnabled', p0, p1, p2, callback);
}
dwrService.updateDefaultAccountById = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateDefaultAccountById', p0, p1, p2, callback);
}
dwrService.saveGeneral = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'saveGeneral', p0, p1, callback);
}
dwrService.saveBlacklist = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'saveBlacklist', p0, p1, callback);
}
dwrService.saveAntiGarbage = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'saveAntiGarbage', p0, p1, callback);
}
dwrService.findMailById = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'findMailById', p0, p1, callback);
}
dwrService.getOSMail = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getOSMail', p0, p1, p2, callback);
}
dwrService.updateBoxId = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateBoxId', p0, p1, p2, callback);
}
dwrService.updateEcho = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateEcho', p0, p1, p2, callback);
}
dwrService.getBoxListIds = function(p0, p1, p2, p3, p4, p5, p6, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getBoxListIds', p0, p1, p2, p3, p4, p5, p6, callback);
}
dwrService.updateMailStatus = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateMailStatus', p0, p1, p2, callback);
}
dwrService.sendNewMail = function(p0, p1, p2, p3, p4, p5, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'sendNewMail', p0, p1, p2, p3, p4, p5, callback);
}
dwrService.saveDraft = function(p0, p1, p2, p3, p4, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'saveDraft', p0, p1, p2, p3, p4, callback);
}
dwrService.updateDraft = function(p0, p1, p2, p3, p4, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateDraft', p0, p1, p2, p3, p4, callback);
}
dwrService.sendDraft = function(p0, p1, p2, p3, p4, p5, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'sendDraft', p0, p1, p2, p3, p4, p5, callback);
}
dwrService.transmitMail = function(p0, p1, p2, p3, p4, p5, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'transmitMail', p0, p1, p2, p3, p4, p5, callback);
}
dwrService.revertMail = function(p0, p1, p2, p3, p4, p5, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'revertMail', p0, p1, p2, p3, p4, p5, callback);
}
dwrService.deleteBox = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteBox', p0, p1, callback);
}
dwrService.testPOP3 = function(p0, p1, p2, p3, p4, p5, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'testPOP3', p0, p1, p2, p3, p4, p5, callback);
}
dwrService.testSMTP = function(p0, p1, p2, p3, p4, p5, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'testSMTP', p0, p1, p2, p3, p4, p5, callback);
}
dwrService.receiveMail = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'receiveMail', p0, callback);
}
dwrService.deleteAllMails = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteAllMails', p0, p1, callback);
}
dwrService.addComment = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addComment', p0, p1, callback);
}
dwrService.addKnowledge = function(p0, p1, p2, p3, p4, p5, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addKnowledge', p0, p1, p2, p3, p4, p5, callback);
}
dwrService.addPlan = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addPlan', p0, p1, callback);
}
dwrService.addContent = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addContent', p0, p1, p2, callback);
}
dwrService.updateWorkLogSegment = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateWorkLogSegment', p0, p1, p2, callback);
}
dwrService.removeWorkLogAttachment = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'removeWorkLogAttachment', p0, p1, callback);
}
dwrService.updatePendingMatter = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updatePendingMatter', p0, p1, callback);
}
dwrService.deletePendingMatterById = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deletePendingMatterById', p0, p1, callback);
}
dwrService.getCompanyRootDeptNodeVersion = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getCompanyRootDeptNodeVersion', callback);
}
dwrService.addClientCard = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addClientCard', p0, p1, callback);
}
dwrService.stopOrActiveClient = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'stopOrActiveClient', p0, p1, p2, callback);
}
dwrService.updatePendingMatterStatusById = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updatePendingMatterStatusById', p0, p1, p2, callback);
}
dwrService.existWorkLogSegment = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'existWorkLogSegment', p0, p1, callback);
}
dwrService.getOrgTreeFilter = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getOrgTreeFilter', p0, p1, callback);
}
dwrService.recordErrorFromBrowser = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'recordErrorFromBrowser', p0, callback);
}
dwrService.affairPauseIndivAffairById = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'affairPauseIndivAffairById', p0, p1, callback);
}
dwrService.affairDeleteIndivAffairById = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'affairDeleteIndivAffairById', p0, p1, callback);
}
dwrService.affairReActiveIndivAffairById = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'affairReActiveIndivAffairById', p0, p1, callback);
}
dwrService.affairAddIndivAffair = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'affairAddIndivAffair', p0, p1, callback);
}
dwrService.SMSTransmit = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'SMSTransmit', p0, p1, p2, p3, callback);
}
dwrService.eaUpdateMessageCompanyConfig = function(p0, p1, p2, p3, p4, p5, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'eaUpdateMessageCompanyConfig', p0, p1, p2, p3, p4, p5, callback);
}
dwrService.getDWRIncludeURL = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getDWRIncludeURL', p0, p1, callback);
}
dwrService.relogin = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'relogin', p0, p1, p2, p3, callback);
}
dwrService.getOrganizationTree = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getOrganizationTree', p0, p1, p2, p3, callback);
}
dwrService.getRootNodeVerAndFilter = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getRootNodeVerAndFilter', p0, callback);
}
dwrService.addForumBlock = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addForumBlock', p0, p1, callback);
}
dwrService.deleteForumBlock = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteForumBlock', p0, p1, callback);
}
dwrService.getForumBlockTree = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getForumBlockTree', callback);
}
dwrService.sortForumBlock = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'sortForumBlock', p0, p1, callback);
}
dwrService.addForumRegion = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addForumRegion', p0, p1, callback);
}
dwrService.deleteForumRegion = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteForumRegion', p0, p1, callback);
}
dwrService.getForumRegionTree = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getForumRegionTree', p0, callback);
}
dwrService.sortForumRegion = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'sortForumRegion', p0, p1, callback);
}
dwrService.getForumTree = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getForumTree', callback);
}
dwrService.addForumTopic = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addForumTopic', p0, p1, p2, callback);
}
dwrService.addForumReview = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addForumReview', p0, p1, p2, callback);
}
dwrService.deleteForumTopic = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteForumTopic', p0, p1, callback);
}
dwrService.addOneViewForumTopic = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addOneViewForumTopic', p0, p1, callback);
}
dwrService.addViewForumTopic = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addViewForumTopic', p0, p1, callback);
}
dwrService.toppedOneForumTopic = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'toppedOneForumTopic', p0, p1, callback);
}
dwrService.closedOneForumTopic = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'closedOneForumTopic', p0, p1, p2, callback);
}
dwrService.canceledOneForumTopic = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'canceledOneForumTopic', p0, p1, p2, callback);
}
dwrService.canceledOneForumReview = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'canceledOneForumReview', p0, p1, p2, callback);
}
dwrService.transferTopic = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'transferTopic', p0, p1, callback);
}
dwrService.getKAuditLeft = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getKAuditLeft', p0, callback);
}
dwrService.issueVer = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'issueVer', p0, p1, p2, callback);
}
dwrService.refuseVer = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'refuseVer', p0, p1, p2, callback);
}
dwrService.getKCategoryLeftTree = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getKCategoryLeftTree', p0, callback);
}
dwrService.addKCategory = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addKCategory', p0, p1, callback);
}
dwrService.deleteKCategory = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteKCategory', p0, p1, callback);
}
dwrService.getKEpknowledgeLeft = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getKEpknowledgeLeft', callback);
}
dwrService.editComment = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editComment', p0, p1, callback);
}
dwrService.getKMyknowledgeLeft = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getKMyknowledgeLeft', callback);
}
dwrService.getKCategoryTree = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getKCategoryTree', callback);
}
dwrService.getKCategoryTree4Relation = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getKCategoryTree4Relation', p0, callback);
}
dwrService.getKTagsByCategory = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getKTagsByCategory', p0, callback);
}
dwrService.editKnowledge = function(p0, p1, p2, p3, p4, p5, p6, p7, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editKnowledge', p0, p1, p2, p3, p4, p5, p6, p7, callback);
}
dwrService.delDraft = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'delDraft', p0, p1, p2, callback);
}
dwrService.delRefused = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'delRefused', p0, p1, p2, callback);
}
dwrService.getVerByCategoryIds = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getVerByCategoryIds', p0, p1, p2, callback);
}
dwrService.addKTag = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addKTag', p0, p1, callback);
}
dwrService.delTagById = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'delTagById', p0, p1, callback);
}
dwrService.getKTagLeftTree = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getKTagLeftTree', callback);
}
dwrService.checkPassword = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'checkPassword', p0, callback);
}
dwrService.updateCategory = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateCategory', p0, p1, callback);
}
dwrService.addPlanCategories = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addPlanCategories', p0, p1, p2, p3, callback);
}
dwrService.deteleCategory = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deteleCategory', p0, p1, p2, callback);
}
dwrService.updateDetail = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateDetail', p0, p1, callback);
}
dwrService.deleteDetail = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteDetail', p0, p1, p2, callback);
}
dwrService.updatePlanTitle = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updatePlanTitle', p0, p1, p2, callback);
}
dwrService.updatePlanCondusion = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updatePlanCondusion', p0, p1, p2, callback);
}
dwrService.addPlanComment = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addPlanComment', p0, p1, p2, callback);
}
dwrService.getIdByTimeAndType = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getIdByTimeAndType', p0, p1, p2, callback);
}
dwrService.getWeekPlan = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getWeekPlan', p0, p1, p2, callback);
}
dwrService.addDBPlanVersion = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addDBPlanVersion', p0, p1, p2, callback);
}
dwrService.addPlanAttachment = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addPlanAttachment', p0, p1, p2, callback);
}
dwrService.deletePlanAnnex = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deletePlanAnnex', p0, p1, p2, callback);
}
dwrService.updateComment = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateComment', p0, p1, p2, callback);
}
dwrService.editTargetMessage = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editTargetMessage', p0, p1, p2, callback);
}
dwrService.editTargetDoc = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editTargetDoc', p0, p1, p2, callback);
}
dwrService.editMessageReview = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editMessageReview', p0, p1, p2, p3, callback);
}
dwrService.setMessageStatus = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'setMessageStatus', p0, p1, callback);
}
dwrService.cancelPoint = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'cancelPoint', p0, p1, callback);
}
dwrService.deleteProblemGroup = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteProblemGroup', p0, p1, callback);
}
dwrService.addProblemGroup = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addProblemGroup', p0, p1, callback);
}
dwrService.getProblemTree = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getProblemTree', callback);
}
dwrService.addProblem = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addProblem', p0, p1, callback);
}
dwrService.endProblem = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'endProblem', p0, p1, callback);
}
dwrService.addProblemDetail = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addProblemDetail', p0, p1, callback);
}
dwrService.getUsefulGroup = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getUsefulGroup', callback);
}
dwrService.getUsefulAll = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getUsefulAll', callback);
}
dwrService.addUsefulMsg = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addUsefulMsg', p0, p1, callback);
}
dwrService.addUsefulGroup = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addUsefulGroup', p0, p1, callback);
}
dwrService.delUsefulGroup = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'delUsefulGroup', p0, p1, callback);
}
dwrService.getOneUsefulMsg = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getOneUsefulMsg', p0, callback);
}
dwrService.delUsefulMsg = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'delUsefulMsg', p0, p1, callback);
}
dwrService.deleteClient = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteClient', p0, p1, callback);
}
dwrService.getClientTree = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getClientTree', p0, callback);
}
dwrService.addSystem = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addSystem', p0, p1, callback);
}
dwrService.updateOnlineDialogStatus = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateOnlineDialogStatus', p0, p1, callback);
}
dwrService.deleteDialog = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteDialog', p0, p1, p2, callback);
}
dwrService.setOnlineDialogUser = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'setOnlineDialogUser', p0, p1, callback);
}
dwrService.deleteCallerCard = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteCallerCard', p0, p1, callback);
}
dwrService.addCallerCard = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addCallerCard', p0, p1, callback);
}
dwrService.addTarget = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addTarget', p0, p1, p2, p3, callback);
}
dwrService.editPricipal = function(p0, p1, p2, p3, p4, p5, p6, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editPricipal', p0, p1, p2, p3, p4, p5, p6, callback);
}
dwrService.editTarget = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editTarget', p0, p1, p2, p3, callback);
}
dwrService.getTargetTree = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getTargetTree', p0, p1, p2, callback);
}
dwrService.editClientGroup = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editClientGroup', p0, p1, callback);
}
dwrService.delClientGroup = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'delClientGroup', p0, p1, callback);
}
dwrService.getTargetTreeTemp = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getTargetTreeTemp', p0, p1, p2, callback);
}
dwrService.changeStatus = function(p0, p1, p2, p3, p4, p5, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'changeStatus', p0, p1, p2, p3, p4, p5, callback);
}
dwrService.changeProcess = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'changeProcess', p0, p1, p2, p3, callback);
}
dwrService.transferTarget = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'transferTarget', p0, p1, p2, p3, callback);
}
dwrService.deleteTargetPersonnel = function(p0, p1, p2, p3, p4, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteTargetPersonnel', p0, p1, p2, p3, p4, callback);
}
dwrService.addTargetPersonnels = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addTargetPersonnels', p0, p1, p2, p3, callback);
}
dwrService.JinGateSetup = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'JinGateSetup', p0, p1, callback);
}
dwrService.addWorkLogAttachment = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addWorkLogAttachment', p0, p1, p2, callback);
}
dwrService.addWorkLogContent4igoal = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addWorkLogContent4igoal', p0, p1, callback);
}
dwrService.editWorkLogSummary4igoal = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editWorkLogSummary4igoal', p0, p1, p2, callback);
}
dwrService.SwitchAudit = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'SwitchAudit', p0, p1, p2, callback);
}
dwrService.addWorkLogSegment = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addWorkLogSegment', p0, p1, p2, callback);
}
dwrService.worklogAddComment = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'worklogAddComment', p0, p1, p2, callback);
}
dwrService.updateWorkLogRuleWorkTime = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateWorkLogRuleWorkTime', p0, p1, callback);
}
dwrService.modifyComment = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'modifyComment', p0, p1, p2, p3, callback);
}
dwrService.getTreeDefaultNoteIds = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getTreeDefaultNoteIds', callback);
}
dwrService.setWorkLogViewDay = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'setWorkLogViewDay', p0, p1, callback);
}
dwrService.setPlanViewType = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'setPlanViewType', p0, p1, callback);
}
dwrService.egGetEnterPriseTree = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'egGetEnterPriseTree', p0, callback);
}
dwrService.egSort = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'egSort', p0, p1, callback);
}
dwrService.egEditColumn = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'egEditColumn', p0, p1, callback);
}
dwrService.egDeleteColumn = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'egDeleteColumn', p0, p1, callback);
}
dwrService.egChangeMessageState = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'egChangeMessageState', p0, p1, p2, callback);
}
dwrService.egDeleteMessage = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'egDeleteMessage', p0, p1, callback);
}
dwrService.egEditMessage = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'egEditMessage', p0, p1, p2, p3, callback);
}
dwrService.editJinMessage = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editJinMessage', p0, p1, p2, callback);
}
dwrService.egSubmitVote = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'egSubmitVote', p0, p1, callback);
}
dwrService.egSubmitComment = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'egSubmitComment', p0, p1, callback);
}
dwrService.egSetOverState = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'egSetOverState', p0, p1, p2, callback);
}
dwrService.egResetVote = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'egResetVote', p0, p1, callback);
}
dwrService.egGetBiggerImage = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'egGetBiggerImage', p0, p1, p2, p3, callback);
}
dwrService.getCategoryListForSort = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getCategoryListForSort', p0, callback);
}
dwrService.categorySort = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'categorySort', p0, p1, callback);
}
dwrService.checkVersion = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'checkVersion', p0, p1, callback);
}
dwrService.addOneToForum = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addOneToForum', p0, p1, callback);
}
dwrService.addOneToKnowledge = function(p0, p1, p2, p3, p4, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addOneToKnowledge', p0, p1, p2, p3, p4, callback);
}
dwrService.transmitInf = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'transmitInf', p0, callback);
}
dwrService.topTargetKeyFilter = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'topTargetKeyFilter', p0, p1, callback);
}
dwrService.bindMail = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'bindMail', p0, p1, callback);
}
dwrService.existBuildEmail = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'existBuildEmail', p0, callback);
}
dwrService.getMailAddressTree = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getMailAddressTree', p0, callback);
}
dwrService.modifyMyInfo = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'modifyMyInfo', p0, p1, callback);
}
dwrService.modifyMyLangInfo = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'modifyMyLangInfo', p0, p1, callback);
}
dwrService.modifyMyPageNumInfo = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'modifyMyPageNumInfo', p0, p1, callback);
}
dwrService.modifyUserPropertyDeptPerm = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'modifyUserPropertyDeptPerm', p0, callback);
}
dwrService.cancelSnapshot = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'cancelSnapshot', p0, callback);
}
dwrService.hintCabinet = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'hintCabinet', callback);
}
dwrService.hintSnapshot = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'hintSnapshot', callback);
}
dwrService.hideBoardAwoke = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'hideBoardAwoke', p0, callback);
}
dwrService.checkAccountByUserId = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'checkAccountByUserId', p0, callback);
}
dwrService.getUserDefinedGroupTree = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getUserDefinedGroupTree', p0, p1, p2, callback);
}
dwrService.addOrUpdateUserDefinedGroup = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addOrUpdateUserDefinedGroup', p0, p1, p2, callback);
}
dwrService.editModuleRelation = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editModuleRelation', p0, p1, callback);
}
dwrService.deleteUserDefinedGroup = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteUserDefinedGroup', p0, p1, callback);
}
dwrService.deleteBlacklist = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteBlacklist', p0, p1, callback);
}
dwrService.deleteAllBlacklists = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteAllBlacklists', p0, callback);
}
dwrService.addPendingMatter = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addPendingMatter', p0, p1, callback);
}
dwrService.updatePendingMatterContent = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updatePendingMatterContent', p0, p1, p2, callback);
}
dwrService.updatePendingMatterStatus = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updatePendingMatterStatus', p0, p1, p2, callback);
}
dwrService.updatePendingMatterMoveDate = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updatePendingMatterMoveDate', p0, p1, p2, p3, callback);
}
dwrService.oldUserBindEmailAlert = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'oldUserBindEmailAlert', callback);
}
dwrService.addMaintainNotice = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addMaintainNotice', p0, p1, callback);
}
dwrService.updateMaintainNotice = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateMaintainNotice', p0, p1, callback);
}
dwrService.deleteMaintainNotice = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteMaintainNotice', p0, p1, callback);
}
dwrService.sendUpdateNotice = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'sendUpdateNotice', p0, p1, callback);
}
dwrService.sendGeneralNotice = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'sendGeneralNotice', p0, p1, callback);
}
dwrService.sendHaltNotice = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'sendHaltNotice', p0, p1, callback);
}
dwrService.editActionInstance = function(p0, p1, p2, p3, p4, p5, p6, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editActionInstance', p0, p1, p2, p3, p4, p5, p6, callback);
}
dwrService.reBindEmail = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'reBindEmail', p0, callback);
}
dwrService.modifyAndBindEmailAddress = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'modifyAndBindEmailAddress', p0, p1, callback);
}
dwrService.unBindEmail = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'unBindEmail', p0, callback);
}
dwrService.editActionSuspend = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editActionSuspend', p0, p1, p2, p3, callback);
}
dwrService.editSummary = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editSummary', p0, p1, p2, callback);
}
dwrService.addCommentContent = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addCommentContent', p0, p1, p2, p3, callback);
}
dwrService.updateAttentionLevel = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateAttentionLevel', p0, p1, p2, callback);
}
dwrService.updateAttentionLevelById = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateAttentionLevelById', p0, p1, p2, callback);
}
dwrService.removeAttention = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'removeAttention', p0, p1, callback);
}
dwrService.removeAttentionByModule = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'removeAttentionByModule', p0, p1, p2, callback);
}
dwrService.addMessageIndex = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addMessageIndex', p0, p1, callback);
}
dwrService.deleteMessageIndex = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteMessageIndex', p0, p1, callback);
}
dwrService.updateSubscribeInfo = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateSubscribeInfo', p0, p1, p2, callback);
}
dwrService.delDoc = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'delDoc', p0, callback);
}
dwrService.editBoard = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editBoard', p0, p1, callback);
}
dwrService.applyAndSummary = function(p0, p1, p2, p3, p4, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'applyAndSummary', p0, p1, p2, p3, p4, callback);
}
dwrService.editTaskTag = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editTaskTag', p0, p1, callback);
}
dwrService.delTaskTagById = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'delTaskTagById', p0, p1, callback);
}
dwrService.getTaskTagList = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getTaskTagList', p0, callback);
}
dwrService.modifyActionInstanceSettop = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'modifyActionInstanceSettop', p0, p1, callback);
}
dwrService.hideWorkflowUsage = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'hideWorkflowUsage', p0, p1, callback);
}
dwrService.shortcutRevertMail = function(p0, p1, p2, p3, p4, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'shortcutRevertMail', p0, p1, p2, p3, p4, callback);
}
dwrService.deleteByIds = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteByIds', p0, p1, p2, callback);
}
dwrService.getUserProperty = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'getUserProperty', p0, callback);
}
dwrService.setUserProperty = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'setUserProperty', p0, p1, callback);
}
dwrService.editSupplementWorkLog = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'editSupplementWorkLog', p0, p1, p2, callback);
}
dwrService.setAll4Read = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'setAll4Read', p0, p1, p2, p3, callback);
}
dwrService.deleteAllMailByStatus = function(p0, p1, p2, p3, p4, p5, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteAllMailByStatus', p0, p1, p2, p3, p4, p5, callback);
}
dwrService.insertDocTransfer = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'insertDocTransfer', p0, p1, p2, callback);
}
dwrService.deleteLatestDoc = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteLatestDoc', p0, callback);
}
dwrService.modulMonitor = function(callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'modulMonitor', callback);
}
dwrService.addSalseInfo = function(p0, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'addSalseInfo', p0, callback);
}
dwrService.modifyUserMobile = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'modifyUserMobile', p0, p1, callback);
}
dwrService.deleteVCard = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteVCard', p0, p1, callback);
}
dwrService.deleteMailAccount = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'deleteMailAccount', p0, p1, callback);
}
dwrService.isExistAccountByMail = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'isExistAccountByMail', p0, p1, callback);
}
dwrService.updateChannel = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'updateChannel', p0, p1, p2, p3, callback);
}
dwrService.eaUpdateCompanyMoreInfo = function(p0, p1, p2, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'eaUpdateCompanyMoreInfo', p0, p1, p2, callback);
}
dwrService.checkUserPassword = function(p0, p1, callback) {
  dwr.engine._execute(dwrService._path, 'dwrService', 'checkUserPassword', p0, p1, callback);
}
