var mwpdeploy=function(){function e(e){u.debug&&(console&&console.log?console.log(e):alert(e))}function t(e,t){if(null==e||0==e.length)return!0;var n=e.charAt(e.length-1);if("+"!=n&&"*"!=n&&-1!=e.indexOf("_")&&"_"!=n&&(e+="*",n="*"),e=e.substring(0,e.length-1),e.length>0){var i=e.charAt(e.length-1);"."!=i&&"_"!=i||(e=e.substring(0,e.length-1))}return"*"==n?0==t.indexOf(e):"+"==n&&e<=t}function n(e){return null==e||0==e.length?"http://java.com/dt-redirect":("&"==e.charAt(0)&&(e=e.substring(1,e.length)),"http://java.com/dt-redirect?"+e)}function i(e,t){for(var n=e.length,i=0;i<n;i++)if(e[i]===t)return!0;return!1}function a(e){return i(o,e.toLowerCase())}function r(e){return"MSIE"!=deployJava.browserName||(!!deployJava.compareVersionToPattern(deployJava.getPlugin().version,["10","0","0"],!1,!0)||null!=e&&!t("1.6.0_33+",e))}var l={core:["id","class","title","style"],i18n:["lang","dir"],events:["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmousemove","onmouseout","onkeypress","onkeydown","onkeyup"],applet:["codebase","code","name","archive","object","width","height","alt","align","hspace","vspace"],object:["classid","codebase","codetype","data","type","archive","declare","standby","height","width","usemap","name","tabindex","align","border","hspace","vspace"]},o=(l.object.concat(l.core,l.i18n,l.events),l.applet.concat(l.core)),u={debug:null,version:"20120801",firefoxJavaVersion:null,myInterval:null,preInstallJREList:null,returnPage:null,brand:null,locale:null,installType:null,EAInstallEnabled:!1,EarlyAccessURL:null,oldMimeType:"application/npruntime-scriptable-plugin;DeploymentToolkit",mimeType:"application/java-deployment-toolkit",launchButtonPNG:function(){var e="//java.com/js/webstart.png";try{return-1!=document.location.protocol.indexOf("http")?e:"http:"+e}catch(t){return"http:"+e}}(),browserName:null,browserName2:null,getJREs:function(){var t=new Array;if(this.isPluginInstalled())for(var n=this.getPlugin(),i=n.jvms,a=0;a<i.getLength();a++)t[a]=i.get(a).version;else{var r=this.getBrowser();"MSIE"==r?this.testUsingActiveX("1.7.0")?t[0]="1.7.0":this.testUsingActiveX("1.6.0")?t[0]="1.6.0":this.testUsingActiveX("1.5.0")?t[0]="1.5.0":this.testUsingActiveX("1.4.2")?t[0]="1.4.2":this.testForMSVM()&&(t[0]="1.1"):"Netscape Family"==r&&(this.getJPIVersionUsingMimeType(),null!=this.firefoxJavaVersion?t[0]=this.firefoxJavaVersion:this.testUsingMimeTypes("1.7")?t[0]="1.7.0":this.testUsingMimeTypes("1.6")?t[0]="1.6.0":this.testUsingMimeTypes("1.5")?t[0]="1.5.0":this.testUsingMimeTypes("1.4.2")?t[0]="1.4.2":"Safari"==this.browserName2&&(this.testUsingPluginsArray("1.7.0")?t[0]="1.7.0":this.testUsingPluginsArray("1.6")?t[0]="1.6.0":this.testUsingPluginsArray("1.5")?t[0]="1.5.0":this.testUsingPluginsArray("1.4.2")&&(t[0]="1.4.2")))}if(this.debug)for(var a=0;a<t.length;++a)e("[getJREs()] We claim to have detected Java SE "+t[a]);return t},installJRE:function(e,t){setTimeout(function(){var e="";"MSIE"===webphone_api.GetBrowser()&&(e+='Enable Java in your browser or enable from the settings( <a href="http://java.com/en/download/help/enable_browser.xml" id="click_enable_java" target="_blank">How to enable Java ?</a>) OR '),e+='Install Java from <a href="http://www.java.com/download/" id="click_install_java" target="_blank">here.</a><br><br>',webphone_api.common.UserChooseEnginePopup(e,!0,!1,function(){},null,5)},3e3)},isAutoInstallEnabled:function(e){return!!this.isPluginInstalled()&&(void 0===e&&(e=null),r(e))},isCallbackSupported:function(){return this.isPluginInstalled()&&this.compareVersionToPattern(this.getPlugin().version,["10","2","0"],!1,!0)},installLatestJRE:function(e){if(this.isPluginInstalled()&&this.isAutoInstallEnabled()){var t=!1;return t=this.isCallbackSupported()?this.getPlugin().installLatestJRE(e):this.getPlugin().installLatestJRE(),t&&(this.refresh(),null!=this.returnPage&&(document.location=this.returnPage)),t}var i=this.getBrowser(),a=navigator.platform.toLowerCase();return"true"==this.EAInstallEnabled&&-1!=a.indexOf("win")&&null!=this.EarlyAccessURL?(this.preInstallJREList=this.getJREs(),null!=this.returnPage&&(this.myInterval=setInterval("deployJava.poll()",3e3)),location.href=this.EarlyAccessURL,!1):"MSIE"==i?this.IEInstall():"Netscape Family"==i&&-1!=a.indexOf("win32")?this.FFInstall():(location.href=n((null!=this.returnPage?"&returnPage="+this.returnPage:"")+(null!=this.locale?"&locale="+this.locale:"")+(null!=this.brand?"&brand="+this.brand:"")),!1)},runApplet:function(t,n,i){"undefined"!=i&&null!=i||(i="1.1");var a=i.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$");if(null==this.returnPage&&(this.returnPage=document.location),null!=a){"?"!=this.getBrowser()?this.versionCheck(i+"+")?this.writeAppletTag(t,n):this.installJRE(i+"+")&&(this.refresh(),location.href=document.location,this.writeAppletTag(t,n)):this.writeAppletTag(t,n)}else e("[runApplet()] Invalid minimumVersion argument to runApplet():"+i)},writeAppletTag:function(e,t){var n="<applet ",i="",r=!0;null!=t&&"object"==typeof t||(t=new Object);for(var l in e)a(l)?(n+=" "+l+'="'+e[l]+'"',"code"==l&&(r=!1)):t[l]=e[l];var s=!1;for(var o in t)"codebase_lookup"==o&&(s=!0),"object"!=o&&"java_object"!=o&&"java_code"!=o||(r=!1),i+='<param name="'+o+'" value="'+t[o]+'"/>';s||(i+='<param name="codebase_lookup" value="false"/>'),r&&(n+=' code="dummy"'),n+=">",webphone_api.InsertApplet(n+"\n"+i+"\n</applet>")},InsertApplet:function(e){void 0!==document.getElementById("wpappletconatiner")&&null!==document.getElementById("wpappletconatiner")?(e="",void 0!==e&&null!==e&&e.length>0?document.getElementById("wpappletconatiner").innerHTML=e:alert("Phone is not defined")):alert("No place to load phone")},versionCheck:function(t){var n=0,i=t.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?(\\*|\\+)?$");if(null!=i){for(var a=!1,r=!1,l=new Array,s=1;s<i.length;++s)"string"==typeof i[s]&&""!=i[s]&&(l[n]=i[s],n++);"+"==l[l.length-1]?(r=!0,a=!1,l.length--):"*"==l[l.length-1]?(r=!1,a=!0,l.length--):l.length<4&&(r=!1,a=!0);for(var o=this.getJREs(),s=0;s<o.length;++s)if(this.compareVersionToPattern(o[s],l,a,r))return!0;return!1}var u="Invalid versionPattern passed to versionCheck: "+t;return e("[versionCheck()] "+u),alert(u),!1},isWebStartInstalled:function(t){if("?"==this.getBrowser())return!0;"undefined"!=t&&null!=t||(t="1.4.2");var n=!1;return null!=t.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$")?n=this.versionCheck(t+"+"):(e("[isWebStartInstaller()] Invalid minimumVersion argument to isWebStartInstalled(): "+t),n=this.versionCheck("1.4.2+")),n},getJPIVersionUsingMimeType:function(){for(var e=0;e<navigator.mimeTypes.length;++e){var t=navigator.mimeTypes[e].type,n=t.match(/^application\/x-java-applet;jpi-version=(.*)$/);if(null!=n&&(this.firefoxJavaVersion=n[1],"Opera"!=this.browserName2))break}},launchWebStartApplication:function(e){navigator.userAgent.toLowerCase();if(this.getJPIVersionUsingMimeType(),0==this.isWebStartInstalled("1.7.0")&&(0==this.installJRE("1.7.0+")||0==this.isWebStartInstalled("1.7.0")))return!1;var t=null;document.documentURI&&(t=document.documentURI),null==t&&(t=document.URL);var n,i=this.getBrowser();if("MSIE"==i?n='<object classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" width="0" height="0"><PARAM name="launchjnlp" value="'+e+'"><PARAM name="docbase" value="'+t+'"></object>':"Netscape Family"==i&&(n='<embed type="application/x-java-applet;jpi-version='+this.firefoxJavaVersion+'" width="0" height="0" launchjnlp="'+e+'"docbase="'+t+'" />'),"undefined"==document.body||null==document.body)document.write(n),document.location=t;else{var a=document.createElement("div");a.id="div1",a.style.position="relative",a.style.left="-10000px",a.style.margin="0px auto",a.className="dynamicDiv",a.innerHTML=n,document.body.appendChild(a)}},createWebStartLaunchButtonEx:function(e,t){null==this.returnPage&&(this.returnPage=e);var n="javascript:deployJava.launchWebStartApplication('"+e+"');";document.write('<a href="'+n+'" onMouseOver="window.status=\'\'; return true;"><img src="'+this.launchButtonPNG+'" border="0" /></a>')},createWebStartLaunchButton:function(e,t){null==this.returnPage&&(this.returnPage=e);var n="javascript:if (!deployJava.isWebStartInstalled(&quot;"+t+"&quot;)) {if (deployJava.installLatestJRE()) {if (deployJava.launch(&quot;"+e+"&quot;)) {}}} else {if (deployJava.launch(&quot;"+e+"&quot;)) {}}";document.write('<a href="'+n+'" onMouseOver="window.status=\'\'; return true;"><img src="'+this.launchButtonPNG+'" border="0" /></a>')},launch:function(e){return document.location=e,!0},isPluginInstalled:function(){var e=this.getPlugin();return!(!e||!e.jvms)},isAutoUpdateEnabled:function(){return!!this.isPluginInstalled()&&this.getPlugin().isAutoUpdateEnabled()},setAutoUpdateEnabled:function(){return!!this.isPluginInstalled()&&this.getPlugin().setAutoUpdateEnabled()},setInstallerType:function(e){return this.installType=e,!!this.isPluginInstalled()&&this.getPlugin().setInstallerType(e)},setAdditionalPackages:function(e){return!!this.isPluginInstalled()&&this.getPlugin().setAdditionalPackages(e)},setEarlyAccess:function(e){this.EAInstallEnabled=e},isPlugin2:function(){if(this.isPluginInstalled()&&this.versionCheck("1.6.0_10+"))try{return this.getPlugin().isPlugin2()}catch(e){}return!1},allowPlugin:function(){return this.getBrowser(),"Safari"!=this.browserName2&&"Opera"!=this.browserName2&&"Firefox"!=this.browserName2},getPlugin:function(){this.refresh();var e=null;return this.allowPlugin()&&(e=document.getElementById("deployJavaPlugin")),e},compareVersionToPattern:function(e,t,n,i){if(e==undefined||t==undefined)return!1;var a=e.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$");if(null!=a){for(var r=0,l=new Array,s=1;s<a.length;++s)"string"==typeof a[s]&&""!=a[s]&&(l[r]=a[s],r++);var o=Math.min(l.length,t.length);if(i){for(var s=0;s<o;++s){if(l[s]<t[s])return!1;if(l[s]>t[s])return!0}return!0}for(var s=0;s<o;++s)if(l[s]!=t[s])return!1;return!!n||l.length==t.length}return!1},getBrowser:function(){if(null==this.browserName){var t=navigator.userAgent.toLowerCase();e("[getBrowser()] navigator.userAgent.toLowerCase() -> "+t),-1!=t.indexOf("msie")&&-1==t.indexOf("opera")?(this.browserName="MSIE",this.browserName2="MSIE"):-1!=t.indexOf("trident")||-1!=t.indexOf("Trident")?(this.browserName="MSIE",this.browserName2="MSIE"):-1!=t.indexOf("iphone")?(this.browserName="Netscape Family",this.browserName2="iPhone"):-1!=t.indexOf("firefox")&&-1==t.indexOf("opera")?(this.browserName="Netscape Family",this.browserName2="Firefox"):-1!=t.indexOf("chrome")?(this.browserName="Netscape Family",this.browserName2="Chrome"):-1!=t.indexOf("safari")?(this.browserName="Netscape Family",this.browserName2="Safari"):-1!=t.indexOf("mozilla")&&-1==t.indexOf("opera")?(this.browserName="Netscape Family",this.browserName2="Other"):-1!=t.indexOf("opera")?(this.browserName="Netscape Family",this.browserName2="Opera"):(this.browserName="?",this.browserName2="unknown"),e("[getBrowser()] Detected browser name:"+this.browserName+", "+this.browserName2)}return this.browserName},testUsingActiveX:function(t){var n="JavaWebStart.isInstalled."+t+".0";if("undefined"==typeof ActiveXObject||!ActiveXObject)return e("[testUsingActiveX()] Browser claims to be IE, but no ActiveXObject object?"),!1;try{return null!=new ActiveXObject(n)}catch(i){return!1}},testForMSVM:function(){if("undefined"!=typeof oClientCaps){var e=oClientCaps.getComponentVersion("{08B0E5C0-4FCB-11CF-AAA5-00401C608500}","ComponentID");return""!=e&&"5,0,5000,0"!=e}return!1},testUsingMimeTypes:function(t){if(!navigator.mimeTypes)return e("[testUsingMimeTypes()] Browser claims to be Netscape family, but no mimeTypes[] array?"),!1;for(var n=0;n<navigator.mimeTypes.length;++n){s=navigator.mimeTypes[n].type;var i=s.match(/^application\/x-java-applet\x3Bversion=(1\.8|1\.7|1\.6|1\.5|1\.4\.2)$/);if(null!=i&&this.compareVersions(i[1],t))return!0}return!1},testUsingPluginsArray:function(e){if(!navigator.plugins||!navigator.plugins.length)return!1;for(var t=navigator.platform.toLowerCase(),n=0;n<navigator.plugins.length;++n)if(s=navigator.plugins[n].description,-1!=s.search(/^Java Switchable Plug-in (Cocoa)/)){if(this.compareVersions("1.5.0",e))return!0}else if(-1!=s.search(/^Java/)&&-1!=t.indexOf("win")&&(this.compareVersions("1.5.0",e)||this.compareVersions("1.6.0",e)))return!0;return!!this.compareVersions("1.5.0",e)},IEInstall:function(){return location.href=n((null!=this.returnPage?"&returnPage="+this.returnPage:"")+(null!=this.locale?"&locale="+this.locale:"")+(null!=this.brand?"&brand="+this.brand:"")),!1},done:function(e,t){},FFInstall:function(){return location.href=n((null!=this.returnPage?"&returnPage="+this.returnPage:"")+(null!=this.locale?"&locale="+this.locale:"")+(null!=this.brand?"&brand="+this.brand:"")+(null!=this.installType?"&type="+this.installType:"")),!1},compareVersions:function(e,t){for(var n=e.split("."),i=t.split("."),a=0;a<n.length;++a)n[a]=Number(n[a]);for(var a=0;a<i.length;++a)i[a]=Number(i[a]);return 2==n.length&&(n[2]=0),n[0]>i[0]||!(n[0]<i[0])&&(n[1]>i[1]||!(n[1]<i[1])&&(n[2]>i[2]||!(n[2]<i[2])))},enableAlerts:function(){this.browserName=null,this.debug=!0},poll:function(){this.refresh();var e=this.getJREs();0==this.preInstallJREList.length&&0!=e.length&&(clearInterval(this.myInterval),null!=this.returnPage&&(location.href=this.returnPage)),0!=this.preInstallJREList.length&&0!=e.length&&this.preInstallJREList[0]!=e[0]&&(clearInterval(this.myInterval),null!=this.returnPage&&(location.href=this.returnPage))},writePluginTag:function(){var e=this.getBrowser();if("MSIE"==e){var t=document.getElementById("deployJavaPlugin");if(void 0!==t&&null!==t)return;var n=null;n=document.createElement("object"),n.classid="clsid:CAFEEFAC-DEC7-0000-0001-ABCDEFFEDCBA",n.id="deployJavaPlugin",n.width&&(n.width="0"),n.height&&(n.height="0");var i=document.getElementsByTagName("head")[0];if(void 0===i||null===i){try{console.log("ERROR, cannot create OBJECT element deployJavaPlugin")}catch(a){}return}i.appendChild(n)}else"Netscape Family"==e&&this.allowPlugin()&&this.writeEmbedTag()},refresh:function(){(navigator.plugins.refresh(!1),"Netscape Family"==this.getBrowser()&&this.allowPlugin())&&(null==document.getElementById("deployJavaPlugin")&&this.writeEmbedTag())},writeEmbedTag:function(){var e=!1;if(null!=navigator.mimeTypes){for(var t=0;t<navigator.mimeTypes.length;t++)navigator.mimeTypes[t].type==this.mimeType&&navigator.mimeTypes[t].enabledPlugin&&(document.write('<embed id="deployJavaPlugin" type="'+this.mimeType+'" hidden="true" />'),e=!0);if(!e)for(var t=0;t<navigator.mimeTypes.length;t++)navigator.mimeTypes[t].type==this.oldMimeType&&navigator.mimeTypes[t].enabledPlugin&&document.write('<embed id="deployJavaPlugin" type="'+this.oldMimeType+'" hidden="true" />')}}};if(u.writePluginTag(),null==u.locale){var h=null;if(null==h)try{h=navigator.userLanguage}catch(c){}if(null==h)try{h=navigator.systemLanguage}catch(c){}if(null==h)try{h=navigator.language}catch(c){}null!=h&&(h.replace("-","_"),u.locale=h)}return u}();