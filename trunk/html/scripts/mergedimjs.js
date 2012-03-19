// JavaScript Document
function webimNotice(type) {
    if (type == 1) {
        dwrService.modulMonitor();
    }
}
var mainTitle;
window.addEvent('domready', 
function() {
    try {
        mainTitle = top.document.title;
    } catch(e) {
        debug("error in header4im.js domready :" + e.error + ";" + e.message + ";" + e.name);
    }
});
var canChange = false;
function setTitleChange(value) {
    try {
        debug(top.document.title);
        if (!canChange) {
            top.document.title = mainTitle;
            return;
        }
        if (value) {
            top.document.title = "\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000 ";
            setTimeout(function() {
                setTitleChange();
            },
            500);
        } else {
            top.document.title = Resource.im.alert;
            setTimeout(function() {
                setTitleChange(true);
            },
            500);
        }
    }
    catch(ex) {
        debug("setTitleChange  error :  " + ex.name + "    " + ex.message);
    }
}
function tempFocus() {
    try {
        document.removeEvent("mousemove", tempFocus);
        document.removeEvent("focus", tempFocus);
        canChange = false;
    }
    catch(ex) {
        debug(ex.name + "    " + ex.message);
    }
    return false;
}
function endFocus() {
    return false;
}
function Notify4IM() {
    this.notify4Im_setTimeOut = function(fromOls) {
        setTimeout("notify4IM.notify4Im_refresh(false," + fromOls + ")", 500);
    };
    this.showMe = function() {
        try {
            document.addEvent("mousemove", tempFocus);
            document.addEvent("focus", tempFocus);
            if (canChange) {
                return;
            }
            setTimeout(function() {
                setTitleChange(true);
            },
            500);
            canChange = true;
        }
        catch(ex) {
            debug("this.showMe  error :  " + ex.name + "    " + ex.message);
        }
    };
    this.active = function() {
        if (common_is_ie) {
            if (typeof(areaFocus) != "undefined" && areaFocus) {} else {
                window.focus();
            }
        } else {
            window.focus();
        }
    };
    this.notify4Im_refresh = function(isFresh, fromOls) {
        try {
            var webimtab = $("webimtab");
            var webonlinetab = $("webonlinetab");
            if (fromOls) {
                if (!top.frames[3].imStatus.somebodyOnline) {
                    topFreshInterval(false, webonlinetab);
                    return;
                }
            } else {
                if (!top.frames[3].imStatus.somebody) {
                    topFreshInterval(false, webimtab);
                    return;
                }
            }
            var position = myPosition();
            var canStop = false;
            if (position == 1) {
                top.frames[3].imStatus.somebodyOnline = false;
                if (fromOls) {} else {
                    topFreshInterval(isFresh, webimtab);
                }
            } else {
                top.frames[3].imStatus.somebody = false;
                if (fromOls) {
                    topFreshInterval(isFresh, webonlinetab);
                } else {}
            }
            if (isFresh) {
                setTimeout("notify4IM.notify4Im_refresh(false," + fromOls + ")", 500);
            } else {
                setTimeout("notify4IM.notify4Im_refresh(true," + fromOls + ")", 500);
            }
        } catch(ex) {
            debug("notify4Im_refresh isFresh: " + isFresh + " ,  fromOls: " + fromOls + ", error" + ex.name + ", " + ex.message);
        }
    };
}
function topFreshInterval(isFresh, id) {
    if (isFresh) {
        id.addClass("tipNew");
    } else {
        id.removeClass("tipNew");
    }
}
var notify4IM = new Notify4IM();
function myPosition() {
    var status = 0;
    var isOlsInput = $("isOlsInput");
    var isOlsPage = (isOlsInput.value == "true" ? true: false);
    if (isOlsPage) {
        status = 1;
    }
    return status;
}
common_is_ie = ((navigator.userAgent.toLowerCase()).indexOf("msie") != -1 && document.all);
var isImOrOnline = false;
function showPreChatWindow() {
    var tempDate = null;
    tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
    if (!isEimseverExist() || !tempDate) {
        alert(wordDefine.connFalse);
        return;
    }
    tempDate.showPreChatWindow();
    refreshChatWindowTitle(true);
    return false;
};
function showNextChatWindow() {
    var tempDate = null;
    tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
    if (!isEimseverExist() || !tempDate) {
        alert(wordDefine.connFalse);
        return;
    }
    tempDate.showNextChatWindow();
    refreshChatWindowTitle(true);
    return false;
};
function activateChatWindow() {
    var tempDate = null;
    tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
    if (!isEimseverExist() || !tempDate) {
        alert(wordDefine.connFalse);
        return;
    }
    var imChatId = tempDate.getCurrIMChatId();
    debug("activateChatWindow:" + imChatId);
    if (!imChatId) {
        $("IMchatInputId").disabled = true;
        return;
    }
    if (tempDate.activateChatWindow()) {
        refreshChatWindowTitle(true);
    }
    return false;
};
function refreshChatWindowTitle(hasFlash) {
    debug("refreshChatWindowTitle");
    var tempDate = null;
    tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
    if (!isEimseverExist() || !tempDate)
    return;
    if (imObject.chatWindowTitleTimeoutHandle) {
        clearTimeout(imObject.chatWindowTitleTimeoutHandle);
    }
    var shouldFlash = false;
    var chats = tempDate.getChats();
    var chatStatus,
    imChatId,
    chatPaneElement,
    chatHeadElement,
    link,
    closeBut;
    var chatHeadLists = $("im_chat_name_lists");
    while (chatHeadLists.childNodes.length > 0)
    chatHeadLists.removeChild(chatHeadLists.childNodes[0]);
    var chatNumber = tempDate._chatNumber;
    var chatStart = tempDate._chatStart;
    var currChatId = tempDate.getCurrIMChatId();
    var showName;
    for (var i = chatStart; chats && i < chats.length && i < chatStart + chatNumber; i = i + 1) {
        var one = chats[i];
        chatStatus = one.getStatus();
        imChatId = one.getImChatId();
        chatHeadElement = document.createElement("li");
        link = document.createElement("a");
        closeBut = document.createElement("a");
        if (currChatId && currChatId == imChatId) {
            chatHeadElement.className = "tab_clk im_tab";
        } else {
            if (chatStatus > 0 && hasFlash) {
                chatHeadElement.className = "tab_light im_tab";
                shouldFlash = true;
            } else {
                chatHeadElement.className = "im_tab";
            }
        }
        link.setAttribute("href", "javascript:void(0);");
        link.className = "clk";
        link.onclick = window_showIMPaneFromClick;
        link.id = imChatId;
        closeBut.setAttribute("href", "javascript:void(0);");
        closeBut.title = Resource.common.close;
        closeBut.className = "btn_cls im_cls";
        closeBut.id = "closeBut_" + one.getImChatId();
        closeBut.onclick = closeChatWindow;
        var type = one.getType();
        var chatUserId = one._getId();
        var chatUserName = "";
        if (chatUserId && type < 10) {
            chatUserName = top.frames[3].getOrg().getUserNameById(chatUserId).shortName();
        }
        if (isImOrOnline) {
            if (isNaN(chatUserId)) {
                try {
                    chatUserName = top.frames[3].getOrg().getCallerUser(chatUserId).name;
                } catch(ex) {
                    chatUserName = "";
                }
                if (chatUserName == "") {
                    chatUserName = Resource.online.visitor;
                }
            }
        }
        if (chatUserName) {
            showName = window_setShowName(chatUserName);
        } else {
            showName = window_setShowName(one.getName());
        }
        if (type == 1) {
            link.innerHTML = "<b class='ico_le sone_pers_ico'></b>" + showName + "&nbsp;&nbsp;";
        } else if (type == 2) {
            link.innerHTML = "<b class='ico_le smuch_pers_ico'></b>" + showName + "&nbsp;&nbsp;";
        } else if (type > 10 && type < 20) {
            link.innerHTML = "<b class='ico_le smuch_pers_ico'></b>" + showName + "&nbsp;&nbsp;";
        } else {
            link.innerHTML = "<b class='ico_le smuch_pers_ico'></b>" + showName + "&nbsp;&nbsp;";
        }
        chatHeadElement.appendChild(link);
        chatHeadElement.appendChild(closeBut);
        chatHeadLists.appendChild(chatHeadElement);
    }
    if (window_showChatWindowOp(hasFlash))
    shouldFlash = true;
    if (hasFlash && shouldFlash) {
        imObject.chatWindowTitleTimeoutHandle = setTimeout("refreshChatWindowTitle(false)", 500);
    }
    if (!hasFlash)
    imObject.chatWindowTitleTimeoutHandle = setTimeout("refreshChatWindowTitle(true)", 500);
};
function window_switchChatWindow(imChatId, mustFresh) {
    var needFresh = false;
    var tempDate = null;
    tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
    if (!mustFresh) {
        needFresh = tempDate.setCurrIMChatId(imChatId);
        if (!needFresh) {
            var chatHeadLists = $("im_chat_name_lists");
            if (chatHeadLists.childNodes.length < 1) {
                needFresh = true;
            }
        }
    }
    if (mustFresh || needFresh) {
        tempDate.setOneChatStatus(imChatId);
        refreshChatWindowTitle(true);
        showAnotherChatWindowContents(imChatId);
    }
};
function window_showIMPaneFromClick() {
    window_showIMPane(this.id, false);
};
function window_showIMPane(imChatId, mustFresh) {
    var tempDate = null;
    tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
    if (!isEimseverExist() || !tempDate) {
        alert(wordDefine.connFalse);
        return;
    }
    cancelSendfile();
    window_switchChatWindow(imChatId, mustFresh);
};
function window_setShowName(name) {
    if (("" + name).length < 5) return name;
    return name.substring(0, 4) + "..";
};
function window_showChatWindowOp(hasFlash) {
    var im_chat_title_op = $("im_chat_title_op");
    while (im_chat_title_op.childNodes.length > 0)
    im_chat_title_op.removeChild(im_chat_title_op.childNodes[0]);
    var link;
    var shouldFlash = false;
    var tempDate = null;
    tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
    var op_status_pre = tempDate.havePreChatWindow();
    var op_status_next = tempDate.haveNextChatWindow();
    if (op_status_pre || op_status_next) {
        if (op_status_pre > 0) {
            link = document.createElement("a");
            link.setAttribute("href", "javascript:void(0)");
            link.setAttribute("title", imObject.im_window_show_left);
            link.onclick = showPreChatWindow;
            if (op_status_pre == 2 && hasFlash) {
                link.innerHTML = "<img src='" + globalCp + "/images/im/arrow_prev_fla.gif' border=0/>";
                shouldFlash = true;
            } else {
                link.innerHTML = "<img src='" + globalCp + "/images/im/arrow_prev_nor.gif' border=0/>";
            }
        } else {
            link = document.createElement("span");
            link.innerHTML = " ";
        }
        im_chat_title_op.appendChild(link);
        if (op_status_next > 0) {
            link = document.createElement("a");
            link.setAttribute("href", "javascript:void(0)");
            link.setAttribute("title", imObject.im_window_show_right);
            link.onclick = showNextChatWindow;
            if (op_status_next == 2 && hasFlash) {
                link.innerHTML = "<img src='" + globalCp + "/images/im/arrow_next_fla.gif' border=0/>";
                shouldFlash = true;
            } else {
                link.innerHTML = "<img src='" + globalCp + "/images/im/arrow_next_nor.gif' border=0/>";
            }
        } else {
            link = document.createElement("span");
            link.innerHTML = " ";
        }
        im_chat_title_op.appendChild(link);
    }
    return shouldFlash;
};
function checkTextLengthEicmsMsgType() {
    return checkTextLength("ImEicmsMsgInputId", 5120);
}
function checkTextLength(id, len) {
    if (!isEimseverExist() || !top.frames[3].eicmsGconf) {
        return;
    }
    if (!len)
    len = top.frames[3].eicmsGconf.getChatMaxSize();
    var content = $(id).value;
    if (("" + content).length > len) {
        alert(wordDefine.noMoreWord1);
        $(id).value = ("" + content).substring(0, len);
        return false;
    }
    return true;
};
function im_chat_eicmsMsg_windowsChanged(enableChat) {
    var im_eicmsMsg_input = $("im_eicmsMsg_input");
    var im_chat_input = $("im_chat_input");
    im_chat_input.style.display = enableChat ? 'block': 'none';
    im_eicmsMsg_input.style.display = enableChat ? 'none': 'block';
    if (enableChat)
    $("IMchatInputId").value = "";
}
function showMyContactsAsType(myTree, type, guid) {
    if (type == 0) {
        clearInterval(imObject.showMyOrgHandle);
        imObject.showMyOrgHandle = "";
    }
    if (!isEimseverExist()) {
        return;
    }
    myTree.deleteChildItems(0);
    var org = top.frames[3].getOrg();
    myTree.showRoot = false;
    if (guid == imObject.defaultTreeId) {
        myTree.rootId = org._selfRootId;
    } else {
        myTree.showRoot = true;
        myTree.rootId = guid;
    }
    myTree.appendData(org._selfDataSource);
    return;
};
function displayMyGroupInof(isShow) {
    $("myostructureNoInfo").style.display = isShow ? "block": "none";
};
function showMyOrg() {
    showMyOrganizationByType(myOrg, 0, imObject.defaultTreeId);
    $('myostructure').innerHTML = myOrg.render();
    myOrg.expandLevel(1);
};
function showMyContacts() {
    showMyContactsAsType(myOrg, 0, imObject.defaultTreeId);
    $('myostructure').innerHTML = myOrg.render(1);
    myOrg.expandLevel(1);
};
function showOnlineUsers(forMultiPop) {
    var tempTree = forMultiPop ? onlineUserPopTree: myOrg;
    var tempTreeDiv = forMultiPop ? $('multiPopTree') : $('myostructure');
    if (tempTree && tempTreeDiv) {
        showOnlineUserToTree(tempTree, 0, imObject.defaultTreeId);
        tempTreeDiv.innerHTML = tempTree.render();
        tempTree.expandLevel(1);
    } else {}
};
function showOnlineUserToTree(myTree, type, myRootId) {
    if (!isEimseverExist() || !top.frames[3].getOrg || !top.frames[3].getOrg()) {
        return;
    }
    var im_search_user = $("im_search_user");
    if (im_search_user)
    im_search_user.disabled = "";
    if (type == 0) {
        try {
            imObject.pluralityId = 0;
            debug("test clearInterval(" + imObject.showMyOrgHandle + ");");
            clearInterval(imObject.showMyOrgHandle);
            imObject.showMyOrgHandle = "";
        } catch(e) {
            debug("showOnlineUserToTree exception.");
            debug("showOnlineUserToTree error:" + e.error);
        }
    }
    myTree.deleteChildItems(0);
    var org = top.frames[3].getOrg();
    var dataSource = org._onLineUserdataSource;
    myTree.showRoot = true;
    myTree.rootId = org._onLineRootId;
    myTree.appendData(dataSource);
    return;
}
function getAllProperties(obj, name) {
    var str = [];
    var i;
    var j = 0;
    var hasValue;
    str.push("<table border='1'>");
    for (i in obj) {
        if (j % 3 == 0) {
            str.push("<tr>");
        }
        str.push("<td width=130><font color=red>");
        str.push(i + "</font> : " + obj[i].mySort);
        str.push("</td>");
        if (j % 3 == 2) {
            str.push("</tr>")
        }
        j = j + 1;
        if (i == name) {
            hasValue = obj[i];
        }
    }
    str.push("</table> all properties : " + j);
    if (name) {
        str.push("<br>this name : " + name);
        str.push(" value : " + hasValue);
    }
    return str.join("");
}
function showMyOrganizationByType(myTree, type, myRootId) {
    if (!isEimseverExist() || !top.frames[3].getOrg || !top.frames[3].getOrg()) {
        return;
    }
    if (type == 0) {
        imObject.pluralityId = 0;
        clearInterval(imObject.showMyOrgHandle);
        imObject.showMyOrgHandle = "";
    }
    myTree.deleteChildItems(0);
    var org = top.frames[3].getOrg();
    switch (type) {
    default:
    case 0:
        myTree.showRoot = true;
        myTree.rootId = org._deptRootId;
        myTree.appendData(org._deptDataSource);
        break;
    case 1:
        myTree.showRoot = true;
        myTree.rootId = org._deptRootId;
        myTree.appendData(org._userDataSource);
        break;
    case 2:
        myTree.showRoot = false;
        if (myRootId == imObject.defaultTreeId) {
            myTree.rootId = org._deptRootId;
        } else {
            myTree.showRoot = true;
            myTree.rootId = myRootId;
        }
        myTree.appendData(org._deptDataSource);
        break;
    case 3:
        myTree.showRoot = false;
        if (myRootId == imObject.defaultTreeId) {
            myTree.rootId = org._titlesRootId;
        } else {
            myTree.showRoot = true;
            myTree.rootId = myRootId;
        }
        myTree.appendData(org._titlesDataSource);
        break;
    case 4:
        myTree.showRoot = false;
        if (myRootId == imObject.defaultTreeId) {
            myTree.rootId = org._deptDutyRootId;
        } else {
            myTree.showRoot = true;
            myTree.rootId = myRootId;
        }
        myTree.appendData(org._deptDutyDataSource);
        break;
    }
    return;
};
function im_group_or_organization(type) {
    if (imObject.showMyOrgHandle != '') {
        return;
    }
    if (imObject.groupStatus == type && !imObject.hasSearch)
    return;
    cancelSearchUser(true);
    imObject.groupStatus = type;
    var im_group_tab = $("im_group_tab");
    var im_os_tab = $("im_os_tab");
    var im_online_users = $("im_online_users");
    if (type == 1) {
        im_group_tab.className = "ltab_clk";
        im_os_tab.className = "ltab";
        im_online_users.className = "ltab";
        imObject.showMyOrgHandle = setInterval("showMyContacts()", 10);
    } else if (type == 2) {
        im_group_tab.className = "ltab";
        im_os_tab.className = "ltab_clk";
        im_online_users.className = "ltab";
        imObject.showMyOrgHandle = setInterval("showMyOrg()", 10);
    } else if (type == 3) {
        im_group_tab.className = "ltab";
        im_os_tab.className = "ltab";
        im_online_users.className = "ltab_clk";
        imObject.showMyOrgHandle = setInterval("showOnlineUsers()", 10);
    }
}
function refreshLeftOrgTree() {
    if (!$("im_search_user") || $("im_search_user").value != Resource.im.searchtext) return;
    if (imObject.showMyOrgHandle && imObject.showMyOrgHandle != "") {
        clearInterval(imObject.showMyOrgHandle);
    }
    imObject.showMyOrgHandle = "";
    if (imObject.groupStatus == 1) {
        imObject.showMyOrgHandle = setInterval("showMyContacts()", 10);
    } else if (imObject.groupStatus == 2) {
        imObject.showMyOrgHandle = setInterval("showMyOrg()", 10);
    } else {
        imObject.showMyOrgHandle = setInterval("showOnlineUsers()", 10);
    }
}
function im_organization_choose_staff(inMyOrg) {
    imObject.chooseStaffInMyOrg = inMyOrg;
    show_choose_staff_pane();
    show_imChooseStaffId_pane();
};
function show_choose_staff_pane() {
    var im_organization_choose = $('im_organization_choose');
    var im_organization_choose_my = $('im_organization_choose_my');
    if (imObject.chooseStaffInMyOrg) {
        im_organization_choose.className = "ltab_clk";
        im_organization_choose_my.className = "ltab";
    } else {
        im_organization_choose.className = "ltab";
        im_organization_choose_my.className = "ltab_clk";
    }
}
function show_imChooseStaffId_pane() {
    var p = $('imChooseStaffId');
    while (p.childNodes.length > 0)
    p.removeChild(p.childNodes[0]);
    if (imObject.chooseStaffInMyOrg) {
        $("imChooseStaffId").style.display = "block";
        createImOneRadio(1, imObject.im_organization_choose_staff_name, 1 == imObject.chooseStaff);
        createImOneRadio(2, imObject.im_organization_choose_staff_dept, 2 == imObject.chooseStaff);
        createImOneRadio(3, imObject.im_organization_choose_staff_duty, 3 == imObject.chooseStaff);
        createImOneRadio(4, imObject.im_organization_choose_staff_deptDuty, 4 == imObject.chooseStaff);
        $("imChooseStaffTreeId").className = "tree_box_msg";
        show_choose_staff_pane_filter(imObject.chooseStaff);
    } else {
        $("imChooseStaffId").style.display = "none";
        $("imChooseStaffTreeId").className = "tree_box_msg_long";
        show_choose_staff_pane_filter(5);
    }
};
function show_choose_staff_pane_filter(type) {
    var beginDate = new Date();
    var p = $('imChooseStaffFilterId');
    while (p.childNodes.length > 0)
    p.removeChild(p.childNodes[0]);
    imObject.chooseTree.deleteChildItems(0);
    if (imObject.chooseStaffInMyOrg) {
        if (type == 1) {
            $('imChooseStaffTreeId').innerHTML = "";
            createImOneText(p);
            showMyOrganizationByType(imObject.chooseTree, 1, imObject.defaultTreeId);
            $('imChooseStaffTreeId').innerHTML = imObject.chooseTree.render();
            imObject.chooseTree.expandLevel(1);
        } else if (type == 2) {
            $('imChooseStaffTreeId').innerHTML = "";
            showMyOrganizationByType(imObject.chooseTree, 2, imObject.defaultTreeId);
            $('imChooseStaffTreeId').innerHTML = imObject.chooseTree.render();
            imObject.chooseTree.expandLevel(1);
            createDeptNameList(p);
        } else if (type == 3) {
            $('imChooseStaffTreeId').innerHTML = "";
            showMyOrganizationByType(imObject.chooseTree, 3, imObject.defaultTreeId);
            $('imChooseStaffTreeId').innerHTML = imObject.chooseTree.render();
            imObject.chooseTree.expandLevel(1);
            createDeptNameList(p);
        } else if (type == 4) {
            $('imChooseStaffTreeId').innerHTML = "";
            showMyOrganizationByType(imObject.chooseTree, 4, imObject.defaultTreeId);
            $('imChooseStaffTreeId').innerHTML = imObject.chooseTree.render();
            imObject.chooseTree.expandLevel(1);
            createDeptNameList(p);
        }
    } else {
        $('imChooseStaffTreeId').innerHTML = "";
        showMyContactsAsType(imObject.chooseTree, 1, imObject.defaultTreeId);
        $('imChooseStaffTreeId').innerHTML = imObject.chooseTree.render();
        imObject.chooseTree.expandLevel(1);
        createDeptNameList(p);
    }
    var endDate = new Date();
}
function createDeptNameListOnChange(value) {
    imObject.chooseTree.deleteChildItems(0);
    if (imObject.chooseStaffInMyOrg) {
        if (imObject.chooseStaff == 2) {
            $('imChooseStaffTreeId').innerHTML = "";
            showMyOrganizationByType(imObject.chooseTree, 2, value);
            $('imChooseStaffTreeId').innerHTML = imObject.chooseTree.render();
            imObject.chooseTree.expandLevel(1);
        } else if (imObject.chooseStaff == 3) {
            $('imChooseStaffTreeId').innerHTML = "";
            showMyOrganizationByType(imObject.chooseTree, 3, value);
            $('imChooseStaffTreeId').innerHTML = imObject.chooseTree.render();
            imObject.chooseTree.expandLevel(1);
        } else if (imObject.chooseStaff == 4) {
            $('imChooseStaffTreeId').innerHTML = "";
            showMyOrganizationByType(imObject.chooseTree, 4, value);
            $('imChooseStaffTreeId').innerHTML = imObject.chooseTree.render();
            imObject.chooseTree.expandLevel(1);
        }
    } else {
        $('imChooseStaffTreeId').innerHTML = "";
        showMyContactsAsType(imObject.chooseTree, 2, value);
        $('imChooseStaffTreeId').innerHTML = imObject.chooseTree.render();
        imObject.chooseTree.expandLevel(1);
    }
    if (value != imObject.defaultTreeId) {
        imObject.chooseTree.openAllItems(0);
    }
}
function getUserObjectInTree(userId, userName, fullTime, userStatus) {
    var picture;
    if (fullTime) {
        if (userStatus == 1) {
            picture = imObject.pic_os_online;
            userName = userName;
        } else if (userStatus == 2) {
            picture = imObject.pic_os_busy;
            userName = userName;
        } else if (userStatus == 3) {
            picture = imObject.pic_os_away;
            userName = userName;
        } else {
            picture = imObject.pic_os_offline;
            userName = userName;
        }
    } else {
        if (userId) {
            userId = userId + "_" + imObject.pluralityId;
            imObject.pluralityId = imObject.pluralityId + 1;
        }
        if (userStatus == 1) {
            picture = imObject.pic_os_plurality_online;
            userName = userName;
        } else if (userStatus == 2) {
            picture = imObject.pic_os_plurality_busy;
            userName = userName;
        } else if (userStatus == 3) {
            picture = imObject.pic_os_plurality_away;
            userName = userName;
        } else {
            picture = imObject.pic_os_plurality_offline;
            userName = userName;
        }
    }
    var useObject = new UserObjectInTree(userId, userName, picture);
    return useObject;
}
function UserObjectInTree(userId, userName, picture) {
    this.userId = userId;
    this.userName = userName;
    this.picture = picture;
}
function updateOnlineUser(userId, userStatus) {
    try {
        if (imObject.groupStatus == 3 && userId) {
            if (userStatus != 0) {
                var hasUserid = false;
                if (myOrg.getNodeById(userId)) {
                    hasUserid = true;
                }
                if (!hasUserid) {
                    var userName = top.frames[3].getOrg().getUserNameById(userId).shortName();
                    switch (userStatus) {
                    case 10:
                        myOrg.appendNode("companyIdInTree!" + userId, "text:" + userName + ";icon:panel_user_online");
                        break;
                    case 30:
                    case 31:
                        myOrg.appendNode("companyIdInTree!" + userId, "text:" + userName + ";icon:panel_user_busy");
                        break;
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                        myOrg.appendNode("companyIdInTree!" + userId, "text:" + userName + ";icon:panel_user_away");
                        break;
                    default:
                        myOrg.appendNode("companyIdInTree!" + userId, "text:" + userName + ";icon:panel_user_busy");
                    }
                }
            } else {
                myOrg.deleteItem(userId, true);
            }
        }
        try {
            if (userStatus != 0) {
                if (!onlineUserPopTree.getNodeById(userId)) {
                    var userName = top.frames[3].getOrg().getUserNameById(userId).shortName();
                    switch (userStatus) {
                    case 10:
                        onlineUserPopTree.appendNode("companyIdInTree!" + userId, "text:" + userName + ";icon:panel_user_online");
                        break;
                    case 30:
                    case 31:
                        onlineUserPopTree.appendNode("companyIdInTree!" + userId, "text:" + userName + ";icon:panel_user_busy");
                        break;
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                        onlineUserPopTree.appendNode("companyIdInTree!" + userId, "text:" + userName + ";icon:panel_user_away");
                        break;
                    default:
                        onlineUserPopTree.appendNode("companyIdInTree!" + userId, "text:" + userName + ";icon:panel_user_busy");
                    }
                }
            } else {
                onlineUserPopTree.deleteItem(userId, true);
            }
        } catch(ex1) {}
    } catch(ex) {
        debug(ex, 3, "updateOnlineUser : ");
    }
}
function changeOnlineUserPicture(one, fulltime) {
    try {
        if (isImOrOnline) {
            return;
        }
        var result = compareItemWithPlurality(one.id, one.id);
        if (result > 0) {
            if (result == 1) {
                fulltime = 1;
            } else {
                fulltime = 0;
            }
        }
        var org = top.frames[3].getOrg();
        one.icon = org.getDutyStatusIcon(fulltime, one.status);
        if (!updateOnlineUser(one.id, one.status)) {
            return false;
        }
        var change = changeUserPicture_do(one.id, one.status, myOrg);
        if (change) {
            checkHandler();
        }
    } catch(ex) {
        debug(ex, "changeOnlineUserPicture");
    }
};
function changeUserPicture_do(userId, userStatus, theTree) {
    try {
        var str_children = theTree.getAllSubItems(0);
        var children = str_children.split(",");
        var one,
        result,
        uo,
        userName;
        var change = false;
        for (var i = 0; i < children.length; i = i + 1) {
            one = children[i];
            result = compareItemWithPlurality(one, userId);
            if (result > 0) {
                userName = theTree.getItemText(one);
                userName = userName.split("[")[0];
                if (result == 1) {
                    uo = getUserObjectInTree("", userName, true, userStatus);
                } else {
                    uo = getUserObjectInTree("", userName, false, userStatus);
                }
                theTree.setItemImage2(one, uo.picture, uo.picture, uo.picture);
                theTree.setItemText(one, uo.userName);
                change = true;
            }
        }
        return change;
    } catch(ex) {
        debug('changeUserPicture_do error' + ex.name + "    " + ex.message + "   " + ex);
    }
}
function compareItemWithPlurality(one, userId) {
    if (!one)
    return 0;
    if (one == userId) {
        return 1;
    }
    var id = one.split("_");
    if (id && id.length == 2 && id[0] == userId) {
        if (imObject.groupStatus == 1) {
            return 1;
        }
        var im_organization_choose_my = $("im_organization_choose_my");
        if (im_organization_choose_my && im_organization_choose_my.className == "tab-active") {
            return 1;
        }
        return 2;
    }
    return 0;
}
function hasFulltime(one) {
    var titles = one.titles;
    if (!titles)
    return true;
    var detail;
    for (var i = 0; i < titles.length; i = i + 1) {
        detail = titles[i];
        if (detail.fulltime == 1 || detail.fulltime == "undefined")
        return true;
    }
    return false;
}
function showOffline() {
    if (!isEimseverExist() || !top.frames[3].offline)
    return;
    clearInterval(imObject.showOfflineHandle);
    imObject.showOfflineHandle = "";
    var statistic = top.frames[3].offline.getStatistic();
    var one;
    var content = "";
    var imOfflineMsg = $("imOfflineMsg");
    if (imOfflineMsg) {
        imOfflineMsg.innerHTML = content;
    }
    for (var i = 0; i < statistic.length; i = i + 1) {
        one = statistic[i];
        content += "&nbsp;<img src='" + globalCp + "/images/left/ball_gray.gif'>&nbsp;<a href='javascript:void(0)' onclick='openOffline(\""
        + one.uid + "\"," + one.type + "," + one.mid + ")'>" + top.frames[3].getOrg().getUserNameById(one.uid).longName() + "(" + getLongStr(one.stamp) + ")&nbsp;";
        if (one.type == 1) {
            content += one.count + wordDefine.piece + "</a><br>";
        } else if (one.type == 11) {
            content += wordDefine.msg + "</a><br>";
        } else if (one.type == 12 || one.type == 13) {
            content += wordDefine.needConfirm + "</a><br>";
        } else if (one.type == 16) {
            content += Resource.common.transfer + "</a><br>";
        }
    }
    var receiveFile = top.frames[3].fileTransportation._list;
    for (var k = 0; k < receiveFile.length; k = k + 1) {
        one = receiveFile[k];
        if (one.status == 0)
        content += "&nbsp;<img src='" + globalCp + "/images/left/ball_gray.gif'>&nbsp;<a href='javascript:void(0)' onclick='openReceiveFile(" + one.sid + ");' >&nbsp;"
        + top.frames[3].getOrg().getUserNameById(one.senderId).longName() + "(" + getLongStr(one.stamp) + ")" + wordDefine.sendfile + "&nbsp;" + one.filename + " (" + showFileLen(one.len) + ")</a><br>";
    }
    var smsInfo = top.frames[3].imData.smsInfo;
    var showNum = 0;
    if (smsInfo) {
        for (var i in smsInfo) {
            if (!smsInfo[i].smsStatus) {
                showNum += 1;
            }
        }
    }
    if (showNum > 0) {
        content += "&nbsp;<img src='" + globalCp + "/images/left/ball_gray.gif'>&nbsp;<a href='javascript:void(0)' onclick='openFailSMS();' >" + wordDefine.smsfailed + "(" + showNum + ")</a><br>";
    }
    var smsZFInfo = top.frames[3].imData.smsZFInfo;
    if (smsZFInfo) {
        for (var i in smsZFInfo) {
            var one = smsZFInfo[i];
            var showName = one._no;
            if (one._uid != 0) {
                showName = top.frames[3].getOrg().getUserNameById(one._uid).longName();
            }
            if (!one._smsZFStatus) {
                content += "&nbsp;<img src='" + globalCp + "/images/left/ball_gray.gif'>&nbsp;<a href='javascript:void(0)' onclick='openSMSZF(\"" + i + "\");' >" + wordDefine.smscenter + ":" + showName + "</a><br>";
            }
        }
    }
    if (!content)
    content = wordDefine.noreadMsg;
    if (imOfflineMsg) {
        imOfflineMsg.innerHTML = content;
    }
}
function getOnfflineDateStr(d) {
    var mm = d.getMonth() + 1;
    if (mm < 10)
    mm = "0" + mm;
    var dd = d.getDate();
    if (dd < 10)
    dd = "0" + dd;
    var hh = d.getHours();
    if (hh < 10)
    hh = "0" + hh;
    var min = d.getMinutes();
    if (min < 10)
    min = "0" + min;
    return mm + "-" + dd + " " + hh + ":" + min;
};
function getShortDateStr(d) {
    var hh = d.getHours();
    if (hh < 10)
    hh = "0" + hh;
    var min = d.getMinutes();
    if (min < 10)
    min = "0" + min;
    var sec = d.getSeconds();
    if (sec < 10)
    sec = "0" + sec;
    return hh + ":" + min + ":" + sec;
};
function getLongStr(d) {
    var sec = d.getSeconds();
    if (sec < 10)
    sec = "0" + sec;
    var yy = d.getYear();
    if (yy < 1000)
    yy = yy + 1900;
    return yy + "-" + getOnfflineDateStr(d) + ":" + sec;
};
function showFileLen(len) {
    if (len < 1024)
    return len + "B";
    var f;
    if (len >= 1048576 && len < 10485760) {
        f = len / 10486;
        f = Math.round(f);
        return (f / 100) + "MB";
    } else if (len >= 10485760) {
        f = len / 104857;
        f = Math.round(f);
        return (f / 10) + "MB";
    } else if (len >= 1024 && len < 10240) {
        f = len / 10.24;
        f = Math.round(f);
        return (f / 100) + "KB";
    } else {
        f = len / 102.4;
        f = Math.round(f);
        return (f / 10) + "KB";
    }
};
function openOffline(uid, type, mid) {
    if (!isOnline())
    return;
    var imChatId = top.frames[3].offline.openOffline(uid, type, mid);
    showOffline();
    showAnotherChatWindowContents(imChatId);
    if (imChatId) window_switchChatWindow(imChatId, false);
};
function openReceiveFile(sid) {
    top.frames[3].sendEicmsFile4Download(sid);
}
function denyReceiveFile(sid) {
    top.frames[3].fileTransportation.removeUserReceiveFileBySid(sid);
    showOffline();
    var oneChat = showAnotherChatWindowContents();
}
function startSearchUser() {
    var im_search_user = $("im_search_user");
    if (im_search_user.value != Resource.im.searchtext) {
        return;
    }
    im_search_user.value = "";
    im_search_user.style.filter = "alpha(opacity:100)";
    im_search_user.style.opacity = 1;
}
function stopSearchUser() {
    var im_search_user = $("im_search_user");
    if (im_search_user.value.length > 0) {
        return;
    }
    cancelSearchUser();
}
function searchUser(obj) {
    try {
        var im_search_user = $("im_search_user");
        im_search_user.style.filter = "alpha(opacity:100)";
        im_search_user.style.opacity = 1;
        if (obj.value.length <= 0) {
            return;
        }
        imObject.hasSearch = true;
        $("im_search_cancel").style.display = "block";
        _searchUser(obj.value);
    } catch(ex) {
        debug("searchUser   " + ex.name + "   " + ex.message + "    " + ex);
    }
}
function cancelSearchUser(cancel) {
    try {
        $("im_search_cancel").style.display = "none";
        var im_search_user = $("im_search_user");
        im_search_user.value = Resource.im.searchtext;
        im_search_user.style.filter = "alpha(opacity:30)";
        im_search_user.style.opacity = 30 / 100;
        $("gotoStructrueIMG").className = 'ico_ri lock_nor_ico';
        imObject.hasSearch = false;
        if (myOrg.getItemText(imObject.defaultTreeId) != Resource.im.searchresult) {
            return;
        }
        if (!cancel) {
            var im_group_tab = $("im_group_tab");
            var im_os_tab = $("im_os_tab");
            var im_online_users = $("im_online_users");
            if (imObject.showMyOrgHandle && imObject.showMyOrgHandle != "") {
                clearInterval(imObject.showMyOrgHandle);
            }
            imObject.showMyOrgHandle = "";
            var type = imObject.groupStatus;
            if (type == 1) {
                im_group_tab.className = "ltab_clk";
                im_os_tab.className = "ltab";
                im_online_users.className = "ltab";
                imObject.showMyOrgHandle = setInterval("showMyContacts()", 10);
            } else if (type == 2) {
                im_group_tab.className = "ltab";
                im_os_tab.className = "ltab_clk";
                im_online_users.className = "ltab";
                imObject.showMyOrgHandle = setInterval("showMyOrg()", 10);
            } else if (type == 3) {
                im_group_tab.className = "ltab";
                im_os_tab.className = "ltab";
                im_online_users.className = "ltab_clk";
                imObject.showMyOrgHandle = setInterval("showOnlineUsers()", 10);
            }
        }
    } catch(ex) {
        debug("cancelSearchUser   " + ex.name + "   " + ex.message + "    " + ex);
    }
}
function _searchUser(value) {
    try {
        myOrg.deleteChildItems(0);
        var tempData = {};
        tempData[0 + "!" + imObject.defaultTreeId] = "text:" + Resource.im.searchresult + ";icon:root";
        var myostructure = $("myostructure");
        var org = top.frames[3].getOrg();
        var userList;
        if (org) {
            userList = org._users;
        }
        var tIcon;
        var topUser;
        var onLineLIst = org._onlineUser;
        for (var i in onLineLIst) {
            var one = onLineLIst[i];
            one = org.getUserById(one);
            if (value == "" || one.name.indexOf(value) != -1 || one.account.indexOf(value) != -1 || one.mobile.indexOf(value) != -1) {
                tIcon = org.getDutyStatusIcon(1, one.status);
                tempData[imObject.defaultTreeId + "!" + one.id] = "text:" + one.name + ";icon:" + tIcon + ";mysort:" + one.mySort;
            }
        }
        for (var i in userList) {
            var one = userList[i];
            if (value == "" || one.name.indexOf(value) != -1 || one.account.indexOf(value) != -1 || one.mobile.indexOf(value) != -1) {
                if (onLineLIst[one.id]) {
                    continue;
                }
                topUser = org.getUserById(one.id);
                tempData[imObject.defaultTreeId + "!" + one.id] = "text:" + one.name + ";icon:panel_user_offline;mysort:" + topUser.mySort;
            }
        }
        myOrg.showRoot = true;
        myOrg.appendData(tempData);
        myostructure.innerHTML = myOrg.render();
        myOrg.expandLevel(1);
        setTimeout(function() {
            if (myOrg.secondNode) {
                $("gotoStructrueIMG").className = 'ico_ri lock_clk_ico';
            } else {
                $("gotoStructrueIMG").className = 'ico_ri lock_nor_ico';
            }
            changeOnlineUser(org);
        },
        10);
    } catch(ex) {
        debug("_searchUser   " + ex.name + "   " + ex.message + "    " + ex);
    }
}
function changeOnlineUser(org) {
    try {
        var onlineUser;
        if (org) {
            onlineUser = org.onlineUser;
        }
        for (var i in onlineUser) {
            var one = onlineUser[i];
            changeUserPicture_do(one.uid, one.status, myOrg);
        }
    } catch(ex) {
        debug(ex, 3, "changeOnlineUser");
    }
}
function gotoStructure() {
    if (!myOrg.secondNode) {
        return;
    }
    if (!imObject.hasSearch) {
        return;
    }
    var userId = myOrg.getSelectedItemId();
    if (userId == imObject.defaultTreeId) {
        if (myOrg.secondNode) {
            userId = myOrg.secondNode;
        }
    }
    myOrg.buildSetNum = userId;
    im_group_or_organization(2);
    setTimeout(function() {
        try {
            myOrg.loadAllNode();
            setTimeout(function() {
                myOrg.focus(userId);
                myOrg.expandNode(userId, "myostructure", userId);
            },
            100);
        } catch(ex) {
            debug("gotoStructure setTimeout error  " + ex.name + "   " + ex.message + "    " + ex);
        }
    },
    10);
}
function getValidUsers(ids) {
    var users = new Array();
    var temp = "0," + ids;
    var t = temp.split(",");
    var num,
    j;
    var userStatus
    for (var i = 1; i < t.length; i = i + 1) {
        num = parseInt(t[i]);
        if (!num) continue;
        if (num == eimserver_meId) continue;
        userStatus = top.frames[3].getOrg().oneUserIsOnline(num);
        if (userStatus) {
            users[users.length] = num;
        }
    }
    return users;
}
function checkHandler(type) {
    try {
        var im_new_chat = $("im_new_chat");
        var im_invite_btn = $("im_invite_btn");
        var newChatStatus = true;
        var inviteStatus = true;
        var inviteUsers,
        oneChat,
        disableStatus;
        var userStatus = 0;
        var id = onlineUserPopTree.getAllChecked();
        debug("id: " + id);
        if (!id) return;
        var users = getValidUsers(id);
        if (!users) return;
        if (!type) {
            if (users.length > 0) {
                newChatStatus = false;
            } else {
                newChatStatus = true;
            }
        }
        oneChat = top.frames[3].imData.getCurrOneChat();
        if (oneChat) {
            if (oneChat.getType() > 10) {
                inviteStatus = true;
                return;
            }
            if (oneChat.getType() == 1) {
                if (users.length == 0) {
                    inviteStatus = true;
                    return;
                }
            }
            inviteUsers = getValidInviteUsers(users);
            if (inviteUsers.length > 0 && !oneChat._hasDeleted) {
                inviteStatus = false;
            } else {
                inviteStatus = true;
            }
        }
    } catch(ex) {
        debug("checkHandler   " + ex.name + "   " + ex.message + "    " + ex);
    } finally {
        im_new_chat.disabled = newChatStatus;
        im_invite_btn.disabled = inviteStatus;
    }
};
function checkHandler4Tree() {
    checkHandler();
};
function getValidInviteUsers(userList) {
    try {
        var newUserList = new Array();
        var one = top.frames[3].imData.getCurrOneChat();
        if (one) {
            var u;
            for (var i = 0; i < userList.length; i = i + 1) {
                u = userList[i];
                if (!one.isValidUser(u)) {
                    newUserList[newUserList.length] = u;
                }
            }
        }
        return newUserList;
    } catch(ex) {
        debug("getValidInviteUsers :" + ex.name + "\n" + ex.message + "   " + ex);
    }
}
function getCurrChatUserStatus() {
    var one = top.frames[3].imData.getCurrOneChat();
    if (one && one.getType() == 1) {
        if (top.frames[3].getOrg().getUserOnlineStatus(one._getId()) > 0)
        return true;
    } else if (one && one.getType() == 2) {
        return true;
    }
    return false;
}
function webImTreeondblclick() {
    var id = myOrg.getEventItemId();
    var id2 = parseInt(id)
    if (!id2) {
        var id_ok = false;
        var plur = id.split("_");
        if (plur.length == 2) {
            id2 = parseInt(plur[0]);
            if (id2)
            id_ok = true;
        }
        if (!id_ok)
        return false;
    }
    if (id2 == eimserver_meId)
    return false;
    if (top.frames[3].imData) {
        var one = top.frames[3].imData.addChat(id2, "", 1);
        var imChatId = one.getImChatId();
        window_switchChatWindow(imChatId, false);
    }
};
function clickChooseStaff(type) {
    if (imObject.chooseStaff == type)
    return false;
    imObject.chooseStaff = type;
    show_choose_staff_pane_filter(imObject.chooseStaff);
}
function haveCompany(selectedList) {
    for (var k = 0; k < selectedList.length; k = k + 1) {
        if (selectedList[k] == imObject.defaultTreeId)
        return true;
    }
    return false;
}
function getDeptList(selectedList) {
    var dList = [];
    var one;
    for (var k = 0; k < selectedList.length; k = k + 1) {
        one = selectedList[k];
        if ((one + "").search("d") != 0 || (one + "").search("_") != -1) {
            continue;
        }
        one = one.substring(1);
        dList[dList.length] = one;
    }
    return dList;
}
function getDutyList(selectedList) {
    var tDutyList = [];
    var one;
    for (var k = 0; k < selectedList.length; k = k + 1) {
        one = selectedList[k] + "";
        if (one.indexOf("t") != 0 || one.indexOf("_") != -1) {
            continue;
        }
        one = one.substring(1);
        tDutyList[tDutyList.length] = one;
    }
    return tDutyList;
}
function getGroupList(selectedList) {
    var gList = new Array();
    var one;
    for (var k = 0; k < selectedList.length; k = k + 1) {
        one = selectedList[k];
        if ((one + "").search("g") != 0) {
            continue;
        }
        one = one.substring(1);
        gList[gList.length] = one;
    }
    return gList;
}
function getUserList(selectedList) {
    try {
        var uList = new Array();
        var one,
        id,
        start,
        end;
        var org = top.frames[3].getOrg();
        for (var k = 0; k < selectedList.length; k = k + 1) {
            one = selectedList[k];
            id = parseInt(one);
            if (id) {
                addUserIdToList(id, uList);
                continue;
            }
            if ((one + "").search("d") == -1 && (one + "").search("_") > 1) {
                end = (one + "").search("_");
                one = one.substring(0, end);
                addUserIdToList(one, uList);
                continue;
            }
            if ((one + "").search("t") == 0) {
                one = one.substring(one.indexOf("t") + 1);
                debug("one : " + one);
                var dutyList = org.dutyAllUserRtList(one);
                debug(" dutyList : " + dutyList);
                uList = uList.concat(dutyList);
                continue;
            }
            var dip,
            tid,
            middle;
            if (((one + "").search("d") == 0 && (one + "").search("_") > 1) || (one + "").search("0_") == 0 || (one + "").search(imObject.defaultTreeId + "_") == 0) {
                var tList = org.deptDutyHavaValidUser(one, true);
                uList = uList.concat(tList);
                continue;
            }
        }
        return uList;
    } catch(ex) {
        debug("getUserList  " + ex.name + "   " + ex.message + " " + ex);
    }
}
function addUserIdToList(id, uList) {
    for (var k = 0; k < uList.length; k = k + 1) {
        if (id == uList[k])
        return;
    }
    uList[uList.length] = id;
}
function isOnline() {
    if (!isEimseverExist() || !top.frames[3].con)
    return false;
    return top.frames[3].con._ok();
}
function createImOneText(p) {
    var imText;
    imText = document.createElement("input");
    imText.setAttribute("id", "imChooseStaffFilterContextId");
    imText.type = "text";
    imText.size = "35";
    imText["onkeyup"] = new Function("searchUserName(this.value)");
    var ob = document.createElement("span");
    ob.innerHTML = wordDefine.filter;
    p.appendChild(ob);
    ob.appendChild(imText);
};
function searchUserName(value) {
    try {
        if (!value) {
            return;
        }
        var org = top.frames[3].getOrg();
        var userList;
        if (org) {
            userList = org._users;
        } else {
            return;
        }
        var one;
        for (var i in userList) {
            one = userList[i];
            if (one.name.indexOf(value) != -1 || one.account.indexOf(value) != -1 || one.mobile.indexOf(value) != -1) {
                imObject.chooseTree.selectItem(one.id, 1);
                var count = imObject.chooseTree.findNodeIndexById(one.id);
                var imChooseStaffTreeId = $("imChooseStaffTreeId");
                if (imChooseStaffTreeId) {
                    count -= imChooseStaffTreeId.scrollHeight / 4000;
                    $("imChooseStaffTreeId").scrollTop = (20 * count);
                }
                return;
            }
        }
        return false;
    } catch(ex) {
        debug(ex, "searchUserName");
    }
};
function createDeptNameList(p) {
    var select = document.createElement("select");
    var one,
    op,
    level;
    select.id = "imSelectFilter";
    op = document.createElement("option");
    select.appendChild(op);
    op.text = wordDefine.selectAll;
    op.id = "mainid";
    op.value = imObject.defaultTreeId;
    op = document.createElement("option");
    select.appendChild(op);
    op.text = wordDefine.loading;
    op.id = "prepid";
    select["onchange"] = new Function("createDeptNameListOnChange(this.value)");
    select["onclick"] = new Function("createDeptNameListOnClick(this);");
    p.appendChild(select);
};
function createDeptNameListOnClick(p) {
    var tempop = $("prepid");
    if (p.length == 2 && tempop) {
        try {
            var allIds = imObject.chooseTree.getAllSubItems(0);
        } catch(ex) {
            setTimeout(function() {
                createDeptNameListOnClick(p);
            },
            1000);
        }
        if (allIds.length > 0) {
            allIds = ("0," + allIds).split(",");
        } else {
            allIds = "0";
        }
        if (!allIds)
        return;
        var one,
        op,
        level;
        if (allIds || allIds.length > 2) {
            for (var i = 1; i < allIds.length; i = i + 1) {
                var temp = allIds[i];
                one = allIds[i];
                if ((one + "").search("d") != 0 && (one + "").search("t") != 0 && (one + "").search("g") != 0) continue;
                if ((one + "").search("_") > 0) continue;
                level = imObject.chooseTree.getLevel(one);
                op = document.createElement("option");
                p.appendChild(op);
                op.text = addPrefixSpace(level) + imObject.chooseTree.getItemText(one);
                if (op.text.length > 33) {
                    op.text = op.text.substring(0, 33) + "....";
                }
                op.value = one;
            }
        }
        if (tempop)
        p.removeChild(tempop);
        if (allIds.length <= 1) {
            var mainop = $("mainid");
            mainop.innerHTML = wordDefine.nodata;
            return;
        }
        if (common_is_ie) {
            p.appendChild(p);
        }
    }
}
function adjustSizeImWindow() {
    var height = screen.height;
    var tree_height = isImOrOnline ? 100: 160;
    var offline_height = isImOrOnline ? 100: 45;
    var chatWin_height = 135;
    var input_height = 50;
    if (height >= 600 && height <= 768) {
        tree_height = tree_height + 70 * (height - 600) / 168;
        offline_height = offline_height + 35 + 100 * (height - 600) / 168;
        chatWin_height = 135 + 145 * (height - 600) / 168;
        input_height = 50 + 20 * (height - 600) / 168;
    } else if (height > 768) {
        if (height > 1300) {
            height = 1300;
        }
        tree_height = tree_height + 40 + 100 * (height - 768) / 256;
        offline_height = offline_height + 55 + 105 * (height - 768) / 256;
        chatWin_height = 280 + 150 * (height - 768) / 256;
        input_height = 70 + 50 * (height - 768) / 256;
    } else {
        if (height < 400) {
            height = 400;
        }
        tree_height = tree_height - 70 * (600 - height) / 168;
        offline_height = offline_height + 30;
        chatWin_height = 135 - 145 * (600 - height) / 168;
        input_height = 50 - 20 * (600 - height) / 168;
    }
    imObject.chatWin_max_height = chatWin_height + 10;
    imObject.chatWin_input_height = input_height;
    var tempDate = null;
    if (isEimseverExist()) {
        tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
        var oneChat = tempDate.getCurrOneChat();
        if (oneChat) {
            if (oneChat > 0)
            chatWin_height = chatWin_height - 85;
        }
    }
    var numWidth = 0.265;
    if (screen.width > 1024) {
        numWidth = 0.24;
        var im_search_user = $("im_search_user");
        if (im_search_user) {
            im_search_user.size = 20;
        }
    }
    try {
        $("left_pane_id").style.width = "200px";
        $("myostructure").style.width = "187px";
        if ($("imOfflineMsg")) {
            $("imOfflineMsg").style.width = "197px";
            $("imOfflineMsg").style.height = (chatWin_height + input_height + 20 - tree_height) + "px";
        } else {
            $("onlineUsefulTree").style.width = "190px";
            $("onlineUsefulTree").style.height = (chatWin_height + input_height + 20 - tree_height) + "px";
        }
        $("imOfflineMsgBack").style.width = "200px";
        $("myostructure").style.height = tree_height + "px";
        $("im_chat_pane").style.height = chatWin_height + "px";
        $("IMchatInputId").style.height = input_height + "px";
        if ($("im_currChaters"))
        $("im_currChaters").style.height = input_height + "px";
        $("left_pane_id").style.height = (157 + chatWin_height + input_height) + "px";
    } catch(ex) {}
};
function setChatWindowHeight() {
    var tempDate = null;
    tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
    var height = imObject.chatWin_max_height;
    if (tempDate) {
        var oneChat = tempDate.getCurrOneChat();
        if (oneChat) {
            if (oneChat.getType() == 1 && oneChat.mid > 0)
            height = height - 85;
        }
    }
    $("im_chat_pane").style.height = height + "px";
};
function window_blankRow2Tds() {
    var row = document.createElement("tr");
    var cell = createCellWithText(" ");
    row.appendChild(cell);
    cell = createCellWithText("---------------------------------");
    row.appendChild(cell);
    return row;
};
function createCellWithText(text) {
    var cell = document.createElement("td");
    var textNode = document.createTextNode(text);
    cell.appendChild(textNode);
    return cell;
}
function createNameDiv(name) {
    var d = document.createElement("div");
    d.appendChild(document.createTextNode(name));
    return d;
};
function createImOneRadio(value, name, myChecked) {
    var rdo;
    if (common_is_ie) {
        try {
            if (myChecked)
            rdo = document.createElement("<input type='radio' name='im_staff_rdo' value='" + value + "' checked />");
            else
            rdo = document.createElement("<input type='radio' name='im_staff_rdo' value='" + value + "' />");
        } catch(e) {
            rdo = document.createElement("input");
            rdo.setAttribute("name", "im_staff_rdo");
            rdo.setAttribute("type", "radio");
            rdo.setAttribute("value", value);
            rdo.checked = myChecked;
        }
    } else {
        rdo = document.createElement("input");
        rdo.setAttribute("name", "im_staff_rdo");
        rdo.setAttribute("type", "radio");
        rdo.setAttribute("value", value);
        rdo.checked = myChecked;
    }
    rdo.id = "im_staff_rdo" + value;
    rdo["onclick"] = new Function("clickChooseStaff(this.value)");
    var newLabel = document.createElement("label");
    newLabel.innerHTML = "<span style=\"cursor: pointer\" onclick=\"extendCheck('im_staff_rdo" + value + "');clickChooseStaff('" + value + "');\">" + name + "</span>";
    var objarea = $("imChooseStaffId");
    objarea.appendChild(rdo);
    objarea.appendChild(newLabel);
}
function UserDutyStatus(userId, userName, userStatus) {
    this.fulltime = false;
    this.userId = userId;
    this.userName = userName;
    this.userStatus = userStatus;
    this.deptId = "";
};
function getSelectedList(optionList) {
    try {
        var userList = new Array();
        for (var k = 0; k < optionList.length; k = k + 1) {
            userList[userList.length] = optionList[k].value;
        }
        return userList;
    } catch(ex) {
        debug("getSelectedList :" + ex.name + "\n" + ex.message + "   " + ex);
    }
};
function getNameListStr(userList) {
    try {
        var names = "abc,";
        var tName;
        var org = top.frames[3].getOrg();
        if (org) {
            for (var i = userList.length - 1; i >= 0; i -= 1) {
                tName = org.getUserNameById(userList[i]).shortName();
                if (! (new RegExp("," + tName + ",").test(names + ","))) {
                    if (i < userList.length - 1) {
                        names += ",";
                    }
                    names += tName;
                } else {
                    userList.splice(i, 1);
                }
            }
        }
        return names.substring(4);
    } catch(ex) {
        debug("getNameListStr :" + ex.name + "\n" + ex.message + "   " + ex);
    }
}
function setOptionToSelect(allIds, p) {
    one = allIds;
    if ((one + "").search("d") != 0 && (one + "").search("t") != 0 && (one + "").search("g") != 0) return;
    if ((one + "").search("_") > 0) return;
    level = imObject.chooseTree.getLevel(one);
    op = document.createElement("option");
    p.appendChild(op);
    op.text = addPrefixSpace(level) + imObject.chooseTree.getItemText(one);
    op.value = one;
}
function chooseStaffonclick() {
    var id = imObject.chooseTree.getSelectedItemId();
};
function testDHTMLTree(tree) {
    var p1,
    p2,
    p3;
    for (var i = 0; i < 2; i = i + 1) {
        p1 = "t" + i;
        tree.insertNewItem(0, p1, wordDefine.dep, 0, imObject.pic_os_dept, imObject.pic_os_dept, imObject.pic_os_dept, "");
        for (var kk = 0; kk < 7; kk = kk + 1) {
            var beginDate = new Date();
            tree.insertNewItem(p1, "d" + kk, wordDefine.user, 0, imObject.pic_os_dept, imObject.pic_os_dept, imObject.pic_os_dept, "");
            var endDate = new Date();
            alert("beginDate - endDate : " + (beginDate.getTime() - endDate.getTime()));
        }
    }
}
function checkUnValidTagAttr(tags) {
    if (!tags || tags.length != 1)
    return true;
    return false;
};
function handleErr(msg, url, l)
 {
    var txt = "There was an error on this page.\n\n"
    txt += "Error: " + msg + "\n"
    txt += "URL: " + url + "\n"
    txt += "Line: " + l + "\n\n"
    txt += "Click OK to continue.\n\n"
    debug("in handleErr, error txt: " + txt);
    errorInfo = "  ,  " + txt;
    return true
}
var errorInfo = " ";
var imUtil = {
    formatHTML: function(t, type) {
        t = (t + " ").replace(/</g, '&lt;').replace(/\n\r/g, '<br>').replace(/\n/g, '<br>');
        t = filterURL(t);
        return t;
    },
    toHTML: function(t) {
        t = (t + " ").replace(/&lt;/g, '<').replace(/lt;/g, '&lt;').replace(/gt;/g, '&gt;');
        return t;
    }
};
function filterURL(str) {
    var a = str.replace(/((ftp|http|https):\/\/|www\.)([\w\/\.\?\+&#%=;:,-]+)/ig, "<a href=\"$1$3\" target=\"_blank\">$1$3</a>");
    a = a.replace(/href="([^(http:\/\/)(ftp:\/\/)(https:\/\/)])/ig, "href=\"http://$1");
    return a;
}
function isEimseverExist() {
    try {
        var tempDate = null;
        tempDate = top.frames[3].imData;
        if (tempDate) {
            return true;
        }
        return false;
    } catch(ex) {
        return false;
    }
}
var pageMaxList = -1;
function chat_showContentPage(max) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/im/chat_popup_sendhistory.jsp", mgtPopupId());
    dwr.backCallFunc = function() {
        var tag = $("im_popup_history_number_id");
        var op;
        for (var k = max; k > 0; k = k - 1) {
            op = document.createElement("option");
            tag.appendChild(op);
            op.text = k;
            op.value = k;
        }
        mgtPopup();
    }
    dwr.dwrProxy();
};
function getSentence(sendId, max) {
    var content = $(sendId).value;
    if (!content) {
        return false;
    }
    if (!isOnline()) return;
    if (!max)
    max = top.frames[3].eicmsGconf.getChatMaxSize();
    if (("" + content).length > max) {
        alert(wordDefine.sendmorechat + max + wordDefine.noMoreWord2);
        return false;
    }
    content = content.trim();
    if (!content) {
        return false;
    }
    return content;
};
var sendSentenceLock = false;
function sendSentence() {
    if (sendSentenceLock) return;
    try {
        sendSentenceLock = true;
        var content = getSentence("IMchatInputId");
        if (!content)
        return false;
        if (!checkTextLength('IMchatInputId')) {
            return false;
        }
        var imChatSetAckId = $("imChatSetAckId");
        var tempDate = null;
        tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
        var oneChat = tempDate.getCurrOneChat();
        if (!oneChat) {
            return false;
        }
        if (isImOrOnline) {
            var callerId = oneChat._getId();
            if (callerId) {
                var oneCaller = top.frames[3].getOrg().getCallerUser(callerId);
                if (!oneCaller || !oneCaller._online) {
                    oneChat._hasDeleted = true;
                    window_inputAreaPanelOp(true);
                    return;
                }
            }
            if (imObject.onlineState == 2) {
                $("IMchatInputId").disabled = true;
                $("ImSendButtonId").disabled = true;
                return;
            }
        }
        if (imChatSetAckId && imChatSetAckId.value == 1 && oneChat._clickConfirm) {
            top.frames[3].sendEicmsMsgChatAndMulti(0, 1, oneChat, content);
            showAnotherChatWindowContents(oneChat.getImChatId());
            $("imChatSetAckId").value = 0;
            oneChat._clickConfirm = false;
        } else {
            var msg = top.frames[3].sendAMessage(content, isImOrOnline);
            if (msg) {
                addMsgToWindow(msg, "");
            }
        }
        var IMchatInputId = $("IMchatInputId");
        IMchatInputId.value = "";
        IMchatInputId.focus();
        tempDate.saveSuspendingInfo("");
        return true;
    } catch(ex) {
        debug(ex, 3, "sendSentence");
    } finally {
        sendSentenceLock = false;
    }
};
function im_endGroupChat() {
    var oneChat = top.frames[3].imData.getCurrOneChat();
    if (!oneChat) {
        return;
    }
    if (oneChat.getType() == 2) {
        this.NextStep = function() {
            top.frames[3].endGroupChat();
        };
        confirm(wordDefine.chatsend, this);
    } else {
        this.NextStep = function() {
            var msg = top.frames[3].sendAMessage(wordDefine.endchat, isImOrOnline);
            if (msg) {
                addMsgToWindow(msg, "");
            }
            closeChatWindow(oneChat.getImChatId());
        };
        confirm(wordDefine.chatend, this);
    }
};
function saveSuspendingInfo() {
    var content = $("IMchatInputId").value;
    if (!content) {
        return false;
    }
    var tempDate = null;
    tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
    tempDate.saveSuspendingInfo(content);
    return false;
};
function closeChatWindow(chatId) {
    var oneChatId = chatId;
    if (typeof(chatId) != "string" || chatId.indexOf("im") == -1) {
        var butId = this.id + "";
        oneChatId = butId.substring(butId.indexOf('_') + 1);
    }
    var tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
    var oneChat = tempDate.showOneChat(oneChatId);
    if (!isEimseverExist() || !oneChat) {
        alert(wordDefine.connFalse);
        return;
    }
    if ((oneChat.getType() == 2) && !oneChat._hasDeleted) {
        if (oneChat.getGroupUserNum() > 1) {
            this.NextStep = function() {
                tempDate.closeChatWindow(oneChatId);
                refreshChatWindowTitle(true);
                showAnotherChatWindowContents();
            };
            confirm(wordDefine.quitchats, this);
            return;
        }
    }
    tempDate.closeChatWindow(oneChatId);
    refreshChatWindowTitle(true);
    showAnotherChatWindowContents();
    return false;
};
function refreshImEndGroupChatId(one) {
    var imEndGroupChatId = $("imEndGroupChatId");
    if (imEndGroupChatId) {
        if (one && !one._hasDeleted && ((one.getType() == 2 && one._ownerId == eimserver_meId))) {
            imEndGroupChatId.disabled = false;
        } else {
            imEndGroupChatId.disabled = true;
        }
    }
}
function refreshGroupChatUsers(one, opType) {
    try {
        var im_currChaters = $("im_currChaters");
        if (im_currChaters) {
            while (im_currChaters.childNodes.length > 0) {
                im_currChaters.removeChild(im_currChaters.childNodes[0]);
            }
            if (one) {
                if (one.getType() == 2) {
                    if (one._hasDeleted) {
                        refreshImEndGroupChatId(one);
                        window_inputAreaPanelOp(true);
                        return;
                    }
                    var userNum = 0;
                    for (var i = 0; i < one._userList.length; i = i + 1) {
                        var user = one._userList[i];
                        if (user == eimserver_meId) continue;
                        userNum = userNum + 1;
                        var userName = top.frames[3].getOrg().getUserNameById(user).longName();
                        if (user == one._ownerId) {
                            im_currChaters.appendChild(createNameDiv(userName + "(" + wordDefine.initiater + ")"));
                            continue;
                        }
                        im_currChaters.appendChild(createNameDiv(userName));
                    }
                    if ((opType && opType == -2) || userNum < 1) {
                        window_inputAreaPanelOp(true);
                    } else {
                        window_inputAreaPanelOp(false);
                    }
                } else if (one.getType() == 1) {
                    im_currChaters.appendChild(createNameDiv(top.frames[3].getOrg().getUserNameById(one._getId()).longName()));
                }
            }
        }
        refreshImEndGroupChatId(one);
    } catch(ex) {
        debug(ex, 1, "refreshGroupChatUsers : ");
    }
};
function getChatUserString(one) {
    if (one.getType() == 1) {
        return "" + one._getId();
    } else if (one.getType() == 2) {
        var list = [];
        for (var i = 0; one._userList && i < one._userList.length; i = i + 1) {
            if (one._userList[i] != eimserver_meId) {
                list[list.length] = one._userList[i];
            }
        }
        return list.join(",");
    }
};
function showAnotherChatWindowContents(iMChatId) {
    try {
        var tempDate = null;
        tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
        if (!isEimseverExist() || !tempDate) {
            window_inputAreaPanelOp(true);
            return;
        }
        var myChatPane = $("chatMessagesBody");
        while (myChatPane.childNodes.length > 0)
        myChatPane.removeChild(myChatPane.childNodes[0]);
        forFirefoxClearWindow(myChatPane);
        if (iMChatId) {
            tempDate.setCurrIMChatId(iMChatId);
        } else {
            iMChatId = tempDate.getCurrIMChatId();
        }
        var result = tempDate.showOneChat(iMChatId);
        refreshGroupChatUsers(result);
        var imSendButtonIdValue = false;
        if (result && !result._hasDeleted && ((result.getType() == 1) || hasGroupUser(result._userList))) {
            window_inputAreaPanelOp(false);
        } else {
            window_inputAreaPanelOp(true);
            imSendButtonIdValue = true;
        }
        if (!result) {
            im_chat_eicmsMsg_windowsChanged(true);
            return;
        }
        var type = result.getType()
        setup_chat_ack_pic(type);
        if (result.getStatus() != 0) {
            result.resetStatus();
        }
        var mid = result.mid;
        var one;
        var chatContents = result._getContent();
        var startLen = 0;
        if (chatContents.length > pageMaxList && pageMaxList != -1) {
            startLen = chatContents.length - pageMaxList;
        }
        for (var i = startLen; i < chatContents.length; i++) {
            one = chatContents[i];
            addMsgToPane(one, myChatPane, type, mid);
        }
        if (type < 10) {
            if (result._hasDeleted)
            window_inputAreaPanelOp(true);
            im_chat_eicmsMsg_windowsChanged(true);
        } else {
            im_chat_eicmsMsg_windowsChanged(false);
            addEicmsMsgChatWindow(type, result);
        }
        $("IMchatInputId").value = result.getSuspending();
        $("im_chat_pane").scrollTop += 1000;
        if (type == 1 || type == 2) {
            focusChatInputText(result);
        }
        if (result && result.getType() == 2) {}
        return result;
    } catch(ex) {
        debug(ex, 1, "showAnotherChatWindowContents : ");
    }
}
function addMsgToWindow(msg, one) {
    if (msg) {
        var myChatPane = $("chatMessagesBody");
        forFirefoxClearWindow(myChatPane);
        addMsgToPane(msg, myChatPane, one ? one.getType() : 1, one ? one.mid: "");
        window_inputAreaPanelOp(false);
        $("im_chat_pane").scrollTop += 1000;
        if (one) {
            var type = one.getType();
            if (type == 2 && one._hasDeleted) {
                window_inputAreaPanelOp(true);
                refreshImEndGroupChatId();
            }
            if (type == 1 || type == 2) {
                focusChatInputText(one);
            }
        }
    }
};
function createGroupChat() {
    if (!isEimseverExist() || !top.frames[3].getOrg || !top.frames[3].getOrg())
    return;
    var id = onlineUserPopTree.getAllChecked();
    var users = getValidUsers(id);
    if (users.length < 1)
    return;
    if (users.length == 1) {
        if (top.frames[3].imData) {
            var one = top.frames[3].imData.addChat(users[0], "", 1);
            var imChatId = one.getImChatId();
            window_switchChatWindow(imChatId, false);
        }
        mgtPopupClose();
    } else {
        var names = getNameListStr(users);
        if (!names) return;
        names = "<b> " + names + " </b>";
        this.NextStep = function() {
            top.frames[3].startGroupChat(users, "", 0);
            mgtPopupClose();
        }
        confirm(wordDefine.withother + names + wordDefine.createchats, this);
    }
};
function inviteUsers() {
    var one = top.frames[3].imData.getCurrOneChat();
    var uid = one._getId();
    var id = onlineUserPopTree.getAllChecked();
    var userList = getValidUsers(id);
    var inviteUsers = getValidInviteUsers(userList);
    if (inviteUsers.length < 1)
    return;
    var names = getNameListStr(inviteUsers);
    names = "<b> " + names + " </b>";
    this.NextStep = function() {
        mgtPopupClose();
        if (one.getType() == 1) {
            inviteUsers[inviteUsers.length] = uid;
            imObject.inviteUserList = inviteUsers;
            imObject.inviteChatId = uid;
            if (one.getCount() > 0) {
                chat_showContentPage(one.getCount());
            } else {
                endSelectHistoryNumber(0, false);
            }
        } else {
            top.frames[3].joinGroupChat(inviteUsers, one);
        }
    }
    confirm(wordDefine.invite_before_1 + names + wordDefine.invite_before_2, this);
};
function eicmsBroadCastMsgSend() {
    try {
        var content = $("IMEicmsBroadCastMsgInputId").value;
        var subject = $("BroadCastMsgSubject").value;
        content = ("" + content).trim();
        subject = ("" + subject).trim();
        if (!content && !subject) {
            alert(wordDefine.sendmsg_info_1);
            return false;
        }
        if (("" + content).length > 5120) {
            alert(wordDefine.sendmsgword + 5120 + wordDefine.noMoreWord2);
            return false;
        }
        var own = $('eicms_msg_selected_ids');
        if (own.options.length < 1) {
            alert(wordDefine.selectobj);
            return false;
        }
        if (!isOnline()) return;
        var selectedList = getSelectedList(own.options);
        debug("selectedList :  " + selectedList);
        var company = haveCompany(selectedList);
        if (!company) {
            var dList = getDeptList(selectedList);
            var uList = getUserList(selectedList);
            var gList = getGroupList(selectedList);
            var dutyList = getDutyList(selectedList);
            debug("company :\n" + selectedList + "\ndList    " + dList + "\nuList    " + uList + "\ngList    " + gList, 1, "eicmsBroadCastMsgSend");
            if (!haveValidUser(dList, uList, gList)) {
                alert(wordDefine.nouser);
                return;
            }
        }
        if (!company && dList.length == 0 && uList.length == 0 && gList.length == 0) {
            return;
        }
        var im_EicmsMsg_ChatSetAckId = $("im_EicmsMsg_ChatSetAckId");
        var nc = 0;
        if (im_EicmsMsg_ChatSetAckId.value == 1) {
            nc = 1;
            $("im_EicmsMsg_ChatSetAckId").value = 0;
        }
        top.frames[3].sendEicmsBroadCastMsg(content, subject, nc, company, dList, uList, gList);
        mgtPopupClose();
    } catch(ex) {
        debug(ex, "eicmsBroadCastMsgSend");
    }
}
function haveValidUser(dList, uList, gList) {
    for (var i = 0; i < uList.length;) {
        if (uList[i] == eimserver_meId) uList.splice(i, 1);
        else i++;
    }
    if (uList.length > 0) return true;
    var org = top.frames[3].getOrg();
    var userList = org.getUserListUnderDept(dList);
    var isFirst = false;
    for (var i in userList) {
        if (userList[i].id != eimserver_meId) {
            return true;
        } else {
            if (isFirst) {
                return true;
            }
            isFirst = true;
            continue;
        }
    }
    var userList;
    for (var k = 0; k < gList.length; k = k + 1) {
        userList = org.getAllselfUserRtList(gList[k]);
        for (var i = 0; i < userList.length;) {
            if (userList[i] == eimserver_meId) userList.splice(i, 1);
            else i++;
        }
        if (userList.length > 0) return true;
    }
    return false;
};
function im_ackClk(id, type) {
    var ack = $(id);
    var pic = $(id + "pic");
    if (pic.className == 'tool_btn_nor') {
        pic.className = 'tool_btn_nor tool_btn_clk';
        ack.value = 1;
    } else {
        pic.className = 'tool_btn_nor';
        ack.value = 0;
    }
    if (id == 'im_EicmsMsg_ChatSetAckId') {
        $('IMEicmsBroadCastMsgInputId').focus();
    } else if (id == 'imChatSetAckId') {
        $('IMchatInputId').focus();
    }
}
function addMsgToPane(msg, myChatPane, chatType, mid) {
    try {
        var row = document.createElement("tr");
        var from,
        fromId,
        cell;
        var isInfomation = false;
        from = msg.getFrom();
        if (chatType < 10) {
            fromId = from.split("@")[0];
            if (("" + fromId).split("_").length > 1) {
                fromId = from.split("/")[1];
            }
            var fromOther = false;
            if (fromId != eimserver_meId || fromId < 0)
            fromOther = true;
            if (fromId >= 0 || fromId != -4) {
                cell = createCellWithText("[" + getShortDateStr(msg.getDate()) + "]");
            } else {
                cell = createCellWithText(" ");
            }
            if (fromId < 0)
            isInfomation = true;
            $(cell).addClass("im_textcolor_gray_delight");
            if (isInfomation) {
                cell.style.color = "red";
            }
            row.appendChild(cell);
            var name = ">>>";
            if (fromId >= 0) {
                name = "<" + msg.getFromName() + ">";
            } else if (fromId == -4) {
                name = " ";
            }
            if (from.indexOf("OLS") != -1) {
                name = "<" + msg.getFromName() + ">";
            }
            cell = createCellWithText(name);
            $(cell).addClass("im_textcolor_r_delight");
            if (isInfomation)
            cell.style.color = "red";
            row.appendChild(cell);
            cell = createCellWithText(":");
            $(cell).addClass("im_chat_little");
            row.appendChild(cell);
        } else {
            cell = createCellWithText(from);
            fromOther = true;
            $(cell).addClass("im_textcolor_gray_delight");
            if (isInfomation)
            cell.style.color = "red";
            row.appendChild(cell);
        }
        var body2,
        cell2,
        eicmsMsgType = msg.getEicmsMsg(),
        showContent = "";
        var body = msg.getBody();
        var containFaces = false;
        for (var i = 0; i < msg.getNode().childNodes.length; i++) {
            if (msg.getNode().childNodes.item(i).nodeName == 'body') {
                containFaces = msg.getNode().childNodes.item(i).getAttribute('face') == 1;
            }
        }
        if (isImOrOnline) {
            if ((fromId + "").indexOf("OLS") != -1) {}
        }
        cell = createCellWithText(body);
        if (body.indexOf("[mgt-img]") != -1) {
            cell.innerHTML = "<font color=red>" + wordDefine.send_file_info + "</font>";
        } else {
            if (eicmsMsgType && eicmsMsgType < 1000) {
                cell.innerHTML = imUtil.formatHTML(body);
            } else {
                if (isImOrOnline) {
                    if ((fromId + "").indexOf("OLS") == -1) {
                        cell.innerHTML = imUtil.formatHTML(body, 1);
                    } else {
                        cell.innerHTML = body;
                    }
                } else {
                    cell.innerHTML = imUtil.formatHTML(body, 1);
                }
            }
        }
        if (containFaces) {
            cell.innerHTML = ImFaces.filter(cell.innerHTML);
        }
        $(cell).addClass("textcolor_bl");
        if (isInfomation) {
            cell.style.color = "red";
        }
        if (eicmsMsgType == 1) {
            return;
            cell.innerHTML = "<a href='javascript:void(0)' onclick='showCell(" + fromId + "," + msg.getID()
            + ");'><b><u>" + imObject.im_chat_needack + "</u></b></a><br>[" + getLongStr(msg.getDate()) + "] " + cell.innerHTML;
            if (msg.getID() == mid) {
                showEicmsMsgChatWindow(true, true, false, "> " + msg.getBody());
            }
        } else if (eicmsMsgType == 101) {
            cell.innerHTML = wordDefine.offlinemsg + getLongStr(msg.getDate()) + "<br>" + wordDefine.content + ":&nbsp;" + cell.innerHTML;
        } else if (eicmsMsgType == 2) {
            return;
            cell.innerHTML = "<b>" + imObject.im_chat_needack + "</b><br>" + cell.innerHTML;
        } else if (eicmsMsgType == 3) {
            return;
            body2 = msg.getBodyEicmsMsg();
            cell.innerHTML = "<b>" + imObject.im_chat_sendReply + "</b><br>" + cell.innerHTML + "<br><font color='gray'> >>"
            + imUtil.formatHTML(body2) + "</font>";
        } else if (eicmsMsgType == 4) {
            return;
            cell.innerHTML = "<b>" + imObject.im_chat_sendAckPacket + "</b><br>" + cell.innerHTML;
        } else if (eicmsMsgType == 5) {
            body2 = msg.getBodyEicmsMsg();
            var subject = msg.getSubject();
            if (!subject) {
                subject = "";
            } else {
                subject = imUtil.formatHTML(subject);
            }
            var subject2 = msg.getSubject2();
            if (!subject2) {
                subject2 = "";
            } else {
                subject2 = imUtil.formatHTML(subject2);
            }
            cell.innerHTML = wordDefine.msgrevert + "<br/>" + wordDefine.title + "：" + subject + "<br>" + wordDefine.content + "：" + cell.innerHTML
            + wordDefine.time + getLongStr(msg.getDate()) + "<br><font color='gray'> ----" + wordDefine.msgreplyInfo + "---<br>" + wordDefine.title + "：" + subject2
            + "<br>" + wordDefine.content + "：" + imUtil.formatHTML(body2) + "</font>";
        } else if (eicmsMsgType == 5.1) {
            body2 = msg.getBodyEicmsMsg();
            cell.innerHTML = wordDefine.userevert + cell.innerHTML
            + wordDefine.time + getLongStr(msg.getDate()) + "<br><font color='gray'>" + wordDefine.needrevert + "<br> >>"
            + imUtil.formatHTML(body2) + "</font>";
        } else if (msg.getEicmsMsg() >= 6 && msg.getEicmsMsg() <= 10) {
            showContent = wordDefine.sendfile + "</br>" + cell.innerHTML + " (" + showFileLen(msg.getLen()) + ")&nbsp;&nbsp;" + getLongStr(msg.getFileDate());
            if (msg.getBodyEicmsMsg()) {
                showContent += "<B>" + wordDefine.appendtext + "</B>" + imUtil.formatHTML(msg.getBodyEicmsMsg());
            }
            if (eicmsMsgType == 6) {
                showContent += "<br>&nbsp;&nbsp;<a href='javascript:void(0)' onclick='eicmsFtReplySend(7,"
                + msg.getID() + " );'><span style='text-decoration: underline;'>" + wordDefine.refuse + "</span></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='"
                + msg.getUrl() + "' target='_blank'><span style='text-decoration: underline;'>" + wordDefine.incept + "</span></a>&nbsp;" + wordDefine.thisconn
                + msg.getTimeout() + wordDefine.sedinvalid;
            } else if (eicmsMsgType == 7) {
                showContent += "<br><span style='text-decoration: underline;'>" + wordDefine.refuseincept + "</span>";
            } else if (eicmsMsgType == 8) {
                showContent += "<br><span style='text-decoration: underline;'>" + wordDefine.startincept + "</span>";
            } else if (eicmsMsgType == 9) {
                showContent += "<br><span style='text-decoration: underline;'>" + wordDefine.inceptend + "</span>";
            } else if (eicmsMsgType == 10) {
                showContent += "<br><span style='text-decoration: underline;'>" + wordDefine.inceptfail + "</span>";
            }
            cell.innerHTML = showContent + "<br> --------------------------------------";
        } else if (eicmsMsgType == 1001) {
            var newRow = document.createElement("tr");
            var newCell;
            if (common_is_ie) {
                newCell = document.createElement("<td colspan='4'></td>");
            } else {
                newCell = document.createElement("td");
                newCell.setAttribute("colspan", 4);
            }
            newCell.innerHTML = "<font color='red'>" + wordDefine.transferInof + "</font><br><hr>";
            newRow.appendChild(newCell);
            myChatPane.appendChild(newRow);
            return;
        } else if (eicmsMsgType == 1002) {
            var newRow = document.createElement("tr");
            var newCell;
            if (common_is_ie) {
                newCell = document.createElement("<td colspan='4'><td>");
            } else {
                newCell = document.createElement("td");
                newCell.setAttribute("colspan", 4);
            }
            newCell.innerHTML = "<hr>";
            newRow.appendChild(newCell);
            myChatPane.appendChild(newRow);
            return;
        }
        if (chatType == 1 || chatType == 2) {
            cell.innerHTML = ImFaces.filter(cell.innerHTML);
        }
        row.appendChild(cell);
        try {
            if (msg.getIsLeaveMsg()) {
                row.style.backgroundColor = "#eee";
            }
        } catch(ex) {}
        myChatPane.appendChild(row);
    } catch(ex) {
        debug(ex, "addMsgToPane");
    }
}
function cancelHistoryNumber() {
    endSelectHistoryNumber(0, true);
};
function selectHistoryNumber() {
    var tag = $("im_popup_history_checkbox_id");
    var max = 0;
    if (tag.checked) {
        var se = $("im_popup_history_number_id");
        max = se.value;
    }
    endSelectHistoryNumber(max, true);
};
function endSelectHistoryNumber(max, fromPopUp) {
    if (fromPopUp) {
        mgtPopupClose();
    }
    top.frames[3].startGroupChat(imObject.inviteUserList, imObject.inviteChatId, max);
    myOrg.setSubChecked("companyIdInTree", 0);
    return false;
};
function haveUserInMyGroup(gid) {
    var contacts = top.frames[3].contacts;
    if (!contacts)
    return false;
    var groups = contacts.childNodes;
    var group;
    var gid,
    gname,
    uid,
    uname,
    users;
    var userStatus;
    for (var i = 0; groups && i < groups.length; i = i + 1) {
        group = groups[i];
        if (gid != group.getAttribute("gid"))
        continue;
        users = group.childNodes;
        if (users.length > 0)
        return true;
    }
    return false;
};
function setup_chat_ack_pic(chatType) {
    var imSMSSetAckIdpic = $("imSMSSetAckIdpic");
    if (!imSMSSetAckIdpic) {
        return;
    }
    if (chatType > 1) {
        if (!top.frames[3].eicmsPerm.canToAllSMS) {
            imSMSSetAckIdpic.className = "btn_ji_dis btn_ji_";
        }
    } else {
        if (!top.frames[3].eicmsPerm.canToOneSMS) {
            imSMSSetAckIdpic.className = "btn_ji_dis btn_ji_";
        } else {
            imSMSSetAckIdpic.className = "btn_ji_nor btn_ji_";
        }
    }
};
function haveSpecialKey(e) {
    return e.shiftKey || e.ctrlKey || e.altKey;
};
function doOnkeyup(e, buttonId, textId, speKey) {
    try {
        e = (e) ? e: event;
        if (speKey && e.keyCode == 13 && haveSpecialKey(e)) {
            return true;
        }
        var o = e.target || e.srcElement;
        if (o && o.id == textId) {
            if (e.keyCode == 13) {
                $(buttonId).click();
                if (textId) {
                    $(textId).value = "";
                    if (!speKey) {
                        $(textId).focus();
                    }
                }
                return false;
            }
        }
        return true;
    } catch(ex) {}
};
function doOnkeyupInTextArea(e) {
    e = e || event;
    var o = e.target || e.srcElement;
    if (document.getElementById('IMchatInputId') != o) {
        return true;
    }
    if (e.keyCode == 13 && haveSpecialKey(e)) {
        return true;
    }
    if (!checkTextLength('IMchatInputId')) {
        return false;
    }
    if (e.keyCode == 13) {
        var tempDate = null;
        tempDate = isImOrOnline ? top.frames[3].onlineData: top.frames[3].imData;
        var oneChat = tempDate.getCurrOneChat();
        if (!oneChat) return false;
        if (!oneChat.mid || oneChat.mid == -1) {
            sendSentence();
        } else {}
        return false;
    }
    return true;
};
document.onkeypress = doOnkeyupInTextArea;
function window_inputAreaPanelOp(result) {
    var IMchatInputId = $("IMchatInputId");
    if (IMchatInputId && IMchatInputId.disabled != result) {
        IMchatInputId.disabled = result;
    }
    var ImSendButtonId = $("ImSendButtonId");
    if (ImSendButtonId && ImSendButtonId.disabled != result) {
        ImSendButtonId.disabled = result;
    }
    if (isImOrOnline) {
        var callerCardDiv = $("callerCardDiv");
        var newProblemDiv = $("newProblemDiv");
        var callerInfoDiv = $("callerInfoDiv");
        var sendImgButton = $("sendImgButton");
        if (callerCardDiv && callerCardDiv.disabled != result) {
            callerCardDiv.disabled = result;
        }
        if (newProblemDiv && newProblemDiv.disabled != result) {
            newProblemDiv.disabled = result;
        }
        if (callerInfoDiv && callerInfoDiv.disabled != result) {
            callerInfoDiv.disabled = result;
        }
        if (sendImgButton && sendImgButton.disabled != result) {
            sendImgButton.disabled = result;
        }
        if (imObject.onlineState == 2) {
            IMchatInputId.disabled = true;
            ImSendButtonId.disabled = true;
        }
    }
}
function showCell(uid, mid) {
    var oneChat = top.frames[3].imData.getOneChatById(uid, 1);
    if (oneChat._hasDeleted) {
        alert(Resource.im.noremessage);
        return;
    }
    var msg = top.frames[3].imData.getEicmsMsgByUidAndMid(uid, mid);
    if (!oneChat || !msg)
    return;
    oneChat.mid = mid;
    try {
        $("IMchatInputId").focus();
    } catch(ex) {}
};
function checkGroupIsValid(imChatId) {
    var result = top.frames[3].imData.showOneChat(imChatId);
    if (result && result.getType() == 2) {
        refreshGroupChatUsers(result);
    }
}
function forFirefoxClearWindow(myChatPane) {
    if (myChatPane.childNodes.length == 0 && !common_is_ie) {
        var row = document.createElement("tr");
        myChatPane.appendChild(row);
        myChatPane.removeChild(myChatPane.childNodes[0]);
    }
}
var ImFaces = {
    reg: /(\/)([\w-_:{}]+)(\/)/g,
    escape: function(input) {
        return input;
    },
    filter: function(input) {
        var output = [];
        this.reg.lastIndex = 0;
        var backRef;
        var lastIndex = 0;
        var regex = /([\w-_]+):([\w-_]+)/;
        while ((backRef = this.reg.exec(input)) !== null) {
            output.push(input.substring(lastIndex, backRef.index));
            lastIndex = this.reg.lastIndex;
            var result = regex.exec(backRef[2]);
            if (result === null || !this.images.get(result[1]) || !this.images.get(result[1]).get(result[2])) {
                output.push(backRef[0]);
                continue;
            }
            var face = this.images.get(result[1]).get(result[2]);
            output.push("<img src='images/im/face_export/" + face.img + "'/>");
        }
        output.push(input.substring(lastIndex, input.length));
        return output.join("").replace(/\\\//g, '/');
    },
    images: {
        get: function(key) {
            return this[key];
        },
        fs: {
            0: {
                'img': "0.gif"
            },
            1: {
                'img': "1.gif"
            },
            39: {
                'img': "39.gif"
            },
            11: {
                'img': "11.gif"
            },
            12: {
                'img': "12.gif"
            },
            13: {
                'img': "13.gif"
            },
            14: {
                'img': "14.gif"
            },
            15: {
                'img': "15.gif"
            },
            10: {
                'img': "10.gif"
            },
            19: {
                'img': "19.gif"
            },
            22: {
                'img': "22.gif"
            },
            23: {
                'img': "23.gif"
            },
            2: {
                'img': "2.gif"
            },
            25: {
                'img': "25.gif"
            },
            26: {
                'img': "26.gif"
            },
            27: {
                'img': "27.gif"
            },
            30: {
                'img': "30.gif"
            },
            31: {
                'img': "31.gif"
            },
            32: {
                'img': "32.gif"
            },
            44: {
                'img': "44.gif"
            },
            36: {
                'img': "36.gif"
            },
            46: {
                'img': "46.gif"
            },
            47: {
                'img': "47.gif"
            },
            3: {
                'img': "3.gif"
            },
            41: {
                'img': "41.gif"
            },
            42: {
                'img': "42.gif"
            },
            48: {
                'img': "48.gif"
            },
            49: {
                'img': "49.gif"
            },
            50: {
                'img': "50.gif"
            },
            51: {
                'img': "51.gif"
            },
            45: {
                'img': "45.gif"
            },
            52: {
                'img': "52.gif"
            },
            53: {
                'img': "53.gif"
            },
            54: {
                'img': "54.gif"
            },
            4: {
                'img': "4.gif"
            },
            55: {
                'img': "55.gif"
            },
            43: {
                'img': "43.gif"
            },
            35: {
                'img': "35.gif"
            },
            28: {
                'img': "28.gif"
            },
            38: {
                'img': "38.gif"
            },
            33: {
                'img': "33.gif"
            },
            37: {
                'img': "37.gif"
            },
            40: {
                'img': "40.gif"
            },
            24: {
                'img': "24.gif"
            },
            18: {
                'img': "18.gif"
            },
            5: {
                'img': "5.gif"
            },
            16: {
                'img': "16.gif"
            },
            17: {
                'img': "17.gif"
            },
            29: {
                'img': "29.gif"
            },
            21: {
                'img': "21.gif"
            },
            20: {
                'img': "20.gif"
            },
            34: {
                'img': "34.gif"
            },
            6: {
                'img': "6.gif"
            },
            7: {
                'img': "7.gif"
            },
            8: {
                'img': "8.gif"
            },
            9: {
                'img': "9.gif"
            },
            get: function(key) {
                return this[key];
            }
        }
    }
};
function sendReplyEicmsMsg4Multi() {
    var msgInputid = document.getElementById("ImEicmsMsgInputId");
    var content = msgInputid.value;
    content = ("" + content).trim();
    var subject = document.getElementById("ImEicmsMsgInputSubjectId").value;
    content = ("" + content).trim();
    subject = ("" + subject).trim();
    if (!content && !subject) {
        alert(wordDefine.sendmsg_info_1);
        return false;
    }
    if (!isOnline()) return;
    if (("" + content).length > 5120) {
        alert(wordDefine.sendmsgword + 5120 + wordDefine.noMoreWord2);
        return false;
    }
    top.frames[3].imData.saveSuspendingInfo(content, subject);
    var iMChatId = top.frames[3].imData.getCurrIMChatId();
    var oneChat = top.frames[3].imData.showOneChat(iMChatId);
    if (!oneChat || oneChat.getType() < 10) return;
    top.frames[3].sendEicmsMsgAckReply("multi", oneChat, content, subject);
    var mid = oneChat.mid;
    deleteEicmsMsgByMid(mid);
    alert(wordDefine.msgsendsuccess);
    $('im_eicmsMsg_input').style.display = "none";
    closeChatWindow(oneChat.getImChatId());
};
function replyEicmsMsg() {
    var iMChatId = top.frames[3].imData.getCurrIMChatId();
    var oneChat = top.frames[3].imData.showOneChat(iMChatId);
    if (!oneChat) return;
    this.disabled = true;
    oneChat.replyStatus = 1;
    var im_eicmsMsg_input = document.getElementById("im_eicmsMsg_input");
    im_eicmsMsg_input.style.display = "block";
    $("ImEicmsMsgInputId").value = oneChat.getSuspending();
    $("ImEicmsMsgInputSubjectId").value = wordDefine.revert + ":" + oneChat.getSuspendingSubject();
    try {
        $("ImEicmsMsgInputId").focus();
    } catch(ex) {}
};
function saveSuspendingInfo4EicmsMsg() {
    var content = $("ImEicmsMsgInputId").value;
    if (!content) {
        content = "";
    }
    var subject = $("ImEicmsMsgInputSubjectId").value;
    if (!subject) {
        subject = "";
    }
    top.frames[3].imData.saveSuspendingInfo(content, subject);
    return false;
};
function eicmsMsgReplySend() {};
function eicmsMsgReplyCancel() {};
function deleteEicmsMsgByMid(mid) {
    top.frames[3].offline.deleteEicmsMsgByMid(mid);
    showOffline();
};
function showEicmsMsgChatWindow(isOk, imSendButtonIdValue, replyButtonStatus, replyContent) {};
function addEicmsMsgChatWindow(type, oneChat) {
    var im_eicmsMsg_input = document.getElementById("im_eicmsMsg_input");
    im_eicmsMsg_input.style.display = "none";
    if (type == 11) return;
    var btn = "",
    tagTemp,
    outDiv;
    var replyStatus = oneChat.replyStatus;
    if (type == 13) {
        var myChatPane = document.getElementById("chatMessagesBody");
        myChatPane.appendChild(window_blankRow2Tds());
        btn = document.createElement("input");
        btn.type = 'button';
        btn.className = "btn_sty";
        btn.value = wordDefine.revert
        if (replyStatus > 0) {
            btn.disabled = true;
        } else {
            btn.onclick = replyEicmsMsg;
        }
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        row.appendChild(cell);
        cell = document.createElement("td");
        cell.appendChild(btn);
        row.appendChild(cell);
        myChatPane.appendChild(row);
        if (replyStatus > 0) {
            im_eicmsMsg_input.style.display = "block";
            $("ImEicmsMsgInputId").value = oneChat.getSuspending();
            $("ImEicmsMsgInputSubjectId").value = oneChat.getSuspendingSubject();
        }
    }
};
function eicms_msg_delete_all() {
    var own = document.getElementById('eicms_msg_selected_ids');
    for (var k = own.options.length - 1; k >= 0; k = k - 1) {
        own.options[k] = null;
    }
    clearCheckBoxInTree(imObject.chooseTree);
};
function eicms_msg_add_all() {
    try {
        var im_organization_choose_my = document.getElementById("im_organization_choose_my");
        if (im_organization_choose_my.className == "tab-active") {
            if (top.frames[3].contacts) {
                var contacts = top.frames[3].contacts;
                var groups = contacts.childNodes;
                if (!groups || groups.length < 1) {
                    return;
                }
                var gList = "";
                for (var i = 0; groups && i < groups.length; i = i + 1) {
                    group = groups[i];
                    gid = "g" + group.getAttribute("gid");
                    if (gList.length > 0) {
                        gList += "," + gid;
                    } else {
                        gList += gid;
                    }
                }
                eicms_msg_add_single_handle(gList);
                return;
            } else {
                return;
            }
        }
        eicms_msg_add_single_handle(imObject.defaultTreeId);
    } catch(ex) {
        debug("eicms_msg_add_all occur error : " + ex.name + "   " + ex.message + "   " + ex);
    }
};
function eicms_msg_delete_single() {
    var own = document.getElementById('eicms_msg_selected_ids');
    if (own && own.selectedIndex >= 0)
    own.options[own.selectedIndex] = null;
}
function chooseStaffondbclick() {
    var id = imObject.chooseTree.getEventItemId();
    eicms_msg_add_single_handle(id);
}
function eicms_msg_add_single() {
    var name = imObject.chooseTree.getAllChecked();
    eicms_msg_add_single_handle(name);
    if (imObject.send_sms) {
        getInputMobile();
    }
}
function eicms_msg_add_single_handle(name, isSms) {
    var singleList = ("-111," + name).split(",");
    var list = document.getElementById('eicms_msg_selected_ids').options;
    var one,
    idName,
    parentId,
    oldOne,
    org,
    mobile;
    if (imObject.send_sms) {
        org = top.frames[3].getOrg();
    }
    for (var i = 1; i < singleList.length; i = i + 1) {
        oldOne = singleList[i];
        if (!isValidId(oldOne, singleList)) {
            continue;
        }
        one = handlePluralityId(oldOne);
        if (isExistId(one, list)) {
            continue;
        }
        if (eimserver_meId == one)
        continue;
        if (one == imObject.defaultTreeId) {
            idName = wordDefine.comalluser;
        } else {
            debug(11111 + "    " + oldOne);
            idName = imObject.chooseTree.getItemText(oldOne);
            debug(11111 + "    " + oldOne);
            if (!idName) {
                continue;
            }
            if (isDept_duty_id(one)) {
                parentId = imObject.chooseTree.getParentId(one);
                if (parentId == 0)
                idName = wordDefine.comp + idName;
                else
                idName = imObject.chooseTree.getItemText(parentId) + ":" + idName;
            }
        }
        if (imObject.send_sms) {
            if (!top.frames[3].eicmsPerm.canToAllSMS && list.length > 1) {
                alert(wordDefine.sms_no_right_sendAll);
                return;
            }
            if (!top.frames[3].eicmsPerm.canToAllSMS) {
                if (oldOne.indexOf(imObject.defaultTreeId) != -1 && oldOne.indexOf("_") == -1) {
                    alert(wordDefine.sms_no_right_sendAll);
                    return;
                }
                if (oldOne.indexOf("d") != -1) {
                    var deptId;
                    deptId = oldOne.substring(oldOne.indexOf("d") + 1);
                    var org = top.frames[3].getOrg();
                    var deptIds = [];
                    deptIds[0] = deptId;
                    var deptUserlist = org.getUserListUnderDept(deptIds);
                    var num = 0;
                    for (var i in deptUserlist) {
                        num += 1;
                        if (num > 1) {
                            alert(wordDefine.sms_no_right_sendAll);
                            return;
                        }
                    }
                }
                if (oldOne.indexOf("t") != -1) {
                    var dutyId;
                    dutyId = oldOne.substring(oldOne.indexOf("t") + 1);
                    var org = top.frames[3].getOrg();
                    var dutyUserList = org.getDutyById(dutyId)._dutyUsers;
                    var num = 0;
                    for (var i in dutyUserList) {
                        num += 1;
                        if (num > 1) {
                            alert(wordDefine.sms_no_right_sendAll);
                            return;
                        }
                    }
                }
                if (oldOne.indexOf("d") != -1 && oldOne.indexOf("_") != -1) {
                    var org = top.frames[3].getOrg();
                    var dutyUserList = org.deptDutyHavaValidUser(oldOne, true);
                    if (dutyUserList.length > 1) {
                        alert(wordDefine.sms_no_right_sendAll);
                        return;
                    }
                }
            }
            if (!isNaN(oldOne)) {
                mobile = org.getUserById(oldOne).mobile;
                if (mobile != "" && mobile) {
                    idName = idName + '(' + mobile + ")";
                } else {
                    continue;
                }
            } else {
                if (oldOne.indexOf("_") != -1) {
                    var _index = oldOne.indexOf("_");
                    oldOne = oldOne.substring(0, _index);
                    if (!isNaN(oldOne)) {
                        mobile = org.getUserById(oldOne).mobile;
                        if (mobile != "" && mobile) {
                            idName = idName + '(' + mobile + ")";
                        } else {
                            continue;
                        }
                    }
                }
            }
        }
        list[list.length] = new Option(idName, one);
    }
    return;
};
function handlePluralityId(one) {
    if ((one + "").search("0_") == 0)
    return one;
    if ((one + "").search("d") >= 0 || (one + "").search("t") >= 0)
    return one;
    var a = ("" + one).split("_");
    if (a.length == 2)
    return a[0];
    return one;
};
function isValidId(one, oneList) {
    var parentId = imObject.chooseTree.getParentId(one);
    for (var k = 1; k < oneList.length; k = k + 1) {
        if (parentId == oneList[k])
        return false;
    }
    return true;
};
function isExistId(one, list) {
    for (var k = 0; k < list.length; k = k + 1) {
        if (list[k].value == one || list[k].value == eimserver_meId) {
            return true;
        }
    }
    return false;
};
function isDept_duty_id(one) {
    if ((one + "").search("d") == 0 && (one + "").search("_") > 1)
    return true;
    if ((one + "").search("0_") == 0)
    return true;
    return false;
};
function clearCheckBoxInTree(tree) {
    try {
        var ids = tree.getAllCheckedBranches();
        var idList = ("1," + ids).split(",");
        var one;
        for (var k = 1; k < idList.length; k = k + 1) {
            if (idList[k])
            tree.setCheck(idList[k], 0, false);
        }
    } catch(ex) {
        debug(ex, "clearCheckBoxInTree");
    }
};
function reOpenGetFile(fid) {
    alert(wordDefine.im_receive_file_again);
    openReceiveFile(fid);
}
var c_mNum = 2;
function hiddenSendfile(formObj) {
    try {
        var filename = formObj.httpfile1.value;
        if (!filename) {
            return;
        }
        top.frames[4].uploadInFrame.formObj = formObj;
        top.document.getElementById("myframe").rows = "0,0,*,0,0";
        var div = top.frames[4].document.getElementById("frameMainDiv");
        div.innerHTML = "";
        var selectFileSpanTag = top.frames[2].document.getElementById("selectFileSpanTag");
        var tempName = filename.split("\\");
        tempName = tempName[tempName.length - 1];
        selectFileSpanTag.innerHTML = Resource.im.selectfile + tempName + "　";
    } catch(ex) {
        debug("hiddenSendfile  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
};
function cancelSendfile(deleteDiv) {
    try {
        top.document.getElementById("myframe").rows = "0,0,*,0,0";
        var div = top.frames[4].document.getElementById("frameMainDiv");
        div.innerHTML = "";
        if (deleteDiv) {
            var tempDiv = top.frames[4].document.getElementById(top.frames[4].uploadInFrame.showDivId);
            if (tempDiv) {
                deleteCurrForm(tempDiv);
            }
        }
    } catch(ex) {
        debug("cancelSendfile  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
};
function deleteCurrForm(tempDiv) {
    var frameUploadDiv = top.frames[4].document.getElementById("frameUploadDiv");
    if (frameUploadDiv) {
        frameUploadDiv.removeChild(tempDiv);
        top.frames[4].uploadInFrame.formObj = null;
        var temp = top.frames[4].document.getElementById("selectFileSpanTag");
        if (temp) temp.innerHTML = "";
        temp = top.frames[2].document.getElementById("selectFileSpanTag");
        if (temp) temp.innerHTML = "";
    }
    frameUploadDiv = null;
};
function hasGroupUser(userList) {
    var allUser = userList.length;
    if (allUser > 1) {
        return true;
    }
    return false;
};
function canTransferFile() {
    if (!top.frames[3].acl) {
        return;
    }
    if (!top.frames[3].acl.fileTransferMode) {
        alert(Resource.common.file_no_right);
        return false;
    }
    if (top.frames[3].acl.storage_over) {
        alert(Resource.common.disk_no_more);
        return false;
    }
    return true;
}
function showContentPage4imsendfile() {
    if (!canTransferFile()) {
        return;
    }
    try {
        var oneChat = top.frames[3].imData.getCurrOneChat();
        if (!oneChat) {
            return;
        }
        if (oneChat._hasDeleted || (oneChat.getType() > 1 && !hasGroupUser(oneChat._userList))) {
            return;
        }
        var tempCounter = (top.frames[4].uploadInFrame.hashCounter + 1);
        var tempDiv = null;
        var showDivId = top.frames[4].uploadInFrame.showDivId;
        debug(" showContentPage4imsendfile function showDivId " + showDivId);
        if (showDivId)
        tempDiv = top.frames[4].document.getElementById(showDivId);
        if (tempDiv) {
            debug("delete ");
            deleteCurrForm(tempDiv);
        }
        var uploadDiv = top.frames[4].document.createElement("div");
        var frameUploadDiv = top.frames[4].document.getElementById("frameUploadDiv");
        frameUploadDiv.appendChild(uploadDiv);
        var div = top.frames[0].document.getElementById("im_right_pane_popup_sendfile");
        top.frames[4].uploadInFrame.showDivId = "im_right_pane_popup_sendfile" + tempCounter;
        uploadDiv.id = top.frames[4].uploadInFrame.showDivId;
        uploadDiv.className = "pop_win";
        uploadDiv.innerHTML = div.innerHTML;
        top.frames[4].$("frameSendImgDiv").style.display = "none";
        var leftPos = (window.getSize().x - 400) / 2;
        var topPos = (window.getSize().y) / 2;
        uploadDiv.style.left = leftPos + "px";
        uploadDiv.style.top = topPos + "px";
        uploadDiv.style.display = "block";
        var hidden = top.frames[c_mNum].document.getElementById('upLoadHidden');
        if (hidden == null) {
            hidden = top.frames[c_mNum].document.createElement("div");
            hidden.id = "upLoadHidden";
            hidden.className = "alertcss";
            top.frames[c_mNum].document.body.appendChild(hidden);
        }
        hidden.style.left = 0 + "px";
        hidden.style.top = 0 + "px";
        hidden.style.display = "block";
        var frameMainDiv = top.frames[4].document.getElementById("frameMainDiv");
        var a = top.frames[c_mNum].document.body.innerHTML;
        a = a.replace(/<iframe[^>]*>([\s\S]*?)<\/iframe>/gi, "");
        frameMainDiv.innerHTML = a;
        top.document.getElementById("myframe").rows = "0,0,0,0,*";
        var hidden = top.frames[c_mNum].document.getElementById('upLoadHidden');
        if (hidden) {
            hidden.style.display = "none";
        }
    } catch(ex) {
        debug("showContentPage4imsendfile  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
};
function activeConfirmButton(me) {
    me.parentNode.im_sendfile_button_id.disabled = '';
}
function showFileUpLoad() {
    try {
        var uploadDiv;
        var tempCounter = (top.frames[4].uploadInFrame.hashCounter + 1);
        if (top.frames[4].uploadInFrame.showDivId) {
            uploadDiv = top.frames[4].document.getElementById(top.frames[4].uploadInFrame.showDivId);
        }
        if (uploadDiv) {
            debug("delete showFileUpLoad ");
            deleteCurrForm(uploadDiv);
            uploadDiv = null;
            top.frames[4].uploadInFrame.formObj = null;
        }
        uploadDiv = top.frames[4].document.createElement("div");
        var frameUploadDiv = top.frames[4].document.getElementById("frameUploadDiv");
        frameUploadDiv.appendChild(uploadDiv);
        var div = top.frames[0].document.getElementById("popup_sendfile");
        top.frames[4].uploadInFrame.showDivId = "im_right_pane_popup_sendfile" + tempCounter;
        uploadDiv.id = top.frames[4].uploadInFrame.showDivId;
        uploadDiv.className = "pop_win";
        uploadDiv.innerHTML = div.innerHTML;
        top.frames[4].$("frameSendImgDiv").style.display = "none";
        var leftPos = (window.getSize().x - 400) / 2;
        var topPos = (window.getSize().y) / 2;
        if (topPos == 0) topPos = 300;
        uploadDiv.style.left = leftPos + "px";
        uploadDiv.style.top = topPos + "px";
        uploadDiv.style.display = "block";
        var hidden = top.frames[c_mNum].document.getElementById('upLoadHidden');
        if (hidden == null) {
            hidden = top.frames[c_mNum].document.createElement("div");
            hidden.id = "upLoadHidden";
            hidden.className = "alertcss";
            top.frames[c_mNum].document.body.appendChild(hidden);
        }
        hidden.style.left = 0 + "px";
        hidden.style.top = 0 + "px";
        hidden.style.display = "block";
        var frameMainDiv = top.frames[4].document.getElementById("frameMainDiv");
        var a = top.frames[c_mNum].document.body.innerHTML;
        a = a.replace(/<iframe[^>]*>([\s\S]*?)<\/iframe>/gi, "");
        frameMainDiv.innerHTML = a;
        try {
            if (Browser.Engine.trident) {
                Popup.hiddenSelects = frameMainDiv.getElementsByTagName("select");
                for (var i in Popup.hiddenSelects) {
                    try {
                        Popup.hiddenSelects[i].style.visibility = 'hidden';
                    } catch(e) {}
                }
            }
        } catch(e) {}
        top.document.getElementById("myframe").rows = "0,0,0,0,*";
        var UpLoadIframBG = top.frames[4].document.getElementById("UpLoadIframBG");
        if (UpLoadIframBG) {
            UpLoadIframBG.style.height = uploadDiv.offsetHeight + "px";
            UpLoadIframBG.style.width = uploadDiv.offsetWidth + "px";
        }
        var eicms_msg_selected_ids = top.frames[4].document.getElementById("eicms_msg_selected_ids");
        if (eicms_msg_selected_ids) {
            eicms_msg_selected_ids.disabled = "true";
        }
        var imSelectFilter = top.frames[4].document.getElementById("imSelectFilter");
        if (imSelectFilter) {
            imSelectFilter.disabled = "true";
        }
        var hidden = top.frames[c_mNum].document.getElementById('upLoadHidden');
        if (hidden) {
            hidden.style.display = "none";
        }
    } catch(ex) {
        debug("showFileUpLoad  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
};
function eicmsFtReplySend(type, sid) {
    var oneChat = top.frames[3].imData.getCurrOneChat();
    if (!oneChat) {
        return;
    }
    var msg = oneChat.getEicmsFtPacket(sid);
    if (!msg)
    return;
    if (type == 7) {
        this.NextStep = function() {
            top.frames[3].notifysendFileStatus(sid, "cancel", eimserver_meId);
            msg.setEicmsMsg(type);
            denyReceiveFile(sid);
        }
        confirm(wordDefine.refusefile, this);
        return;
    }
    top.frames[3].notifysendFileStatus(sid, "cancel", eimserver_meId);

    msg.setEicmsMsg(type);
    denyReceiveFile(sid);
};
function sendfile(type, formObj) {
    try {
        if (!top.frames[c_mNum].isOnline())
        return false;
        var formId;
        var filename = "";
        if (type == 1) {
            formId = formObj;
            filename = formId.httpfile1.value;
            if (isBlank(filename)) {
                $("sendFileError").innerHTML = top.frames[2].wordDefine.selectfile;
                return;
            } else {
                $("sendFileError").innerHTML = "";
            }
        } else {
            formObj = top.frames[4].uploadInFrame.formObj;
            formId = formObj;
            if (!formId) {
                alert(Resource.im.filetoSelect);
                return;
            }
            filename = formId.httpfile1.value;
        }
        var showDivId;
        if (top.frames[4].uploadInFrame.showDivId) {
            showDivId = top.frames[4].document.getElementById(top.frames[4].uploadInFrame.showDivId);
        }
        if (showDivId) {
            showDivId.style.display = 'none';
            top.frames[4].uploadInFrame.showDivId = "";
        }
        var company = false;
        var uList = new Array();
        var dList = new Array();
        var gList = new Array();
        var iM_sendFile_attach_info_content = ""
        var oneChat = "";
        if (type == 1) {
            oneChat = top.frames[3].imData.getCurrOneChat();
            if (!oneChat) {
                return;
            }
            if (oneChat.getType() == 1) {
                uList[uList.length] = oneChat._getId();
            } else if (oneChat.getType() == 2) {
                for (var k = 0; k < oneChat._userList.length; k = k + 1) {
                    if (top.frames[2].eimserver_meId != oneChat._userList[k])
                    uList[uList.length] = oneChat._userList[k];
                }
            }
        } else if (type == 2) {
            var own = document.getElementById('eicms_msg_selected_ids');
            if (own.options.length < 1) {
                alert(wordDefine.selectobj);
                return false;
            }
            var selectedList = getSelectedList(own.options);
            company = haveCompany(selectedList);
            if (!company) {
                dList = getDeptList(selectedList);
                uList = getUserList(selectedList);
                gList = getGroupList(selectedList);
                if (!haveValidUser(dList, uList, gList)) {
                    alert(Resource.im.nouser);
                    return;
                }
            }
            iM_sendFile_attach_info_content = document.getElementById("iM_sendFile_attach_info_content").value;
            if (!isOnline()) return;
            if (("" + iM_sendFile_attach_info_content).length > 256) {
                alert(wordDefine.sendmoreword1 + 256 + wordDefine.noMoreWord2);
                return false;
            }
        }
        if (!company && dList.length == 0 && uList.length == 0 && gList.length == 0) {
            return;
        }
        if (type == 1) {} else if (type == 2) {
            mgtPopupClose();
            top.frames[4].uploadInFrame.formObj = null;
        }
        top.frames[c_mNum].addOnefileUpLoad(filename, formObj, 
        function() {
            top.frames[3].sendFileIQPacket(uList.toString(), dList.toString(), gList.toString(), company, oneChat, iM_sendFile_attach_info_content, filename);
        },
        uList.toString(), dList.toString(), gList.toString(), company, oneChat, iM_sendFile_attach_info_content, filename);
        cancelSendfile();
        return false;
    } catch(ex) {
        debug("sendfile  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function checkUnValidTagChild(tags) {
    if (!tags || tags.length != 1 || tags[0].firstChild == null)
    return true;
    return false;
};
function sendfileSubmit(query, isHttps) {
    var tag = query.getElementsByTagName("fid");
    if (checkUnValidTagChild(tag)) {
        debug(wordDefine.errortosendfile);
        return false;
    }
    var fid = tag[0].firstChild.nodeValue;
    tag = query.getElementsByTagName("url");
    if (checkUnValidTagChild(tag)) {
        debug(wordDefine.errortosendfile);
        return false;
    }
    var url = tag[0].firstChild.nodeValue;
    var doubleUrl = ("" + url).split(" ");
    if (doubleUrl.length > 1) {
        for (var ii = 0; ii < doubleUrl.length; ii = ii + 1) {
            if ((doubleUrl[ii] + "").search("http") >= 0 && !isHttps) {
                url = doubleUrl[ii];
                break;
            } else if ((doubleUrl[ii] + "").search("https") >= 0 && isHttps) {
                url = doubleUrl[ii];
                break;
            }
        }
    }
    tag = query.getElementsByTagName("challenge");
    if (checkUnValidTagChild(tag)) {
        debug(wordDefine.errortosendfile);
        return false;
    }
    var challenge = tag[0].firstChild.nodeValue;
    try {
        var formId;
        if (top.frames[4].uploadInFrame.fileArray[0]) {
            formId = top.frames[4].uploadInFrame.fileArray[top.frames[4].uploadInFrame.selectId].formObj;
        } else {
            formId = top.frames[4].document.getElementById("im_file_formId1");
        }
        formId.action = url + "?challenge=" + challenge + "&fid=" + fid;
        formId.submit();
        try {
            top.frames[c_mNum].startProgress(challenge, formId.httpfile1.value);
        } catch(ex) {
            debug("startProgress error " + ex.name + "   " + ex.message + "   " + ex);
        }
    } catch(ex) {
        debug("sendfileSubmit error:  " + ex.name + "\n" + ex.message);
        return;
    }
    return false;
}
function cancelSendImg() {
    try {
        top.document.getElementById("myframe").rows = "0,0,*,0,0";
        $("sendImgError").innerHTML = '';
        $("fileUpLoad").innerHTML = $("fileUpLoad").innerHTML;
        var frameSendImgDiv = top.frames[4].document.getElementById("frameSendImgDiv");
        frameSendImgDiv.style.display = 'none';
    } catch(ex) {
        debug("cancelSendImg  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function sendImg() {
    var oneChat = top.frames[3].onlineData.getCurrOneChat();
    var oneCaller = top.frames[3].getOrg().getCallerUser(oneChat._getId());
    if (!oneChat || oneChat._hasDeleted || !oneCaller || !oneCaller._online) {
        cancelSendImg();
        top.frames[2].alert(top.frames[2].wordDefine.client_quit);
        return;
    }
    var path = $("fileInput0").value;
    if (isBlank(path)) {
        $("sendImgError").innerHTML = top.frames[2].wordDefine.pic_select;
        return;
    }
    paths = path.split(".");
    if (paths.length < 2 || "bmp jpg jpeg gif png ico".indexOf(paths[paths.length - 1].toLowerCase()) == -1) {
        $("sendImgError").innerHTML = top.frames[2].wordDefine.pic_select_info;
        return;
    }
    $("sendImgError").innerHTML = "";
    top.frames[4].document.getElementById("im_send_img").submit();
    cancelSendImg();
}
var smsLen = 200;
var vividOneSMS = 70;
var mobileMinLen = 1;
var onclickTr = null;
function confirmToSendSMS() {
    if (!top.frames[3].eicmsPerm.canToOneSMS) {
        alert(wordDefine.sms_no_right_send);
        return;
    }
    var smsContent = $("smsContent");
    var len = ("" + smsContent.value).length;
    if (len > top.frames[3].eicmsGconf.smsMaxChat) {
        alert(wordDefine.noMoreWord1);
        return false;
    }
    if (len == 0) {
        alert(Resource.common.pleaseinputcontent);
        return;
    }
    var allMobile = $("allMobile");
    if (allMobile.value == "") {
        alert(wordDefine.wrong_number);
        return;
    }
    debug("allMobile.value : " + allMobile.value);
    this.NextStep = function() {
        try {
            top.frames[3].sendEicmsSMS(smsContent.value, allMobile.value);
        } catch(ex) {
            debug(ex, "sendEicmsSMS");
        }
    };
    confirm(wordDefine.sms_send_question_1 + $('toSMSUser').innerHTML + wordDefine.sms_send_question_2, this);
}
function getSendSMSResult(returnValue) {
    switch (returnValue) {
    case '0':
        alert(wordDefine.sms_send_status_1);
        try {
            mgtPopupClose();
        } catch(ex) {}
        break;
    case '100':
        top.mainFrame1.alert(wordDefine.sms_no_right_send);
        break;
    case '101':
        top.mainFrame1.alert(wordDefine.sms_no_right_sendAll);
        break;
    case '102':
        top.mainFrame1.alert(Resource.common.sms_service_stop);
        break;
    case '103':
    case '200':
        top.mainFrame1.alert(wordDefine.sms_send_status_2);
        break;
    case '201':
        top.mainFrame1.alert(wordDefine.sms_send_status_3);
        break;
    case '202':
    case '201':
        top.mainFrame1.alert(wordDefine.sms_send_status_4);
        break;
    case '203':
        top.mainFrame1.alert(wordDefine.sms_send_status_5);
        break;
    case '204':
        top.mainFrame1.alert(wordDefine.sms_send_status_6);
        break;
    case '208':
        top.mainFrame1.alert(wordDefine.sms_send_status_7);
        break;
    default:
        top.mainFrame1.alert(wordDefine.smsfailed);
        break;
    }
}
function alertSMSsuccess(currInfo) {
    top.frames[3].sendEicmsSMSReceive(currInfo._mid);
    var maxShowMobile = 3;
    var aMobile = currInfo.mobile.split(",");
    if (aMobile.length > maxShowMobile) {
        aMobile = aMobile.slice(0, maxShowMobile);
        aMobile.join(",");
        aMobile += "....";
    } else {
        aMobile.join(",");
    }
    alert(wordDefine.sms_result_1 + aMobile + wordDefine.sms_result_2);
}
function startInputMobile(obj) {
    if (obj.value == wordDefine.sms_mobile_input) {
        obj.value = "";
    }
    obj.style.filter = "alpha(opacity:100)";
    obj.style.opacity = 1;
}
function stopInputMobile(obj) {
    if (obj.value == '') {
        obj.value = wordDefine.sms_mobile_input;
        obj.style.filter = "alpha(opacity:30)";
        obj.style.opacity = 0.3;
    }
}
function getInputMobile() {
    var inputMobile = $("inputMobile");
    if (inputMobile.value == wordDefine.sms_mobile_input) {
        return;
    }
    var userMobile = inputMobile.value.split(",");
    var tempValue = inputMobile.value;
    var list = document.getElementById('eicms_msg_selected_ids').options;
    if (list.length > 1 && !top.frames[3].eicmsPerm.canToAllSMS) {
        alert(wordDefine.sms_no_right_sendAll);
        return;
    }
    var hasError = false;
    var sub = "";
    for (var i = userMobile.length - 1; i >= 0; i -= 1) {
        var one = trim(userMobile[i]);
        if (isNaN(one) || one == "" || one.length < mobileMinLen || one.length > 20) {
            hasError = true;
            continue;
        }
        sub = "," + userMobile[i];
        if (i == 0) {
            sub = userMobile[i];
        }
        tempValue = tempValue.replace(sub, "");
        if (checkHasTheSameMobile(list, one)) {
            continue;
        }
        list[list.length] = new Option(one, "m" + one);
    }
    var vIndex = tempValue.indexOf(",");
    if (vIndex == 0) {
        tempValue = tempValue.substring(1);
    }
    inputMobile.value = tempValue;
    if (tempValue == "") {
        inputMobile.value = wordDefine.sms_mobile_input;
        inputMobile.style.filter = "alpha(opacity:30)";
        inputMobile.style.opacity = 0.3;
    }
    if (hasError) {
        alert(wordDefine.wrong_number_input);
    }
}
function checkHasTheSameMobile(list, mobile) {
    var one;
    for (var i = 0; i < list.length; i += 1) {
        one = list[i].value + "";
        if (one == mobile) {
            return true;
        }
    }
    return false;
}
function confirmToSendSMSMany() {
    if (!isEimseverExist() || !top.frames[3].eicmsPerm) {
        return;
    }
    if (!top.frames[3].eicmsPerm.canToOneSMS) {
        alert(wordDefine.sms_no_right_send);
        return;
    }
    var list = document.getElementById('eicms_msg_selected_ids').options;
    if (list.length < 1) {
        alert(wordDefine.selectobj);
        return false;
    }
    if (!isOnline()) return;
    var smsContent = $("iM_sms_content");
    var len = ("" + smsContent.value).length;
    if (len > top.frames[3].eicmsGconf.smsMaxChat) {
        alert(wordDefine.noMoreWord1);
        return;
    }
    if (len == 0) {
        alert(Resource.common.pleaseinputcontent);
        return;
    }
    var manyMobile = "";
    var selectedList = getSelectedList(list);
    var company = haveCompany(selectedList);
    for (var i = 0; i < selectedList.length; i += 1) {
        if (selectedList[i].indexOf("m") == -1) {
            continue;
        }
        var one = selectedList[i].substring(1);
        if (isNaN(one) || one == "" || one.length < mobileMinLen) {
            continue;
        } else {
            manyMobile += (manyMobile == "") ? (one) : ("," + one);
        }
    }
    if (!company) {
        var dList = getDeptList(selectedList);
        var uList = getUserList(selectedList);
        var gList = getGroupList(selectedList);
        debug("company :" + selectedList + "\ndList    " + dList + "\nuList    " + uList + "\ngList    " + gList, 1);
    }
    if (!company && dList.length == 0 && uList.length == 0 && gList.length == 0 && manyMobile.length == 0) {
        return;
    }
    try {
        var tMobiles;
        if (!company) {
            tMobiles = getAllMobileDeptList(dList);
            if (tMobiles.length >= mobileMinLen) {
                manyMobile += checkMobileLength(manyMobile) + tMobiles;
            }
            tMobiles = getAllMobileUserList(uList);
            if (tMobiles.length >= mobileMinLen) {
                manyMobile += checkMobileLength(manyMobile) + tMobiles;
            }
            tMobiles = getAllMobileGroupList(gList);
            if (tMobiles.length >= mobileMinLen) {
                manyMobile += checkMobileLength(manyMobile) + tMobiles;
            }
        } else {
            manyMobile += getAllMobileCompanyList();
        }
    } catch(ex) {
        debug(ex, "manyMobile");
    }
    if (manyMobile == "") {
        alert(wordDefine.wrong_number_result);
        return;
    }
    debug("manyMobile:  " + manyMobile);
    var org = top.frames[3].getOrg();
    var meUser = org.getUserById(eimserver_meId);
    var myMobile = meUser.mobile;
    if (manyMobile.search(",") > 0) {
        var tempArray = manyMobile.split(",");
        var tempMoble = "abc";
        var len = tempArray.length;
        for (var i = 0; i < len; i++) {
            var t = new RegExp("," + tempArray[i] + ",");
            if (!t.test(tempMoble + ",")) {
                tempMoble += "," + tempArray[i];
            }
        }
        var t = new RegExp("," + myMobile + ",");
        tempMoble = tempMoble.replace(t, ",");
        manyMobile = tempMoble.substring(4);
    }
    debug("manyMobile:  " + manyMobile);
    var maxShowMobile = 3;
    var aMobile = manyMobile.split(",");
    if (aMobile.length > maxShowMobile) {
        aMobile = aMobile.slice(0, maxShowMobile);
        aMobile.join(",");
        aMobile += "....";
    } else {
        aMobile.join(",");
    }
    this.NextStep = function() {
        var iM_sms_content = document.getElementById("iM_sms_content");
        try {
            top.frames[3].sendEicmsSMS(iM_sms_content.value, manyMobile);
        } catch(ex) {
            debug(ex, "sendEicmsSMS");
        }
    };
    confirm(wordDefine.sms_send_question_1 + aMobile + wordDefine.sms_send_question_2, this);
}
function checkMobileLength(mobiles) {
    if (mobiles.length >= mobileMinLen) {
        return ",";
    }
    return "";
}
function getAllMobileCompanyList() {
    var org = top.frames[3].getOrg();
    var tList = [];
    var allUserList = org._users;
    for (var j in allUserList) {
        var one = allUserList[j];
        if (one.mobile && !isNaN(one.mobile) && one.mobile != "") {
            tList.push(one.mobile);
        }
    }
    return tList.join(",");
}
function getAllMobileDeptList(dList) {
    var org = top.frames[3].getOrg();
    var list = [];
    if (org) {
        var userList;
        userList = org.getUserListUnderDept(dList);
        if (userList) {
            for (var j in userList) {
                var one = userList[j];
                if (one.mobile && !isNaN(one.mobile) && one.mobile != "") {
                    list.push(one.mobile);
                }
            }
        }
    }
    return list.join(",");
}
function getAllMobileUserList(uList) {
    var org = top.frames[3].getOrg();
    var list = [];
    if (org) {
        for (var i = 0; i < uList.length; i += 1) {
            var mobile;
            var one = org.getUserById(uList[i]);
            if (one) {
                mobile = one.mobile;
            } else {
                one = org.getStranger(uList[i]);
                mobile = one.cellTel;
            }
            if (mobile && !isNaN(mobile) && mobile != "") {
                list.push(mobile);
            }
        }
    }
    return list.join(",");
}
function getAllMobileGroupList(gList) {
    var list = [];
    var contacts = top.frames[3].contacts;
    if (!contacts)
    return false;
    var groups = contacts.childNodes;
    var group;
    var gid,
    gname,
    uid,
    uname,
    users,
    mobile;
    var userStatus;
    var org = top.frames[3].getOrg();
    for (var k = 0; k < gList.length; k += 1) {
        gid = gList[k];
        for (var i = 0; i < groups.length; i = i + 1) {
            group = groups[i];
            if (gid != group.getAttribute("gid")) {
                continue;
            }
            users = group.childNodes;
            for (var j = 0; users && j < users.length; j = j + 1) {
                uid = users[j].getAttribute("uid");
                mobile = org.getUserById(uid).mobile;
                if (mobile && !isNaN(mobile) && mobile != "") {
                    list.push(mobile);
                }
            }
        }
    }
    return list.join(",");
}
function openFailSMS() {
    try {
        var dwr = new DwrBackCall();
        var url = "/im/chat_popup_sms_result.jsp";
        dwr.addOneUrl(url, mgtPopupId());
        dwr.backCallFunc = function() {
            var smsOfflineTable = $("smsOfflineTable");
            var lenNum = 1;
            if (!common_is_ie) {
                lenNum = 2;
            }
            while (smsOfflineTable.childNodes.length > lenNum) {
                smsOfflineTable.removeChild(smsOfflineTable.childNodes[lenNum]);
            }
            onclickTr = null;
            var imdata = top.frames[3].imData;
            var smsInfo = imdata.smsInfo;
            if (smsInfo) {
                var org = top.frames[3].getOrg();
                var one,
                user,
                tName = "";
                var smsOfflineTextare = $("smsOfflineTextare");
                var j = 0;
                for (var i in smsInfo) {
                    one = smsInfo[i];
                    if (!one.smsStatus) {
                        if (j == 0) {
                            imdata.currSMSInfo = one;
                        }
                        user = org.getUserByMobile(one.mobile);
                        if (user) {
                            tName = user.name;
                        } else {
                            tName = one.mobile;
                        }
                        one.name = tName;
                        createOneSMSTr(tName, one);
                        j += 1;
                    }
                }
                showSMSOfflineContent(imdata.currSMSInfo);
            }
            mgtPopup();
        }
        dwr.dwrProxy();
    } catch(ex) {
        debug(ex, 3, "openFailSMS");
    }
}
function createOneSMSTr(name, oneInfo) {
    try {
        var smsOfflineTable = $("smsOfflineTable");
        var tTr = document.createElement("tr");
        var tTd = document.createElement("td");
        var tText = document.createTextNode(name);
        tTd.appendChild(tText);
        tTr.appendChild(tTd);
        tTd = document.createElement("td");
        tText = document.createTextNode(oneInfo.mobile);
        tTd.appendChild(tText);
        tTr.appendChild(tTd);
        tTd = document.createElement("td");
        tText = document.createTextNode(getErrorCodeText(oneInfo.errorCode));
        tTd.appendChild(tText);
        tTr.appendChild(tTd);
        tTr.className = 'trbg';
        tTr.onclick = function() {
            showSMSOfflineContent(oneInfo);
            if (onclickTr) onclickTr.className = "trbg";
            onclickTr = tTr;
            tTr.className = "trbgcolor0";
        }
        tTr.onmouseover = function() {
            tTr.className = "trbgcolor0";
        }
        tTr.onmouseout = function() {
            if (onclickTr != tTr) {
                tTr.className = "trbg";
            }
        }
        tTr.style.cursor = "pointer";
        smsOfflineTable.appendChild(tTr);
    } catch(ex) {
        debug(ex, 3, "createOneSMSTr");
    }
}
function getErrorCodeText(tCode) {
    var tText;
    switch (tCode) {
    case '200':
        tText = wordDefine.sms_wrong_1;
        break;
    case '201':
        tText = wordDefine.sms_wrong_2;
        break;
    case '202':
        tText = wordDefine.sms_wrong_3;
        break;
    case '203':
        tText = wordDefine.sms_wrong_4;
        break;
    case '204':
        tText = wordDefine.sms_wrong_5;
        break;
    case '205':
        tText = wordDefine.sms_wrong_6;
        break;
    case '206':
        tText = wordDefine.sms_wrong_7;
        break;
    case '207':
        tText = wordDefine.sms_wrong_8;
        break;
    case '208':
        tText = wordDefine.sms_wrong_9;
        break;
    default:
        tText = wordDefine.common_unkonw_error;
        break;
    }
    return tText;
}
function showSMSOfflineContent(oneInfo) {
    try {
        $("smsOfflineTextare").value = oneInfo.smsContent;
        if (top.frames[3].imData) {
            top.frames[3].imData.currSMSInfo = oneInfo;
        }
        sendFailConfrimMsg(oneInfo);
    } catch(ex) {
        debug(ex, 3, "showSMSOfflineContent");
    }
}
function sendFailConfrimMsg(oneInfo) {
    if (!oneInfo.smsStatus) {
        var one,
        mid = oneInfo._mid;
        top.frames[3].sendEicmsSMSReceive(mid);
        var smsInfo = top.frames[3].imData.smsInfo;
        for (var i in smsInfo) {
            one = smsInfo[i];
            if (one._mid == mid) {
                one.smsStatus = true;
            }
        }
        showOffline();
    }
}
function reSendSMS() {
    mgtPopupClose();
    var currSMSInfo = null;
    if (top.frames[3].imData) {
        currSMSInfo = top.frames[3].imData.currSMSInfo;
    }
    sendFailConfrimMsg(currSMSInfo);
    showIMExtendPop(8);
}
function checkSMSText() {
    try {
        checkTextLength("iM_sms_content", top.frames[3].eicmsGconf.smsMaxChat);
        var content = $("iM_sms_content").value;
        var len = ("" + content).length;
        var vSmsWordNum = $("smsWordNum");
        var gConfig = top.frames[3].eicmsGconf;
        var tempNum = gConfig.smsMaxChat - parseInt(len);
        vSmsWordNum.innerHTML = tempNum < 0 ? 0: tempNum;
        var vid = parseInt(len / (parseInt(gConfig.smsOneLimit) + 0.2)) + 1;
        var smsCount = $("smsCount");
        smsCount.innerHTML = vid;
        if (len <= 0) {
            $("confirmToSend").disabled = true;
        } else {
            $("confirmToSend").disabled = false;
        }
    } catch(ex) {
        debug(ex, "checkSMSText");
    }
}
function popCheckSMSText() {
    try {
        var content = $("smsContent").value;
        var len = ("" + content).length;
        var vSmsWordNum = $("popSmsWordNum");
        var gConfig = top.frames[3].eicmsGconf;
        var tempNum = gConfig.smsMaxChat - parseInt(len);
        vSmsWordNum.innerHTML = tempNum < 0 ? 0: tempNum;
        var vid = parseInt(len / gConfig.smsOneLimit) + 1;
        var smsCount = $("popSmsCount");
        smsCount.innerHTML = vid;
        checkTextLength("smsContent", smsLen);
        if (len <= 0) {
            $("popConfirmToSend").disabled = true;
        } else {
            $("popConfirmToSend").disabled = false;
        }
    } catch(ex) {
        debug(ex, "popCheckSMSText");
    }
}
function changeToSms() {
    var vSmsWordNum = $("smsWordNum");
    try {
        vSmsWordNum.innerHTML = top.frames[3].eicmsGconf.smsMaxChat;
    } catch(ex) {}
    var smsCount = $("smsCount");
    smsCount.innerHTML = 0;
}
function openSMSZF(id) {
    try {
        var smsZFInfo = top.frames[3].imData.smsZFInfo;
        var one = smsZFInfo[id];
        var imChatId = top.frames[3].offline.openSMSZFInfo(id, 15, one._mid);
        if (imChatId) {
            showAnotherChatWindowContents(imChatId);
            window_switchChatWindow(imChatId, false);
        }
        sendSMSZFReceive(one);
    } catch(ex) {
        debug(ex, "openSMSZF");
    }
}
function sendSMSZFReceive(oneInfo) {
    if (!oneInfo._smsZFStatus) {
        var one,
        mid = oneInfo._mid;
        top.frames[3].sendEicmsSMSZfReceive(mid);
        oneInfo._smsZFStatus = true;
        showOffline();
    }
}
var upLoadFrameNum = 4;
var upLoadInFrameTemp;
try {
    top.frames[upLoadFrameNum].uploadInFrame;
} catch(e) {
    debug(e.name + ";" + e.error + ";" + e.message);
}
var upLoadFrame = top.frames[upLoadFrameNum];
var disApear = true;
function refreshAll() {
    try {
        debug("upLoadInFrameTemp.hasUpLoadFile : " + upLoadInFrameTemp.hasUpLoadFile);
        if (!upLoadInFrameTemp.hasUpLoadFile) {
            return;
        }
        setTimeout(function() {
            upLoadInFrameTemp.selectArray.refreshProgress();
        },
        upLoadInFrameTemp.selectArray.longCheck);
        document.getElementById('theMeter').style.display = 'block';
        document.getElementById('finallyHintDiv').style.display = 'none';
        initUploadDiv();
        debug("upLoadInFrameTemp.selectArray.hashCode : " + upLoadInFrameTemp.selectArray.hashCode + " upLoadInFrameTemp.selectedFile : " + upLoadInFrameTemp.selectedFile);
        changeSelectClass(upLoadInFrameTemp.selectArray.hashCode, upLoadInFrameTemp.selectedFile);
    } catch(ex) {
        debug("refreshAll  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function updateProgress(uploadInfo) {
    try {
        if (upLoadInFrameTemp.selectArray.cancel) {
            return;
        }
        upLoadInFrameTemp.barStatus = 2;
        if (upLoadInFrameTemp.selectId == upLoadInFrameTemp.selectArray.hashCode) {
            if (uploadInfo.totalSize > 0) {
                upLoadInFrameTemp.uploadStatus = true;
                var progressPercent = Math.ceil((uploadInfo.bytesRead / uploadInfo.totalSize) * 100);
                document.getElementById('progressBarText').innerHTML = Resource.im.fileprocess + progressPercent + '%';
                document.getElementById('progressBarBoxContent').style.width = parseInt(progressPercent * 3.2) + 'px';
                document.getElementById('progressBarTextDetail').innerHTML = calUploadByte(uploadInfo.bytesRead, uploadInfo.totalSize);
                document.getElementById('calTimer').innerHTML = Resource.im.filespeed + uploadInfo.uploadSpeed + " KB/s";
                var fileUploadhourRemain = parseInt(uploadInfo.remainTime / 3600);
                var fileUploadminuteRemain = parseInt((uploadInfo.remainTime - parseInt(uploadInfo.remainTime / 3600) * 3600) / 60);
                upLoadInFrameTemp.fileuploadremainTime = parseInt(uploadInfo.remainTime % 60) + fileUploadhourRemain * 3600 + fileUploadminuteRemain * 60;
                document.getElementById('calRemainTime').innerHTML = Resource.im.remaintime + fileUploadhourRemain + Resource.im.hour + 
                fileUploadminuteRemain + Resource.im.minute + parseInt(uploadInfo.remainTime % 60) + Resource.im.second;
            }
            upLoadInFrameTemp.timeoutId = setTimeout(function() {
                upLoadInFrameTemp.selectArray.refreshProgress();
            },
            upLoadInFrameTemp.selectArray.longCheck);
        } else if (upLoadInFrameTemp.selectId != upLoadInFrameTemp.selectArray.hashCode) {
            upLoadInFrameTemp.timeoutId = setTimeout(function() {
                upLoadInFrameTemp.selectArray.refreshProgress();
            },
            3000);
        }
        return true;
    } catch(ex) {
        debug("updateProgress  error : " + ex.name + "   " + ex.message + "   " + ex, 4);
        initUploadDiv();
        upLoadInFrameTemp.selectArray.endUpload(Resource.common.operateFail);
    } finally {
        upLoadInFrameTemp.processStatus = true;
        upLoadInFrameTemp.processErrorCount = 0;
    }
}
function fileUpload4eim(result, reason) {
    try {
        if (upLoadInFrameTemp.selectArray.cancel) {
            return;
        }
        debug("fileUpload4eim  result : " + result + ",  reason :  " + reason);
        if (result == -1) {
            upLoadInFrameTemp.selectArray.error = true;
            upLoadInFrameTemp.selectArray.errorContent = Resource.im.filefail;
            reason = "" + reason;
            if (reason.indexOf("exceed") != -1) {
                upLoadInFrameTemp.selectArray.errorContent = Resource.im.filelength;
            } else if (reason == "500") {
                upLoadInFrameTemp.selectArray.errorContent = Resource.im.filefail + ',' + Resource.im.nozore;
            } else if (reason == "") {}
            upLoadInFrameTemp.selectArray.endUpload(Resource.common.operateFail);
            return false;
        }
        debug("  成功了 ！！ ");
        upLoadInFrameTemp.selectArray.endUpload();
        return true;
    } catch(ex) {
        debug("fileUpload4eim  error : " + ex.name + "   " + ex.message + "   " + ex);
        initUploadDiv();
        upLoadInFrameTemp.selectArray.endUpload(Resource.common.operateFail);
    } finally {
        upLoadInFrameTemp.processStatus = true;
        upLoadInFrameTemp.processErrorCount = 0;
    }
}
function calUploadByte(bytesRead, totalSize) {
    try {
        var mb = 1024 * 1024;
        var kb = 1024;
        var temp1;
        var temp2;
        if (totalSize >= 1024000) {
            temp1 = (bytesRead / mb) + "";
            temp2 = (totalSize / mb) + "";
            if (temp1.indexOf(".") > 0) {
                temp1 = temp1.substring(0, (temp1.indexOf(".") + 3));
            }
            if (temp2.indexOf(".") > 0) {
                temp2 = temp2.substring(0, (temp2.indexOf(".") + 3));
            }
            return temp1 + " MB / " + temp2 + " MB";
        } else if (totalSize > kb) {
            temp1 = (bytesRead / kb) + "";
            temp2 = (totalSize / kb) + "";
            if (temp1.indexOf(".") > 0) {
                temp1 = temp1.substring(0, (temp1.indexOf(".") + 3));
            }
            if (temp2.indexOf(".") > 0) {
                temp2 = temp2.substring(0, (temp2.indexOf(".") + 3));
            }
            return temp1 + " KB / " + temp2 + " KB";
        } else {
            return bytesRead + " B / " + totalSize + " B";
        }
    } catch(ex) {
        debug(ex, 3, "calUploadByte : ");
        return bytesRead + " B / " + totalSize + " B";
    }
}
function initUploadDiv() {
    try {
        debug("初始化所有的进度参数");
        var progressBarBoxContent = top.frames[2].document.getElementById('progressBarBoxContent');
        var progressBarText = top.frames[2].document.getElementById('progressBarText');
        var progressBarTextDetail = top.frames[2].document.getElementById('progressBarTextDetail');
        var calTimer = top.frames[2].document.getElementById('calTimer');
        var calRemainTime = top.frames[2].document.getElementById('calRemainTime');
        progressBarBoxContent.style.width = 0 + "px";
        progressBarText.innerHTML = Resource.im.fileprocess + ' 0%';
        progressBarTextDetail.innerHTML = "0 B / 0 B";
        calTimer.innerHTML = Resource.im.filespeed + " 0 KB/s";
        calRemainTime.innerHTML = Resource.im.remaintime + "0 " + Resource.im.hour + " 0 " + Resource.im.minute + " 0  " + Resource.im.second;
        upLoadInFrameTemp.fileuploadremainTime = -1;
    } catch(ex) {
        debug("initUploadDiv  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function newUploadDiv() {
    try {
        var divTemp;
        divTemp = top.frames[2].document.getElementById("uploadFileDragDiv");
        if (!divTemp) {
            divTemp = top.frames[2].document.createElement("div");
            divTemp.id = "uploadFileDragDiv";
            divTemp.className = "im_pop_posi_sendfile_process";
            top.frames[2].document.body.appendChild(divTemp);
            var uploadAllDivInFrame = top.frames[0].document.getElementById("uploadAllDivInFrame");
            divTemp.innerHTML = uploadAllDivInFrame.innerHTML;
            var leftPos = (window.getSize().x - 400) / 2;
            var topPos = (window.getSize().y) / 2;
            upLoadInFrameTemp.divLeft = window.getSize().x - 450 + "px";
            divTemp.style.left = leftPos + "px";
            divTemp.style.top = topPos + "px";
        }
        divTemp.style.display = "block";
        alphaDiv.startAlphaAppear(divTemp);
        new Drag('uploadFileDragDiv', {
            handle: $("draggableId")
        });
    } catch(ex) {
        debug("newUploadDiv  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function createFileCell(filename, wait) {
    try {
        var divTemp;
        if (!disApear) {
            var upLoadDetailMainTable = document.getElementById("upLoadDetailMainTable");
            var count = upLoadInFrameTemp.hashCounter;
            var tempArray = upLoadInFrameTemp.fileArray[count];
            var detail = Resource.im.detail;
            if (wait) {
                tempArray.wait = true;
                detail = Resource.im.wait;
            }
            var tempName = filename.split("\\");
            tempName = tempName[tempName.length - 1];
            tempArray.fileName = tempName;
            var org = top.frames[3].getOrg();
            var toUserName = "";
            if (org) {
                if (tempArray.args[0]) {
                    var userIds = tempArray.args[0].split(",");
                    if (userIds.length > 1) {
                        toUserName = Resource.im.moreuser;
                    } else {
                        var userId = tempArray.args[0];
                        toUserName = Resource.im.user + org.getUserNameById(userId).shortName();
                    }
                }
            }
            debug("toUserName L " + toUserName);
            if (!toUserName) {
                toUserName = Resource.im.moreuser;
            }
            upLoadDetailMainTable.innerHTML += "<TABLE id=\"uploadTr" + tempArray.hashCode + "\" border=\"0\" cellpadding=\"0\" cellspacing=\"3\" width=\"420\">" + "<tr id=\"trStyle" + tempArray.hashCode + "\" style=\"padding-top : 5px\" onMouseOver=\"cellMouseOver(this);\" onMouseOut=\"cellMouseOut(this);\">" + "<td width=\"25%\" style=\"padding-left: 5px;\">" + Resource.im.willsend + "</td><td width=\"140\" style=\"padding-left: 5px; word-wrap: break-word; word-break: break-all;\" id=\"uploadFileName" + tempArray.hashCode + "\">" + tempName + "</td><td width=\"100\" style=\"padding-left: 5px;\" id=\"toUserName" + tempArray.hashCode + "\">" + Resource.im.give + toUserName + "<INPUT type=\"hidden\" id=\"toUserFileId" + tempArray.hashCode + "\" value=''>" + "</td><td style=\"padding-left: 5px;\"><A href=\"javascript:void doShowDetail(" + count + ");\" id=\"doShowDetail" + tempArray.hashCode + "\">" + detail + "</A></td></tr></TABLE>";
            if (!common_is_ie) {
                toBreakWord($("uploadFileName" + tempArray.hashCode), 22);
            }
            tempArray.fileName = tempName;
            divTemp = top.frames[2].document.getElementById("uploadFileDragDiv");
        } else {
            divTemp = top.frames[2].document.getElementById("uploadFileDragDiv");
            if (!divTemp) {
                divTemp = top.frames[2].document.createElement("div");
                divTemp.id = "uploadFileDragDiv";
                divTemp.className = "im_pop_posi_sendfile_process";
                top.frames[2].document.body.appendChild(divTemp);
                divTemp.style.left = upLoadInFrameTemp.divLeft;
                divTemp.style.top = upLoadInFrameTemp.divTop;
            }
            divTemp.style.display = "block";
            alphaDiv.startAlphaAppear(divTemp);
            disApear = false;
            createFileCell(filename, wait);
        }
        divTemp = top.frames[2].document.getElementById("uploadFileDragDiv");
        top.frames[4].uploadInFrame.contentDiv = divTemp.innerHTML;
    } catch(ex) {
        debug("createFileCell  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function saveUploadDiv() {
    var divTemp = top.frames[2].document.getElementById("uploadFileDragDiv");
    top.frames[4].uploadInFrame.contentDiv = divTemp.innerHTML;
}
function toBreakWord(obj, intLen) {
    var strContent = obj.innerHTML;
    var strTemp = "";
    while (strContent.length > intLen) {
        strTemp += strContent.substr(0, intLen) + "<br>";
        strContent = strContent.substr(intLen, strContent.length);
    }
    strTemp += "" + strContent;
    obj.innerHTML = strTemp;
}
function cellMouseOver(cell) {
    var hashCode = cell.id.substring(7, cell.id.length);
    if (upLoadInFrameTemp.selectedFile == hashCode) {
        return;
    }
    cell.className = 'trbgcolor0';
}
function cellMouseOut(cell) {
    var hashCode = cell.id.substring(7, cell.id.length);
    if (upLoadInFrameTemp.selectedFile == hashCode) {
        return;
    }
    cell.className = 'trbgcolor1';
}
function addFileUploadArray(formObj, args) {
    try {
        upLoadInFrameTemp.hashCounter = upLoadInFrameTemp.hashCounter + 1;
        upLoadInFrameTemp.allCount = upLoadInFrameTemp.allCount + 1;
        var count = upLoadInFrameTemp.hashCounter;
        upLoadInFrameTemp.fileArray[count] = new upLoadFrame.FileDetail();
        upLoadInFrameTemp.fileArray[count].hashCode = count;
        if (!formObj) {
            formObj = firstFormObj;
            args = firstArguments;
        }
        upLoadInFrameTemp.fileArray[count].formObj = formObj;
        if (args) {
            var tempArgs = [];
            for (var i = 0; i < args.length - 3; i = i + 1) {
                tempArgs[i] = args[i + 3];
            }
            upLoadInFrameTemp.fileArray[count].args = tempArgs;
        }
    } catch(ex) {
        debug("addFileUploadArray  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function startProgress(challenge, filename) {
    try {
        var count = upLoadInFrameTemp.selectId;
        debug("pp count:" + count + "," + upLoadInFrameTemp.initDiv + ", " + new Date());
        if (count == -1 && !upLoadInFrameTemp.initDiv) {
            count = count + 1;
            addFileUploadArray();
            newUploadDiv();
            initUploadDiv();
            document.getElementById('theMeter').style.display = 'block';
            document.getElementById('finallyHintDiv').style.display = 'none';
            disApear = false;
            upLoadInFrameTemp.initDiv = true;
            createFileCell(filename);
            upLoadInFrameTemp.changeSelect();
        } else {
            var uploadFileDragDiv = document.getElementById("uploadFileDragDiv");
            if (disApear) {
                alphaDiv.startAlphaAppear(uploadFileDragDiv);
            }
            document.getElementById('theMeter').style.display = 'block';
            document.getElementById('finallyHintDiv').style.display = 'none';
        }
        changeSelectClass(count, upLoadInFrameTemp.selectedFile);
        if (challenge) {
            globe = challenge;
            upLoadInFrameTemp.fileArray[count].userChallenge = challenge;
        }
        upLoadInFrameTemp.selectArray = upLoadInFrameTemp.fileArray[count];
        upLoadInFrameTemp.selectArray.wait = false;
        upLoadInFrameTemp.timeoutId = setTimeout(function() {
            upLoadInFrameTemp.selectArray.refreshProgress();
        },
        2000);
        upLoadInFrameTemp.barStatus = 1;
        upLoadInFrameTemp.hasUpLoadFile = true;
        intervalProcess();
        var detailWaitDiv = top.frames[2].document.getElementById("doShowDetail" + upLoadInFrameTemp.selectArray.hashCode);
        if (detailWaitDiv) {
            detailWaitDiv.innerHTML = Resource.im.detail;
        }
        return true;
    } catch(ex) {
        debug("startProgress  error : " + ex.name + "   " + ex.message + "   " + ex);
    } finally {
        setListen();
    }
}
var timeSpeed = 4;
function intervalProcess() {
    try {
        if (upLoadInFrameTemp.barStatus == 1) {
            clearTimeout(upLoadInFrameTemp.timeoutIntervalId);
            upLoadInFrameTemp.timeoutIntervalId = setTimeout("intervalProcess()", 400);
            return;
        }
        if (upLoadInFrameTemp.uploadStatus) {
            try {
                var progressBarBoxContent = document.getElementById('progressBarBoxContent');
                var temp = (timeSpeed % 4) + 1;
                progressBarBoxContent.style.background = "#9cb2c6 url(" + globalCp + "/images/common/newactive" + temp + ".gif)";
                clearTimeout(upLoadInFrameTemp.timeoutIntervalId);
                upLoadInFrameTemp.timeoutIntervalId = setTimeout("intervalProcess()", 400);
            } finally {
                timeSpeed = timeSpeed + 1;
            }
        }
    } catch(ex) {
        debug("intervalProcess  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
var alphaDiv = {
    startAlphaAppear: function(divtemp) {
        alphaDiv.targetDiv = divtemp;
        divtemp.style.filter = "alpha(opacity=" + alphaDiv.alphaCount + ")";
        divtemp.style.opacity = alphaDiv.alphaCount / 100;
        divtemp.style.display = 'block';
        alphaDiv.processAlphaAppear();
    },
    startAlphaDisappear: function(divtemp) {
        alphaDiv.targetDiv = divtemp;
        alphaDiv.alphaCount = 100;
        alphaDiv.processAlphaDisappear();
    },
    processAlphaAppear: function() {
        try {
            if (alphaDiv.alphaCount < 100) {
                alphaDiv.setOpacity(alphaDiv.targetDiv, alphaDiv.alphaCount);
                alphaDiv.alphaCount = alphaDiv.alphaCount + alphaDiv.alphaSpeed;
                setTimeout("alphaDiv.processAlphaAppear()", alphaDiv.timeOut);
            } else {
                alphaDiv.alphaCount = 20;
            }
        } catch(ex) {
            debug("alphaDiv  error : " + ex.name + "   " + ex.message + "   " + ex);
        }
    },
    processAlphaDisappear: function() {
        try {
            if (alphaDiv.alphaCount > 20) {
                alphaDiv.setOpacity(alphaDiv.targetDiv, alphaDiv.alphaCount);
                alphaDiv.alphaCount = alphaDiv.alphaCount - alphaDiv.alphaSpeed * 5;
                setTimeout("alphaDiv.processAlphaDisappear()", alphaDiv.timeOut);
            } else {
                alphaDiv.alphaCount = 20;
                alphaDiv.targetDiv.style.display = "none";
            }
        } catch(ex) {
            debug("alphaDiv  error : " + ex.name + "   " + ex.message + "   " + ex);
        }
    },
    setOpacity: function(element, opacity) {
        element.style.filter = "alpha(opacity=" + opacity > 100 ? 100: opacity + ")";
        element.style.opacity = opacity > 100 ? 100: opacity / 100;
    },
    targetDiv: null,
    alphaSpeed: 3,
    alphaCount: 20,
    timeOut: 50
};
function minUploadDiv() {
    try {
        var uploadFileDragDiv = top.frames[2].document.getElementById("uploadFileDragDiv");
        uploadFileDragDiv.style.height = 55 + "px";
        alphaDiv.setOpacity(uploadFileDragDiv, 50);
        var progressBar = top.frames[2].document.getElementById("progressBar");
        progressBar.style.display = 'none';
        window.clearTimeout(upLoadInFrameTemp.timeoutIntervalId);
        var headerInput = top.frames[2].document.getElementById("headerInput");
        headerInput.onclick = maxUploadDiv;
        upLoadInFrameTemp.selectArray.longCheck = 3000;
    } catch(ex) {
        debug("minUploadDiv  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function maxUploadDiv() {
    try {
        var uploadFileDragDiv = top.frames[2].document.getElementById("uploadFileDragDiv");
        uploadFileDragDiv.style.height = 160 + "px";
        alphaDiv.setOpacity(uploadFileDragDiv, 100);
        var progressBar = top.frames[2].document.getElementById("progressBar");
        progressBar.style.display = 'block';
        intervalProcess();
        refreshAll();
        var headerInput = top.frames[2].document.getElementById("headerInput");
        headerInput.onclick = minUploadDiv;
        upLoadInFrameTemp.selectArray.longCheck = 1000;
    } catch(ex) {
        debug("maxUploadDiv  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function closeUploadDiv() {
    try {
        var uploadFileDragDiv = document.getElementById("uploadFileDragDiv");
        alphaDiv.startAlphaDisappear(uploadFileDragDiv);
        disApear = true;
    } catch(ex) {
        debug("closeUploadDiv  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function setUpLoadHint(text) {
    try {
        document.getElementById('theMeter').style.display = 'none';
        document.getElementById('finallyHintDiv').style.display = 'block';
        var finallyHint = document.getElementById('finallyHint');
        if (finallyHint) {
            finallyHint.innerHTML = text;
        }
        var upLoadButtonOk = document.getElementById("upLoadButtonOk");
        if (upLoadButtonOk) {
            if (upLoadInFrameTemp.hasWait) {
                upLoadButtonOk.disabled = "true";
            } else {
                upLoadButtonOk.disabled = "";
                upLoadButtonOk.focus();
            }
        }
    } catch(ex) {
        debug("setUpLoadHint  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function changeSelectClass(count, countnone) {
    var trStyleNew = document.getElementById("trStyle" + count);
    var trStyleOld = document.getElementById("trStyle" + countnone);
    if (trStyleOld) {
        trStyleOld.className = "";
    }
    if (trStyleNew) {
        trStyleNew.className = "trbgcolor2";
    }
    upLoadInFrameTemp.selectedFile = count;
}
function doShowDetail(count) {
    try {
        if (count == upLoadInFrameTemp.selectedFile)
        return;
        var tempfile = upLoadInFrameTemp.fileArray[count];
        changeSelectClass(count, upLoadInFrameTemp.selectedFile);
        upLoadInFrameTemp.selectedFile = count;
        var theMeter = document.getElementById('theMeter');
        var finallyHintDiv = document.getElementById('finallyHintDiv');
        if (upLoadInFrameTemp.selectId == count && !tempfile.finish && !tempfile.cancel) {
            theMeter.style.display = 'block';
            finallyHintDiv.style.display = 'none';
        } else {
            var finallyHint = document.getElementById("finallyHint");
            var upLoadButtonOk = document.getElementById("upLoadButtonOk");
            if (tempfile.error) {
                finallyHint.innerHTML = tempfile.fileName + tempfile.errorContent;
            } else if (tempfile.cancel) {
                finallyHint.innerHTML = tempfile.fileName + " " + Resource.im.cancel;
            } else if (tempfile.wait) {
                finallyHint.innerHTML = tempfile.fileName + " " + Resource.im.waitupload;
            } else if (tempfile.finish) {
                finallyHint.innerHTML = tempfile.fileName + " " + Resource.im.finishupload;
            }
            theMeter.style.display = 'none';
            finallyHintDiv.style.display = 'block';
            if (upLoadInFrameTemp.hasUpLoadFile) {
                upLoadButtonOk.disabled = "true";
            } else {
                upLoadButtonOk.disabled = "";
                upLoadButtonOk.focus();
            }
        }
    } catch(ex) {
        debug("doShowDetail  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function cancelProgress() {
    var currHashCode = upLoadInFrameTemp.selectArray.hashCode;
    upLoadInFrameTemp.selectArray.willCancel = true;
    this.NextStep = function() {
        try {
            if (upLoadInFrameTemp.uploadStatus && upLoadInFrameTemp.fileuploadremainTime <= 5 && upLoadInFrameTemp.fileuploadremainTime >= 0) {
                alert(Resource.im.min5second);
                return;
            }
            var currSelect = upLoadInFrameTemp.selectArray;
            if (currSelect.error) {
                return;
            }
            if (currHashCode != currSelect.hashCode) {
                alert(Resource.im.cancelfinish);
                return;
            }
            debug("点击了确认按钮,准备进入setTimeout");
            setTimeout(function() {
                try {
                    if (upLoadInFrameTemp.fileArray[currHashCode].finish) {
                        if (upLoadInFrameTemp.fileArray[currHashCode].error) {
                            return;
                        } else {
                            alert(Resource.im.cancelfinish);
                            return;
                        }
                    }
                    debug("点击了确认按钮,确认要取消上传");
                    upLoadInFrameTemp.selectArray.willCancel = false;
                    upLoadInFrameTemp.selectArray.cancelProgress();
                } catch(ex) {
                    debug(ex, 3, "cancelProgress setTimeout");
                }
            },
            1000);
        } catch(ex) {
            debug(ex, 3, "cancelProgress");
        }
    };
    confirm(Resource.common.areyousure, this);
    this.FalseStep = function() {
        debug("点击了取消按钮 还原状态");
        upLoadInFrameTemp.selectArray.willCancel = false;
    };
}
var firstFormObj;
var firstArguments;
function addOnefileUpLoad(filename, formObj, sendIQfunc) {
    try {
        if (upLoadInFrameTemp.initDiv) {
            addFileUploadArray(formObj, arguments);
            createFileCell(filename, true);
            if (!upLoadInFrameTemp.hasUpLoadFile) {
                sendIQfunc();
                upLoadInFrameTemp.changeSelect();
            }
        } else {
            firstFormObj = formObj;
            firstArguments = arguments;
            sendIQfunc();
        }
    } catch(ex) {
        debug("addOnefileUpLoad  error : " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function setListen() {
    clearInterval(upLoadInFrameTemp.processTimeout);
    upLoadInFrameTemp.processTimeout = setInterval(function() {
        upLoadInFrameTemp.processListenning();
    },
    10000);
}