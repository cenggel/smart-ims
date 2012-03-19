// JavaScript Document
common_is_ie = Browser.Engine.trident;
common_ie_version = navigator.userAgent.indexOf("MSIE 7.0") == -1;
c_mNum = 2;
c_sInfo = 0;
online_ids_stamp = 0;
var editorGlobal = {
    ok: false,
    content: ""
}
var moduleBindingState = {};
function toggle(id) {
    if ($(id)) {
        $(id).style.display = ($(id).style.display == 'block') ? 'none': 'block';
    } else {
        debug('toggle ' + id + ' failed.');
    }
};
function isBlank(str) {
    str = str.replace(/(^[\s]*)|([\s]*$)/g, "");
    if (str == null || str == "" || str.length < 1) {
        return true;
    } else {
        return false;
    }
}
function convertToDate(str) {
    try {
        if (str == "") {
            return new Date();
        }
        var tAll = (str + "").split(" ");
        var tempAr = tAll[0].split("-");
        var tempTime = tAll[1] ? tAll[1].split(":") : [];
        var tDate;
        if (tempTime[0]) {
            if (tempTime[1]) {
                if (tempTime[2]) {
                    tDate = new Date(tempAr[0], tempAr[1] - 1, tempAr[2], tempTime[0], tempTime[1], tempTime[2]);
                    return tDate;
                }
                tDate = new Date(tempAr[0], tempAr[1] - 1, tempAr[2], tempTime[0], tempTime[1]);
                return tDate;
            }
            tDate = new Date(tempAr[0], tempAr[1] - 1, tempAr[2], tempTime[0]);
        } else {
            tDate = new Date(tempAr[0], tempAr[1] - 1, tempAr[2]);
        }
        return tDate;
    } catch(ex) {
        alert("!!!!");
    }
}
function reloginByDwr(id, loginName, password, token) {
    dwrService.relogin(id, loginName, hex_sha1(hex_sha1(password) + token), token, loginByDwrCaller);
};
function loginByDwrCaller(map) {
    if (map.success) {
        if (map.flash || window.reload) {
            parent.location.reload();
        } else {
            try {
                parent.closeReloginMe();
            } catch(e) {
                alert("登录成功");
            }
        }
    } else {
        $('errorInfo').innerHTML = map.error;
        return;
    }
};
function checkEmail(email) {
    if (!email) {
        return false;
    }
    return /^([\w\-]{1,}\.?)*[\w\-]{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(email);
};
var debugErrorCount = 0;
var debugErrorText = '';
function handleCommonError(msg, url, l)
 {
    var txt = "There was an error on this page.\n\n";
    txt += "Error: " + msg + "\n";
    txt += "URL: " + url + "\n";
    txt += "Line: " + l + "\n\n";
    txt += "Click OK to continue.\n\n";
    if (debugErrorText != l) {
        debugErrorText = l;
        debugErrorCount = 0;
    } else {
        debugErrorCount = debugErrorCount + 1;
    }
    if (debugErrorCount > 20) {
        debugErrorCount = 0;
        return;
    }
    try {
        debug(txt);
    } catch(ex) {};
    dwrService.recordErrorFromBrowser(txt, 
    function() {});
    return true;
};
function strToHtml(s) {
    if (!s) return "";
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/' '/g, "&nbsp;");
    s = s.replace(/\r\n/g, '<br>');
    s = s.replace(/\n/g, '<br>');
    return s;
}
function addPrefixSpace(level) {
    var s = "";
    for (var i = 1; i < level; i = i + 1) {
        s += "　 ";
    }
    return s;
};
function getRightPageEvent(event, max, current) {
    var right = 1;
    try {
        current = parseInt(current, 10);
        if (!isNaN(current)) {
            if (current <= 0) right = 1;
            else if (current > max) right = max;
            else right = current;
        }
    } catch(e) {}
    eval(event.replace("{p}", right));
};
function timeCheck(executeFunStr, checkFunStr, intervalMillisecond) {
    var returnValue = false;
    try {
        eval("returnValue = " + checkFunStr);
    } catch(e) {
        returnValue = false;
        debug("timeCheck:" + e.message);
    }
    if (returnValue == false) {
        var interval_tmp = intervalMillisecond + intervalMillisecond * 0.3;
        setTimeout(executeFunStr, 0);
        setTimeout("timeCheck(\"" + executeFunStr + "\",\"" + checkFunStr + "\"," + interval_tmp + ")", interval_tmp);
    } else {
        return false;
    }
}
function checkFileType(filePath) {
    var forbidFileTypes = Resource.common.forbidFileTypes.split(",");
    if (filePath == null || filePath.length == 0)
    return false;
    filePath = filePath.toLowerCase();
    for (var i = 0; i < forbidFileTypes.length; i++) {
        if (isBlank(forbidFileTypes[i])) {
            continue;
        }
        var pos = filePath.indexOf(forbidFileTypes[i]);
        if (pos != -1) {
            return false;
        }
    }
    return true;
};
var taUtil = {
    changeEffect: function(a, id) {
        if (a.value.trim()) {
            $(id).disabled = false;
        } else {
            $(id).disabled = true;
        }
    },
    setDefault: function(objectId, content) {
        if (objectId.value.trim() == '') {
            objectId.value = content;
        }
    },
    checkDefault: function(objectId, content) {
        if (objectId.value == content) {
            objectId.value = '';
        }
    }
};
function getAllSortItem(confirmFunc) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/include/sortPage.jsp", mgtPopupId());
    dwr.backCallFunc = function() {
        getAllSortItemCall(confirmFunc);
        mgtPopup();
        var h = window.getSize().y / 2 + 80;
        debug("sortPageContentContainer.y==" + $('sortPageContentContainer').getSize().y + ";h==" + h);
        if ($('sortPageContentContainer').getSize().y > h) {
            $('sortPageContentContainer').setStyle('height', h);
        }
    };
    dwr.dwrProxy();
}
function getAllSortItemCall(confirmFunc) {
    var allInput = document.getElementsByTagName("input");
    var allSortItem = [];
    var one;
    for (var i = 0; i < allInput.length; i += 1) {
        one = allInput[i];
        if (one.type == "hidden" && one.id.indexOf("sortItem") != -1) {
            var indexId = one.id.substring(8);
            allSortItem.push({
                id: indexId,
                value: one.value
            });
        }
    }
    drawSortItem(allSortItem, confirmFunc);
}
function drawSortItem(allSortItem, confirmFunc) {
    var sortList = $("sortList");
    var tempString = "";
    for (var i = 0; i < allSortItem.length; i++) {
        tempString += "<li id='sortList_sortList" + allSortItem[i].id + "'>" + allSortItem[i].value + "</li>";
    }
    sortList.innerHTML = tempString;
    new Sortables(sortList, {
        clone: true,
        onComplete: function() {
            $("sortConfirmButton").disabled = "";
            $("sortConfirmButton").removeClass("btn_sty_noclk");
            $("sortConfirmButton").addClass("btn_sty");
        }
    });
    $("sortConfirmButton").onclick = function() {
        try {
            var sortedList = new Array();
            var allLi = document.getElementsByTagName("li");
            var one;
            for (var i = 0; i < allLi.length; i += 1) {
                one = allLi[i];
                if (one.id.indexOf("sortList") != -1) {
                    var indexId = one.id.substring(17);
                    sortedList.push({
                        'id': indexId,
                        'inner': one.innerHTML
                    })
                }
            }
            confirmFunc(sortedList);
        } catch(ex) {}
    };
}
var timeoutFunc = null;
var helper = {
    checkDWRReturnValue: function(map) {
        if (map.error) {
            if (typeof map.error == "string") {
                alert(map.error);
                return true;
            }
            var errorInfo = "";
            for (var i = 0; i < map.error.length; i = i + 1) {
                if (i == 0) {
                    errorInfo = map.error[0];
                } else {
                    errorInfo += "<br>" + map.error[i];
                }
            }
            alert(errorInfo);
            return true;
        }
        if (map.noright) {
            alert(map.noright);
            setTimeout("top.location='" + globalCp + "/';", 5000);
            return true;
        }
        if (map.needAdminLogin) {
            alert(Resource.common.needAdminLogin);
            setTimeout("top.location='" + globalCp + "/';", 5000);
            return true;
        }
        try {
            if (map.toolBar)
            mgtToolBar.next(map.toolBar);
        } catch(ex) {
            debug(" toolBar " + ex.name + ",  " + ex.message + ", " + new Date(), 4);
        }
        return false;
    },
    loginDiv: function() {
        var a = map.source;
        $(mgtPopupId({
            num: 2
        })).innerHTML = a;
        mgtPopup({
            num: 2
        });
        a.stripScripts(true);
    }
};
var DwrBackCall = new Class({
    initialize: function(options) {
        this.num = 0;
        this.urls = [];
        this.divIds = [];
        this.positions = [];
        this.backCallFunc = null;
        this.errorBackCallFunc = null;
        this.timeoutFunc = null;
        this.extDwrRef = null;
        $extend(this, options);
    },
    setTimeoutFunc: function(func) {
        timeoutFunc = func;
        debug("set success = " + timeoutFunc);
    },
    addOneUrl: function(url, divId) {
        this.urls[this.num] = url;
        this.divIds[this.num] = divId;
        this.num += 1;
    },
    addOneUrlBefore: function(url, divId) {
        this.urls[this.num] = url;
        this.divIds[this.num] = divId;
        this.positions[this.num] = "before";
        this.num += 1;
    },
    addOneUrlAfter: function(url, divId) {
        this.urls[this.num] = url;
        this.divIds[this.num] = divId;
        this.positions[this.num] = "after";
        this.num += 1;
    },
    addOneUrlTop: function(url, divId) {
        this.urls[this.num] = url;
        this.divIds[this.num] = divId;
        this.positions[this.num] = "top";
        this.num += 1;
    },
    addOneUrlBottom: function(url, divId) {
        this.urls[this.num] = url;
        this.divIds[this.num] = divId;
        this.positions[this.num] = "bottom";
        this.num += 1;
    },
    replaceOneUrl: function(url, divId) {
        this.urls[this.num] = url;
        this.divIds[this.num] = divId;
        this.positions[this.num] = "replace";
        this.num += 1;
    },
    getAllUrls: function() {
        var tempUrl = [];
        if (this.urls.length > 0) {
            var lastUrl = this.urls[this.urls.length - 1];
            lastUrl += lastUrl.indexOf('?') == -1 ? '?': '&';
            lastUrl += 'online_ids_stamp=' + online_ids_stamp;
            this.urls[this.urls.length - 1] = lastUrl;
        }
        tempUrl = this.urls.concat(tempUrl);
        return tempUrl;
    },
    dwrProxy: function(obj) {
        if (!obj && yqtDraft.enable && yqtDraft.checkChange('mail')) {
            this.NextStep = function() {
                yqtDraft.enable = false;
                this.dwrProxy();
            }
            this.FalseStep = function() {
                if (selectLi && $(selectLi) && $(selectLi) != null) {
                    $(selectLi).removeClass("now_on");
                    selectLi = "li_1";
                }
            }
            confirm(Resource.common.draftLeaveTip, this);
            return;
        } else if (obj && obj.check == false) {
            yqtDraft.exeInit = false;
        } else if (obj && obj.cancel) {}
        var me = this;
        dwrService.getDWRIncludeURL(curPageUser, this.getAllUrls(), 
        function(m) {
            me.backToDwrUrls(m);
        });
    },
    backToDwrUrls: function(map) {
        try {
            if (yqtDraft.exeInit) {
                yqtDraft.init();
            } else {
                yqtDraft.exeInit = true;
            }
            if (helper.checkDWRReturnValue(map)) {
                if (this.errorBackCallFunc) {
                    try {
                        this.errorBackCallFunc(map);
                    } catch(ex) {
                        debug("this.errorBackCallFunc, map: " + map + " " + ex.name + " ," + ex.message, 2, this.errorBackCallFunc);
                    }
                }
                return;
            }
            try {
                for (var i in map.source) {
                    if (i == "Unique" || isNaN(i)) {
                        continue;
                    }
                    if (this.divIds[i]) {
                        try {
                            var position = this.positions[i];
                            if (position) {
                                var divHtml = map.source[i].stripScripts();
                                switch (position) {
                                case "before":
                                    var myElement = new Element('div', {
                                        'html': divHtml
                                    });
                                    myElement.inject($(this.divIds[i]), 'before');
                                    break;
                                case "after":
                                    var myElement = new Element('div', {
                                        'html': divHtml
                                    });
                                    myElement.inject($(this.divIds[i]), 'after');
                                    break;
                                case "top":
                                    var myElement = new Element('div', {
                                        'html': divHtml
                                    });
                                    myElement.inject($(this.divIds[i]), "top");
                                    break;
                                case "bottom":
                                    var myElement = new Element('div', {
                                        'html': divHtml
                                    });
                                    myElement.inject($(this.divIds[i]), "bottom");
                                    break;
                                case "replace":
                                    new Element('div', {
                                        'html': divHtml
                                    }).replaces($(this.divIds[i]));
                                    break;
                                }
                            } else {
                                $(this.divIds[i]).set('html', map.source[i]);
                            }
                        } catch(ex1) {
                            debug("801 not exist " + this.divIds[i] + " i:" + i);
                            return;
                        }
                        map.source[i].stripScripts(true);
                    }
                }
            } catch(ex) {
                debug(" backToDwrUrls error:" + ex.name + ", " + ex.message + " ,  " + ex);
            }
            if (this.backCallFunc) {
                try {
                    this.backCallFunc(map);
                } catch(ex) {
                    debug("this.backCallFunc, map: " + map + " " + ex.name + " ," + ex.message, 2, this.backCallFunc);
                }
            }
            if (map.success) {
                mgtInfo.show(map.success);
            }
        } catch(ex) {
            debug(ex, "backToDwrUrls");
        } finally {}
    }
});
function effectiveJavaScript(str, hasLoad) {
    if (window.execScript) {
        window.execScript(str);
    } else {
        window.eval(str);
    }
};
function showDwrPage(url, div) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl(url, div);
    dwr.dwrProxy();
};
function showDwrPageNoDraft(url, div) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl(url, div);
    dwr.dwrProxy({
        check: false
    });
};
addOneToForum = function(divId, allItemList, userId) {
    editorGlobal.ok = true;
    var strTemp = $(divId).innerHTML
    editorGlobal.content = strTemp;
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/include/addforum.jsp?item=" + allItemList + "&userId=" + userId, mgtPopupId());
    dwr.backCallFunc = function(map) {
        mgtPopup();
        setTimeout(function() {
            editorGlobalInit('addForumEditor');
        },
        1000);
        $("addForumDiv").setStyle("height", Window.getSize().y / 2);
    };
    dwr.dwrProxy();
};
addOneToKnowledge = function(divId, allItemList, oldAuthor, from) {
    editorGlobal.ok = true;
    var strTemp = $(divId).innerHTML
    editorGlobal.content = strTemp;
    toKnowledgeOldAuthor = oldAuthor;
    toKnowledgeFrom = from;
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/include/addknowledge.jsp?items=" + allItemList, mgtPopupId());
    dwr.backCallFunc = function(map) {
        mgtPopup();
        setTimeout(function() {
            editorGlobalInit('addKnowledgeEditor');
        },
        1000);
        $("addknowledgeDiv").setStyle("height", Window.getSize().y - 110);
    };
    dwr.dwrProxy({
        check: false
    });
};
transmitInf = function(divId, fromType, authorId) {
    transmitFromType = fromType;
    transmitAuthorId = authorId;
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/include/transmit.jsp", mgtPopupId());
    dwr.backCallFunc = function() {
        showUserListTree();
        var strTemp = ("" + $(divId).innerHTML).replace(/<br.*?>/gi, "\r\n").replace(/<li.*?>/gi, "\r\n").stripTags().replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
        $("transmitContent").value = strTemp.trim();
        mgtPopup();
        var adjustTo = Window.getSize().y / 2 + 80;
        debug("transmitDiv.y==" + $("transmitDiv").getSize().y + ";adjustTo==" + adjustTo);
        if ($("transmitDiv").getSize().y > adjustTo) {
            $("transmitDiv").setStyle("height", adjustTo);
        }
    };
    dwr.dwrProxy();
};
extendCheck = function(id) {
    var corr = $(id);
    if (corr.type == 'checkbox' && !corr.disabled) {
        if (corr.checked) {
            corr.checked = false;
        } else {
            corr.checked = true;
        }
    } else if (corr.type == 'radio' && !corr.disabled) {
        corr.checked = true;
    }
}
function Compass() {
    this.compass = [];
    this.setCompass = function(lists, curr, maxpage) {
        this.compass = lists.split(",");
        this.curr = parseInt(curr);
        this.maxpage = parseInt(maxpage);
        this.beginIdx = this.curr;
        this.endIdx = this.curr;
    };
    this.setCallUrl = function(url) {
        this.callUrl = url;
    };
    this.initButtons = function(dbId, func) {
        var preButton;
        var forwardButton;
        preButton = $("preButton");
        forwardButton = $("forwardButton");
        var pre = this.getPreId(dbId);
        if (pre == 0 && this.callUrl) {
            if (this.beginIdx - 1 > 0) {
                this.beginIdx = this.beginIdx - 1;
                var arr = this.callBackIds(this.beginIdx);
                this.compass = arr.extend(this.compass);
                pre = this.getPreId(dbId);
            }
        }
        var forward = this.getForwardId(dbId);
        if (forward == 0 && this.callUrl) {
            this.endIdx = (this.endIdx > 0) ? (this.endIdx + 1) : 1;
            if (this.maxpage >= this.endIdx) {
                var arr = this.callBackIds(this.endIdx);
                this.compass.extend(arr);
                forward = this.getForwardId(dbId);
            }
        }
        try {
            if (pre == 0) {
                if (preButton.get('tag') == 'a') {
                    preButton.innerHTML = '<span class="remark_g">' + Resource.common.back + '</span>';
                    preButton.style.cursor = 'default';
                    preButton.style.textDecoration = 'none';
                } else {
                    preButton.disabled = true;
                }
            } else {
                if (preButton.get('tag') == 'a') {
                    preButton.innerHTML = Resource.common.back;
                    preButton.style.cursor = 'pointer';
                    preButton.style.textDecoration = 'none';
                } else {
                    preButton.disabled = false;
                }
                preButton.addEvent('click', 
                function() {
                    eval(func.replace("{id}", pre));
                });
            }
            if (forward == 0) {
                if (forwardButton.get('tag') == 'a') {
                    forwardButton.innerHTML = '<span class="remark_g">' + Resource.common.forward + '</span>';
                    forwardButton.style.cursor = 'default';
                    forwardButton.style.textDecoration = 'none';
                } else {
                    forwardButton.disabled = true;
                }
            } else {
                if (forwardButton.get('tag') == 'a') {
                    forwardButton.innerHTML = Resource.common.forward;
                    forwardButton.style.cursor = 'pointer';
                    forwardButton.style.textDecoration = 'none';
                } else {
                    forwardButton.disabled = false;
                }
                forwardButton.addEvent('click', 
                function() {
                    eval(func.replace("{id}", forward));
                });
            }
        } catch(e) {
            debug(e.name + ",   " + e.message)
        }
    };
    this.removeIdInCompass = function(id) {
        if (this.compass.length == 0) return;
        var idarr = this.compass;
        for (var i = 0; i < idarr.length; i++) {
            if (idarr[i] == id) {
                idarr.splice(i, 1);
                return;
            }
        }
    };
    this.getPreId = function(dbId) {
        var len = this.compass.indexOf(dbId);
        if (len > 0)
        return this.compass[len - 1];
        return 0;
    };
    this.getForwardId = function(dbId) {
        var len = this.compass.indexOf(dbId);
        if (len < this.compass.length - 1 && len >= 0)
        return this.compass[len + 1];
        return 0;
    };
    this.callBackIds = function(curr) {
        var arr = [];
        debug('call curr:' + curr);
        new Request({
            url: this.callUrl.replace("{curr}", curr),
            async: false,
            onSuccess: function(txt) {
                if (!txt) return arr;
                arr = txt.clean().split(",");
            }
        }).send();
        debug('call arr:' + arr);
        return arr;
    };
};
function TimeSpan() {
    this.startDate = "";
    this.endDate = "";
    this.sel = 0;
    currGlobalVar = this;
    calendarButtonFunc = function() {
        var startDateT,
        endDateT;
        startDateT = getStartDate();
        endDateT = getEndDate();
        var startStr = startDateT.getFullYear() + "-" + (startDateT.getMonth() + 1) + "-" + startDateT.getDate();
        var endStr = endDateT.getFullYear() + "-" + (endDateT.getMonth() + 1) + "-" + endDateT.getDate();
        var sel = -1;
        if (!isTimeSpan()) {
            sel = $("selectToday").value;
        }
        currGlobalVar.curr = 1;
        currGlobalVar.sel = sel;
        currGlobalVar.startDate = startStr;
        currGlobalVar.endDate = endStr;
        currGlobalVar.listPage();
    };
    cancelButtonFunc = function() {
        currGlobalVar.cancelButton();
    };
};
try {
    var pos = {
        moduleAction: function() {
            showModule('/knowledge/myknowledge/index.jsp');
        },
        url: "/knowledge/myknowledge/first.jsp",
        div: "myknowledgeMain",
        moduleName: Resource.knowledge.my
    };
} catch(ex) {}
showAddKnowledgePage = function(type) {
    switch (type) {
    case 1:
        pos.moduleAction = function() {
            showModule('/knowledge/myknowledge/index.jsp');
        };
        pos.url = "/knowledge/myknowledge/first.jsp";
        pos.div = "myknowledgeMain";
        pos.moduleName = Resource.knowledge.my;
        break;
    case 2:
        pos.moduleAction = function() {
            showModule('/knowledge/epknowledge/index.jsp');
        };
        pos.url = "/knowledge/epknowledge/epknowledgelist.jsp?" + knEnterprise.listParam();
        pos.div = "epknowledgeMain";
        pos.moduleName = Resource.knowledge.ep;
        break;
    case 3:
        pos.moduleAction = function() {};
        pos.url = "";
        pos.div = "";
        break;
    }
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/knowledge/myknowledge/newknowledge.jsp", pos.div);
    dwr.dwrProxy();
}
showUserInfo = function(evt, userId) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/include/userinfo.jsp?userId=" + userId, mgtShow.getId());
    dwr.backCallFunc = function() {
        mgtShow.open(evt);
    }
    dwr.dwrProxy();
};
function setLeftHeight(outer, inner) {
    outer = $(outer);
    if (outer) {
        var y = window.getSize().y - 5;
        outer.setStyle("height", y - outer.getCoordinates().top);
    }
    if (inner && $(inner)) {
        inner = $(inner);
        inner.setStyle("height", y - inner.getCoordinates().top);
    }
    if (outer)
    return y - outer.getCoordinates().top;
}
subStr = function(str, len, suffix) {
    if ("undefined" != typeof(str) && str != null) {
        if (str.length > len) {
            str = str.substring(0, len) + suffix;
        }
    }
    return str;
}
function showModule(url) {
    g.go(url, "mainBody");
}
function selectAll() {
    var i = 1;
    while ($("check_" + i)) {
        $("check_" + i).checked = true;
        i = i + 1;
    }
}
function noSelectAll() {
    var i = 1;
    while ($("check_" + i)) {
        $("check_" + i).checked = false;
        i = i + 1;
    }
}
function AntiElection() {
    var i = 1;
    while ($("check_" + i)) {
        if ($("check_" + i).checked) {
            $("check_" + i).checked = false;
        } else {
            $("check_" + i).checked = true;
        }
        i = i + 1;
    }
}
function getCheckValue() {
    var ids = "";
    var i = 1;
    while ($("check_" + i)) {
        if ($("check_" + i).checked) {
            if (ids != "") {
                ids = ids + ",";
            }
            ids = ids + $("check_" + i).value;
        }
        i = i + 1;
    }
    return ids;
}
var passConstants = {
    include: /[_]/,
    unInclude: /[^_]/,
    level: 0,
    checkpass: function(newpass, bId) {
        passConstants.checkPasswordLevel(newpass, userInfo.userName, userInfo.email);
        if (passConstants.level == 0) {
            bId.className = "img_guild_le psd_no_safe";
        } else if (passConstants.level == 1) {
            bId.className = "img_guild_le psd_comm_safe";
        } else if (passConstants.level == 2) {
            bId.className = "img_guild_le psd_safe";
        } else if (passConstants.level == -1) {
            bId.className = "img_guild_le psd_safe_check";
        }
    },
    checkPasswordLevel: function(pass, userName, email) {
        var pattern = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/];
        if (pass.length < 8 || pass.length > 20) {
            passConstants.level = -1;
            return - 1;
        }
        if (pass == userName || pass == email) {
            passConstants.level = 0;
            return 0;
        } else {
            var times = 0;
            for (var i = 0; i < pattern.length; i++) {
                times += (pattern[i].test(pass) ? 1: 0);
            }
            if (times >= 3) {
                passConstants.level = 2;
                return 2;
            } else if (times >= 2) {
                passConstants.level = 1;
                return 1;
            } else {
                passConstants.level = 0;
                return 0;
            }
        }
    }
};
checkPassword = function(pw1, pw2) {
    if (pw1 == pw2) return 1;
    else return 0;
}
modifyUserProperty = function(hiddenDiv, userId, propertyType) {
    this.NextStep = function() {
        var dwr = new DwrBackCall();
        $(hiddenDiv).innerHTML = '';
        $(hiddenDiv).setStyle('display', 'none');
        dwr.backCallFunc = function() {
            debug("backCall==" + modifyUserProperty.backCall);
            if (modifyUserProperty.backCall) {
                debug("begin to execute backCall function");
                try {
                    modifyUserProperty.backCall();
                } catch(ex) {
                    debug("error info when execute backCallFunc :" + ex.error + ";" + ex.name + ";" + ex.message);
                }
            }
        }
        dwrService.modifyUserProperty(userId, propertyType, dwr.backToDwrUrls.bind(dwr));
    }
    confirm(Resource.common.areyousure, this);
}
showUserDefinedGroupPage = function(confirm, cancle, div, groupId_onedit, groupName_onedit, userIds) {
    var url = "/include/neworedituserdefinedgroup.jsp?userids=" + userIds + "&confirmBackcall=" + confirm + "&cancleBackcall=" + cancle;
    var dwr = new DwrBackCall();
    dwr.addOneUrl(url, div);
    dwr.backCallFunc = function() {
        $("groupId_onedit").value = groupId_onedit;
        $("groupName_onedit").value = groupName_onedit;
        showUserListTree();
    }
    $(div).setStyle('display', 'block');
    dwr.dwrProxy();
}
showGroupModuleRelationPage = function(confirm, cancle, currModule, s) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/include/tempmodulerelationshell.jsp?confirmBackcall=" + confirm + "&cancleBackcall=" + cancle + "&currModule=" + currModule, s);
    dwr.backCallFunc = function() {
        showUserListTree();
    }
    $(s).setStyle('display', 'block');
    dwr.dwrProxy();
}
showManageUserDefinedGroupPage = function(divId) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/include/manageuserdefinedgroup.jsp?showdiv=" + divId, divId);
    $(divId).setStyle('display', 'block');
    dwr.dwrProxy();
}
addOrUpdateUserDefinedGroup = function(callBack1, callBack2) {
    if ($("groupName_onedit").value.trim() == "") {
        alert(Resource.common.groupName);
        return false;
    }
    var dwr = new DwrBackCall();
    dwr.backCallFunc = function(map) {
        if (map.hasSameName) {
            alert(map.tipInfo);
            return;
        }
        if (callBack1) {
            callBack1();
        }
        if (callBack2) {
            setTimeout(callBack2, '1');
        }
    }
    dwrService.addOrUpdateUserDefinedGroup($("groupId_onedit").value, $("groupName_onedit").value.trim(), $("userIds").value, dwr.backToDwrUrls.bind(dwr));
}
function showSourceImg(url, ctxPath) {
    var x = window.screen.width - 50;
    var y = window.screen.height - 50;
    var winW = (common_is_ie) ? (500 + 18) : 500;
    var winH = 315;
    var winX = (x - winW) / 2;
    var winY = (y - winH) / 2;
    if (!ctxPath) ctxPath = '';
    window.open(ctxPath + "/imgLoading.jsp?u=" + encodeURIComponent(url), "", "top=" + winY + ",left=" + winX + ",width=" + winW + ",height=" + winH + ",scrollbars=yes,resizable=yes,toolbar=no");
}
smartToggle = function(elm) {
    if (elm.getStyle('display') == 'block') {
        elm.setStyle('display', 'none');
    } else {
        elm.setStyle('display', 'block');
    }
}
showCategoryTree4Relation = function() {
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/knowledge/myknowledge/selectrelation.jsp", mgtPopupId({
        num: 2
    }));
    dwr.backCallFunc = paintTree4nkRelation;
    dwrService.getKCategoryTree4Relation(dwr.getAllUrls(), dwr.backToDwrUrls.bind(dwr));
}
paintTree4nkRelation = function(map) {
    mgtPopup({
        num: 2
    });
    var options = {
        treeDivId: 'selectRelationTree',
        treeName: 'knowledgeSelectRelationTree',
        onload: function() {
            var wdt = allTreeMap['knowledgeSelectRelationTree'];
            wdt.root.toggle(true);
            wdt.checkNodesByIds(wdt.root.id);
        },
        hasCheckbox: true,
        setHeight: false
    };
    createCommonTree(map.jsonTree, options);
}
var selectNumber = 0;
function selectStatus(status, ispopup) {
    if (selectNumber < 0) selectNumber = 0;
    if (Browser.Engine.trident4) {
        if (ispopup) {
            if (status == "hidden") {
                selectNumber++;
                var id = $(mgtPopupId());
                debug("hidden selectNumber: " + selectNumber + ", id: " + id);
                if (selectNumber > 1) {
                    if (id && id.getStyle('display') != "none") {
                        id.getElements('select').each(function(node) {
                            node.style.visibility = 'hidden'
                        });
                    }
                    return;
                }
                $$('select', 'object', 'embed').each(function(node) {
                    node.style.visibility = 'hidden'
                });
                if (selectNumber == 1 && id && id.getStyle('display') != "none") {
                    id.getElements('select').each(function(node) {
                        debug("selectNumber:  select ti visible");
                        node.style.visibility = 'visible'
                    });
                }
            } else {
                selectNumber--;
                debug("not hidden selectNumber: " + selectNumber);
                if (selectNumber > 0) {
                    var id = $(mgtPopupId());
                    if (id && id.getStyle('display') != "none") {
                        id.getElements('select').each(function(node) {
                            node.style.visibility = 'visible'
                        });
                    }
                    return;
                }
                $$('select', 'object', 'embed').each(function(node) {
                    node.style.visibility = 'visible'
                });
            }
        } else {
            if (status == "hidden") {
                $$('select', 'object', 'embed').each(function(node) {
                    node.style.visibility = 'hidden'
                });
            } else {
                $$('select', 'object', 'embed').each(function(node) {
                    node.style.visibility = 'visible'
                });
            }
        }
    }
};
function showAwokeDetail(id, me, type) {
    me = $(me);
    var dwr = new DwrBackCall();
    var targetUrl = "/index/awoke/awoke_detail_pop.jsp?id=" + id;
    if (type == 13)
    targetUrl = "/index/awoke/awoke_detail_pop4docTransfer.jsp?id=" + id;
    dwr.addOneUrl(targetUrl, mgtPopupId());
    dwr.backCallFunc = function(map) {
        mgtPopup({
            needOverlay: false
        });
        if (!me) return;
        var meTagName = me.get('tag');
        if (meTagName == 'a') {
            var children = me.getChildren("span");
            if (children) {
                children.each(function(item) {
                    item.dispose();
                });
            }
            children = me.getChildren("b");
            if (children) {
                children.each(function(item) {
                    var num = 1;
                    if (type == 13) {
                        var title = new Element('div');
                        title.set('text', item.get('text'));
                        title.setStyle('display', 'inline');
                        title.inject(item, 'before');
                        item.dispose();
                    } else {
                        if (item.getFirst('span')) {
                            item.getFirst('span').dispose();
                        }
                        me.set('text', item.get('text'));
                        item.dispose();
                    }
                });
            }
            var t = me.getParent('td');
            if (!t) return;
            var picTd = t.getPrevious('td');
            if (!picTd) return;
            t = picTd.getElement('b');
            if (!t) return;
            t.removeClass('sno_comp_ico');
            t.addClass('scomp_ico');
            var checkTd = picTd.getPrevious('td');
            if (!checkTd) return;
            t = checkTd.getElement('input');
            if (!t) return;
            t.set("disabled", "true");
        } else if (meTagName == 'span') {
            var t = me.getPrevious('a');
            if (!t) return;
            var b = t.getElement('b');
            if (!b) return;
            t.set('text', b.get('text'));
            b.dispose();
            me.dispose();
        }
    };
    dwr.dwrProxy();
}
function openWin(url, width, height, x, y) {
    var scrWidth = screen.width;
    var scrHeight = screen.height;
    var winW = width || 750;
    var winH = height || 490;
    winW = (winW > scrWidth) ? scrWidth: winW;
    winH = (winH > scrHeight) ? scrHeight: winH;
    var winX = x || (scrWidth - winW) / 2;
    var winY = y || (scrHeight - winH) / 2;
    if (url.contains('?')) url = url + "&r=" + new Date().getTime();
    else url = url + "?r=" + new Date().getTime();
    window.open(url, "", "top=" + winY + ",left=" + winX + ",width=" + winW + ",height=" + winH + ",scrollbars=yes,toolbar=no,,resizable=yes");
}
window.openWin = openWin;
function showTrackPop(evt, id) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/workflow/track/track_detail_pop.jsp?id=" + id, mgtPopupId());
    dwr.backCallFunc = function(map) {
        mgtPopup();
    };
    dwr.dwrProxy();
}
function showDownPop(id, type, popnum) {
    var dwr = new DwrBackCall();
    var url = '';
    if (!type) return;
    if (type == 'RA8B6') {
        url = "/mydoc/sysdoc/downRecordPop.jsp?relationId=" + id + "&type=" + type
        if (window.fromClient) {
            url += "&fc=true";
        }
    } else if (type == 'RA8B2') {
        url = "/mydoc/sysdoc/downRecordPopIM.jsp?id=" + id + "&type=" + type;
    } else if (type == 'RA8B4') {
        url = "/mydoc/sysdoc/downRecordPopMail.jsp?relationId=" + id + "&type=" + type;
    } else if (type == 'RA17B1') {
        url = "/mydoc/sysdoc/downRecordPopIgoal.jsp?relationId=" + id + "&type=" + type;
    } else {
        url = "/mydoc/box/downloadrecord.jsp?relationId=" + id;
    }
    var obj = {
        needOverlay: false
    };
    if (popnum) obj = {
        num: popnum
    };
    dwr.addOneUrl(url, mgtPopupId(obj));
    dwr.backCallFunc = function(map) {
        mgtPopup(obj);
    };
    dwr.dwrProxy();
}
function showRA2B2Pop(id, type) {
    var dwr = new DwrBackCall();
    var url = '';
    if (!type) return;
    url = "/mydoc/box/downloadRA2B2Record.jsp?type=RA2B2&fileId=" + id;
    var obj = {
        needOverlay: false
    };
    dwr.addOneUrl(url, mgtPopupId(obj));
    dwr.backCallFunc = function(map) {
        mgtPopup(obj);
    };
    dwr.dwrProxy();
}
function getfileUrl(id, type, popnum, im) {
    var dwr = new DwrBackCall();
    var url = '';
    if (!type) return;
    if (type == 'RA8B6') {
        url = "/mydoc/sysdoc/downRecordPop.jsp?relationId=" + id + "&type=" + type
    } else if (type == 'RA8B2' || im == 'im') {
        url = "/mydoc/sysdoc/downRecordPopIM.jsp?id=" + id + "&type=" + type;
    } else if (type == 'RA8B4') {
        url = "/mydoc/sysdoc/downRecordPopMail.jsp?relationId=" + id + "&type=" + type;
    } else {
        url = "/fulltextsearch/downloadrecord.jsp?relationId=" + id;
    }
    return url;
}
function ubComm(event, arg) {
    event = event || window.event;
    event = new Event(event);
    var target = event.target;
    var div = new Element("ul", {
        'class': 'ub_comm',
        'styles': {
            'width': '75px'
        }
    });
    arg = arg || {
        f: '16112',
        t: '17036',
        o: 1,
        u: '17036'
    };
    new Element('li', {
        'html': '<b class="ico_le sys_awake_cl"></b>' + Resource.im.ubCommSendMsg,
        'events': {
            'click': function() {
                if (Browser.Platform.win) {
                    var from = arg.f ? arg.f: '0';
                    var tos = arg.t ? arg.t: '0';
                    var op = '';
                    switch (arg.o ? arg.o: 1) {
                    case 2:
                        op = 'muc';
                        break;
                    case 3:
                        op = 'msg';
                        break;
                    case 4:
                        op = 'sms';
                        break;
                    case 5:
                        op = 'ft';
                        break;
                    case 6:
                        op = 'login';
                        break;
                    default:
                        op = 'chat';
                    }
                    var link = '';
                    if (op != 'login') {
                        link = 'jingoal://|launch|' + from + '|' + op + '|' + tos;
                    } else {
                        link = 'jingoal://|login|' + from + '|' + tos;
                    }
                    if (window.opener) {
                        top.location.href = link;
                    } else if ($('hiddenIfram')) {
                        $('hiddenIfram').setProperty('src', link);
                    }
                } else {
                    alert('<div style=\'margin-left:20px;color:green;font-weight:bold;\'>' + Resource.im.ubCommCheckOSTip + '</div>');
                }
            },
            'mouseover': function() {
                this.className = 'mov';
            },
            'mouseout': function() {
                this.className = '';
            }
        }
    }).inject(div);
    new Element('li', {
        'html': '<b class="ico_le csend_mail_ico"></b>' + Resource.im.ubCommSendMail,
        'events': {
            'click': function() {
                window.open(globalCp + '/index.jsp?url=RA8B4C1&extra=' + (arg.u ? arg.u: '0'), '_blank', '');
            },
            'mouseover': function() {
                this.className = 'mov';
            },
            'mouseout': function() {
                this.className = '';
            }
        }
    }).inject(div);
    new Element('li', {
        'html': '<b class="ico_le csee_mess_ico"></b>' + Resource.im.ubCommLookInfo,
        'events': {
            'click': function() {
                showUserInfo(event, arg.u ? arg.u: '0');
            },
            'mouseover': function() {
                this.className = 'mov';
            },
            'mouseout': function() {
                this.className = '';
            }
        }
    }).inject(div);
    var op = {
        'content': div,
        'event': event,
        'curObj': target
    };
    mgtMenu.open(op);
};
var message2tm = {
    send: function(m) {
        try {
            top.tm.receiveMessage(m);
        } catch(e) {
            debug(e.name + ";" + e.message + ";" + e.error);
        }
    },
    go: function(u, f) {
        var m = {
            'reference': {
                'url': u,
                'file': f
            }
        };
        if (Browser.Engine.trident4) {
            var go = globalCp + "/frame.jsp?url=" + u;
            window.open(go);
            return;
        }
        message2tm.send(m);
        return false;
    },
    goMC: function(u, f) {
        if (Browser.Engine.trident4) {
            var go = sysAwokeURL;
            go += "?locale=" + language;
            window.open(go);
            return;
        }
        this.go(u, f);
    },
    goOut: function(domId, id) {
        var u = domId;
        if (id) {
            u = domId + "_" + id;
        }
        var m = {
            'reference': {
                'url': u
            }
        };
        if (Browser.Engine.trident4) {
            var go = this._getOutUrl();
            if (id) {
                go += "&id=" + id
            }
            window.open(go);
            return;
        }
        message2tm.send(m);
        return false;
    },
    _getOutUrl: function(url) {
        var go = igoalURL;
        var paramIndex = go.indexOf("?");
        if (paramIndex == -1) {
            go += "?";
        } else if (paramIndex >= go.length) {
            go += "&";
        }
        go += "locale=" + language;
        return go;
    }
}
window.message2tm = message2tm;
if (!Jin) var Jin = {};
var g = {
    loadpop2: function(url, backCall) {
        var dwr = new DwrBackCall();
        dwr.addOneUrl(url, mgtPopupId({
            num: 2
        }));
        dwr.backCallFunc = function() {
            if (backCall) {
                backCall();
            }
            mgtPopup({
                num: 2
            });
        };
        dwr.dwrProxy();
    },
    loadpop1: function(url) {
        var dwr = new DwrBackCall();
        dwr.addOneUrl(url, mgtPopupId());
        dwr.backCallFunc = function() {
            mgtPopup();
        };
        dwr.dwrProxy();
    },
    go: function(url, id, backCall) {
        var dwr = new DwrBackCall();
        if (backCall) {
            dwr.backCallFunc = function() {
                backCall();
            }
        }
        dwr.addOneUrl(url, id);
        dwr.dwrProxy();
    }
};
Jin.checkText = function(id, max, showId) {
    var text = $(id).get("value");
    var length = text.trim().length;
    if (length > max) {
        length = "<font color='red'>" + length + "</font>";
    }
    $(showId).set("html", "(" + length + "/" + max + ")");
};
Jin.BaseCondition = new Class({
    condit: new Hash(),
    queryString: function() {
        return this.condit.toQueryString();
    },
    set: function(key, value) {
        this.condit.set(key, value);
    },
    get: function(key) {
        return this.condit.get(key);
    }
});
var CommonUpload = {
    _upload: function(ID) {
        return $("uploadForm_" + ID).retrieve(ID);
    },
    submit: function(ID) {
        this._upload(ID).submitAnnex();
    },
    getAnnexs: function(ID) {
        return this._upload(ID).getAnnexs();
    },
    setCommonInfoSubmitFunc: function(ID, func) {
        this._upload(ID).submitFunc = func;
    },
    getCurrentEffectCount: function(ID) {
        return this._upload(ID).getFileInputs({
            action: 'selected'
        });
    },
    _submitCommonInfo: function(ID) {
        this._upload(ID).submitCommonInfo();
    },
    _hideLoadingMess: function(ID) {
        this._upload(ID).hideLoadingMess();
    },
    _showDel: function(ID) {
        this._upload(ID).showDel();
    }
};
var CommonUploadClass = new Class({
    initialize: function(ID, max) {
        this.ID = ID;
        this.submitFunc = '';
        this.max = (max == null ? 3: max);
        this.currCount = 0;
        this.annexs = [];
        this.initButtons();
        $("uploadForm_" + this.ID).store(ID, this);
    },
    initButtons: function() {
        this.getSpecialElems({
            tag: 'b'
        }).each(function(item) {
            item.onclick = null;
            item.addEvent('click', this.changeExistAnnexStatus.bindWithEvent(this));
        }.bindWithEvent(this));
        try {
            $("uploadForm_" + this.ID).getFirst('span').getFirst('a').addEvent('click', this.addInput.bindWithEvent(this));
        } catch(e) {}
        this.isAddAnnexsEnabled();
    },
    getExistAnnexs: function(arg) {
        var annexs = [];
        this.getSpecialElems({
            tag: 'b'
        }).each(function(item) {
            if (arg && 'removed' == arg.action ? item.hasClass('cback_ico') : true) {
                annexs[annexs.length] = item.getProperty('src');
            }
        });
        return (arg && 'array' == arg.back) ? annexs: annexs.length;
    },
    getFileInputs: function(arg) {
        var inputs = [];
        this.getSpecialElems({
            tag: 'input'
        }).each(function(item) {
            if (arg && 'selected' == arg.action ? item.value != '': true) {
                inputs[inputs.length] = item.getProperty('name');
            }
        });
        return inputs.length;
    },
    changeExistAnnexStatus: function(evt) {
        var bElem = evt.target;
        if (bElem.hasClass('cback_ico')) {
            if ((this.getFileInputs({
                action: 'selected'
            }) + this.getExistAnnexs() - this.getExistAnnexs({
                action: 'removed'
            })) < this.max) {
                bElem.removeClass('cback_ico').addClass('cdel_ico');
                bElem.getPrevious('a').removeClass('end');
                this.isAddAnnexsEnabled();
            } else {
                alert(Resource.fileUpload.upperLimit);
            }
        } else {
            bElem.removeClass('cdel_ico').addClass('cback_ico');
            bElem.getPrevious('a').addClass('end');
            this.isAddAnnexsEnabled();
        }
    },
    addInput: function(oneAttach) {
        var newDiv = new Element('div');
        newDiv.setStyle('margin-top', '2px');
        var temp = '';
        if (!oneAttach || oneAttach != 'one') {
            temp = '<a href="javascript:void(0);" class="fileuploaddel" style="color:blue;">' + Resource.fileUpload.remove + '</a><span class="fileuploadGdel remark_g" style="display:none">' + Resource.fileUpload.remove + '</span>';
        }
        if ($('approveEdit').value) {
            newDiv.set('html', '<input onkeydown="return false;" onpaste="return false;" type="file" name="' + this.currCount + '" size="28">&nbsp;' + temp);
        }
        else {
            newDiv.set('html', '<input onkeydown="return false;" onpaste="return false;" type="file" name="' + this.currCount + '" size="40">&nbsp;' + temp);
        }
        newDiv.getFirst('input[type=file]').addEvent('change', this.chooseAFile.bindWithEvent(this));
        if (!oneAttach || oneAttach != 'one') {
            newDiv.getFirst('a').addEvent('click', this.removeInput.bindWithEvent(this));
        }
        var fileDivs = $("uploadForm_" + this.ID).getFirst('div');
        if (!$('notimeloading')) {
            fileDivs.appendChild(new Element('div', {
                'id': 'notimeloading',
                'styles': {
                    'display': 'none',
                    'width': '245px',
                    'overflow': 'hidden'
                },
                'html': '<img src="' + globalCp + '/images/fileuploading.gif" border="0">'
            }));
        }
        fileDivs.appendChild(newDiv);
        this.currCount++;
        this.isAddAnnexsEnabled();
    },
    removeInput: function(evt) {
        try {
            evt.target.getParent('div').destroy();
        } catch(e) {}
        this.isAddAnnexsEnabled();
    },
    chooseAFile: function(evt) {
        var target = evt.target;
        var alertInfo = null;
        if ((this.getFileInputs({
            action: 'selected'
        }) + this.getExistAnnexs() - this.getExistAnnexs({
            action: 'removed'
        })) > this.max) {
            alertInfo = Resource.fileUpload.upperLimit;
        }
        this.getSpecialElems({
            tag: 'input'
        }).each(function(item) {
            if (item != target && item.value == target.value) {
                alertInfo = Resource.fileUpload.repeat;
                return;
            }
        });
        if (alertInfo) {
            var parentDiv = target.getParent('div');
            parentDiv.set('html', parentDiv.get('html'));
            parentDiv.getFirst('input[type=file]').addEvent('change', this.chooseAFile.bindWithEvent(this));
            parentDiv.getFirst('a').addEvent('click', this.removeInput.bindWithEvent(this));
            alert(alertInfo);
        }
    },
    submitAnnex: function() {
        this.annexs = [];
        try {
            if (this.getFileInputs({
                action: 'selected'
            }) > 0) {
                if ($('theMeterTwo')) {
                    $('theMeterTwo').parentNode.innerHTML = '';
                }
                $('notimeloading').setStyle('display', '');
                this.hideDel();
                $("uploadForm_" + this.ID).submit();
                debug("upload end");
                return;
            }
        } catch(ex) {
            debug(" in submit " + ex.name + ",  " + ex.message + ex);
        }
        try {
            this.submitCommonInfo();
        } catch(ex) {
            debug(" submitCommonInfo error " + ex.name + ",  " + ex.message + ex);
        }
    },
    submitCommonInfo: function() {
        if (typeof(this.submitFunc) == "function") {
            this.submitFunc();
        } else {
            eval(this.submitFunc);
        }
    },
    hideLoadingMess: function() {
        $('notimeloading').setStyle('display', 'none');
    },
    setTempNameOnServer: function(count, serverPath) {
        this.annexs[this.annexs.length] = {
            count: count,
            localPath: this.getInputFileValue(count),
            tempName: serverPath,
            deleted: false
        };
    },
    isAddAnnexsEnabled: function() {
        var isEnable = true;
        if ((this.getFileInputs() + this.getExistAnnexs() - this.getExistAnnexs({
            action: 'removed'
        })) >= this.max) {
            isEnable = false;
        }
        try {
            var operZone = $("uploadForm_" + this.ID).getFirst('span');
            operZone.getFirst('a').setStyle('display', isEnable ? '': 'none');
            operZone.getFirst('span').setStyle('display', isEnable ? 'none': '');
        } catch(e) {}
    },
    getInputFileValue: function(count) {
        var result = '';
        this.getSpecialElems({
            tag: 'input'
        }).each(function(item) {
            if (item.getProperty('name') == count) {
                result = item.value;
                return;
            }
        });
        return result;
    },
    getSpecialElems: function(arg) {
        var result = [];
        var argTag = (arg && 'input' == arg.tag) ? 'input[type=file]': 'b';
        var wrapDiv = $('existAnnexDiv_' + this.ID);
        if (argTag != 'b') {
            wrapDiv = $("uploadForm_" + this.ID).getFirst('div');
        }
        if (wrapDiv) {
            wrapDiv.getElements(argTag).each(function(item) {
                if (item.getProperty('src') || item.getProperty('name')) {
                    result[result.length] = item;
                }
            });
        }
        return result;
    },
    getAnnexs: function() {
        var removeAnnexs = this.getExistAnnexs({
            action: 'removed',
            back: 'array'
        });
        var allAnnexs = [];
        for (var i = 0; i < removeAnnexs.length; i++) {
            allAnnexs[allAnnexs.length] = {
                id: removeAnnexs[i],
                deleted: true
            };
        }
        allAnnexs[allAnnexs.length] = {
            count: -1,
            localPath: "notExist",
            tempName: '',
            deleted: true
        };
        return allAnnexs.concat(this.annexs);
    },
    hideDel: function() {
        var id = "uploadForm_" + this.ID;
        debug('#' + id + ' a.fileuploaddel:' + $$('#' + id + ' a.fileuploaddel').length)
        $$('#' + id + ' a.fileuploaddel').each(function(item) {
            item.setStyle('display', 'none');
        });
        debug('#' + id + ' span.fileuploadGdel:' + $$('#' + id + ' a.fileuploaddel').length)
        $$('#' + id + ' span.fileuploadGdel').each(function(item) {
            item.setStyle('display', '');
        });
    },
    showDel: function() {
        var id = "uploadForm_" + this.ID;
        debug('#' + id + ' a.fileuploaddel:' + $$('#' + id + ' a.fileuploaddel').length)
        $$('#' + id + ' a.fileuploaddel').each(function(item) {
            item.setStyle('display', '');
        });
        debug('#' + id + ' span.fileuploadGdel:' + $$('#' + id + ' a.fileuploaddel').length)
        $$('#' + id + ' span.fileuploadGdel').each(function(item) {
            item.setStyle('display', 'none');
        });
    }
});
var debug = function(text) {};
var mgtDebug;
var mgtDebugClass;
if (window.name == 'mainFrame1' || self == top || window.name == 'mainifr') {
    var html_url = top.location.search;
    if (html_url.contains("mgtDebug")) {
        if (window.name == 'mainifr') {
            debug = function(text, lvl, funcName) {
                try {
                    top.debug(text, lvl, funcName);
                } catch(e) {}
            };
        } else {
            mgtDebugClass = new Class({
                initialize: function(options) {
                    this.count = 0;
                    this.flag = 2;
                    var sizes = window.getSize();
                    this.div = new Element("div", {
                        'id': "mgtDebugDivId",
                        'styles': {
                            'z-index': '5000',
                            'position': 'absolute',
                            'border': '2px solid black',
                            'top': sizes.y - 295,
                            'left': sizes.x - 325,
                            'background-color': 'white',
                            'width': '300px'
                        }
                    }).injectInside(document.body);
                    this.handle = new Element("div", {
                        'id': "mgtDragDivId",
                        'html': "<b style='color:#FFFFFF'>拖动</b>",
                        'styles': {
                            'width': '300px',
                            'height': '20px',
                            'background': '#000000',
                            'cursor': 'move'
                        }
                    }).injectInside(this.div);
                    var drag = this.div.getElement("div");
                    var d = $('mgtDebugDivId');
                    if (drag) {
                        new Drag.Move(d, {
                            handle: drag
                        });
                    }
                    new Element("a", {
                        'html': "<b>清空</b>",
                        'styles': {
                            'cursor': 'pointer',
                            'float': 'right'
                        },
                        'events': {
                            'click': function() {
                                this.content.empty();
                            }.bind(this)
                        }
                    }).injectInside(this.div);
                    var obig = new Element("span", {
                        'html': "<b style='color:#D98E4D'>口&nbsp;</b>",
                        'styles': {
                            'cursor': 'pointer',
                            'float': 'right'
                        },
                        'events': {
                            'click': function() {
                                var sizes = window.getSize();
                                this.handle.setStyles({
                                    'width': '1000px'
                                });
                                this.div.setStyles({
                                    'width': '1000px',
                                    'top': '550px',
                                    'left': "100px"
                                });
                                this.content.setStyles({
                                    'width': '1000px',
                                    'display': 'block'
                                });
                                this.flag = 3;
                            }.bind(this)
                        }
                    }).injectInside(this.handle);
                    var osmall = new Element("span", {
                        'html': "<b style='color:#D98E4D'>=&nbsp;</b>",
                        'styles': {
                            'cursor': 'pointer',
                            'float': 'right'
                        },
                        'events': {
                            'click': function() {
                                var sizes = window.getSize();
                                this.handle.setStyles({
                                    'width': '300px'
                                });
                                this.div.setStyles({
                                    'width': '300px',
                                    'top': sizes.y - 295,
                                    'left': sizes.x - 325
                                });
                                this.content.setStyles({
                                    'width': '300px',
                                    'display': 'block'
                                });
                                this.flag = 2;
                            }.bind(this)
                        }
                    }).injectInside(this.handle);
                    var omini = new Element("span", {
                        'html': "<b style='color:#D98E4D'>&nbsp;-&nbsp;</b>",
                        'styles': {
                            'cursor': 'pointer',
                            'float': 'right'
                        },
                        'events': {
                            'click': function() {
                                var sizes = window.getSize();
                                this.handle.setStyles({
                                    'width': '120px'
                                });
                                this.div.setStyles({
                                    'width': '120px',
                                    'top': sizes.y - 50,
                                    'left': sizes.x - 125
                                });
                                this.content.setStyles({
                                    'display': 'none'
                                });
                                this.flag = 1;
                            }.bind(this)
                        }
                    }).injectInside(this.handle);
                    this.content = new Element("div", {
                        'styles': {
                            'width': '300px',
                            'height': '250px',
                            'overflow': 'auto',
                            'background': '#E2E9EF'
                        }
                    }).injectInside(this.div);
                },
                log: function(text, lvl, funcName) {
                    if (text) {
                        text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    }
                    this.count = this.count + 1;
                    lvl = lvl || 0;
                    funcName = funcName || "";
                    var c = text + " , " + funcName;
                    var e = new Element("div", {
                        'html': this.count + ":" + c
                    }).injectInside(this.content);
                    e.scrollIntoView();
                    if (lvl > 1) {
                        e.setStyles({
                            'font-weight': 'bold',
                            'font-size': '14px'
                        });
                    }
                },
                move: function(d) {
                    if (d)
                    return;
                    var sizes = mgtDebug.content.getSize();
                    var scrollto = mgtDebug.content.getScroll();
                    var w = d.getSize().x;
                    d.setStyles({
                        'left': (scrollto.x + (sizes.x - w) / 2).toInt(),
                        'top': scrollto.y + 20
                    });
                }
            });
            function showMgtDeug() {
                mgtDebug = new mgtDebugClass();
                debug = function(text, lvl, funcName) {
                    mgtDebug.log(text, lvl, funcName);
                };
                debug("asdfas", "adsf", "asdfasdf");
            };
            showMgtDeug.delay(5000);
        }
    }
}
function btnOvr(btn) {
    btn.className += "over";
    btn.className = btn.className.replace("clk", "");
}
function btnOut(btn) {
    btn.className = btn.className.replace("over", "");
    btn.className = btn.className.replace("clk", "");
}
function btnClk(btn) {
    try {
        btn.className = btn.className.replace("clk", "");
        btn.className += "clk";
        btn.className = btn.className.replace("over", "");
    } catch(ex) {
        debug(ex, 3, "btnClk");
    }
}
function classAdd(btn) {
    var a = $(btn);
    var args = Array.flatten(arguments);
    args.each(function(item, index) {
        if (index > 0)
        a.addClass(item);
    });
}
function classRemove(btn) {
    var a = $(btn);
    var args = Array.flatten(arguments);
    args.each(function(item, index) {
        if (index > 0)
        a.removeClass(item);
    });
}
function classSwap(btn, newClassName, oldClassName) {
    var a = $(btn);
    a.addClass(newClassName);
    a.removeClass(oldClassName);
}
var mui = {
    s: function(btn, oldClass, newCalss) {
        var a = $(btn);
        a.removeClass("trbgcolor" + oldClass).addClass("trbgcolor" + newCalss);
    }
}
function over2(a, t) {
    var k = $(a).getElement(t);
    if (k) k.setStyle("display", "");
}
function out2(a, t) {
    var k = $(a).getElement(t);
    if (k) k.setStyle("display", "none");
}
function trim(a) {
    if ($type(a) == "string") {
        return a.trim();
    }
    return "";
};
function initUserTree() {
    var options = {
        treeDivId: "userTree",
        treePanelDivId: "userTree_panel",
        orgTreeType: 2,
        treeName: 'searchOrgTree',
        onload: function() {
            var wdt = allTreeMap['searchOrgTree'];
            wdt.root.toggle();
            wdt.checkNodesByIds(fulltestsearch.userIDs);
        },
        setHeight: false
    };
    createOrgTree(options);
}
function isSelected(id, selectedids) {
    for (var i = 0; i < selectedids.length; i++) {
        if (id == selectedids[i]) return true;
    }
    return false;
}
function gainhtml(id, name, selectedids) {
    var dutyBuf = "<input type=\"checkbox\" id=\"dutylist" + id + "\" name=\"dutylist\" value=\"" + id + "\"   onFocus=\"this.blur()\"";
    if (isSelected(id, selectedids))
    dutyBuf += " checked";
    dutyBuf += " />" + "<a href=\"javascript:extendCheck('dutylist" + id + "');\">" + name + "</a><br/>";
    return dutyBuf;
}
function searchByModule(key, types) {
    if (key == Resource.common.pleaseinputkey) key = '';
    searchByKeyAndType(key, types);
}
function searchByKeyAndType(key, types) {
    Condition.resetAll();
    fulltestsearch.key = key;
    fulltestsearch.typeids = types;
    Condition.submit();
}
skey = {
    begin: function(a) {
        a = $(a);
        var v = a.retrieve("begin");
        if (v) return;
        a.store("begin", "true");
        a.store("value", a.get('value'));
        a.set('value', "");
    },
    end: function(a) {
        a = $(a);
        var v = a.get("value");
        if (v) return;
        a.store("begin", "");
        a.set('value', a.retrieve("value"));
    },
    b: function(a) {
        a = $(a);
        a.removeClass('defaultKey');
        var begin = a.retrieve("begin");
        if (true) {
            var rel = a.get("rel");
            var value = a.get("value");
            a.store("begin", "true");
            a.store("value", rel || value);
            if (rel && rel != value)
            return;
            a.set('value', "");
        } else {
            if (a.get("value") == a.retrieve("value")) {
                a.set('value', "");
            }
        }
    },
    e: function(a) {
        a = $(a);
        var v = a.get("value");
        if (v && v == a.retrieve("value"))
        a.addClass('defaultKey');
        if (v) return;
        a.set('value', a.retrieve("value"));
        a.addClass('defaultKey');
    }
}
var Condition = {
    setdate: function() {
        fulltestsearch.startTime = $('begintime').value;
        fulltestsearch.endTime = $('endtime').value;
    },
    resetdate: function() {
        try {
            $('begintime').value = "";
            $('endtime').value = "";
        } catch(e) {}
        fulltestsearch.startTime = "";
        fulltestsearch.endTime = "";
    },
    resetuser: function() {
        fulltestsearch.userNames = "";
        fulltestsearch.userIDs = "";
    },
    resetduty: function() {
        fulltestsearch.dutyIDs = "";
        fulltestsearch.dutyNames = "";
    },
    resetstart: function() {
        fulltestsearch.curpage = 1;
        fulltestsearch.curstart = new Array("0");
    },
    resetAll: function() {
        Condition.resetdate();
        Condition.resetuser();
        Condition.resetduty();
        Condition.resetstart();
        fulltestsearch.typeids = "R";
        fulltestsearch.selectidtype = 1;
    },
    submit: function() {
        try {
            $('searchDiv').innerHTML = '<a class="fr" href="javascript:Condition.submit();">' + Resource.common.backtoresult + '</a>';
            $('simple_key').value = fulltestsearch.key;
            $('simple_key').className = 'sipt_focus fl';
        } catch(e) {}
        showModule("/fulltextsearch/searchResult.jsp?" + "key=" + encodeURIComponent(fulltestsearch.key) + "&curpage=" + fulltestsearch.curpage + "&begintime=" + fulltestsearch.startTime + "&endtime=" + fulltestsearch.endTime + "&curstart=" + fulltestsearch.curstart[fulltestsearch.curpage - 1] + "&typeIds=" + fulltestsearch.typeids + "&duration=" + fulltestsearch.duration + "&userIDs=" + fulltestsearch.userIDs + "&docFlag=" + fulltestsearch.docFlag + "&dutyIDs=" + fulltestsearch.dutyIDs);
    },
    pagedown: function() {
        fulltestsearch.curpage++;
        Condition.submit();
    },
    pageUp: function() {
        fulltestsearch.curpage--;
        Condition.submit();
    },
    firstpage: function() {
        fulltestsearch.curpage = 1;
        Condition.submit();
    },
    updatetype: function(anid) {
        fulltestsearch.typeids = anid;
        fulltestsearch.curpage = 1;
        Condition.submit();
    },
    research: function(id) {
        Condition.resetAll();
        if (id && $(id).value == Resource.common.pleaseinputkey) {
            $(id).value = '';
        }
        fulltestsearch.key = $(id).value;
        Condition.submit();
    },
    conditionsearch: function() {
        Condition.resetstart();
        Condition.resetuser();
        Condition.resetduty();
        Condition.setdate();
        fulltestsearch.selectidtype = currType;
        if ($("type2").checked == true) {
            fulltestsearch.userIDs = userIds;
            fulltestsearch.userNames = userNames;
            fulltestsearch.dutyIDs = '';
            fulltestsearch.dutyNames = '';
        } else if ($("type3").checked == true) {
            fulltestsearch.dutyIDs = dutyIds;
            fulltestsearch.dutyNames = dutyNames;
            fulltestsearch.userIDs = '';
            fulltestsearch.userNames = '';
        }
        fulltestsearch.key = $("key").value;
        fulltestsearch.docFlag = $("docFlag0").checked ? 0: ($("docFlag1").checked ? 1: 2);
        Condition.submit();
    },
    searchScope: function(type) {
        if (type == "open") {
            $("searchScopeA").innerHTML = '<b class="ico_le redu_ico"></b>' + Resource.common.jingjian;
            $('moreScope').style.display = 'block';
            $("searchScopeA").href = "javascript:Condition.searchScope('close');";
            $('searchButton').style.display = "block";
        } else {
            $("searchScopeA").innerHTML = '<b class="ico_le more_ico"></b>' + Resource.common.gengduo;
            $('moreScope').style.display = 'none';
            $("searchScopeA").href = "javascript:Condition.searchScope('open');";
            $('searchButton').style.display = "none";
        }
    },
    resetMoreConditions: function() {
        userIds = "";
        userNames = "";
        dutyIds = "";
        dutyNames = "";
        currType = 1;
        $("begintime").value = "";
        $("endtime").value = "";
        if (fulltestsearch.selectidtype == 2) {
            $("selectedSpan").innerHTML = "";
        } else if (fulltestsearch.selectidtype == 3) {
            $("selectedSpan").innerHTML = "";
        }
        $("type1").checked = true;
        $("docFlag0").checked = true;
    },
    setMoreConditions: function() {
        userIds = fulltestsearch.userIDs;
        userNames = fulltestsearch.userNames;
        dutyIds = fulltestsearch.dutyIDs;
        dutyNames = fulltestsearch.dutyNames;
        currType = fulltestsearch.selectidtype;
        $("begintime").value = fulltestsearch.startTime;
        $("endtime").value = fulltestsearch.endTime;
        if (fulltestsearch.selectidtype == 2) {
            $("selectedSpan").innerHTML = fulltestsearch.userNames;
            $("type2").checked = true;
        } else if (fulltestsearch.selectidtype == 3) {
            $("selectedSpan").innerHTML = fulltestsearch.dutyNames;
            $("type3").checked = true;
        } else {
            $("type1").checked = true;
        }
        $("docFlag" + fulltestsearch.docFlag).checked = true;
    }
};
function searchKeyAddColor(key) {
    $$(".hightLight_summary").each(function(ele) {
        var keywordStr = key;
        keywordStr = keywordStr.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
        var keywords = keywordStr.split(" ");
        var text = ele.innerHTML;
        var positions = [];
        keywords.each(function(key) {
            if (key.length == 0) return;
            var indexOf = 0;
            var temp = text.toLowerCase();
            var lastIndexOf = temp.indexOf(key.toLowerCase());
            var start = 0;
            while (indexOf <= lastIndexOf && indexOf >= 0) {
                indexOf = temp.indexOf(key.toLowerCase(), start);
                if (indexOf >= 0) {
                    start = indexOf + key.length;
                    positions.push({
                        start: indexOf,
                        end: start - 1
                    });
                }
            }
        });
        positions = positions.sort(function(a, b) {
            return a.start - b.start
        });
        for (var i = 0; i < positions.length; i++) {
            for (var k = 0; k < positions.length; k++) {
                if (i == k) continue;
                if (positions[k].start >= positions[i].start && positions[k].start <= positions[i].end) {
                    if (positions[k].end > positions[i].end) {
                        positions[i].end = positions[k].end;
                    }
                    positions.splice(k--, 1);
                }
            }
        }
        var highLightTag = ['<em>', '</em>'];
        var offset = 0;
        positions.each(function(position) {
            text = text.substring(0, position.start + offset) + highLightTag[0] + text.substring(position.start + offset);
            offset += highLightTag[0].length;
            text = text.substring(0, position.end + offset + 1) + highLightTag[1] + text.substring(position.end + offset + 1);
            offset += highLightTag[1].length;
        })
        ele.innerHTML = text;
    });
}
var DefaultSearch = new Class({
    curstartArray: new Array('0'),
    Implements: [Options, Events],
    conditions: new Hash({
        key: '',
        docFlag: '0',
        typeIds: 'R',
        begintime: '',
        endtime: '',
        userIDs: '',
        duration: '',
        dutyIDs: '',
        curpage: 1,
        pageMax: 10,
        curstart: 0,
        emailFrom: ''
    }),
    options: {
        url: '',
        divId: '',
        keyTip: '',
        onSubmitStop: $empty
    },
    initialize: function(options) {
        this.setOptions(options);
    },
    reSet: function() {
        this.conditions.extend({
            key: '',
            docFlag: '0',
            typeIds: 'R',
            begintime: '',
            endtime: '',
            userIDs: '',
            dutyIDs: '',
            curpage: 1,
            pageMax: 10,
            curstart: 0,
            emailFrom: ''
        });
    },
    hasDoneSearch: function() {
        if (this.hasSearched && this.hasSearched == true) {
            return true;
        } else {
            return false;
        }
    },
    hasCondition: function() {
        if (this.conditions.key != '') return true;
        if (this.conditions.docFlag != '0') return true;
        if (this.conditions.typeIds != 'R') return true;
        if (this.conditions.begintime != '') return true;
        if (this.conditions.endtime != '') return true;
        if (this.conditions.userIDs != '') return true;
        if (this.conditions.duration != '') return true;
        if (this.conditions.dutyIDs != '') return true;
        return false;
    },
    doSearch: function(condi) {
        this.hasSearched = true;
        if (condi) {
            this.conditions.extend(condi);
        }
        var dwr = new DwrBackCall();
        dwr.backCallFunc = function() {
            this.fireEvent('submitStop');
        }.bind(this);
        this.conditions.set('curstart', this.curstartArray[this.conditions.get('curpage') - 1]);
        var params = this.conditions.toQueryString();
        debug("params==" + params);
        dwr.addOneUrl(this.options.url + "?" + params, this.options.divId);
        dwr.dwrProxy();
    },
    searchByKey: function(keyInput, event, condi) {
        try {
            if (condi) {
                this.conditions.extend(condi);
            }
            if (event) {
                var event = new Event(event);
                if (event.key != 'enter') return;
            }
            var key = $(keyInput).get('value');
            if (key != this.options.keyTip) {
                this.conditions.set('key', key);
            } else {
                this.conditions.set('key', '');
            }
            this.doSearch();
        } catch(ex) {
            debug("error in searchByKey : " + ex.name + ";" + ex.error + ";" + ex.message);
        }
    },
    pageDown: function() {
        this.conditions.set('curpage', this.conditions.get('curpage') + 1);
        this.doSearch();
    },
    pageTo: function(curpage) {
        this.conditions.set('curpage', curpage.toInt());
        this.doSearch();
    },
    pageUp: function() {
        this.conditions.set('curpage', this.conditions.get('curpage') - 1);
        this.doSearch();
    },
    pageFirst: function() {
        this.conditions.set('curpage', 1);
        this.doSearch();
    }
});
var MgtLoading = new Class({
    Implements: Options,
    options: {
        name: 'MgtLoading',
        zIndex: 10000
    },
    initialize: function(message, options) {
        this.message = message;
        this.setOptions(options);
        this.number = 0;
        this.Overlay = new Element('div', {
            'id': this.options.name + '-hidden'
        }).addClass("gLoading_hidden");
        this.Overlay.injectInside(document.body);
        this.Box = new Element('div', {
            'id': this.options.name + '-Popup'
        }).addClass("gLoading");;
        new Element('img', {
            "align": "absmiddle",
            src: globalCp + "/images/loading.gif"
        }).injectInside(this.Box);
        new Element('span', {
            "html": "   " + this.message
        }).injectInside(this.Box);
        this.Box.injectInside(document.body);
        window.addEvent('resize', 
        function() {
            var sizes = window.getSize();
            var scrollito = window.getScroll();
            this.Box.setStyles({
                'left': (scrollito.x + sizes.x / 2 - 85).toInt(),
                'top': (scrollito.y + (sizes.y - 100) / 2).toInt()
            });
        }.bind(this));
    },
    display: function(options) {
        this.number = this.number + 1;
        if (this.number > 1)
        return;
        this.Overlay.setStyles({
            'display': 'block',
            'visibility': 'visible'
        });
        var sizes = window.getSize();
        var scrollito = window.getScroll();
        this.Box.setStyles({
            'display': 'block',
            'left': (scrollito.x + sizes.x / 2 - 85).toInt(),
            'top': (scrollito.y + (sizes.y - 100) / 2).toInt(),
            'visibility': 'visible',
            'position': 'absolute'
        });
    },
    close: function() {
        this.number = this.number - 1;
        if (this.number > 0)
        return;
        this.Box.setStyles({
            'display': 'none',
            'top': 0
        });
        this.Overlay.setStyles({
            'display': 'none',
            'visibility': 'hidden'
        });
    }
});
var _mgtLoading = null;
function mgtLoadingOpen() {
    _mgtLoading.display();
};
function mgtLoadingClose() {
    _mgtLoading.close();
};
onload4DWR = function(message) {
    try {
        _mgtLoading = new MgtLoading(message);
        DWREngine.setHeaders({
            'X-Requested-With': 'XMLHttpRequest'
        })
        DWREngine.setErrorHandler(getDWRError);
        DWREngine.setWarningHandler(getDWRWarning);
        DWREngine.setPreHook(mgtLoadingOpen);
        DWREngine.setPostHook(mgtLoadingClose);
    } catch(ex) {
        debug("onload4DWR   " + ex.name + "   " + ex.message + "   " + ex);
    }
}
function getDWRError(msg, ex) {
    try {
        $('disabledZone').style.visibility = 'hidden';
    } catch(e) {}
    debug("getDWRError: " + msg);
    if (ex) {
        debug(" ex.localizedMessage:" + ex.localizedMessage);
    }
    if (ex.name == 'dwr.engine.http.401') {
        getReLoginIframe();
        return;
    };
    if ("mgtNoME" == msg) {
        alert(Resource.common.invalidUserSession);
        return;
    }
    if ("mgtError" == msg) {
        if (ex.localizedMessage) {
            alert(ex.localizedMessage);
        } else {
            alert(Resource.common.operateFail);
        }
        return;
    }
    if ("Error" == msg) {
        alert(Resource.common.operateFail);
        return;
    }
    if (msg == "No data received from server") {
        alert(Resource.common.servershutdown);
        return;
    }
    if (msg == "Timeout") {
        alert(Resource.common.serverBusy);
        return;
    }
    alert(Resource.common.servershutdown);
    return;
};
function getDWRWarning(msg, ex) {
    getDWRError(msg, ex);
};
function getReLoginIframe() {
    var htmltemp = '<div>' + '<div class="title"><b class="relogin_show_ico"></b>' + Resource.common.loginRelogin + '</div>' + '<div class="popContent"  id="reloginIfr">' + '<iframe src="' + globalCp + '/login/relogin.jsp?id=' + eimserver_meId + '" styles="width:350px;height:150px;border:0;" frameborder="0"></iframe>' + '</div>' + '</div>' + '<a class="relogin_close" onclick="mgtPopupClose({num:2})"></a>';
    if ($('mgtLoginDialog')) {
        $('mgtLoginDialog').destroy();
    };
    var dialog = new Element("div", {
        'id': 'mgtLoginDialog',
        'class': 'dialog',
        'styles': {
            'display': 'none'
        },
        'html': htmltemp
    });
    dialog.setStyle('display', '');
    $(mgtPopupId({
        num: 2
    })).adopt(dialog);
    mgtPopup({
        num: 2
    });
    return;
}
function closeReloginMe() {
    mgtPopupClose({
        num: 2
    });
}
var clientListPage = 1;
function showOnlineDifferRightWindow(note) {
    var url = '';
    switch (note.id) {
    case 'c0':
        url = '/online/setup/main.jsp';
        break;
    case 'one1':
        url = '/online/setup/manageclient.jsp';
        break;
    case 'one2':
        url = '/online/setup/manageproblem.jsp';
        break;
    case 'one3':
        url = '/online/setup/stylemain.jsp';
        break;
    case 'one4':
        url = '/online/setup/groupmain.jsp';
        break;
    case 'two4':
        url = '/online/setup/style2.jsp';
        break;
    case 'two5':
        url = '/online/setup/style1.jsp';
        break;
    case 'two6':
        url = '/online/setup/style3.jsp';
        break;
    case 'two7':
        url = '/online/setup/style4.jsp';
        break;
    case 'two8':
        url = '/online/setup/style5.jsp';
        break;
    default:
        url = '/online/setup/style6.jsp';
    }
    var dwr = new DwrBackCall();
    dwr.addOneUrl(url, "main_list_div");
    dwr.dwrProxy();
};
function showDefaultClientList(page) {
    if (!page) {
        page = clientListPage;
    } else {
        clientListPage = page;
    }
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/online/setup/manageclient.jsp?curr=" + clientListPage, "main_list_div");
    dwr.dwrProxy();
}
function addNewClient(id) {
    if (!validate.validate()) return;
    if (!id) {
        id = -1;
    }
    var companyId = $("companyId").value;
    var userId = $("userId").value;
    var cardShowNo = $("cardShowNo");
    var cardShowName = $("cardShowName");
    var cardPhone = $("cardPhone");
    var cardMobile = $("cardMobile");
    var cardEmail = $("cardEmail");
    var cardDetail = $("cardDetail");
    var clientgroup = $("clientgroup").value;
    var DBClientCard = {
        id: id,
        companyId: companyId,
        userId: userId,
        showNo: cardShowNo.value,
        showName: cardShowName.value,
        phone: cardPhone.value,
        mobile: cardMobile.value,
        email: cardEmail.value,
        detail: cardDetail.value,
        isActive: 0,
        isDelete: 0,
        groupId: clientgroup
    };
    this.NextStep = function() {
        var dwr = new DwrBackCall();
        dwr.addOneUrl("/online/setup/manageclient.jsp?curr=" + clientListPage, "main_list_div");
        dwrService.addClientCard(DBClientCard, dwr.getAllUrls(), dwr.backToDwrUrls.bind(dwr));
    }
    confirm(Resource.common.areyousure, this);
}
function stopOrActiveClient(id, active) {
    var dwr = new DwrBackCall();
    dwr.backCallFunc = function() {
        this.NextStep = function() {
            var mydwr = new DwrBackCall();
            mydwr.addOneUrl("/online/setup/manageclient.jsp?curr=" + clientListPage, "main_list_div");
            dwrService.stopOrActiveClient(id, active, mydwr.getAllUrls(), mydwr.backToDwrUrls.bind(mydwr));
        };
        confirm(Resource.common.areyousure, this);
    };
    dwr.dwrProxy();
}
function showEditClient(id) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/online/setup/updateclient.jsp?id=" + id, "main_list_div");
    dwr.dwrProxy();
}
function delClient(id) {
    this.NextStep = function() {
        var dwr = new DwrBackCall();
        dwr.addOneUrl("/online/setup/manageclient.jsp?curr=" + clientListPage, "main_list_div");
        dwrService.deleteClient(id, dwr.getAllUrls(), dwr.backToDwrUrls.bind(dwr));
    }
    confirm(Resource.common.areyousure, this);
}
function toClient(id) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/online/setup/viewclient.jsp?id=" + id, "main_list_div");
    dwr.dwrProxy();
}
var problemGroupListPage = 1;
function showEditProblemGroup(id) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/online/setup/updateproblemgroup.jsp?id=" + id, "main_list_div");
    dwr.dwrProxy();
}
function delProblemGroup(id) {
    this.NextStep = function() {
        var dwr = new DwrBackCall();
        dwr.addOneUrl("/online/setup/manageproblem.jsp?curr=" + problemGroupListPage, "main_list_div");
        dwrService.deleteProblemGroup(id, dwr.getAllUrls(), dwr.backToDwrUrls.bind(dwr));
    }
    confirm(Resource.common.areyousure, this);
}
function toProblemGroup(id) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/online/setup/viewproblemgroup.jsp?id=" + id, "main_list_div");
    dwr.dwrProxy();
}
function backToProblemGroup(page) {
    if (!page) {
        page = problemGroupListPage;
    } else {
        problemGroupListPage = page;
    }
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/online/setup/manageproblem.jsp?curr=" + problemGroupListPage, "main_list_div");
    dwr.dwrProxy();
}
function showEditStyle(num) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/online/setup/style" + num + "edit.jsp", "main_list_div");
    dwr.backCallFunc = function() {
        editStyleValidation(num);
    }
    dwr.dwrProxy();
}
function showEachStyle(num) {
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/online/setup/style" + num + ".jsp", "main_list_div");
    dwr.dwrProxy();
}
function editStyleValidation(num) {
    var validate = new Validate('task_new_form');
    switch (num) {
    case 1:
        var val = $("floatDelay").value;
        var delayTime = $("delayTime");
        var tempVal = 0;
        switch (val) {
        case "2":
            tempVal = 1;
            break;
        case "3":
            tempVal = 2;
            break;
        case "5":
            tempVal = 3;
            break;
        case "8":
            tempVal = 4;
            break;
        case "10":
            tempVal = 5;
            break;
        }
        delayTime.options[tempVal].selected = true;
        break;
    case 2:
        var val = $("inviteDelay").value;
        var delayTime = $("delayTime");
        var tempVal = 0;
        switch (val) {
        case "2":
            tempVal = 1;
            break;
        case "3":
            tempVal = 2;
            break;
        case "5":
            tempVal = 3;
            break;
        case "8":
            tempVal = 4;
            break;
        case "10":
            tempVal = 5;
            break;
        }
        delayTime.options[tempVal].selected = true;
        break;
    }
}
function editStyle(num) {
    var validate = new Validate('task_new_form');
    if (!validate.validate()) return;
    var systemId = $("systemId").value;
    var isFloatSystem = $("isFloatSystem").value;
    var floatIcon = $("floatIcon").value;
    var floatDelay = $("floatDelay").value;
    var isAutoInvite = $("isAutoInvite").value;
    var inviteDelay = $("inviteDelay").value;
    var mainTitle = $("mainTitle").value;
    var inviteTitle = $("inviteTitle").value;
    var inviteWord = $("inviteWord").value;
    var isRightType = $("rightType").value;
    var hasClientCard = $("hasClientCard").value;
    var companyWord = $("companyWord").value;
    var dialogTitle = $("dialogTitle").value;
    var dialogWord = $("dialogWord").value;
    var isEndGrade = $("isEndGrade").value;
    var isCansave = $("isCansave").value;
    var autoAlert1 = $("autoAlert1").value;
    var autoAlert2 = $("autoAlert2").value;
    var longTimeDate = $("longTimeDate").value;
    var longTimeAlert = $("longTimeAlert").value;
    var leaveAlertWord = $("leaveAlertWord").value;
    var leaveShow = $("leaveShow").value;
    var position = $("position").value;
    switch (num) {
    case 1:
        var iconDefalt = $("iconDefalt").checked;
        if (iconDefalt) {
            isFloatSystem = true;
        } else {
            isFloatSystem = false;
        }
        var delayTime = $("delayTime");
        floatDelay = delayTime.options[delayTime.selectedIndex].text;
        break;
    case 2:
        var initiative = $("initiative1").checked;
        if (initiative) {
            isAutoInvite = true;
        } else {
            isAutoInvite = false;
        }
        var delayTime = $("delayTime");
        inviteDelay = delayTime.options[delayTime.selectedIndex].text;
        break;
    case 3:
        var endGrade = $("endGrade1").checked;
        if (endGrade) {
            isEndGrade = true;
        } else {
            isEndGrade = false;
        }
        var saveDialog = $("saveDialog1").checked;
        if (saveDialog) {
            isCansave = true;
        } else {
            isCansave = false;
        }
        var rightType = $("isRightType1").checked;
        if (rightType) {
            isRightType = 1;
        } else {
            isRightType = 2;
        }
        hasClientCard = "";
        var clientCardString = document.getElementsByName("clientCardString");
        for (var i = 0; i < clientCardString.length; i += 1) {
            if (clientCardString[i].checked) {
                if (hasClientCard.length == 0) {
                    hasClientCard = clientCardString[i].value;
                } else {
                    hasClientCard += "," + clientCardString[i].value;
                }
            }
        }
        break;
    }
    var DBSystem = {
        id: systemId,
        floatSystem: isFloatSystem,
        floatIcon: floatIcon,
        floatDelay: floatDelay,
        autoInvite: isAutoInvite,
        inviteDelay: inviteDelay,
        mainTitle: mainTitle,
        inviteTitle: inviteTitle,
        inviteWord: inviteWord,
        rightType: isRightType,
        hasClientCard: hasClientCard,
        dialogTitle: dialogTitle,
        dialogWord: dialogWord,
        companyWord: companyWord,
        endGrade: isEndGrade,
        cansave: isCansave,
        autoAlert1: autoAlert1,
        autoAlert2: autoAlert2,
        longTimeDate: longTimeDate,
        longTimeAlert: longTimeAlert,
        leaveAlertWord: leaveAlertWord,
        leaveShow: leaveShow,
        position: position,
        'delete': 0
    };
    this.NextStep = function() {
        var dwr = new DwrBackCall();
        dwr.addOneUrl("/online/setup/style" + num + ".jsp", "main_list_div");
        dwrService.addSystem(DBSystem, dwr.getAllUrls(), dwr.backToDwrUrls.bind(dwr));
    };
    confirm(Resource.common.areyousure, this);
}
function selfDefineFloatIcon(obj) {
    var num = obj.value;
    if (num == 0) {
        $("selfDefineIcon").style.display = 'none';
    } else {
        $("selfDefineIcon").style.display = 'block';
    }
}
function addNewProblem(id, show) {
    if (!validate.validate()) return;
    if (!id) {
        id = -1;
    }
    var parentId = $("parentId");
    var companyId = $("companyId").value;
    var detail = $("detail").value;
    var processPriority = $("processPriority");
    var userId = $("userId").value;
    var processMethod = $("processMethod").checked;
    var processRemark = $("processRemark").value;
    var dialogId = 0;
    var setProcessing = $("setProcessing");
    if (setProcessing) {
        var dialogIdInput = $("dialogIdInput");
        if (dialogIdInput) {
            dialogId = dialogIdInput.value;
        }
    }
    parentId = parentId.options[parentId.selectedIndex].value;
    var DBProblem = {
        id: id,
        parentId: parentId,
        dialogId: dialogId,
        title: "",
        detail: detail,
        processPriority: processPriority.options[processPriority.selectedIndex].value,
        processUserId: userId,
        processMethod: processMethod ? 1: 0,
        processRemark: processRemark,
        problemstate: 0,
        "delete": 0
    };
    this.NextStep = function() {
        var dwr = new DwrBackCall();
        if (!show) {
            problem.categoryId = parentId;
            dwr.addOneUrl("/online/problem/problem_list.jsp?" + problem.listParam(), "main_list_div");
            allTreeMap['onlineProblemTree'].selectButNotFireById(parentId);
        } else {
            dwr.backCallFunc = function() {
                alert(Resource.online.addSucc);
                mgtPopupClose();
                if (setProcessing && setProcessing.value == 0) {
                    setTimeout(function() {
                        setProcessing.value = 1;
                        var mydwr = new DwrBackCall();
                        dwrService.updateOnlineDialogStatus(dialogId, 1, dwr.backToDwrUrls.bind(mydwr));
                    },
                    1);
                }
            };
        }
        dwrService.addProblem(DBProblem, dwr.getAllUrls(), dwr.backToDwrUrls.bind(dwr));
    };
    confirm(Resource.common.areyousure, this);
}
function showDialog(id) {
    if ($("setProcessing")) {
        $("showDialogMainDiv").style.display = 'block';
        return;
    }
    var dwr = new DwrBackCall();
    dwr.addOneUrl("/online/dialog/viewdialog.jsp?id=" + id + "&lit=true", "showDialogMainDiv");
    dwr.backCallFunc = function() {
        $("showDialogMainDiv").style.display = 'block';
    };
    dwr.dwrProxy();
}
function submitProblemDetal(id) {
    if (!validate.validate()) return;
    var problemProcessDetail = $("problemProcessDetail").value;
    var companyId = $("companyId").value;
    var DBProblemDetail = {
        id: -1,
        problemId: id,
        detail: problemProcessDetail,
        "delete": 0
    };
    this.NextStep = function() {
        var dwr = new DwrBackCall();
        dwr.addOneUrl("/online/problem/viewproblem.jsp?id=" + id, "main_list_div");
        dwr.backCallFunc = function() {
            $('processProblemDiv').style.display = 'none';
        };
        dwrService.addProblemDetail(DBProblemDetail, dwr.getAllUrls(), dwr.backToDwrUrls.bind(dwr));
    };
    confirm(Resource.common.areyousure, this);
}
function newCallerCard(id, show) {
    if (!validate.validate()) return;
    if (!id) {
        id = -1;
    }
    var showName = $("showName").value;
    var companyName = $("companyName").value;
    var phone = $("phone").value;
    var mobile = $("mobile").value;
    var email = $("email").value;
    var cardDetail = $("cardDetail").value;
    var companyId = $("companyId").value;
    var DBCallerCard = {
        id: id,
        dialogId: 0,
        showName: showName,
        companyName: companyName,
        phone: phone,
        mobile: mobile,
        email: email,
        detail: cardDetail,
        isDelete: 0
    };
    this.NextStep = function() {
        try {
            mgtPopupClose();
        } catch(e) {}
        var dwr = new DwrBackCall();
        if (!show) {
            dwr.addOneUrl("/online/card/main_list.jsp?curr=" + callerCardPage, "main_list_div");
        }
        dwr.backCallFunc = function() {
            if (show) {
                alert(Resource.online.addSucc);
            }
        };
        dwrService.addCallerCard(DBCallerCard, dwr.getAllUrls(), dwr.backToDwrUrls.bind(dwr));
    };
    confirm(Resource.common.areyousure, this);
}
var numI = 0;
var Validate = new Class({
    getOptions: function() {
        return {
            validateOnBlur: true,
            errorClass: 'error',
            errorMsgClass: 'validation-advice',
            onFail: Class.empty,
            onSuccess: false,
            showErrorsInline: true,
            label: 'Please wait...',
            defaultFocus: true
        };
    },
    initialize: function(form, options) {
        this.setOptions(this.getOptions(), options);
        this.form = $(form);
        this.elements = this.form.getElements('input[type=text]');
        this.elements.combine(this.form.getElements('input[type=hidden]'));
        this.elements.combine(this.form.getElements('input[type=password]'));
        this.elements.combine(this.form.getElements('input[type=checkbox]'));
        this.elements.combine(this.form.getElements('select'));
        this.elements.combine(this.form.getElements('textarea'));
        this.list = [];
        this.elements.each(function(el, i) {
            if (this.options.validateOnBlur) {
                el.addEvent('blur', this._validate.bind(this, el));
            }
        }.bind(this));
    },
    getList: function() {
        var list = new Element('ul');
        this.list.each(function(el, i) {
            if (el.title != '') {
                var li = new Element('li').injectInside(list);
                new Element('label').setProperty('for', el.id).setText(el.title).injectInside(li);
            }
        });
        return list;
    },
    _validate: function(el) {
        this.clearMsg(el);
        var cn = el.className;
        cn = (cn + " ").clean();
        var arr = cn.split(" ");
        var validator = null;
        var valid = arr.every(function(item, index) {
            if (item.contains("validate-length-range")) {
                item = "validate-length-range";
            }
            validator = validatorItemHash.get(item);
            if (!validator) {
                return true;
            }
            return validator.test(el.get('value'), el);
        });
        if (!valid) {
            var t = el.getProperty("title");
            if (!t && validator) {
                var err = validator.error;
                if ($type(err) == "string") {
                    t = err;
                } else {
                    t = err(el.get('value'), el);
                }
            } else if (!t) {
                t = '请输入内容';
            }
            this.setMsg(el, t);
        }
        return valid;
    },
    setMsg: function(el, msg) {
        if (msg == undefined) {
            msg = el.title;
        }
        if (this.options.showErrorsInline) {
            if (el.error == undefined) {
                var mgt = el.get("mgt");
                if (mgt == "bottom") {
                    el.error = new Element('div').addClass(this.options.errorMsgClass).set('text', msg).inject(el.getParent());
                } else {
                    el.error = new Element('div').addClass(this.options.errorMsgClass).set('text', msg).injectAfter(el);
                }
            } else {
                el.error.set('text', msg);
            }
            el.addClass(this.options.errorClass);
        }
    },
    clearMsg: function(el) {
        el.removeClass(this.options.errorClass);
        if (el.error != undefined) {
            el.error.dispose();
            el.error = undefined;
        }
    },
    validate: function(elemnetChange) {
        if (elemnetChange) {
            this.elements = this.form.getElements('input[type=text]');
            this.elements.combine(this.form.getElements('input[type=hidden]'));
            this.elements.combine(this.form.getElements('input[type=password]'));
            this.elements.combine(this.form.getElements('input[type=checkbox]'));
            this.elements.combine(this.form.getElements('select'));
            this.elements.combine(this.form.getElements('textarea'));
        }
        var ok = true;
        var first = null;
        this.elements.each(function(el, i) {
            if (!this._isVisible(el)) {
                return;
            }
            if (!this._validate(el)) {
                ok = false;
                if (el.getProperty('type') != "hidden" && !first) {
                    first = el;
                }
                this.list.include(el);
            } else {
                this.list.erase(el);
            }
        }.bind(this));
        if (first && 　this.options.defaultFocus) {
            try {
                first.focus();
            } catch(e) {};
        }
        return ok;
    },
    _isVisible: function(elm) {
        while (elm.get('tag') != 'body' && elm != this.form) {
            if (elm.getProperty('type') != 'hidden' && elm.getStyle("display") == "none") return false;
            elm = elm.getParent();
            if (!elm)
            return false;
        }
        return true;
    },
    clearAllStatus: function() {
        this.elements = this.form.getElements('input');
        this.elements.combine(this.form.getElements('input[type=hidden]'));
        this.elements.combine(this.form.getElements('input[type=password]'));
        this.elements.combine(this.form.getElements('input[type=checkbox]'));
        this.elements.combine(this.form.getElements('select'));
        this.elements.combine(this.form.getElements('textarea'));
        this.elements.each(function(el) {
            el.removeClass(this.options.errorClass);
            if (el.error != undefined) {
                el.error.dispose();
                el.error = undefined;
            }
        }.bind(this));
    }
});
Validate.implement(new Options);
Validate.implement(new Events);
var ValidatorItem = new Class({
    initialize: function(className, error, test) {
        this._test = test;
        this.error = error || 'Validation failed.';
        this.className = className;
    },
    test: function(v, elm) {
        return this._test(v, elm);
    }
});
var ValidatorItemHashClass = new Class({
    initialize: function(className, error, test) {
        this.myHash = new Hash({
            '_LikeNoIDIEverSaw_': new ValidatorItem('_LikeNoIDIEverSaw_', '', {})
        });
    },
    add: function(className, error, test) {
        this.myHash.include(className, new ValidatorItem(className, error, test));
    },
    get: function(className) {
        return this.myHash.get(className);
    },
    init: function() {
        this.add('IsEmpty', '', 
        function(v) {
            return ((v == null) || (v.trim().length == 0));
        });
        this.add('required', Resource.validate.required, 
        function(v) {
            return ! validatorItemHash.get('IsEmpty').test(v);
        });
        this.add('validate-number', Resource.validate.number, 
        function(v) {
            return validatorItemHash.get('IsEmpty').test(v) || (!isNaN(v) && !/^\s+$/.test(v));
        });
        this.add('validate-digits', Resource.validate.digits, 
        function(v) {
            return validatorItemHash.get('IsEmpty').test(v) || !/[^\d]/.test(v);
        });
        this.add('validate-alpha', Resource.validate.alpha, 
        function(v) {
            return validatorItemHash.get('IsEmpty').test(v) || /^[a-zA-Z]+$/.test(v)
        });
        this.add('validate-alphanum', Resource.validate.alphanum, 
        function(v) {
            return validatorItemHash.get('IsEmpty').test(v) || !/\W/.test(v)
        });
        this.add('validate-email', Resource.validate.email, 
        function(v) {
            return validatorItemHash.get('IsEmpty').test(v) || /^([\w\-]{1,}\.?)*[\w\-]{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(v)
        });
        this.add('validate-url', Resource.validate.url, 
        function(v) {
            return validatorItemHash.get('IsEmpty').test(v) || /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(v)
        });
        this.add('validate-date-au', Resource.validate.date_au, 
        function(v) {
            if (validatorItemHash.get('IsEmpty').test(v)) return true;
            var regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
            if (!regex.test(v)) return false;
            var d = new Date(v.replace(regex, '$2/$1/$3'));
            return (parseInt(RegExp.$2, 10) == (1 + d.getMonth())) && (parseInt(RegExp.$1, 10) == d.getDate()) && (parseInt(RegExp.$3, 10) == d.getFullYear());
        });
        this.add('validate-selection', Resource.validate.selection, 
        function(v, elm) {
            return elm.options ? elm.selectedIndex > 0: !validatorItemHash.get('IsEmpty').test(v);
        });
        this.add('validate-one-required', Resource.validate.oneRequired, 
        function(v, elm) {
            var p = elm.getParent();
            var options = p.getElementsByTagName('INPUT');
            return $A(options).any(function(elm) {
                return $F(elm);
            });
        });
        this.add('validate-length-range', 
        function(v, elm) {
            var results = elm.className.match(/validate-length-range-(\d*)-(\d*)/);
            var minLength = parseInt(results[1]);
            var maxLength = parseInt(results[2]);
            return Resource.validate.lengthRange(minLength, maxLength);
        },
        function(v, elm) {
            var results = elm.className.match(/validate-length-range-(\d*)-(\d*)/);
            var minLength = parseInt(results[1]);
            var maxLength = parseInt(results[2]);
            return validatorItemHash.get('IsEmpty').test(v) || (v.length >= minLength && v.length <= maxLength)
        });
        this.add('validate-lawless', Resource.validate.lawless, 
        function(v, elm) {
            v = v.trim();
            for (var i = 0; i < v.length; i++) {
                if (',;\'"@<>%\\'.indexOf(v.charAt(i)) != -1) return false;
            }
            return true;
        });
        this.add('validate-phone', Resource.validate.phone, 
        function(v, elm) {
            v = v.trim();
            for (var i = 0; i < v.length; i++) {
                if ('0123456789'.indexOf(v.charAt(i)) == -1) return false;
            }
            return true;
        });
        this.add('unique-deptname', Resource.validate.uniqueDeptname, 
        function(v, elm) {
            return newDeptNameCheck();
        });
        this.add('item-limit', Resource.validate.itemLimit, 
        function(v, elm) {
            return v > 0;
        });
        this.add('password-not-match', Resource.validate.notMatch, 
        function(v, elm) {
            return v == 1;
        });
        this.add('item-limit-2', '', 
        function(v, elm) {
            return v >= 2;
        });
        this.add('item-same-name', '', 
        function(v, elm) {
            return v == 0;
        });
        this.add('validateMyRequest', '', 
        function(v, elm) {
            return v != 0;
        });
    }
});
var validatorItemHash = new ValidatorItemHashClass();
var Builder = {
    scripts: new Array(),
    include: function(url) {
        var b = this.scripts.contains(url);
        if (b) {
            return;
        }
        this.scripts.include(url);
        new Request({
            url: url,
            method: "get",
            async: false,
            evalScripts: false,
            evalResponse: true
        }).send();
    }
};
function loadScript(url) {
    Builder.include(url);
};
var MgtPopupClass = new Class({
    Implements: Options,
    options: {
        name: 'MgtPopup',
        zIndex: 500,
        OverlayStyles: {
            'background-color': '#111111',
            'opacity': 0.2
        }
    },
    getId: function() {
        return this.Box.get('id');
    },
    initialize: function(options) {
        this.setOptions(options);
        this.Overlay = new Element('div', {
            'id': this.options.name + 'Overlay',
            'styles': {
                'display': 'none',
                'z-index': this.options.zIndex,
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'background-color': this.options.OverlayStyles['background-color'],
                'opacity': this.options.OverlayStyles['opacity']
            }
        });
        this.Overlay.injectInside(document.body);
        this.Box = new Element('div', {
            'id': this.options.name + '-Popup',
            'styles': {
                'display': 'none',
                'z-index': this.options.zIndex + 2,
                'position': 'absolute',
                'top': '0',
                'left': '0'
            }
        }).addClass("pop_win");
        this.Box.injectInside(document.body);
    },
    display: function(options) {
        if (options && options.needOverlay) {
            this.Overlay.setStyles({
                'display': 'block',
                'height': (window.getScrollHeight() - 5) + 'px',
                'width': (window.getScrollWidth() - 1) + 'px'
            });
            this.moveSize();
        } else {
            this.moveSize();
        }
        selectStatus('hidden', true);
    },
    close: function() {
        selectStatus('visible', true);
        this.Box.setStyles({
            'display': 'none',
            'top': 0
        });
        this.Overlay.setStyles({
            'display': 'none',
            'top': 0
        });
    },
    replaceBox: function() {
        this.moveSize();
    },
    moveSize: function() {
        this.Box.setStyles({
            'display': 'block',
            'left': 0,
            'top': -1000
        });
        var sizes = window.getSize();
        var scrollto = window.getScroll();
        var boxSize = this.Box.getSize();
        var y = (scrollto.y + (sizes.y - boxSize.y) / 2).toInt();
        debug("y:" + y + " , scrollto.y:" + scrollto.y + ", " + sizes.y + ", " + boxSize.y);
        if (y < scrollto.y + 10)
        y = scrollto.y + 10;
        this.Box.setStyles({
            'display': 'block',
            'left': (scrollto.x + (sizes.x - boxSize.x) / 2).toInt(),
            'top': y
        });
        var me = this;
        var drag = this.Box.getElement("#draggableId");
        if (drag) {
            new Drag(this.Box, {
                handle: drag
            });
        }
        this.Box.getElements(".popup_closebox").addEvents({
            'click': function() {
                this.close();
            }.bind(me)
        });
        return;
    }
});
var _mgtPopup = null;
var _mgtPopup2 = null;
var _mgtPopup3 = null;
function getPopInst(options) {
    if (!options || !options.num || options.num == 1) {
        if (!_mgtPopup) {
            _mgtPopup = new MgtPopupClass();
        }
        return _mgtPopup;
    } else if (options && options.num && options.num == 3) {
        if (!_mgtPopup3) {
            _mgtPopup3 = new MgtPopupClass({
                name: 'MgtPopup3',
                zIndex: 400
            });
        }
        return _mgtPopup3;
    } else {
        if (!_mgtPopup2) {
            _mgtPopup2 = new MgtPopupClass({
                name: 'MgtPopup2',
                zIndex: 600
            });
        }
        return _mgtPopup2;
    }
}
function mgtPopup(options) {
    var op = {
        needOverlay: true
    };
    $extend(op, options);
    var a = getPopInst(options);
    a.display(op);
};
function mgtPopupClose(options) {
    if (!options || !options.num || options.num == 1) {
        if (_mgtPopup) {
            _mgtPopup.close();
        }
    } else if (options && options.num && options.num == 3) {
        if (_mgtPopup3) {
            _mgtPopup3.close();
        }
    } else {
        if (_mgtPopup2) {
            _mgtPopup2.close();
        }
    }
};
function mgtPopupId(options) {
    var a = getPopInst(options);
    return a.getId();
};
function addReference(content, user, editorId) {
    editorId = getEditorId(editorId);
    var srcEditorId = editorId;
    editorId = $(editorId).retrieve("k");
    var mce = tinyMCE.get(editorId);
    if (!mce) return;
    var c = '<div>&nbsp;</div><div style="padding:5px 0;margin:0 0 0 12px;font-size:12px;"><b>' + user + '&nbsp;' + Resource.editor.say + '</b></div>';
    c += '<div style="border:1px solid #ccc;margin:0 0 0 12px;padding:3px;background:#fdfded;color:#444;font-size:12px;">' + content + '</div><br/>';
    mce.setContent(mce.getContent() + c);
    htmlEditorFocus(srcEditorId);
};
function addExtraInfo(c, editorId) {
    editorId = getEditorId(editorId);
    editorId = $(editorId).retrieve("k");
    var mce = tinyMCE.get(editorId);
    if (!mce) return;
    mce.getBody().innerHTML = c + mce.getBody().innerHTML;
}
function getHtmlEditorContent(contentId, editorId, showResult) {
    editorId = getEditorId(editorId);
    editorId = $(editorId).retrieve("k");
    var mce = tinyMCE.get(editorId);
    if (!mce) return;
    var c = mce.getContent();
    if (c) {
        c = c.stripScripts();
    } else {
        c = '';
    }
    if (!contentId) {
        return c;
    }
    if (showResult) {
        return c;
    } else {
        var cbody = mce.getContent();
        if (isHTMLBlank(cbody)) {
            $(contentId + 'Blank').value = '';
            $('' + contentId).value = '';
        } else {
            $(contentId + 'Blank').value = 'a';
            $('' + contentId).value = cbody;
        }
    }
}
function getEditorId(editorId) {
    if (!editorId) {
        editorId = 'defaultEditorId';
    }
    return editorId;
}
function getHtmlEditorContent4test() {
    var editorId = getEditorId();
    editorId = $(editorId).retrieve("k");
    var mce = tinyMCE.get(editorId);
    if (!mce) return "";
    var c = mce.getContent();
    if (c) {
        c = c.stripScripts();
    }
    return c;
}
function setHtmlEditorContent4test(c) {
    editorId = getEditorId();
    editorId = $(editorId).retrieve("k");
    var mce = tinyMCE.get(editorId);
    if (!mce) return;
    mce.getBody().innerHTML = c;
}
function htmlEditorFocus(editorId) {
    editorId = getEditorId(editorId);
    editorId = $(editorId).retrieve("k");
    var mce = tinyMCE.get(editorId);
    if (!mce) return;
    var mceIframe = $(editorId + '_ifr');
    var myScrollIn = $('a_right');
    if (!myScrollIn) myScrollIn = $("a_con");
    if (myScrollIn) new Fx.Scroll(myScrollIn).scrollIntoView($(mceIframe));
    mce.focus();
}
function isHTMLBlank(str) {
    if (!str) return true;
    if (str.contains('<img') || str.contains('<IMG')) return false;
    var tempStr = str.replace(/<.*?>/g, '');
    tempStr = tempStr.replace(/&nbsp;/g, '');
    tempStr = tempStr.replace(/(^[\s]*)|([\s]*$)/g, '');
    if (tempStr == null || tempStr == '' || tempStr.length < 1) {
        return true;
    } else {
        return false;
    }
}
function editorGlobalInit(editorId) {
    editorId = getEditorId(editorId);
    editorId = $(editorId).retrieve("k");
    var mce = tinyMCE.get(editorId);
    if (!mce) return;
    var content = '';
    if (editorGlobal.ok) {
        editorGlobal.ok = false;
        content = editorGlobal.content;
    }
    mce.setContent(content);
}
function addEditorLine(id, step) {
    var editorMain = $(id + '_ifr');
    if (editorMain) {
        var length;
        length = parseInt(editorMain.style.height) + step;
        if (length < 175)
        length = 175;
        editorMain.style.height = length + "px";
    }
}
function clearHtmlEditorContent(editorId) {
    editorId = getEditorId(editorId);
    editorId = $(editorId).retrieve("k");
    var mce = tinyMCE.get(editorId);
    if (!mce) return;
    mce.setContent('');
}
var MGTMceConfig = {
    mcePlugins: "safari,table,advhr,advimage,advlink,iespell,inlinepopups,insertdatetime,preview,searchreplace,contextmenu,directionality,noneditable,nonbreaking,paste",
    mcePluginsSimple: "safari,advhr,advimage,advlink,iespell,inlinepopups,insertdatetime,preview,searchreplace,contextmenu,directionality,noneditable,nonbreaking,paste",
    mceThemeSimple: {
        buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,fontsizeselect,|,forecolor,|,bullist,numlist,|,outdent,indent,|,undo,redo,|,link,unlink,image"
    },
    mceThemeSimple_warp: {
        buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,fontsizeselect,|,forecolor",
        buttons2: "bullist,numlist,outdent,indent,|,undo,redo,|,link,unlink,image"
    },
    mceThemePreview: {
        buttons1: "preview,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,fontsizeselect,|,bullist,numlist,|,outdent,indent,|,undo,redo,|,link,unlink,image,|,forecolor"
    },
    mceThemeFull: {
        buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect",
        buttons2: "link,unlink,image,|,forecolor,backcolor,|,bullist,numlist,outdent,indent"
    }
}
var MgtAlertClass = new Class({
    Implements: Options,
    options: {
        name: 'MgtAlertHiddenDiv',
        zIndex: 65555,
        OverlayStyles: {
            'background-color': '#111111',
            'opacity': 0.2
        }
    },
    initialize: function(options) {
        this.setOptions(options);
        this.Overlay = new Element('div', {
            'id': this.options.name,
            'styles': {
                'display': 'none',
                'z-index': this.options.zIndex,
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'background-color': this.options.OverlayStyles['background-color'],
                'opacity': this.options.OverlayStyles['opacity']
            }
        });
        this.Overlay.injectInside(document.body);
        this.alert = $('mgtAlertDivId');
        this.alert.setStyles({
            'z-index': this.options.zIndex + 2,
            'position': 'absolute',
            'top': '0',
            'left': '0'
        });
        this.confirm = $('mgtConfirmDivId');
        this.confirm.setStyles({
            'z-index': this.options.zIndex + 2,
            'position': 'absolute',
            'top': '0',
            'left': '0'
        });
    },
    showAlert: function(m, options) {
        this.alertOption = options;
        this.Overlay.setStyles({
            'display': 'block',
            'height': window.getScrollHeight() + 'px',
            'width': window.getScrollWidth() + 'px'
        });
        if (options.noBackGround) {
            this.Overlay.setStyle("background-color", "#fff");
        }
        this.alert.getElement('.alertContentClass').set("html", m);
        this.moveSize(this.alert);
        selectStatus('hidden');
    },
    showConfirm: function(m, options) {
        this.alertOption = options;
        this.Overlay.setStyles({
            'display': 'block',
            'height': window.getScrollHeight() + 'px',
            'width': window.getScrollWidth() + 'px'
        });
        this.confirm.getElement('.alertContentClass').set("html", m);
        this.moveSize(this.confirm);
        selectStatus('hidden');
    },
    close: function(who, status) {
        selectStatus('visible');
        var me;
        if (who == "alert") {
            me = this.alert;
        } else if (who == "confirm") {
            me = this.confirm;
        } else {
            return;
        }
        me.setStyle('display', 'none');
        this.Overlay.setStyle('display', 'none');
        this.alertOption.onComplete(status);
    },
    replaceBox: function() {
        this.moveSize();
    },
    moveSize: function(me) {
        me.setStyles({
            'display': 'block',
            'left': 0,
            'top': 0
        });
        var sizes = window.getSize();
        var scrollto = window.getScroll();
        var boxSize = me.getSize();
        var y = (scrollto.y + (sizes.y - boxSize.y) / 2).toInt();
        debug("y:" + y + " , scrollto.y:" + scrollto.y + ", " + sizes.y + ", " + boxSize.y);
        if (y < scrollto.y + 10)
        y = scrollto.y + 10;
        var left = (scrollto.x + (sizes.x - boxSize.x) / 2).toInt();
        if (left <= 0) left = 0;
        if (y <= 0) y = 0;
        me.setStyles({
            'display': 'block',
            'left': left,
            'top': y
        });
        return;
    }
});
var mgtMsgBox;
primaryAlert = window.alert;
window.alert = function(text, func, options) {
    if (!$defined(mgtMsgBox)) {
        mgtMsgBox = new MgtAlertClass();
    }
    var noBackGround = false;
    if (options && options.noBackGround) {
        noBackGround = options.noBackGround;
    }
    mgtMsgBox.showAlert(text, {
        onComplete: function() {
            if (func) {
                func();
            }
        },
        noBackGround: noBackGround
    });
    if ($("buttonOk")) {
        $("buttonOk").focus();
    }
};
window.confirm = function(text, func) {
    if (!$defined(mgtMsgBox)) {
        mgtMsgBox = new MgtAlertClass();
    }
    mgtMsgBox.showConfirm(text, {
        onComplete: function(r) {
            if (r) {
                func.NextStep();
            } else {
                if (func.FalseStep) {
                    func.FalseStep();
                }
            }
        }
    });
    $("confirmOk").focus();
};
var MgtInfoClass = new Class({
    initialize: function(options) {
        this.id = "anotherElementDivId";
        this.num = 0;
        this.status = false;
    },
    show: function(m, o) {
        var de = $(this.id + this.num);
        if (de)
        de.destroy();
        this.num++;
        var myId = this.id + this.num;
        o = $extend({
            w: 190,
            y: 20
        },
        o);
        var myDiv = new Element('div', {
            'id': myId,
            'styles': {
                'z-index': 3000,
                'text-align': 'center',
                'position': 'absolute',
                'width': o.w,
                'opacity': 0.2,
                'height': o.y,
                'overflow': 'hidden',
                'background-color': "#ffffee",
                'border': "1px solid #ffd0a8",
                'padding': 7
            }
        }).injectInside(document.body);
        window.addEvent('scroll', mgtInfo.move.bind(myDiv));
        myDiv.empty();
        myDiv.set('html', m);
        myDiv.setStyles({
            'display': 'block',
            'height': o.y
        });
        this.move.bind(myDiv)();
        var morph = new Fx.Morph(myDiv, {
            duration: 500,
            onComplete: function() {
                return;
                mgtInfo.status = false;
            }
        });
        morph.start({
            'opacity': 1
        }).chain(function() {
            morph.start.delay(3000, morph, {
                'opacity': 0
            });
        }).chain(function() {
            morph.start({
                'display': 'none'
            });
        });
    },
    move: function() {
        if (this.getStyle('display') == "none")
        return;
        var sizes = window.getSize();
        var scrollto = window.getScroll();
        var w = this.getSize().x;
        this.setStyles({
            'left': (scrollto.x + (sizes.x - w) / 2).toInt(),
            'top': scrollto.y + 20
        });
    }
});
var mgtInfo = new MgtInfoClass();
function setDivHeight(tId) {
    var offset = 3;
    if (Browser.Engine.trident)
    offset = 3;
    var y = window.getSize().y - offset;
    tId.setStyle("height", y - tId.getCoordinates().top);
};
function setTreeDivHeight(mgtOptions, tId) {
    var offset = 7;
    if (Browser.Engine.trident4)
    offset = 12;
    var c = tId.getFirst();
    if (mgtOptions.setHeight) {
        var y = window.getSize().y - 10;
        var p = tId.getParent();
        p.setStyle("height", y - p.getCoordinates().top);
        tId.setStyle("height", y - tId.getCoordinates().top);
    }
    var s = tId.getSize();
    c.setStyle("height", s.y - offset);
    c.setStyle("width", s.x - 3);
};
var allTreeMap = {};
var orgTreeJsonMap = {};
var commonTreeJsonMap = {};
var allTreeTypes = {
    folder: {
        openIcon: 'mif-tree-bomb-icon',
        closeIcon: 'mif-tree-foot-icon'
    },
    dept_old: {
        openIcon: 'mif-tree-open-icon',
        closeIcon: 'mif-tree-close-icon'
    },
    dept: {
        openIcon: 'enc-department-icon',
        closeIcon: 'enc-department-icon'
    },
    user: {
        openIcon: 'enc-employee-icon',
        closeIcon: 'enc-employee-icon'
    },
    duty: {
        openIcon: 'panel_title',
        closeIcon: 'panel_title'
    },
    plur: {
        openIcon: 'mif-tree-bin-close-icon',
        closeIcon: 'mif-tree-bin-close-icon'
    },
    target: {
        openIcon: 'mif-tree-open-icon',
        closeIcon: 'mif-tree-close-icon'
    },
    enc_employee: {
        openIcon: 'enc-employee-icon',
        closeIcon: 'enc-employee-icon'
    },
    enc_employee_friend: {
        openIcon: 'enc-employee-friend-icon',
        closeIcon: 'enc-employee-friend-icon'
    },
    enc_employee_cursor_default: {
        openIcon: 'enc-employee-icon',
        closeIcon: 'enc-employee-icon',
        cls: 'cursor-style'
    },
    enc_employee_suspended: {
        openIcon: 'enc-employee-suspended-icon',
        closeIcon: 'enc-employee-suspended-icon',
        cls: 'cursor-style'
    },
    enc_employee_deleted: {
        openIcon: 'enc-employee-deleted-icon',
        closeIcon: 'enc-employee-deleted-icon',
        cls: 'cursor-style'
    },
    enc_plurality: {
        openIcon: 'enc-plurality-icon',
        closeIcon: 'enc-plurality-icon'
    },
    enc_plurality_cursor_default: {
        openIcon: 'enc-plurality-icon',
        closeIcon: 'enc-plurality-icon',
        cls: 'cursor-style'
    },
    enc_stop_employee: {
        openIcon: 'enc-stop-employee-icon',
        closeIcon: 'enc-stop-employee-icon'
    },
    enc_stop_plurality: {
        openIcon: 'enc-stop-plurality-icon',
        closeIcon: 'enc-stop-plurality-icon'
    },
    enc_company: {
        openIcon: 'enc-company-icon',
        closeIcon: 'enc-company-icon'
    },
    enc_department: {
        openIcon: 'enc-department-icon',
        closeIcon: 'enc-department-icon'
    },
    enc_stop_company: {
        openIcon: 'enc-stop-company-icon',
        closeIcon: 'enc-stop-company-icon'
    },
    enc_stop_department: {
        openIcon: 'enc-stop-department-icon',
        closeIcon: 'enc-stop-department-icon'
    },
    online_setup: {
        openIcon: 'online-setup',
        closeIcon: 'online-setup'
    },
    online_setup_sort: {
        openIcon: 'online-setup-sort',
        closeIcon: 'online-setup-sort'
    },
    useful_comm_mess: {
        openIcon: 'useful-comm-mess',
        closeIcon: 'useful-comm-mess'
    },
    useful_word_mess: {
        openIcon: 'useful-comm-word',
        closeIcon: 'useful-comm-word'
    },
    useful_comm_link: {
        openIcon: 'useful-comm-link',
        closeIcon: 'useful-comm-link'
    },
    online_record: {
        openIcon: 'online-record',
        closeIcon: 'online-record'
    },
    online_leave_word: {
        openIcon: 'online-leave-word',
        closeIcon: 'online-leave-word'
    },
    online_claim_leave_word: {
        openIcon: 'online-claim-leave-word',
        closeIcon: 'online-claim-leave-word'
    },
    online_myrecord: {
        openIcon: 'online-myrecord',
        closeIcon: 'online-myrecord'
    },
    online_pers: {
        openIcon: 'online-pers',
        closeIcon: 'online-pers'
    },
    online_sproblem_list: {
        openIcon: 'online-sproblem-list',
        closeIcon: 'online-sproblem-list'
    },
    online_sproblem_sort: {
        openIcon: 'online-sproblem-sort',
        closeIcon: 'online-sproblem-sort'
    },
    mywork: {
        openIcon: 'mywork-icon',
        closeIcon: 'mywork-icon'
    },
    mywork_takeover: {
        openIcon: 'mywork-takeover-icon',
        closeIcon: 'mywork-takeover-icon'
    },
    mywork_send: {
        openIcon: 'mywork-send-icon',
        closeIcon: 'mywork-send-icon'
    },
    sno_comp: {
        openIcon: 'sno-comp-icon',
        closeIcon: 'sno-comp-icon'
    },
    scomp: {
        openIcon: 'scomp-icon',
        closeIcon: 'scomp-icon'
    },
    sdis: {
        openIcon: 'sdis-icon',
        closeIcon: 'sdis-icon'
    },
    principal: {
        openIcon: 'principal-icon',
        closeIcon: 'principal-icon',
        cls: 'treeText_red'
    },
    principal_del: {
        openIcon: 'principal-icon',
        closeIcon: 'principal-icon',
        cls: 'treeText_red_del'
    },
    executor: {
        openIcon: 'executor-icon',
        closeIcon: 'executor-icon',
        cls: 'treeText_green'
    },
    executor_del: {
        openIcon: 'executor-icon',
        closeIcon: 'executor-icon',
        cls: 'treeText_green_del'
    },
    target_over: {
        openIcon: 'target-over-icon',
        closeIcon: 'target-over-icon',
        cls: 'treeText_blue'
    },
    target_over_pricipal: {
        openIcon: 'target-over-icon',
        closeIcon: 'target-over-icon',
        cls: 'treeText_boldblue'
    },
    target_cancel: {
        openIcon: 'target-cancel-icon',
        closeIcon: 'target-cancel-icon',
        cls: 'treeText_blue'
    },
    target_cancel_pricipal: {
        openIcon: 'target-cancel-icon',
        closeIcon: 'target-cancel-icon',
        cls: 'treeText_boldblue'
    },
    target_pricipal: {
        openIcon: 'target-usable-icon',
        closeIcon: 'target-usable-icon',
        cls: 'treeText_boldblue'
    },
    target_executor: {
        openIcon: 'target-usable-icon',
        closeIcon: 'target-usable-icon',
        cls: 'treeText_blue'
    },
    target_unable: {
        openIcon: 'target-unable-icon',
        closeIcon: 'target-unable-icon',
        cls: 'treeText_gray'
    },
    target_defer_pricipal: {
        openIcon: 'target-defer-icon',
        closeIcon: 'target-defer-icon',
        cls: 'treeText_boldblue'
    },
    target_defer: {
        openIcon: 'target-defer-icon',
        closeIcon: 'target-defer-icon',
        cls: 'treeText_blue'
    },
    middle: {
        openIcon: 'middle-icon',
        closeIcon: 'middle-icon',
        cls: 'treeText_yellow'
    },
    middle_del: {
        openIcon: 'middle-icon',
        closeIcon: 'middle-icon',
        cls: 'treeText_yellow_del'
    },
    enterprisemain: {
        openIcon: 'enterprise_main_icon',
        closeIcon: 'enterprise_main_icon'
    },
    enterprisesub: {
        openIcon: 'enterprise_sub_icon',
        closeIcon: 'enterprise_sub_icon'
    },
    bbslist: {
        openIcon: 'bbs_list_icon',
        closeIcon: 'bbs_list_icon'
    },
    bbssubarea: {
        openIcon: 'bbssubarea_icon',
        closeIcon: 'bbssubarea_icon'
    },
    bbs: {
        openIcon: 'bbs_icon',
        closeIcon: 'bbs_icon'
    },
    know_list: {
        openIcon: 'know_list_icon',
        closeIcon: 'know_list_icon'
    },
    know_sort: {
        openIcon: 'know_sort_icon',
        closeIcon: 'know_sort_icon'
    },
    my_know: {
        openIcon: 'my_know_icon',
        closeIcon: 'my_know_icon'
    },
    know_send: {
        openIcon: 'know_send_icon',
        closeIcon: 'know_send_icon'
    },
    know_wait_auditing: {
        openIcon: 'know_wait_auditing_icon',
        closeIcon: 'know_wait_auditing_icon'
    },
    know_dis: {
        openIcon: 'know_dis_icon',
        closeIcon: 'know_dis_icon'
    },
    know_refuse: {
        openIcon: 'know_refuse_icon',
        closeIcon: 'know_refuse_icon'
    },
    know_draft: {
        openIcon: 'know_draft_icon',
        closeIcon: 'know_draft_icon'
    },
    all_user: {
        openIcon: 'all_user',
        closeIcon: 'all_user'
    }
};
createCommonTree = function(jsonTree, mgtOptions, isUDTree) {
    var op = {
        orgTreeType: 2,
        permId: -1,
        showMode: 0,
        oncheck: $empty,
        onload: $empty,
        onselect: $empty,
        ondoubleclick: $empty,
        onmouseover: $empty,
        onmouseout: $empty,
        hasCheckbox: false,
        checkBoxType: 'deps',
        setHeight: true
    };
    mgtOptions = $extend(op, mgtOptions);
    var tId = $(mgtOptions.treeDivId);
    if (allTreeMap[mgtOptions.treeName]) {
        tId.set("html", "");
    }
    var t = new Mif.Tree({
        container: $(mgtOptions.treeDivId),
        initialize: function() {
            if (mgtOptions.hasCheckbox) {
                this.initCheckbox(mgtOptions.checkBoxType);
            }
        },
        forest: mgtOptions.forest,
        types: allTreeTypes,
        dfltType: 'folder',
        height: 18,
        selectClass: mgtOptions.selectClass
    });
    allTreeMap[mgtOptions.treeName] = t;
    t.addEvent('load', 
    function() {
        mgtOptions.onload();
        setTreeDivHeight(mgtOptions, tId);
    });
    t.addEvent('select', mgtOptions.onselect);
    if (mgtOptions.hasCheckbox) {
        t.onClickCheckbox = mgtOptions.oncheck;
    }
    t.onDbClick = mgtOptions.ondoubleclick;
    t.onClick = mgtOptions.onClick;
    t.onMouseover = mgtOptions.onmouseover;
    t.onMouseout = mgtOptions.onmouseout;
    t.mgtOptions = mgtOptions;
    if (isUDTree) {
        t.isUDTree = true;
    }
    t.load({
        json: jsonTree
    });
    return t;
};
createOrgTree = function(mgtOptions) {
    var op = {
        orgTreeType: 2,
        permId: 'ALL_PERM',
        showMode: 0,
        oncheck: $empty,
        onload: $empty,
        onselect: $empty,
        ondoubleclick: $empty,
        onmouseover: $empty,
        onmouseout: $empty,
        hasCheckbox: true,
        checkBoxType: 'deps',
        setHeight: true,
        mailTree: false,
        apprFlowTree: false
    };
    mgtOptions = $extend(op, mgtOptions);
    var tId = $(mgtOptions.treeDivId);
    if (allTreeMap[mgtOptions.treeName] && mgtOptions.orgTreeType != 0 && mgtOptions.orgTreeType != 2) {
        mgtOptions.orgTreeType = allTreeMap[mgtOptions.treeName].mgtOptions.orgTreeType;
    }
    if (!orgTreeJsonMap[mgtOptions.orgTreeType]) {
        orgTreeJsonMap[mgtOptions.orgTreeType] = {};
    }
    if (!orgTreeJsonMap[mgtOptions.orgTreeType][mgtOptions.permId]) {
        orgTreeJsonMap[mgtOptions.orgTreeType][mgtOptions.permId] = {
            xmlVer: -1
        };
    }
    if (!orgTreeJsonMap[mgtOptions.orgTreeType][mgtOptions.permId][mgtOptions.showMode]) {
        orgTreeJsonMap[mgtOptions.orgTreeType][mgtOptions.permId][mgtOptions.showMode] = {
            xmlVer: -1
        };
    }
    var dwr = new DwrBackCall();
    if (mgtOptions.mailTree) {
        dwr.addOneUrl("/include/orgtreepanel4mail.jsp?treeName=" + mgtOptions.treeName, mgtOptions.treePanelDivId);
    } else if (mgtOptions.apprFlowTree) {
        dwr.addOneUrl('/include/orgtreepanel4ApprFlow.jsp?type=' + mgtOptions.orgTreeType + "&treeName="
        + mgtOptions.treeName + "&hide=" + mgtOptions.hide + "&showNB=" + mgtOptions.showNB, mgtOptions.treePanelDivId);
    } else {
        dwr.addOneUrl('/include/orgtreepanel.jsp?fc=' + mgtOptions.fromClient + '&type=' + mgtOptions.orgTreeType + "&treeName="
        + mgtOptions.treeName + "&hide=" + mgtOptions.hide + "&showNB=" + mgtOptions.showNB, mgtOptions.treePanelDivId);
    }
    dwr.backCallFunc = function(map) {
        tId.set("html", "");
        var t = new Mif.Tree({
            container: $(mgtOptions.treeDivId),
            initialize: function() {
                if (mgtOptions.hasCheckbox) {
                    this.initCheckbox(mgtOptions.checkBoxType);
                }
            },
            types: allTreeTypes,
            forest: mgtOptions.forest,
            dfltType: 'enc_department',
            height: 18
        });
        allTreeMap[mgtOptions.treeName] = t;
        t.addEvent('load', 
        function() {
            mgtOptions.onload();
            setTreeDivHeight(mgtOptions, tId);
        });
        t.addEvent('select', mgtOptions.onselect);
        if (mgtOptions.mailTree) {}
        if (mgtOptions.hasCheckbox) {
            t.onClickCheckbox = mgtOptions.oncheck;
        }
        t.onDbClick = mgtOptions.ondoubleclick;
        t.onClick = mgtOptions.onClick;
        t.onMouseover = mgtOptions.onmouseover;
        t.onMouseout = mgtOptions.onmouseout;
        t.mgtOptions = mgtOptions;
        t.isDeptTree = (mgtOptions.orgTreeType == 0);
        var obj = getOrgTreeNode(mgtOptions);
        var treeNode = filterTree(obj);
        var loadJson = [treeNode];
        if (mgtOptions.mailTree) {
            loadJson.extend(orgTreeJsonMap[op.orgTreeType][op.permId][op.showMode].userDefined);
        }
        t.load({
            json: loadJson
        });
        if (mgtOptions.orgTreeType != 1 && $('selectTree_' + mgtOptions.treeName)) {
            _initSelectTree(treeNode, {
                treeName: mgtOptions.treeName,
                type: mgtOptions.orgTreeType,
                mode: mgtOptions.showMode
            });
        }
    };
    var _objDraft;
    if (mgtOptions.yqtDraft) {
        _objDraft = {
            check: false
        };
    }
    dwr.dwrProxy(_objDraft);
};
JinTreeType = {
    onlyDept: 0,
    user: 1,
    dept: 2,
    duty: 3,
    deptDuty: 4,
    onlyDeptAll: 5
}
getOrgTreeNode = function(op) {
    DWREngine.setAsync(false);
    var filterDept;
    var myId;
    try {
        if (op.yqtDraft) yqtDraft.exeInit = false;
        dwrService.getRootNodeVerAndFilter(op.permId, 
        function(map) {
            if (map.version != orgTreeJsonMap[op.orgTreeType][op.permId][op.showMode].xmlVer) {
                orgTreeJsonMap[op.orgTreeType][op.permId][op.showMode].xmlVer = map.version;
                orgTreeJsonMap[op.orgTreeType][op.permId][op.showMode].deptNode = null;
            }
            filterDept = map.filterDept;
            myId = map.myId;
        });
        if (orgTreeJsonMap[op.orgTreeType][op.permId][op.showMode].deptNode == null) {
            if (op.yqtDraft) yqtDraft.exeInit = false;
            dwrService.getOrganizationTree(op.orgTreeType, op.permId, op.showMode, op.mailTree, 
            function(map) {
                orgTreeJsonMap[op.orgTreeType][op.permId][op.showMode].deptNode = map.jsonTree;
                orgTreeJsonMap[op.orgTreeType][op.permId][op.showMode].userDefined = map.userDefined;
            });
        }
    } finally {
        DWREngine.setAsync(true);
    }
    return {
        node: orgTreeJsonMap[op.orgTreeType][op.permId][op.showMode].deptNode,
        type: op.orgTreeType,
        permId: op.permId,
        yqtDraft: op.yqtDraft,
        filter: filterDept,
        userId: myId,
        showMode: op.showMode
    }
}
getTreeData = function(obj) {
    DWREngine.setAsync(false);
    try {
        if (obj.permId != 'ALL_PERM') {
            var dwr = new DwrBackCall();
            dwr.backCallFunc = function(map) {
                var filter = map.filterDept;
                obj.userId = map.myId;
                switch (obj.type) {
                case JinTreeType.user:
                    obj.node = filterUserNode(obj, filter);
                    break;
                case JinTreeType.dept:
                    obj.node = filterDeptNode(obj, filter);
                    break;
                case JinTreeType.duty:
                    obj.node = filterDutyNode(obj, filter);
                    break;
                case JinTreeType.deptDuty:
                    obj.node = filterDeptNode(obj, filter);
                    break;
                }
            }
            if (obj.yqtDraft) yqtDraft.exeInit = false;
            dwrService.getOrgTreeFilter(obj.type, obj.permId, dwr.backToDwrUrls.bind(dwr));
        } else {
            obj.node = filterPlurality(obj);
        }
    } finally {
        DWREngine.setAsync(true);
    }
    return toTreeNode(obj);
}
filterTree = function(obj) {
    if (obj.permId != 'ALL_PERM') {
        var filter = obj.filter;
        switch (obj.type) {
        case JinTreeType.user:
            obj.node = filterUserNode(obj, filter);
            break;
        case JinTreeType.dept:
            obj.node = filterDeptNode(obj, filter);
            break;
        case JinTreeType.duty:
            obj.node = filterDutyNode(obj, filter);
            break;
        case JinTreeType.deptDuty:
            obj.node = filterDeptNode(obj, filter);
            break;
        }
    } else {
        obj.node = filterPlurality(obj);
    }
    return toTreeNode(obj);
}
toTreeNode = function(obj) {
    var treeType = obj.type,
    node = obj.node,
    icon = obj.icon || 'enc_company';
    if (obj.subTree && !obj.icon && obj.rootId != node.id) {
        icon = obj.type == JinTreeType.duty ? 'duty': 'dept';
    }
    var id = node.id;
    if (icon == 'enc_company') {
        id = 'c' + node.id;
    } else if (icon == 'dept') {
        id = 'd' + node.id;
    } else if (icon == 'duty') {
        id = 'du' + node.id;
    }
    var treeNode = {
        property: {
            id: '' + id,
            name: node.name
        },
        children: [],
        type: icon
    };
    if (node.deptChildren) {
        node.deptChildren.each(function(child) {
            treeNode.children.push(toTreeNode({
                node: child,
                type: treeType,
                icon: 'dept'
            }));
        }.bind(this));
    }
    if ((treeType == JinTreeType.deptDuty || treeType == JinTreeType.duty) && node.dutyChildren) {
        node.dutyChildren.each(function(child) {
            if (!child.name || child.name == 'undefined') child.name = "未分配职务";
            treeNode.children.push(toTreeNode({
                node: child,
                icon: 'duty',
                type: treeType
            }));
        }.bind(this));
    }
    if (treeType != JinTreeType.onlyDept && treeType != JinTreeType.deptDuty) {
        node.users.each(function(child) {
            treeNode.children.push({
                property: {
                    id: '' + child.id,
                    name: child.name
                },
                children: [],
                type: 'user'
            })
        }.bind(this));
    } else if (treeType != JinTreeType.onlyDept && treeType == JinTreeType.deptDuty && obj.icon == 'duty') {
        node.users.each(function(child) {
            treeNode.children.push({
                property: {
                    id: '' + child.id,
                    name: child.name
                },
                children: [],
                type: 'user'
            })
        }.bind(this));
    }
    return treeNode;
};
filterUserNode = function(obj, filterDeptIds) {
    var node = obj.node;
    if (filterDeptIds && filterDeptIds[0] == -1) {
        if (obj.permId != 'logDeptcomment') return node;
        obj.removeMe = true;
        return removeMeNode(obj);
    }
    var userNode = {
        id: node.id,
        name: node.name,
        version: node.version,
        depth: node.depth,
        dutyChildren: [],
        deptChildren: [],
        users: []
    };
    var users = node.users;
    users.each(function(user) {
        user.deptDutyList.some(function(deptDuty) {
            if (filterDeptIds.contains(deptDuty.deptId)) {
                if (deptDuty.fulltimeDuty) {
                    if (obj.permId == 'logDeptcomment') {
                        if (user.id != obj.userId && user.fulltimeDuty)
                        userNode.users.push(user);
                    } else if (user.fulltimeDuty) {
                        userNode.users.push(user);
                    }
                    return true;
                }
            };
        });
    })
    return userNode
}
filterDutyNode = function(obj, filterDeptIds) {
    var node = obj.node;
    if (filterDeptIds && filterDeptIds[0] == -1) {
        if (obj.permId == 'logDeptcomment') obj.removeMe = true;
        return removeMeNode(obj);
    }
    var dutyNode = {
        id: node.id,
        name: node.name,
        version: node.version,
        depth: node.depth,
        dutyChildren: [],
        deptChildren: [],
        users: []
    };
    var userFilter = [];
    var root = orgTreeJsonMap[obj.type][obj.permId][obj.showMode].deptNode;
    root.dutyChildren.each(function(duty) {
        duty.users.each(function(user) {
            user.deptDutyList.some(function(deptDuty) {
                if (filterDeptIds.contains(deptDuty.deptId) && deptDuty.fulltimeDuty) {
                    userFilter.push(user.id);
                    return true;
                };
            });
        });
    });
    var nodeStr = JSON.encode((obj.subDutyTree && obj.rootId != node.id) ? [node] : (node.dutyChildren || []));
    var dutyList = JSON.decode(nodeStr);
    debug('userFilter:' + userFilter);
    debug('filterDeptIds[0]:' + filterDeptIds[0]);
    dutyList.each(function(duty) {
        var users = duty.users;
        duty.users = [];
        var hasDuty = false;
        users.each(function(user) {
            if (userFilter.contains(user.id) || filterDeptIds[0] == -1) {
                if (obj.permId == 'logDeptcomment') {
                    if (user.id != obj.userId) duty.users.push(user);
                    if (obj.subDutyTree && user.id != obj.userId && obj.rootId != node.id) {
                        dutyNode.users.push(user);
                    }
                } else {
                    duty.users.push(user);
                    if (obj.subDutyTree && obj.rootId != node.id) {
                        dutyNode.users.push(user);
                    }
                }
                hasDuty = true;
            }
        });
        if (hasDuty && (!obj.subDutyTree || obj.rootId == node.id)) {
            dutyNode.dutyChildren.push(duty);
        }
    });
    if (obj.subDutyTree && dutyNode.name == 'undefined') dutyNode.name = "未分配职务";
    return dutyNode;
}
escapeHTML = function(str) {
    var div = document.createElement('p');
    var text = document.createTextNode(str);
    div.appendChild(text);
    return div.innerHTML;
}
filterDeptNode = function(obj, filterDeptIds) {
    var deptNode = obj.node;
    if (filterDeptIds && filterDeptIds[0] == -1) {
        if (obj.permId == 'logDeptcomment') obj.removeMe = true;
        return removeMeNode(obj);
    }
    var retNode = {
        id: deptNode.id,
        name: escapeHTML(deptNode.name),
        version: deptNode.version,
        depth: deptNode.depth,
        dutyChildren: [],
        deptChildren: [],
        users: []
    };
    var childrenDept = deptNode.deptChildren || [];
    if (filterDeptIds.contains(deptNode.id)) {
        var nodeStr = JSON.encode(deptNode.dutyChildren);
        var dutyList = JSON.decode(nodeStr);
        if (obj.permId == 'logDeptcomment') {
            retNode.users = deptNode.users.filter(function(user, index) {
                return user.id != obj.userId && user.fulltimeDuty;
            });
            retNode.dutyChildren = dutyList.filter(function(duty) {
                var hasMy = false;
                duty.users = duty.users.filter(function(user) {
                    if (user.id == obj.userId && user.fulltimeDuty) hasMy = true;
                    return user.id != obj.userId && user.fulltimeDuty;
                });
                return duty.users.length > 0 || hasMy;
            });
        } else {
            retNode.users = deptNode.users.filter(function(user, index) {
                return user.fulltimeDuty;
            });
            retNode.dutyChildren = dutyList.filter(function(duty) {
                duty.users = duty.users.filter(function(user) {
                    return user.fulltimeDuty;
                });
                return duty.users.length > 0;
            });
        }
        retNode.hasPerm = true;
    }
    for (var i = 0; i < childrenDept.length; i++) {
        var child = filterDeptNode({
            node: childrenDept[i],
            type: obj.type,
            permId: obj.permId,
            userId: obj.userId
        },
        filterDeptIds);
        if (child) {
            if (child.hasPerm) {
                retNode.hasPerm = true;
                retNode.deptChildren.push(child);
            }
        }
    }
    return retNode;
}
filterPlurality = function(obj) {
    var deptNode = obj.node;
    var retNode = {
        id: deptNode.id,
        name: escapeHTML(deptNode.name),
        version: deptNode.version,
        depth: deptNode.depth,
        dutyChildren: [],
        deptChildren: [],
        users: []
    };
    var childrenDept = deptNode.deptChildren || [];
    if (obj.subDutyTree) {
        retNode.users = deptNode.users;
    } else {
        retNode.users = deptNode.users.filter(function(user) {
            return user.fulltimeDuty;
        });
    }
    var nodeStr = JSON.encode(deptNode.dutyChildren || []);
    var dutyList = JSON.decode(nodeStr);
    if (obj.type == JinTreeType.deptDuty) {
        retNode.dutyChildren = dutyList.filter(function(duty) {
            duty.users = duty.users.filter(function(user) {
                return user.fulltimeDuty;
            });
            return duty.users.length > 0;
        });
    } else {
        if (!obj.subDutyTree || obj.rootId == deptNode.id || obj.showMode > 0) {
            retNode.dutyChildren = dutyList;
        }
    }
    for (var i = 0; i < childrenDept.length; i++) {
        var child = filterPlurality({
            node: childrenDept[i],
            type: obj.type,
            perId: obj.permId,
            userId: obj.userId
        });
        if (child) {
            retNode.deptChildren.push(child);
        }
    }
    if (obj.subDutyTree && retNode.name == 'undefined') retNode.name = "未分配职务";
    return retNode;
}
removeMeNode = function(obj) {
    var deptNode = obj.node;
    var temp = obj;
    var retNode = {
        id: deptNode.id,
        name: escapeHTML(deptNode.name),
        version: deptNode.version,
        depth: deptNode.depth,
        dutyChildren: [],
        deptChildren: [],
        users: []
    };
    retNode.users = deptNode.users.filter(function(item) {
        var temp = true;
        if (obj.removeMe) temp = (item.id != obj.userId);
        var fulltime = item.fulltimeDuty
        if (obj.type == JinTreeType.duty) fulltime = true;
        return temp && fulltime;
    });
    debug('====removeMeNode=================');
    var nodeStr = JSON.encode(deptNode.dutyChildren || []);
    var dutyList = JSON.decode(nodeStr);
    retNode.dutyChildren = dutyList.filter(function(duty) {
        var hasMy = false,
        myfilltime = false;
        duty.users = duty.users.filter(function(user) {
            if (user.id == obj.userId) {
                hasMy = true;
                myfilltime = user.fulltimeDuty;
            }
            var temp = true;
            if (obj.removeMe) temp = (user.id != obj.userId);
            var temp2 = user.fulltimeDuty;
            if (obj.type == 3) temp2 = true;
            return temp && temp2;
        });
        return obj.type == 4 ? (duty.users.length > 0 || (hasMy && myfilltime)) : true;
    });
    if (deptNode.deptChildren)
    deptNode.deptChildren.each(function(item) {
        temp.node = item;
        retNode.deptChildren.push(removeMeNode(temp));
    });
    if (obj.subDutyTree && retNode.name == 'undefined') retNode.name = "未分配职务";
    return retNode;
}
_initSelectTree = function(treeNode, obj, level) {
    var selTree = $('selectTree_' + obj.treeName).options;
    if (selTree.length == 0)
    selTree[selTree.length] = new Option(' 所有 ', treeNode.property.id);
    level = level || 0;
    level = level + 1;
    var temp = '　　',
    emptyStr = '';
    for (var i = 0; i < level; i = i + 1) {
        emptyStr = emptyStr + temp;
    }
    var list = treeNode.children;
    var type = obj.type == 3 ? 'duty': 'dept';
    list.each(function(item) {
        if (type == item.type) {
            selTree[selTree.length] = new Option(emptyStr + item.property.name, item.property.id);
            _initSelectTree(item, obj, level);
        } else {
            if (obj.mode > 0 && level == 1) {
                selTree[selTree.length] = new Option(emptyStr + item.property.name, item.property.id);
                _initSelectTree(item, obj, level);
            }
        }
    });
}
createSubOrgTree = function(treeName, searchNodeId) {
    var mgtOptions = allTreeMap[treeName].mgtOptions;
    var subJsonTree = null;
    searchNodeId = searchNodeId.replace(/[a-zA-Z]/g, "");
    var root = orgTreeJsonMap[mgtOptions.orgTreeType][mgtOptions.permId][mgtOptions.showMode].deptNode
    var findSubJson = function(parendNode, searchNodeId) {
        if (parendNode.id == searchNodeId) {
            var obj = {
                node: parendNode,
                type: mgtOptions.orgTreeType,
                permId: mgtOptions.permId,
                subTree: true,
                rootId: root.id,
                showMode: mgtOptions.showMode
            };
            if (mgtOptions.orgTreeType == 3) obj.subDutyTree = true;
            subJsonTree = getTreeData(obj);
            return;
        }
        var children = mgtOptions.orgTreeType == 3 ? (parendNode.dutyChildren || []) : (parendNode.deptChildren || []);
        if (mgtOptions.showMode > 0) {
            children = parendNode.deptChildren || [];
        }
        if (mgtOptions.showMode > 0 && children.length <= 0) {
            children = parendNode.dutyChildren || [];
        }
        children.some(function(item) {
            if (item.id == searchNodeId) {
                var obj = {
                    node: item,
                    type: mgtOptions.orgTreeType,
                    permId: mgtOptions.permId,
                    rootId: root.id,
                    showMode: mgtOptions.showMode
                };
                debug('sub obj.showMode:' + obj.showMode)
                if (mgtOptions.orgTreeType == 3) obj.subDutyTree = true;
                obj.subTree = true;
                subJsonTree = getTreeData(obj);
                return true;
            } else if ((mgtOptions.orgTreeType != 3 || mgtOptions.showMode > 0) && !subJsonTree && children && children.length != 0) {
                findSubJson(item, searchNodeId);
            }
        });
    };
    findSubJson(root, searchNodeId);
    createCommonTree([subJsonTree], mgtOptions);
}
changeCurrOrgtreeType = function(type, treeName) {
    if (!allTreeMap[treeName]) return;
    var mgtOptions = allTreeMap[treeName].mgtOptions;
    mgtOptions.orgTreeType = type;
    mgtOptions.hide = false;
    yqtDraft.exeInit = false;
    debug('ssssss:' + yqtDraft.exeInit);
    createOrgTree(mgtOptions);
};
switchToUDTree = function(treeName, showNB) {
    if (!allTreeMap[treeName]) return;
    $('udtab_' + treeName).className = 'ltab_clk';
    $('orgtab_' + treeName).className = 'ltab';
    var mgtOptions = allTreeMap[treeName].mgtOptions;
    debug('showNB:' + showNB);
    showNB = showNB || false;
    debug('showNB end :' + showNB);
    dwrService.getUserDefinedGroupTree(mgtOptions.permId, true, showNB, 
    function(map) {
        if ($("orgtreeradios_" + treeName)) {
            $("orgtreeradios_" + treeName).setStyle('display', 'none');
        }
        createCommonTree(map.jsonTree, allTreeMap[treeName].mgtOptions, true);
    });
};
searchByNameOnOrgtree = function(treeName, userName) {
    var tree = allTreeMap[treeName];
    if (userName.trim() == "") {
        return;
    } else {
        userName = userName.trim();
    }
    for (var id in tree.TreeNodesHash) {
        var node = tree.TreeNodesHash[id];
        if (node.type != 'user') continue;
        if (node.name.contains(userName)) {
            tree.selectButNotFireById(id);
            tree.scrollTo(node);
            break;
        }
    }
}
userIdsAndNames = function(userIds, userNames, nodeId) {
    this.userIds = userIds;
    this.userNames = userNames;
    if (nodeId) {
        this.nodeId = nodeId;
    }
}
getIdsFromOrgTreeAndUDTree = function(currOrgTree, needNames) {
    var resultIds = "";
    var userNames = "";
    var checkedNodes = currOrgTree.getChecked();
    if (!currOrgTree.isUDTree) {
        for (var i = 0; i < checkedNodes.length; i++) {
            var id = checkedNodes[i].id;
            var name = "";
            if (needNames) {
                name = checkedNodes[i].name;
            }
            if (currOrgTree.isDeptTree) {
                debug('id.indexOf("c") == -1 && id.indexOf("d") == -1:' + (id.indexOf("c") == -1 && id.indexOf("d") == -1));
                debug('id:' + id);
                debug('id:' + id);
                if (id.indexOf("c") == -1) {
                    if (resultIds != "") {
                        resultIds += "," + id;
                        if (needNames) {
                            userNames += "," + name;
                        }
                    } else {
                        resultIds = id;
                        if (needNames) {
                            userNames = name;
                        }
                    }
                }
            } else if ((!isNaN(id) && id > 0) || id.indexOf("_") != -1) {
                if (resultIds != "") {
                    resultIds += "," + id.split("_")[0];
                    if (needNames) {
                        userNames += "," + name;
                    }
                } else {
                    resultIds = id.split("_")[0];
                    if (needNames) {
                        userNames = name;
                    }
                }
            }
        }
    } else {
        if (checkedNodes.length > 0) {
            for (var i = 0; i < checkedNodes.length; i++) {
                var id = checkedNodes[i].id;
                var name = "";
                if (needNames) {
                    name = checkedNodes[i].name;
                }
                if (id != "0" && id.split("_")[0] != "g") {
                    if (resultIds.indexOf("," + id.split("_")[1]) == -1 && resultIds.split(",")[0] != id.split("_")[1]) {
                        if (resultIds != "") {
                            resultIds += "," + id.split("_")[1];
                            if (needNames) {
                                userNames += "," + name;
                            }
                        } else {
                            resultIds = id.split("_")[1];
                            if (needNames) {
                                userNames = name;
                            }
                        }
                    }
                }
            }
        }
    }
    return needNames ? new userIdsAndNames(resultIds, userNames) : resultIds;
}
getIdAndNameFromOrgTreeAndUDTreeByEventItem = function(currOrgTree, node) {
    var userId = "";
    var userName = node.name;
    var tempId = node.id;
    if (!currOrgTree.isUDTree) {
        if (currOrgTree.isDeptTree) {
            if (tempId.indexOf("c") == -1) {
                userId = tempId;
            }
        } else if (!isNaN(tempId)) {
            userId = tempId;
        } else if (tempId.split("_")[1]) {
            userId = tempId.split("_")[0];
        }
    } else {
        if (tempId.split("_")[0] != "g" && tempId != '0') {
            userId = tempId.split("_")[1];
        }
    }
    return new userIdsAndNames(userId, userName, tempId);
}
getAllUserIdsByOrgTree = function(tree) {
    var mgtOptions = tree.mgtOptions;
    var node = orgTreeJsonMap[mgtOptions.orgTreeType][mgtOptions.permId][mgtOptions.showMode].deptNode;
    var userIds = "";
    var userList = [];
    _getUserIds(userList, node);
    userIds = userList.join(',');
    return userIds;
}
_getUserIds = function(userList, node) {
    var users = [];
    if (node.deptChildren) {
        node.deptChildren.each(function(child) {
            _getUserIds(userList, child);
        }.bind(this));
    }
    if (node.dutyChildren) {
        node.dutyChildren.each(function(child) {
            _getUserIds(userList, child);
        }.bind(this));
    }
    node.users.each(function(child, i) {
        users[i] = child.id;
    }.bind(this));
    userList.combine(users);
}
function getUserNodesByNode4MgtTree(node) {
    var userNodes = [];
    if (node.id.test(/^(g_)|d|w/) || node.id == 0) {
        var udChildren = node.getChildren();
        for (var k = 0; k < udChildren.length; k++) {
            if (udChildren[k].id.test(/^(g_)|d|w/) || udChildren[k].id == 0) {
                var udChildrenNodes = getUserNodesByNode4MgtTree(udChildren[k]);
                for (var l = 0; l < udChildrenNodes.length; l++) {
                    userNodes.include(udChildrenNodes[l]);
                }
            } else {
                userNodes.include(udChildren[k]);
            }
        }
    } else {
        userNodes.include(node);
    }
    return userNodes;
}
function getUserIdByNode4mgtTree(node, isUdTree) {
    debug("isUdTree===" + isUdTree);
    var userIds = [];
    if (isUdTree) {
        if (node.id.indexOf("g_") != -1 || node.id == 0) {
            var udChildren = node.getChildren();
            for (var k = 0; k < udChildren.length; k++) {
                if (udChildren[k].id.indexOf("g_") != -1 || udChildren[k].id == 0) {
                    var udChildrenIds = getUserIdByNode4mgtTree(udChildren[k], isUdTree);
                    for (var l = 0; l < udChildrenIds.length; l++) {
                        userIds.include(udChildrenIds[l]);
                    }
                } else {
                    userIds.include(udChildren[k].id.split("_")[1]);
                }
            }
        } else {
            userIds.include(node.id.split("_")[1]);
        }
    } else {
        if (isNaN(node.id)) {
            var children = node.getChildren();
            for (var i = 0; i < children.length; i++) {
                if (isNaN(children[i].id)) {
                    var childrenIds = getUserIdByNode4mgtTree(children[i], isUdTree);
                    for (var j = 0; j < childrenIds.length; j++) {
                        userIds.include(childrenIds[j]);
                    }
                } else {
                    userIds.include(children[i].id);
                }
            }
        } else {
            userIds.include(node.id);
        }
    }
    return userIds;
}
if (!Jin) var Jin = {};
Jin.AwakeTipGuy = new Class({
    Implements: Options,
    options: {
        message: '',
        position: '',
        tipCss: 'document_gtips',
        time: '7000',
        setPosition: $empty
    },
    initialize: function(options) {
        this.setOptions(options);
    },
    show: function() {
        $(this.options.position).empty();
        var awake = new Element("ul", {
            'class': this.options.tipCss
        }).set('text', this.options.message);
        awake.inject($(this.options.position));
    },
    showAndHide: function() {
        if ($chk(this.options.setPosition)) {
            this.options.position = this.options.setPosition;
        }
        this.show();
        this.hide.delay(this.options.time, this);
    },
    hide: function() {
        if ($(this.options.position)) $(this.options.position).empty();
    }
});
var mgtTipsClass = new Class({
    div: null,
    init: function() {
        this.div = new Element("div", {
            'styles': {
                'z-index': '13000',
                'position': 'absolute'
            }
        }).injectInside(document.body);
    },
    open: function(text, el, options) {
        if (!this.div)
        this.init();
        options = options || {
            top: 0,
            left: 0
        };
        var my = $(el).getCoordinates();
        this.div.empty();
        this.div.fade("hide");
        this.div.setStyles({
            top: my.top + my.height + 5 + options.top,
            left: my.left + 5 + options.left
        });
        if (typeof text == "string") {
            this.div.set("html", text);
        } else {
            this.div.adopt(text);
        }
        this.div.fade("in");
    },
    close: function() {
        this.div.fade("out");
    }
});
var mgtTips = new mgtTipsClass();
function showTips(url, el, o) {
    new Request.HTML({
        onSuccess: function(t, responseXML) {
            mgtTips.open(t, el, o);
            mgtTips.close.delay(o.time, mgtTips);
        }
    }).get(url);
};
var mgtShowClass = new Class({
    getId: function() {
        return "mgtDraggbleDivId";
    },
    initialize: function(options) {
        this.div = new Element("div", {
            "id": "mgtDraggbleDivId",
            'class': "pop_win"
        }).injectInside(document.body);
    },
    open: function(ev, content) {
        var sizes = window.getSize();
        var scrollito = window.getScroll();
        try {
            ev = ev || window.event;
            ev = new Event(ev);
            if (!ev.page) {
                ev.page = {
                    y: scrollito.y + (sizes.y - 400) / 2,
                    x: (sizes.x - 500) / 2
                };
            }
        } catch(ex) {
            ev = {};
            ev.page = {
                y: scrollito.y + (sizes.y - 400) / 2,
                x: (sizes.x - 500) / 2
            };
        }
        this.div.setStyles({
            "display": "block",
            "top": ev.page.y + 10,
            "left": ev.page.x + 10
        });
        var dragHandle = this.div.getElement("#draggableId");
        if (dragHandle)
        new Drag(this.div, {
            handle: dragHandle
        });
        this.closeHandle = this.div.getElement("#closeHandle");
        if (this.closeHandle) {
            this.closeHandle.addEvent("click", 
            function() {
                this.shrink();
            }.bind(this));
        };
        if (sizes.y + scrollito.y < this.div.getCoordinates().top + this.div.getSize().y) {
            this.div.setStyles({
                "top": sizes.y + scrollito.y - this.div.getSize().y - 10
            });
        }
        if (sizes.x <= this.div.getCoordinates().left + this.div.getSize().x) {
            var temp = this.div.getSize().x;
            if (temp < this.div.getFirst('table').getStyle('width').toInt())
            temp = this.div.getFirst('table').getStyle('width').toInt();
            this.div.setStyles({
                "left": sizes.x - temp - 10
            });
        }
    },
    shrink: function() {
        this.div.setStyles({
            "display": "none"
        });
    }
});
var mgtShow;
var mgtMenuClass = new Class({
    initialize: function(options) {
        this.div = new Element("div", {
            "id": "mgtMenuDivId",
            'styles': {
                'display': 'none',
                'z-index': 20000,
                'position': 'absolute'
            }
        }).injectInside(document.body);
    },
    open: function(op) {
        op = $extend({
            'toleft': 0,
            addScroll: true
        },
        op);
        var content = op.content;
        var ev = op.event;
        var toleft = op.toleft;
        var curObj = op.curObj;
        this.div.empty();
        if ($type(content) == "string") {
            this.div.set("html", content);
        } else if ($type(content) == "element") {
            this.div.adopt(content);
        } else {
            debug($type(content) + " ,编码出错, " + content);
            return;
        }
        var sizes = window.getSize();
        var scrollito = window.getScroll();
        ev = ev || window.event;
        if (ev) {
            ev = new Event(ev);
            ev.stopPropagation();
            debug("op.addScroll==" + op.addScroll);
        }
        debug(curObj + ',curObj');
        if (curObj) {
            var pos = $(curObj).getPosition();
            this.div.setStyles({
                "display": "block",
                "top": pos.y + $(curObj).getCoordinates().height,
                "left": pos.x
            });
        } else {
            this.div.setStyles({
                "display": "block",
                "top": ev.page.y + 10,
                "left": ev.page.x - 10 + toleft
            });
        }
        if (sizes.y + scrollito.y < this.div.getCoordinates().top + this.div.getSize().y) {
            this.div.setStyles({
                "top": sizes.y + scrollito.y - this.div.getSize().y - 10
            });
        }
        if (sizes.x < this.div.getCoordinates().left + this.div.getSize().x) {
            this.div.setStyles({
                "left": sizes.x - this.div.getSize().x - 10
            });
        }
        document.addEvent('click', mgtMenu.close);
        selectStatus('hidden');
    },
    close: function() {
        selectStatus('visible');
        mgtMenu.div.setStyles({
            "display": "none"
        });
        document.removeEvent('click', mgtMenu.close);
    }
});
var mgtMenu;
var MgtPlaceHolder = new Class({
    color: "#aaa",
    initialize: function(ids) {
        try {
            if ('placeHolder' in document.createElement('input')) return;
            if (!ids) {
                $$('input').each(function(el) {
                    if (el.get('placeHolder')) {
                        this.decorateInput(el);
                    }
                }.bind(this));
            } else if ($type(ids) == "string") {
                this.decorateInput($(ids));
            } else {
                $A(ids).each(function(inputId) {
                    this.decorateInput($(inputId));
                }.bind(this));
            }
        } catch(ex) {
            debug("error in MgtPlaceHolder's initialize :" + ex.name + ";" + ex.message);
        }
    },
    decorateInput: function(el) {
        try {
            var text = el.get('placeHolder');
            var defaultColor;
            if (el.retrieve("defaultColor")) {
                defaultColor = el.retrieve("defaultColor");
            } else {
                defaultColor = el.getStyle('color').replace("#6d6d6d", "#000000");
                el.store("defaultColor", defaultColor);
            }
            if (el.get('value') == '') {
                el.set('value', text).setStyle('color', this.color)
            }
            el.addEvent('focus', 
            function()
            {
                if (el.value == '' || el.value == text)
                {
                    el.setStyle('color', defaultColor).set('value', '');
                }
            }).addEvent('blur', 
            function()
            {
                if (el.value == '' || el.value == text)
                {
                    el.setStyle('color', this.color).set('value', text);
                }
            }.bind(this));
        } catch(ex) {
            debug("error in MgtPlaceHolder's decorateInput :" + ex.name + ";" + ex.message);
        }
    },
    replaceTip: function(id, text) {
        if ($(id).get('placeHolder') == $(id).get('value')) {
            $(id).set('value', '');
        }
        $(id).set('placeHolder', text);
        $(id).removeEvents("focus").removeEvents("blur");
        this.decorateInput($(id));
    },
    appendInput: function(el) {
        $(el).removeEvents("focus").removeEvents("blur");
        this.decorateInput($(el));
    },
    getValue: function(id) {
        try {
            var inputElement = $(id);
            var value = null;
            if (inputElement) {
                value = inputElement.get('value');
                var tip = inputElement.get("placeHolder");
                if (tip && value == tip) {
                    value = "";
                }
            }
            return value;
        } catch(ex) {
            debug("error in MgtPlaceHolder's getValue :" + ex.name + ";" + ex.error + ";" + ex.message);
        }
    }
});
function showChangeAttentDiv(event, moduleId, module) {
    event = event || window.event;
    event = new Event(event);
    var child = event.target;
    if ($(child).get('tag') != "b") {
        child = child.getElement("b");
    }
    if (!child) return;
    var status = 0;
    if (child.hasClass("tclk_label_ico") || child.hasClass("tclk_label_cnt_ico")) {
        status = 1;
    } else if (child.hasClass("timport_label_ico") || child.hasClass("timport_label_cnt_ico")) {
        status = 2;
    }
    var div = new Element("ul", {
        'class': 'pop_up_menu',
        'styles': {
            'right': '6px',
            'width': "92px"
        }
    });
    if (status != 1) {
        new Element("li", {
            'html': '<b class="ico_le tclk_label_ico"></b><span class="atten">&nbsp;' + Resource.common.attent1 + '</span>',
            'events': {
                'click': function() {
                    changeAttent(1, moduleId, module, child);
                },
                'mouseover': function() {
                    this.className = 'ck';
                },
                'mouseout': function() {
                    this.className = '';
                }
            }
        }).injectInside(div);
    }
    if (status != 0) {
        new Element("li", {
            'html': '<b class="ico_le tnor_label_ico"></b><span>&nbsp;' + Resource.common.cancel + '</span>',
            'events': {
                'click': function() {
                    changeAttent(0, moduleId, module, child);
                },
                'mouseover': function() {
                    this.className = 'ck';
                },
                'mouseout': function() {
                    this.className = '';
                }
            }
        }).injectInside(div);
    }
    if (status != 2) {
        new Element("li", {
            'html': '<b class="ico_le timport_label_ico"></b><span class="import">&nbsp;' + Resource.common.attent2 + '</span>',
            'events': {
                'click': function() {
                    changeAttent(2, moduleId, module, child);
                },
                'mouseover': function() {
                    this.className = 'ck';
                },
                'mouseout': function() {
                    this.className = '';
                }
            }
        }).injectInside(div);
    }
    var op = {
        'content': div,
        'event': event,
        'toleft': 110
    };
    mgtMenu.open(op);
};
function changeAttent(level, moduleId, module, child) {
    var dwr = new DwrBackCall();
    dwr.backCallFunc = function(m) {
        if (child.hasClass('tclk_label_ico') || child.hasClass('timport_label_ico') || child.hasClass('tnor_label_ico')) {
            classRemove(child, "tclk_label_ico", "timport_label_ico", "tnor_label_ico");
            classAdd(child, ["tnor_label_ico", "tclk_label_ico", "timport_label_ico"][level]);
        } else {
            classRemove(child, "tclk_label_cnt_ico", "timport_label_cnt_ico", "tnor_label_cnt_ico");
            classAdd(child, ["tnor_label_cnt_ico", "tclk_label_cnt_ico", "timport_label_cnt_ico"][level]);
            var temp = child.getParent().getNext('span');
            if (temp && (temp.hasClass("popup_black") || temp.hasClass("popup_red") || temp.hasClass("popup_yellow"))) {
                classRemove(temp, "popup_red", "popup_black", "popup_yellow");
                classAdd(temp, ["popup_black", "popup_yellow", "popup_red"][level]);
            }
        }
    };
    dwrService.updateAttentionLevel(module, moduleId, level, dwr.backToDwrUrls.bind(dwr));
};
var YqtDraft = new Class({
    initialize: function() {
        $extend(this, {
            id: "YQT_DRAFT",
            oldData: '',
            enable: false,
            exeInit: true
        });
    },
    init: function() {
        this.oldData = '';
        this.enable = false;
        this.exeInit = true;
    },
    initFileds: function(temp) {
        if (temp != 'mail')
        return;
        this.enable = true;
        this.oldData = this._getDataHex();
    },
    checkChange: function(temp) {
        if (temp != 'mail')
        return false;
        if (!this.enable)
        return false;
        var newData = this._getDataHex();
        if (newData == this.oldData) {
            this.init();
            return false;
        }
        return true;
    },
    _getDataHex: function() {
        var inputs = $$('.jin_draft');
        var tempData = [];
        inputs.each(function(item) {
            if (item.get('name') != 'yqt_editor') {
                if (item.value && item.value.trim() != '')
                tempData.push(item.value);
            } else {
                var editorId = item.get('id').substring(6);
                var temp = getHtmlEditorContent(false, editorId);
                if (temp && temp != '')
                tempData.push(temp);
            }
        });
        var temp = hex_sha1(tempData.toString());
        return temp;
    },
    checkJump: function(fun) {
        if (this.enable && this.checkChange('mail')) {
            this.NextStep = function() {
                this.enable = false;
                fun();
            }
            confirm(Resource.common.draftLeaveTip, this);
        } else {
            fun();
        }
    }
});
var yqtDraft = new YqtDraft();
if (window.ActiveXObject) window.ie = true;
window.onbeforeunload = function(event) {
    event = event || window.event;
    if (!window.ie && (!event.clientX || (event.clientX && event.clientX <= 0) || (event.clientY && event.clientY <= 0))) {
        if (yqtDraft.enable && yqtDraft.checkChange('mail')) {
            return Resource.common.draftLeaveTip;
        }
    }
}
var MgtListClass = new Class({
    liIdPrefix: "li_",
    nodeMap: new Hash(),
    notSelectedNodes: [],
    selectedNodes: [],
    onSubmit: null,
    draw: function() {
        try {
            var dwr = new DwrBackCall();
            var url = "/include/userListModel.jsp";
            dwr.addOneUrl(url, mgtPopupId({
                num: 2
            }));
            dwr.backCallFunc = function() {
                mgtPopup({
                    num: 2
                });
                this.leftContainer = $('mgtLeftContainer4userList');
                this.rightContainer = $('mgtRightContainer4userList');
                this.initLeft();
                this.initRight();
            }.bind(this);
            dwr.dwrProxy();
        } catch(ex) {
            debug(ex.name + ";" + ex.message + ";" + ex.error);
        }
    },
    initData: function(all, ids, backCall) {
        try {
            debug("come into initData and ids==" + ids);
            this.nodeMap.empty();
            this.notSelectedNodes.empty();
            this.selectedNodes.empty();
            this.onSubmit = null;
            var idsArray = ids.split(",");
            all.each(function(item) {
                if (idsArray.contains(item.id + "")) {
                    this.selectedNodes.include(item);
                } else {
                    this.notSelectedNodes.include(item);
                }
                this.nodeMap.set(item.num, item);
            }.bind(this));
            this.onSubmit = backCall;
        } catch(ex) {
            debug(ex.name + ";" + ex.message + ";" + ex.error);
        }
    },
    initLeft: function() {
        var li;
        this.leftContainer.empty();
        if (this.notSelectedNodes.length == 0 && this.selectedNodes.length == 0) {
            new Element("li", {
                "text": Resource.tree.noSelectUser
            }).inject(this.leftContainer);
            return;
        }
        this.notSelectedNodes.each(function(item) {
            this.produceLi(item, "movbg").inject(this.leftContainer);
        }.bind(this));
    },
    initRight: function() {
        this.rightContainer.empty();
        this.selectedNodes.each(function(item) {
            this.produceLi(item, "opt1").inject(this.rightContainer);
        }.bind(this));
    },
    produceLi: function(node, className) {
        var me = this;
        var li = new Element("li", {
            "id": me.liIdPrefix + node.id,
            "text": node.name,
            "events": {
                "click": function() {
                    me.deleteNode(this);
                },
                "mouseover": function() {
                    this.toggleClass(className);
                },
                "mouseout": function() {
                    this.toggleClass(className);
                }
            }
        });
        li.store("nodeNum", node.num);
        return li;
    },
    addOneNode: function(node, toContainer) {
        var className = (toContainer == this.leftContainer ? "movbg": "opt1");
        var li = this.produceLi(node, className);
        if (toContainer == this.leftContainer) {
            var preLi = this.findPreLi(node, toContainer);
            if (preLi) {
                li.inject(preLi, "after");
            } else {
                li.inject(toContainer, "top");
            }
        } else {
            li.inject(toContainer, "bottom");
        }
    },
    findPreLi: function(node, toContainer) {
        if (!node) return;
        var previous = null;
        var lis = toContainer.getChildren("li");
        var lisLength = lis.length;
        if (lisLength > 0) {
            if (lis[0].retrieve("nodeNum").toInt() > node.num.toInt()) return null;
            for (var i = 1; i < lisLength; i++) {
                if (lis[i].retrieve("nodeNum").toInt() > node.num.toInt()) {
                    previous = lis[i - 1];
                    break;
                }
            }
            if (previous == null) {
                previous = lis[lis.length - 1];
            }
        }
        return previous;
    },
    deleteNode: function(me) {
        me = $(me);
        var parentUl = me.getParent("ul");
        var nodeNum = me.retrieve("nodeNum");
        var node = this.nodeMap.get(nodeNum);
        var toContainer = (parentUl == this.leftContainer ? this.rightContainer: this.leftContainer);
        this.addOneNode(node, toContainer);
        me.dispose();
    },
    addAll: function() {
        if (this.notSelectedNodes.length == 0 && this.selectedNodes.length == 0) return;
        this.moveAllTo(this.rightContainer);
    },
    delAll: function() {
        if (this.notSelectedNodes.length == 0 && this.selectedNodes.length == 0) return;
        this.moveAllTo(this.leftContainer);
    },
    moveAllTo: function(toContainer) {
        try {
            var className = (toContainer == this.leftContainer ? "movbg": "opt1");
            this.leftContainer.empty();
            this.rightContainer.empty();
            var length = this.nodeMap.getLength();
            for (var i = 0; i < length; i++) {
                this.produceLi(this.nodeMap.get(i), className).inject(toContainer);
            }
        } catch(ex) {
            debug(ex.error + ";" + ex.message + ";" + ex.name);
        }
    },
    submit: function() {
        var me = this;
        var result = [];
        this.rightContainer.getChildren("li").each(function(item) {
            result.include(me.nodeMap.get(item.retrieve("nodeNum")));
        });
        mgtPopupClose({
            num: 2
        });
        this.onSubmit(result);
    }
});
var mgtList = new MgtListClass();
function openMgtList(all, ids, backCall) {
    mgtList.initData(all, ids, backCall);
    mgtList.draw();
}
var MgtTreeTools = new Class({
    canNotSelect: function(node) {
        if (this.isUserDesign(node)) return false;
        if (node.id <= 0) return true;
        if (isNaN(node.id)) return true;
        return false;
    },
    isUserDesign: function(node) {
        debug(node.id + ";" + node.name);
        var result = false;
        var id = node.id;
        if (id.indexOf("_") != -1) {
            if (!isNaN(id.split("_")[0])) {
                result = true;
            }
        }
        return result;
    },
    retrieveUserId: function(node) {
        var id = node.id;
        if (id.indexOf("_") != -1) {
            return id.split("_")[1];
        }
        return id;
    }
});
var MgtSingleTree = new Class({
    Implements: MgtTreeTools,
    selectedUser: null,
    selectedUserId: '',
    treeName: "mgtSingleClientTree",
    escapeSelfButton: false,
    self: null,
    resultInput: null,
    onSubmit: null,
    initData: function(selectedUserId, onSubmit, escapeSelfButton) {
        this.selectedUserId = selectedUserId;
        this.selectedUser = null;
        this.onSubmit = onSubmit;
        if (escapeSelfButton) {
            this.escapeSelfButton = escapeSelfButton;
        }
    },
    initInnerTree: function() {
        var me = this;
        createOrgTree({
            treeDivId: "orgTree4select",
            treeName: this.treeName,
            setHeight: false,
            hasCheckbox: false,
            treePanelDivId: "orgTree4select_panel",
            orgTreeType: 2,
            onClick: function(node) {
                me.selectOneNode(node);
                me.selectedUserId = node.id;
            },
            onload: function() {
                allTreeMap[me.treeName].root.toggle();
                me.initResultInput();
            }
        });
    },
    initResultInput: function() {
        debug("come into initResultInput and this.selectedUserId==" + this.selectedUserId);
        if (this.selectedUserId == '') return;
        var node = allTreeMap[this.treeName].getNodeById(this.selectedUserId);
        if (node) {
            debug("begin to execute selectOneNode");
            this.selectOneNode(node);
        }
    },
    draw: function() {
        var dwr = new DwrBackCall();
        var url = "/include/userSelectTree.jsp?escapeSelfButton=" + this.escapeSelfButton;
        dwr.addOneUrl(url, mgtPopupId({
            num: 2
        }));
        dwr.backCallFunc = function() {
            mgtPopup({
                num: 2
            });
            this.resultInput = $("userTreeResultContainer");
            this.initInnerTree();
            this.self = {
                id: $("selfId4userTree").value,
                name: $("selfName4userTree").value
            };
            if (this.selectedUser != null) {
                this.resultInput.set('value', this.selectedUser.name);
            }
            $("MgtPopup2-Popup").setStyle("width", 470);
        }.bind(this);
        dwr.dwrProxy();
    },
    selectOneNode: function(node) {
        if (this.canNotSelect(node)) return;
        this.selectedUser = node;
        var userId = this.retrieveUserId(node);
        this.selectedUser.id = userId;
        this.resultInput.value = node.name;
    },
    selectSelf: function() {
        this.selectOneNode(this.self);
    },
    submit: function() {
        mgtPopupClose({
            num: 2
        });
        this.onSubmit(this.selectedUser);
    }
});
var MgtMultiTree = new Class({
    Implements: MgtTreeTools,
    selectedUsers: [],
    escapeAllButton: false,
    sendMsg: false,
    fromClient: false,
    sendSms: false,
    sendMsgChecked: true,
    escapeSelfButton: false,
    initIds: '',
    onSubmit: null,
    idPrefix: "result_",
    treeName: "mgtMultiClientTree",
    self: null,
    resultContainer: null,
    initData: function(initIds, onSubmit, escapeAllButton, sendMsg, escapeSelfButton) {
        this.initIds = initIds;
        this.onSubmit = onSubmit;
        if (sendMsg) this.sendMsg = sendMsg;
        if (escapeAllButton) {
            mgtMultiTree.escapeAllButton = true;
        } else {
            mgtMultiTree.escapeAllButton = false;
        }
        if (escapeSelfButton) {
            mgtMultiTree.escapeSelfButton = true;
        } else {
            mgtMultiTree.escapeSelfButton = false;
        }
    },
    initOptionData: function(options) {
        this.fromClient = options.fromClient;
        this.initIds = options.initIds;
        this.onSubmit = options.onSubmit;
        if (options.sendMsg) this.sendMsg = options.sendMsg;
        if (options.sendSms) this.sendSms = options.sendSms;
        if (options.escapeAllButton) {
            mgtMultiTree.escapeAllButton = true;
        } else {
            mgtMultiTree.escapeAllButton = false;
        }
        if (options.escapeSelfButton) {
            mgtMultiTree.escapeSelfButton = true;
        } else {
            mgtMultiTree.escapeSelfButton = false;
        }
        if (options.sendMsgChecked) {
            this.sendMsgChecked = options.sendMsgChecked;
        }
    },
    initInnerTree: function() {
        var me = this;
        createOrgTree({
            treeDivId: "orgTree4select",
            treeName: this.treeName,
            setHeight: false,
            hasCheckbox: true,
            treePanelDivId: "orgTree4select_panel",
            orgTreeType: 2,
            fromClient: me.fromClient,
            onClick: function(node) {
                me.selectOneNode(node, true);
            },
            onload: function() {
                allTreeMap[this.treeName].root.toggle();
                me.initResultContainer();
            }
        });
    },
    draw: function() {
        var dwr = new DwrBackCall();
        var url = "/include/userListSelectTree.jsp?fc=" + this.fromClient + "&escapeAllButton=" + this.escapeAllButton + "&sendMsg=" + this.sendMsg + "&escapeSelfButton=" + this.escapeSelfButton + "&sendMsgChecked=" + this.sendMsgChecked + "&sendSms=" + this.sendSms;
        dwr.addOneUrl(url, mgtPopupId({
            num: 2
        }));
        dwr.backCallFunc = function() {
            mgtPopup({
                num: 2
            });
            this.resultContainer = $("selectedUsersContainer");
            this.initInnerTree();
            this.self = {
                id: $("selfId4userTree").value,
                name: $("selfName4userTree").value
            };
            $("MgtPopup2-Popup").setStyle("width", 470);
        }.bind(this);
        dwr.dwrProxy();
    },
    initResultContainer: function() {
        if (this.initIds != '') {
            if ("-1" == this.initIds) {
                this.addAll();
            } else {
                var idArray = this.initIds.split(",");
                var node;
                var tree = allTreeMap[this.treeName];
                for (var i = 0; i < idArray.length; i++) {
                    node = tree.getNodeById(idArray[i]);
                    if (node) {
                        this.selectOneNode(node, false);
                    }
                }
            }
        }
    },
    produceLi: function(node) {
        var userId = this.retrieveUserId(node);
        return new Element("li", {
            id: userId,
            text: node.name,
            events: {
                click: function() {
                    this.dispose();
                },
                mouseover: function() {
                    this.toggleClass("opt1");
                },
                mouseout: function() {
                    this.toggleClass("opt1");
                }
            }
        });
    },
    selectOneNode: function(node, delAll) {
        if (this.canNotSelect(node)) return;
        if (delAll) {
            this.delWhole();
        }
        if (this.checkExist(node)) return;
        this.produceLi(node).inject(this.resultContainer);
    },
    delWhole: function() {
        var temp = this.resultContainer.getElementById("-1");
        if (temp) temp.dispose();
    },
    checkExist: function(node) {
        var id = this.retrieveUserId(node);
        return this.resultContainer.getElementById(id);
    },
    addCheckedNodes: function() {
        var checked = allTreeMap[this.treeName].getChecked();
        if (checked.length > 0) {
            this.delWhole();
        }
        for (var i = 0; i < checked.length; i++) {
            this.selectOneNode(checked[i], false);
        }
    },
    selectSelf: function() {
        this.delWhole();
        this.selectOneNode(this.self);
    },
    delAll: function() {
        this.initIds = '';
        this.resultContainer.empty();
    },
    addAll: function() {
        this.delAll();
        var all = this.produceLi({
            'id': '-1',
            'name': Resource.eimhttp.employee_all
        });
        all.inject(this.resultContainer);
    },
    submit: function() {
        var result = [];
        this.resultContainer.getElements("li").each(function(item) {
            result[result.length] = {
                id: item.id,
                name: item.get("text")
            };
        });
        var sendMsg = $('userSel_sendMsg') ? $('userSel_sendMsg').checked: false;
        var sendSMS = $('userSel_sendSMS') ? $('userSel_sendSMS').checked: false;
        mgtPopupClose({
            num: 2
        });
        this.onSubmit(result, sendMsg, sendSMS);
    }
});
var mgtSingleTree = new MgtSingleTree();
var mgtMultiTree = new MgtMultiTree();
function openMgtSingleTree(userId, onSubmit, escapeSelfButton) {
    mgtSingleTree.initData(userId, onSubmit, escapeSelfButton);
    mgtSingleTree.draw();
}
function openMgtMultiTree(initIds, onSubmit, escapeAllButton, sendMsg, escapeSelfButton) {
    mgtMultiTree.initData(initIds, onSubmit, escapeAllButton, sendMsg, escapeSelfButton);
    mgtMultiTree.draw();
}
function openMgtMultiTreeWithOption(options) {
    mgtMultiTree.initOptionData(options);
    mgtMultiTree.draw();
}
var MgtSimpleTreeTools = new Class({
    getFilteredNodeId: function(node) {
        var nodeId = node.id.split("#");
        if (nodeId.length > 1) {
            return nodeId[1];
        }
        else {
            return nodeId[0];
        }
    },
    canNotSelect: function(node) {
        var nodeId = this.getFilteredNodeId(node);
        if (nodeId < 0) {
            return true;
        }
        if (isNaN(nodeId))
        return true;
        return false;
    }
});
var MgtSingleSimpleTree = new Class({
    Implements: MgtSimpleTreeTools,
    objId: "",
    selectedNode: null,
    selectedNodeId: '',
    treeName: "mgtSingleClientSimpleTree",
    resultInput: null,
    onSubmit: null,
    initData: function(objId, onSubmit) {
        this.objId = objId;
        this.selectedNodeId = $(objId).get("value");
        this.onSubmit = onSubmit;
    },
    initResultInput: function() {
        if (this.selectedNodeId == '')
        return;
        var node = allTreeMap[this.treeName].getNodeById(this.selectedNodeId);
        if (node) {
            this.selectOneNode(node);
        }
    },
    initInnerTree: function() {
        var me = this;
        createOrgTree({
            treeDivId: "orgSimpleTree4select",
            treeName: this.treeName,
            setHeight: false,
            apprFlowTree: true,
            hasCheckbox: false,
            treePanelDivId: "orgSimpleTree4select_panel",
            orgTreeType: 2,
            onClick: function(node) {
                me.selectOneNode(node);
                me.selectedNodeId = node.id;
            },
            onload: function() {
                allTreeMap[me.treeName].root.toggle();
                me.initResultInput();
            }
        });
    },
    draw: function() {
        var dwr = new DwrBackCall();
        var url = "/include/userSelectSimpleTree.jsp";
        dwr.addOneUrl(url, mgtPopupId({
            num: 2
        }));
        dwr.backCallFunc = function() {
            mgtPopup({
                num: 2
            });
            this.resultInput = $("userTreeResultContainer");
            this.initInnerTree();
            if (this.selectedNode != null) {
                this.resultInput.set('value', this.selectedNode.name);
            }
            $("MgtPopup2-Popup").setStyle("width", 470);
        }.bind(this);
        dwr.dwrProxy();
    },
    selectOneNode: function(node) {
        if (this.canNotSelect(node)) {
            return;
        }
        this.selectedNode = node;
        this.selectedNode.id = node.id;
        this.resultInput.value = node.name;
    },
    submit: function() {
        mgtPopupClose({
            num: 2
        });
        this.onSubmit(this.objId, this.selectedNode);
    }
});
function openMgtSingleSimpleTree(objId, onSubmit) {
    mgtSingleSimpleTree = new MgtSingleSimpleTree();
    mgtSingleSimpleTree.initData(objId, onSubmit);
    mgtSingleSimpleTree.draw();
}
var MgtTabs = new Class({
    tabs: null,
    Implements: Options,
    options: {
        tabSelector: '.mgtTab',
        activeClass: 'cur',
        activeIndex: 0,
        tabContainer: null,
        onClick: $empty,
        specialClassOne: "mgtNotChangeColor"
    },
    init: function(options) {
        var me = this;
        this.setOptions(options);
        if ($(this.options.tabContainer)) {
            this.tabs = $(this.options.tabContainer).getElements(this.options.tabSelector);
        } else {
            this.tabs = $$(this.options.tabSelector);
        }
        for (var i = 0; i < this.tabs.length; i++) {
            this.tabs[i].addEvent("click", 
            function() {
                me.switchTo(this, true);
            });
        }
        if (this.tabs.length > this.options.activeIndex) {
            this.switchTo(this.tabs[this.options.activeIndex]);
        } else if (this.tabs.length > 0) {
            this.switchTo(this.tabs[0]);
        }
    },
    switchTo: function(targetTab, canExecute) {
        var me = this;
        if (!this.tabs) return;
        if (targetTab.hasClass(me.options.specialClassOne)) {
            this.tabs.each(function(tab, index) {
                if (tab == targetTab) {
                    me.options.activeIndex = index;
                    if (canExecute) {
                        if (me.options.onClick && $type(me.options.onClick) == "function") {
                            me.options.onClick(targetTab);
                        }
                    }
                }
            });
        } else {
            this.tabs.each(function(tab, index) {
                if (tab == targetTab) {
                    tab.addClass(me.options.activeClass);
                    me.options.activeIndex = index;
                    if (canExecute) {
                        if (me.options.onClick && $type(me.options.onClick) == "function") {
                            me.options.onClick(targetTab);
                        }
                    }
                } else {
                    tab.removeClass(me.options.activeClass);
                }
            });
        }
    },
    init1: function() {
        this.setOptions(options);
        if ($(this.options.tabContainer)) {
            this.tabs = $(this.options.tabContainer).getElements(this.options.tabSelector);
        } else {
            this.tabs = $$(this.options.tabSelector);
        }
        if (this.tabs.length > this.options.activeIndex) {
            this.switchTo(this.tabs[this.options.activeIndex]);
        } else if (this.tabs.length > 0) {
            this.switchTo(this.tabs[0]);
        }
    },
    switchTo1: function() {
        var me = this;
        if (!this.tabs) return;
        this.tabs.each(function(tab) {
            if (tab == targetTab) {
                tab.addClass(me.options.activeClass);
                tab.removeEvents("click");
                if (canExecute) {
                    if (me.options.onClick && $type(me.options.onClick) == "function") {
                        me.options.onClick(targetTab);
                    }
                }
            } else {
                tab.removeClass(me.options.activeClass);
                tab.addEvent("click", 
                function() {
                    me.switchTo(this, true);
                });
            }
        });
    }
});
var mgtTabs = new MgtTabs();