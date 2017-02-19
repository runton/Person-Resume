/**
 * Created by Administrator on 2016/12/28.
 */



    /***************************************************************************************************
     * TODO  重复 使用的函数
     **************************************************************************************************/
    function infoToggle(selector) {
        $(selector).addClass("tab-pane fade in active").siblings("div").removeClass("in active");
    }

    //TODO 标签切换函数
    function contentToggle(selector, index) {
        $(selector).siblings().addClass("hidden");
        $(selector).removeClass("hidden");
        $($(selector + " .row1 ul li")[index]).addClass("active").siblings("li").removeClass("active");
    }

    //TODO 实例化编辑器
    //TODO 建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
    var ue = UE.getEditor('editor', {initialFrameHeight: 900, scaleEnabled: true});
    var ue2 = UE.getEditor('editor2', {initialFrameHeight: 900, scaleEnabled: true});

    function isFocus(e) {
        alert(UE.getEditor('editor').isFocus());
        UE.dom.domUtils.preventDefault(e)
    }

    function setblur(e) {
        UE.getEditor('editor').blur();
        UE.dom.domUtils.preventDefault(e)
    }

    function insertHtml() {
        var value = prompt('插入html代码', '');
        UE.getEditor('editor').execCommand('insertHtml', value)
    }

    function createEditor() {
        enableBtn();
        UE.getEditor('editor');
    }

    function getAllHtml() {
        alert(UE.getEditor('editor').getAllHtml())
    }

    function getContent() {
        var arr = [];
        arr.push("使用editor.getContent()方法可以获得编辑器的内容");
        arr.push("内容为：");
        arr.push(UE.getEditor('editor').getContent());
        alert(arr.join("\n"));
    }

    function getPlainTxt() {
        var arr = [];
        arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
        arr.push("内容为：");
        arr.push(UE.getEditor('editor').getPlainTxt());
        alert(arr.join('\n'))
    }

    function setContent(isAppendTo) {
        var arr = [];
        arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
        UE.getEditor('editor').setContent('欢迎使用ueditor', isAppendTo);
        alert(arr.join("\n"));
    }

    function setDisabled() {
        UE.getEditor('editor').setDisabled('fullscreen');
        disableBtn("enable");
    }

    function setEnabled() {
        UE.getEditor('editor').setEnabled();
        enableBtn();
    }

    function getText() {
        //TODO 当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
        var range = UE.getEditor('editor').selection.getRange();
        range.select();
        var txt = UE.getEditor('editor').selection.getText();
        alert(txt)
    }

    function getContentTxt() {
        var arr = [];
        arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
        arr.push("编辑器的纯文本内容为：");
        arr.push(UE.getEditor('editor').getContentTxt());
        alert(arr.join("\n"));
    }

    function hasContent() {
        var arr = [];
        arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
        arr.push("判断结果为：");
        arr.push(UE.getEditor('editor').hasContents());
        alert(arr.join("\n"));
    }

    function setFocus() {
        UE.getEditor('editor').focus();
    }

    function deleteEditor() {
        disableBtn();
        UE.getEditor('editor').destroy();
    }

    function disableBtn(str) {
        var div = document.getElementById('btns');
        var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
        for (var i = 0, btn; btn = btns[i++];) {
            if (btn.id == str) {
                UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
            } else {
                btn.setAttribute("disabled", "true");
            }
        }
    }

    function enableBtn() {
        var div = document.getElementById('btns');
        var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
        for (var i = 0, btn; btn = btns[i++];) {
            UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
        }
    }

    function getLocalData() {
        alert(UE.getEditor('editor').execCommand("getlocaldata"));
    }

    function clearLocalUeData() {
        UE.getEditor('editor').execCommand("clearlocaldata");
        alert("已清空草稿箱")
    }

    //进入用户中心后，向服务器发送请求，获取用户信息。
    function getUserInfo() {
        //根据cookie值，请求数据
        var user_id = getCookie('login_id');
        //cookie值不存在时，从URL中提取用户ID
        if (user_id == "") {
            var pram = GetRequest();
            user_id = pram['user_id'];
        }
        $.get('php/runton_user_info.php', {'user_id': user_id}, function (data) {  // TODO 获得用户信息
            // 将用户信息与表单相关联
            $("#username").val(data.username);
            $("#password").val(data.passwd);
            $("#userImg").val(data.user_pic);
            $("#name").val(data.name);
            $("#sex").val(data.sex);
            $("#birthday").val(data.birth);
            $("#email").val(data.email);
            $("#tel").val(data.tel);
            $("#question").val(data.question);
            $("#answer").val(data.answer);
            $("#create_time").val(data.reg_time.substring(0, 10));
        });
    }

    //TODO 加载用户文章列表
    var artListBool = false;

    function readyArticle() {
        if (!artListBool) {
            var login_id = getCookie("login_id");
            //向服务器发送请求，获得用户编写所有的文章
            $.post("php/runton_user_artLists.php", {"login_id": login_id}, function (data) {

                if (data.length > 0) {
                    //绘制文章信息列表
                    drawArtList(data,10,1);
                    //绘制分页
                    var p = new Paging();
                    p.init({target: '#pageTool', pagesize: 10, count: data.length});
                    //为分页插件绑定事件
                    p.bindEvent=function()
                    {
                        var _this = this;
                        this.container.on('click', 'li.js-page-action,li.ui-pager', function(e)
                        {
                            if ($(this).hasClass('ui-pager-disabled') || $(this).hasClass('focus')) {
                                return false;
                            }
                            if ($(this).hasClass('js-page-action')) {
                                if ($(this).hasClass('js-page-first')) {
                                    _this.current = 1;
                                    drawArtList(data,10,1);
                                }
                                if ($(this).hasClass('js-page-prev')) {
                                    _this.current = Math.max(1, _this.current - 1);
                                    drawArtList(data,10,_this.current);
                                }
                                if ($(this).hasClass('js-page-next')) {
                                    _this.current = Math.min(_this.pagecount, _this.current + 1);
                                    drawArtList(data,10,_this.current);
                                }
                                if ($(this).hasClass('js-page-last')) {
                                    _this.current = _this.pagecount;
                                    drawArtList(data,10,_this.current);
                                }
                            } else if ($(this).data('page')) {
                                _this.current = parseInt($(this).data('page'));
                                drawArtList(data,10,_this.current);
                            }
                            _this.go();
                        })
                    }

                    p.bindEvent();
                }
            });
            artListBool = true;
        }
    }

    function drawArtList(data,pagesize,currentPage) {
        var htmlText = "";
        var pageTotalCount = Math.ceil(data.length/pagesize);
        var printCount=currentPage!=pageTotalCount?pagesize*currentPage:data.length;
        //绘制用户文章信表

        for (var i = pagesize*(currentPage-1); i <printCount; i++) {
            htmlText += "<tr data-tid='" + data[i].tid + "'><td class='td-number'>" + (i + 1) + "</td>";
            htmlText += "<td class='tb-title'>" + data[i].title + "</td>";
            htmlText += "<td class='td-author'>" + data[i].authorname + "</td>";
            htmlText += "<td class='td-decoration'>" + data[i].decoration + "</td>";
            if (data[i].type == "0") {
                htmlText += "<td class='td-type'>转载</td>";
            } else {
                htmlText += "<td class='td-type'>原创</td>";
            }

            if (data[i].state == "0") {
                htmlText += "<td class='td-state'>保存</td>";
            } else if (data[i].state == "1") {
                htmlText += "<td class='td-state'>待审核</td>";
            }
            if (data[i].state == "2") {
                htmlText += "<td class='td-state'>通过审核</td>";
            }
            if (data[i].state == "3") {
                htmlText += "<td class='td-state'>未通过审核</td>";
            }

            htmlText += "<td class='td-createTime'>" + data[i].create_time + "</td>";
            htmlText += "<td class='td-alterTime'>" + data[i].alter_time + "</td>";
            htmlText += "<td class='td-operate'><a href='runton_article.html?tid=" + data[i].tid + "'>浏览</a><a href='javascript:fillAlterForm("+ data[i].tid +");'>修改</a><a href='#'>删除</a></td></tr>";
        }
        $("#allArticle table tbody").empty().append(htmlText);
    }

    /***************************************************************************************************
     * *************************            TODO  End       ********************************************
     **************************************************************************************************/

    /**********************************************************************/
    /******************    TODO    页面预加载     **************************/
    /*********************************************************************/
    //  TODO 在页面加载时检查用户是否已经登录
    $(document).ready(function () {
        var login_id = getCookie("login_id");
        // TODO 判断用户是否登录 ,如果没有登录跳转到首页。
        if (getCookie('PHPSESSID') && login_id) {
            $("nav .container ul li .user_center").removeClass("hidden");
            $("nav .container ul li .login-reg").addClass("hidden");
        } else {
            window.location.href = "index.html";
        }
        //进入用户中心后，向服务器发送请求，获取用户信息。
        getUserInfo();
        //获取用户文章信息
        $.post("php/runton_user_artLists.php", {"login_id": login_id}, function (data) {
            if (data.length > 0) {
                //绘制文章信息列表
                loadArtList(data);
            }
        });
    });


    /**********************************************************************/
    /****************** TODO  菜单按钮切换功能     **************************/
    /*********************************************************************/
    //TODO  用户中心界面菜单栏 内容切换
    $("#left_navbar").on("click", ".row dl dd a", function (event) {
        event.preventDefault();
        var target = event.target;
        var item = target.getAttribute("data-item");
        switch (item) {
            case '1':
                contentToggle(".userInfo", 0);
                infoToggle("#personInfo");
                break;
            case '2':
                contentToggle(".userInfo", 1);
                infoToggle("#loginInfo");
                break;
            case '3':
                contentToggle(".userEditor", 0);
                infoToggle("#allArticle");
                readyArticle();
                break;
            case '4':
                contentToggle(".userEditor", 1);
                infoToggle("#addNewArticle");
                break;
            case '5':
                contentToggle(".userEditor", 2);
                infoToggle("#alertArticle");
                break;
            case '6':
                contentToggle(".userEditor", 3);
                infoToggle("#deletedArticle");
                break;
            case '7':
                contentToggle(".census", 0);
                infoToggle("#postRecord");
                break;
            case '8':
                contentToggle(".census", 1);
                infoToggle("#visitedRecord");
                break;
            default :
                break;
        }
    });
    //
    $("div.userEditor .row1 ul li").first().one("click", function () {
        readyArticle();
    });

    /**********************************************************************/
    /****************** TODO  文章编辑功能模块     **************************/
    /*********************************************************************/
    //TODO  文章编辑完成向服务器发送数据进行保存
    function sendArticleData(state, succMsg, errMsg) {
        //获得文章的头部信息
        var headerInfo = $("#articleForm").serialize();
        //获取多选框中的数据，并拼接成一个字符串
        var labels = $("#label").val();
        //获得文本编辑器的内容信息
        var editorValue = ue.getContent();
        if (editorValue == "") {
            alert("文章内容不允许为空。提交失败。");
            return false;
        }
        editorValue = encodeURIComponent(editorValue);

        //将头部信息和文本内容信息拼接到一起。
        var articleInfo = headerInfo + "&state=" + state + "&login_id=" + getCookie('login_id') + "&labels=" + labels + "&editorValue=" + editorValue;
        //通过post请求将数据发送给服务器处理
        $.post("php/runton_usercenter.php", articleInfo, function (responsedata) {
            //判断数据是否保存成功
            if (responsedata == 'succ') {
                alert(succMsg);
            } else if (responsedata == 'fail') {
                alert(errMsg);
            }
        });
    }

    //TODO 在“提交审核”按钮上绑定click事件，提交用户编写好的数据。并将文章状态标记为2（表示待审核）
    $("#articleForm").submit(function (e) {
        e.preventDefault();
        //获取页面缓存的login_id值 和 会话id
        if (getCookie('login_id') && getCookie('PHPSESSID')) {
            //验证表单 数据完整性

            //state =2 表示审核通过（测试期间暂不审核文章）
            sendArticleData(2, "文章提交成功，正在审核...", "文章提交失败，请稍后再试。");
        }
    });
    //TODO 文章管理模块下 “保存”按钮上绑定click事件，提交用户编写好的数据。并将文章状态标记为1（表示保存）
    $("#save").click(function () {
        //获取页面缓存的login_id值 和 会话id
        if (getCookie('login_id') && getCookie('PHPSESSID')) {
            //state =1 表示提交保存
            var result = sendArticleData(1, "文章保存成功...", "文章保存失败，请稍后再试。");
        } else {
            alert("您长时间没有操作，请重新登录后再试。");
        }
    });
    //TODO 文章管理模块下 “清空”按钮上绑定click事件，提交用户编写好的数据。
    $("#clear").click(function () {
        //清空所有表单控件。
        $("#articleForm *[name]").val("");
        $("#label").val("");
        //清空文档编辑器
        ue.setContent('', "");
    });

    /**********************  用户信息模块 **************************/
    /****************************************************************/
    //TODO 表单验证
    var updateBool = false;
    //密码修改验证
    var password = document.getElementById("password");
    var passwdTip = document.getElementById("passwdTip");
    password.onfocus = function () {
        //提示密码字段长度和字符要求
        passwdTip.className = "col-sm-3 control-label show control-default";
        passwdTip.innerHTML = "密码由6至12位的数字和字母混合组成.";
    };
    password.onblur = function () {
        if (password.validity.valid) {
            //验证通过,密码输入框外轮廓绿色显示
            passwdTip.className = "col-sm-3 control-label show control-success";
            passwdTip.innerHTML = "密码正确.";
        } else if (password.validity.valueMissing) {
            //密码框为空时，密码输入框外轮廓红色警告显示 不能为空
            passwdTip.className = "col-sm-3 control-label show control-error";
            passwdTip.innerHTML = "密码不能为空."
        } else if (password.validity.patternMismatch) {
            //未通过验证，密码框外轮廓橙色显示，提示未通过验证
            passwdTip.className = "col-sm-3 control-label show control-error";
            passwdTip.innerHTML = "密码输入有误."
        }
    };
    //用户姓名修改验证
    var uname = document.getElementById("name");
    var nameTip = document.getElementById("nameTip");
    uname.onfocus = function () {
        //提示字段长度和字符要求
        nameTip.className = "col-sm-3 control-label show control-default";
        nameTip.innerHTML = "用户名长度不超过8个字符";

    };
    uname.onblur = function () {
        if (uname.validity.valid) {
            //验证通过,密码输入框外轮廓绿色显示
            nameTip.className = "col-sm-3 control-label show control-success";
            nameTip.innerHTML = "用户名正确."
        } else if (uname.validity.patternMismatch) {
            //未通过验证，密码框外轮廓橙色显示，提示未通过验证
            nameTip.className = "col-sm-3 control-label show control-error";
            nameTip.innerHTML = "用户名输入有误."
        }
    };
    uname.onchange = function () {
        updateBool = true;
        console.log(updateBool);
    };
    //用户邮件修改验证
    var email = document.getElementById("email");
    var emailTip = document.getElementById("emailTip");
    email.onfocus = function () {
        emailTip.className = "col-sm-3 control-label show control-default";
        emailTip.innerHTML = "请输入有效的邮件地址。";
    };
    email.onblur = function () {
        if (email.validity.valid) {
            //验证通过,密码输入框外轮廓绿色显示
            emailTip.className = "col-sm-3 control-label show control-success";
            emailTip.innerHTML = "邮件地址正确."
        } else if (email.validity.valueMissing) {
            //密码框为空时，密码输入框外轮廓红色警告显示 不能为空
            emailTip.className = "col-sm-3 control-label show control-error";
            emailTip.innerHTML = "邮件地址不能为空."
        } else if (email.validity.patternMismatch) {
            //未通过验证，密码框外轮廓橙色显示，提示未通过验证
            emailTip.className = "col-sm-3 control-label show control-error";
            emailTip.innerHTML = "邮件名输入有误."
        }
    };
    email.onchange = function () {
        updateBool = true;
        console.log(updateBool);
    };
    //用户手机号修改验证
    var tel = document.getElementById("tel");
    var telTip = document.getElementById("telTip");
    tel.onfocus = function () {
        telTip.className = "col-sm-3 control-label show control-default";
        telTip.innerHTML = "请输入手机号。";
    };
    tel.onblur = function () {
        if (tel.validity.valid) {
            //验证通过,密码输入框外轮廓绿色显示
            telTip.className = "col-sm-3 control-label show control-success";
            telTip.innerHTML = "手机号正确."
        } else if (tel.validity.patternMismatch) {
            //未通过验证，密码框外轮廓橙色显示，提示未通过验证
            telTip.className = "col-sm-3 control-label show control-error";
            telTip.innerHTML = "手机号输入有误."
        }
    };
    tel.onchange = function () {
        updateBool = true;
        console.log(updateBool);
    };
    //用户密保答案验证
    var answer = document.getElementById("answer");
    var answerTip = document.getElementById("answerTip");
    answer.onfocus = function () {
        answerTip.className = "col-sm-3 control-label show control-default";
        answerTip.innerHTML = "请输入20个以内字符。";
    };
    answer.onblur = function () {
        if (answer.validity.valid) {
            //验证通过,密码输入框外轮廓绿色显示
            answerTip.className = "col-sm-3 control-label show control-success";
            answerTip.innerHTML = "输入正确."
        } else if (answer.validity.patternMismatch) {
            //未通过验证，密码框外轮廓橙色显示，提示未通过验证
            answerTip.className = "col-sm-3 control-label show control-error";
            answerTip.innerHTML = "字符长度有误."
        }
    };
    answer.onchange = function () {
        updateBool = true;
        console.log(updateBool);
    };
    var birthday = document.getElementById("birthday");
    var question = document.getElementById("question");
    birthday.onchange = function () {
        updateBool = true;
        console.log(updateBool);
    };
    question.onchange = function () {
        updateBool = true;
        console.log(updateBool);
    };

    //TODO  “保存”按钮点击事件---表单提交保存
    $("#personInfo form input.save").click(function (event) {
        event.preventDefault();
        //表单验证结果为真   保存数据。  验证结果为假，不予保存
        if (answer.validity.valid && tel.validity.valid && email.validity.valid && uname.validity.valid && password.validity.valid) {
            //表单序列化
            var userData = $("#personInfo form").serialize();
            $.get("php/runton_update_userinfo.php", userData, function (data) {
                if (data == "fail") {
                    alert("信息未更改。");
                } else {
                    alert("信息更改成功。");
                }
            });
        }
    });

    //TODO  “取消”按钮点击事件---表单内容恢复初始值
    $("#personInfo form input.cancel").click(function () {
        //重新请求信息
        getUserInfo();
    });

    // TODO 查看用户密码
    $("#passwdTip button").click(function () {
        if ($(this).html() == "查看密码") {
            $("#password").attr("type", "text");
            $(this).html("隐藏密码");
        } else if ($(this).html() == "隐藏密码") {
            $("#password").attr("type", "password");
            $(this).html("查看密码");
        }
    });

    /****************************************************************************************/
    /******************************TODO 修改文章表单         **********************************/
    /****************************************************************************************/
    //TODO 向修改文章栏的文章列表选择框中加载用户文章列表
    function loadArtList(data) { //包含用户文章编号和标题
        var option = "";
        for (var i = 0; i < data.length; i++) {
            option += "<option value='" + data[i].tid + "'>" + data[i].tid + "</option>";
        }
        $("#tid").append(option);
    }

    //TODO 向"修改文章" 栏目表单填入数据
    function fillAlterForm(tid) {

        //根据文章ID 获取文章的详细信息
        $.post("php/article_detail.php", {"tid": tid}, function (articleData) {
            if (articleData != []) {
                //console.log(articleData);
                $("#title2").val(articleData.title);
                $("#author2").val(articleData.authorname);
                var labels = articleData.label.split(",");
                for (var i in labels) {
                    $("#label2").find("option[value='" + labels[i] + "']").attr("selected", true);
                }
                var type = parseInt(articleData.type);
                if (type == 1) {
                    $("#Reprint2").removeAttr("checked");
                    $("#Original2").attr("checked", true);
                    $("#Original2").click();
                } else if (type == 0) {
                    $("#Original2").removeAttr("checked");
                    $("#Reprint2").attr("checked", true);
                    $("#Reprint2").click();
                }
                $("#loadUrl2").val(articleData.loadUrl);
                $("#decoration2").val(articleData.decoration);
                ue2.execCommand('insertHtml', articleData.htmlText);
            } else {
                alert("获取文章详细信息失败。");
            }
        });
    }

    //TODO 为修改文章栏下的文章列表绑定change切换事件，根据文章标题向表单中填入数据
    $("#tid").change(function (e) {
        var target = e.target;
        var tid = target.value;
        if (tid != 0) {
            //清空表单
            $("#articleForm2 *[name]:not([name='tid'])").val("");
            //清空文本编辑器内容
            ue2.setContent('', false);
            fillAlterForm(tid);
        } else {
            //清空表单
            $("#articleForm2 *[name]").val("");
            //清空文本编辑器内容
            ue2.setContent('', false);
        }
    });

    //TODO 在“提交审核”按钮上绑定click事件，提交用户编写好的数据。并将文章状态标记为2（发表状态）
    $("#articleForm2").submit(function (e) {
        e.preventDefault();

        //获取页面缓存的login_id值 和 会话id
        if (getCookie('login_id') && getCookie('PHPSESSID')) {
            //获得文章的头部信息
            var headerInfo = $("#articleForm2").serialize();
            //获取多选框中的数据，并拼接成一个字符串
            var labels = $("#label2").val();
            //获得文本编辑器的内容信息
            var editorValue = ue2.getContent();
            if (editorValue == "") {
                alert("文章内容不允许为空。提交失败。");
                return false;
            }

            //editorValue=encodeURIComponent(editorValue);
            //将头部信息和文本内容信息拼接到一起。
            var articleInfo = headerInfo + "&state=" + 2 + "&login_id=" + getCookie('login_id') + "&labels=" + labels;
            //通过post请求将数据发送给服务器处理
            $.post("php/runton_alter_user_blog.php", articleInfo, function (responsedata) {
                //判断数据是否保存成功
                if (responsedata == 'succ') {
                    alert("文章提交成功。");
                } else if (responsedata == 'fail') {
                    alert("修改提交失败。");
                }
            });
        }
    });
    //TODO 在“保存”按钮上绑定click事件，保存用户编写好的数据。并将文章状态标记为0（存储状态）
    $("#save2").click(function () {
        //获取页面缓存的login_id值 和 会话id
        if (getCookie('login_id') && getCookie('PHPSESSID')) {

            //获得文章的头部信息
            var headerInfo = $("#articleForm2").serialize();
            //获取多选框中的数据，并拼接成一个字符串
            var labels = $("#label2").val();
            //获得文本编辑器的内容信息
            var editorValue = ue2.getContent();
            if (editorValue == "") {
                alert("文章内容不允许为空。提交失败。");
                return false;
            }
            //editorValue=encodeURIComponent(editorValue);
            //将头部信息和文本内容信息拼接到一起。
            var articleInfo = headerInfo + "&state=" + 0 + "&login_id=" + getCookie('login_id') + "&labels=" + labels;
            //通过post请求将数据发送给服务器处理
            $.post("php/runton_alter_user_blog.php", articleInfo, function (responsedata) {
                //判断数据是否保存成功
                if (responsedata == 'succ') {
                    alert("文章保存成功。");
                } else if (responsedata == 'fail') {
                    alert("修改保存失败。");
                }
            });
        }
    });