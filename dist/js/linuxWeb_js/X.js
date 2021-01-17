X={openMenus:[],menus:{desktopContextMenu:{createOnMousePosition:!0,listenerType:"contextmenu",toggleElement:document.querySelector("desktop"),recreateBehaviour:"recreate",changeBorder:!1,preventDefault:!0,enterAnimation:"fadeIn",exitAnimation:"fadeOut",exitAnimationTime:100,elementTag:"context_menu",getHTML:function(e=100,t=100){return`\n\t\t<context_menu style="top: ${t}px;left: ${e}px;">\n\t\t\t\t<context_item >New Folder</context_item>\n\t\t\t\t<context_item class='context_sub_menu' >\n\t\t\t\t\tNew Document\n\t\t\t\t\t<context_sub_menu>\n\t\t\t\t\t\t<context_item>Empty Document</context_item>\n\t\t\t\t\t</context_sub_menu>\n\t\t\t\t</context_item><br>\n\t\t\t\t<context_item onclick="processes.create('terminal', {x:${e},y:${t}});">Terminal</context_item><br>\n\t\t\t\t<context_item>Sort By Name</context_item><br>\n\t\t\t\t<context_item>Change Background</context_item>\n\t\t\t</context_menu>\n\t\t\t\t`},closeCondition:function(e){return"CONTEXT_MENU"!=e.target.tagName},onCreate:function(){document.querySelectorAll(".context_sub_menu").forEach(e=>{e.addEventListener("mouseover",()=>{e.querySelector("context_sub_menu").style.display="block"}),e.addEventListener("mouseleave",()=>{e.querySelector("context_sub_menu").style.display=""})})}},activities:{listenerType:"click",toggleElement:document.querySelector("activities_menu_button"),enterAnimation:"fadeIn",exitAnimation:"fadeOut",exitAnimationTime:200,elementTag:"activities_menu_container",getHTML:function(){return`\n\t\t\t\t<activities_menu_container>\n\t\t\t\t\t<app_search><search_icon></search_icon><input placeholder='Type to search' type='search'></app_search>\n\t\t\t\t\t<favorites>\n\t\t\t\t\t${Object.entries(apps).map(e=>{let t;return t=null!=e[1].icon?`<img src='${e[1].icon}'>`:null!=e[1].name?e[1].name[0]:e[0][0],`<app onclick="X.clearOpenMenus();processes.create('${e[0]}');">${t}</app>`}).join("")}\n\t\t\t</favorites>\n\t\t\t\t</activities_menu_container>\n\t\t`},closeCondition:function(e){X.general.elementIsInEventPath(e,document.querySelector("activities_menu_container"))}},statusArea:{listenerType:"click",toggleElement:document.querySelector("statusArea"),enterAnimation:"bottomFadeIn",exitAnimation:"bottomFadeOut",exitAnimationTime:200,elementTag:"status_area_container",getHTML:function(){return`<status_area_container>\n\t\t\t\t\t<item>\n\t\t\t\t\t<volume_icon></volume_icon>\n\t\t\t\t\t<input oninput='system.changeVolume(this.value)' id='volume_slider' min="0" max="100" value="${system.global.volume}" step="1" type="range">\n\t\t\t\t\t</item>\n\t\t\t\t\t<item>\n\t\t\t\t\t<brightness_icon></brightness_icon>\n\t\t\t\t\t<input  oninput='system.changeBrightness(this.value)' id='brightness_slider' min="25" max="100" value="${system.global.brightness}" step="1" type="range">\n                    </item>\n                    <hr>\n                    <item><network_icon></network_icon><text>Connected</text></item>\n                    <hr>\n\t\t\t\t\t<item onclick="X.clearOpenMenus();processes.create('settings')"><settings_icon></settings_icon><text>Settings</text></item>\n\t\t\t\t\t<item onclick='X.lockScreen.lock()'><padlock_icon></padlock_icon><text>Lock</text></item>\n                    <dropdown_item onclick='X.general.dropdown.toggle(this)'>\n                    <item><power_off_icon></power_off_icon><text>Power Off / Log Out</text><down_icon></down_icon></item>\n                    <dropdown>\n                        <item onclick='X.restart();'><span>Restart</span></item>\n                        <item onclick='X.shutdown();'><span>Power Off</span></item>\n                        <hr>\n                        <item onclick='X.logout();'><span>Log Out</span></item>\n                    </dropdown>\n                    </dropdown_item>\n\n        </status_area_container>`},closeCondition:function(e){X.general.elementIsInEventPath(e,document.querySelector("status_area_container"))}},loginStatusArea:{listenerType:"click",toggleElement:document.querySelector("lockscreen_statusArea"),enterAnimation:"bottomFadeIn",exitAnimation:"bottomFadeOut",exitAnimationTime:200,elementTag:"status_area_container",getHTML:function(){return`<status_area_container class='login_status_area_menu'>\n\t\t\t\t\t<item>\n\t\t\t\t\t<volume_icon></volume_icon>\n\t\t\t\t\t<input oninput='system.changeVolume(this.value)' id='volume_slider' min="0" max="100" value="${system.global.volume}" step="1" type="range">\n\t\t\t\t\t</item>\n\t\t\t\t\t<item>\n\t\t\t\t\t<brightness_icon></brightness_icon>\n\t\t\t\t\t<input  oninput='system.changeBrightness(this.value)' id='brightness_slider' min="25" max="100" value="${system.global.brightness}" step="1" type="range">\n                    </item>\n                    <hr>\n                    <dropdown_item onclick='X.general.dropdown.toggle(this)'>\n                    <item><power_off_icon></power_off_icon><text>Power Off / Log Out</text><down_icon></down_icon></item>\n                    <dropdown>\n                        <item onclick='X.restart();'><span>Restart</span></item>\n                        <item onclick='X.shutdown();'><span>Power Off</span></item>\n                    </dropdown>\n                    </dropdown_item>\n\n        </status_area_container>`},closeCondition:function(e){X.general.elementIsInEventPath(e,document.querySelector("status_area_container"))}}},services:{clock:{onStart:function(){setTimeout(()=>{setInterval(()=>{Object.values(X.services.clock.update.updateElements).forEach(e=>{e.element.innerHTML=date.get(e.options)}),console.log("Time update. Next one in: ",60-(new Date).getSeconds())},6e4)},1e3*(60-(new Date).getSeconds()))},update:{updateElements:{},add:function(e,t){for(const t in this.updateElements)if(this.updateElements[t].element==e)return!1;newObj={element:e,options:t},Object.assign(this.updateElements,{newObj:newObj}),this.updateNow(e,t)},remove:function(e){for(const t in this.updateElements)if(this.updateElements[t].element==e)return delete this.updateElements[t],!0},updateNow:function(e,t){e.innerHTML=date.get(t)}}},volume:{update:function(){volume=system.global.volume,volume>66?img="url('./src/img/volume/high.svg')":volume>33?img="url('./src/img/volume/medium.svg')":volume>0?img="url('./src/img/volume/low.svg')":img="url('./src/img/volume/mute.svg')",document.querySelectorAll("volume_icon").forEach(e=>e.style.backgroundImage=img)}}},general:{dropdown:{toggle:e=>{if(!system.global.elementExists(e))return!1;let t=e.querySelector("dropdown");""==t.style.height?(t.style=`height:${30*t.childElementCount}px;`,e.querySelector("down_icon").style.transform="rotate(0deg)"):(t.style.height="",e.querySelector("down_icon").style.transform="")}},elementIsInEventPath:(e,t)=>(clickPath=e.path||e.composedPath(),clickPath.includes(t))},overlay:{remove:function(){document.querySelectorAll("overlay").forEach(e=>e.remove())}},lockScreen:{form:document.querySelector("body > login > form"),loginContainer:document.querySelector("body > login"),loginTime:document.querySelector("body > login > login_time"),time:document.querySelector("body > login > login_time > time"),date:document.querySelector("body > login > login_time > date"),p:document.querySelector("login > login_time > p "),unlock:function(){X.clearOpenMenus(),X.services.clock.update.remove(this.loginTime),this.loginContainer.style.display="none",document.querySelector("body>linux").style="opacity:0;",setTimeout(()=>{document.querySelector("body>linux").style.opacity="1"},20)},lock:function(){this.loginContainer.style="opacity:0",this.form.style="display:none",this.loginTime.style="",this.p.style.opacity="0",X.services.clock.update.add(this.time,"time-s"),X.services.clock.update.add(this.date,"day>str month>str date"),X.clearOpenMenus(),setTimeout(()=>{this.p.style.opacity="1"},3e3),document.querySelector("body>linux").style.opacity="0",setTimeout(()=>{this.loginContainer.style="opacity:1",document.querySelector("input[type=password]").value="",this.form.style="position:relative;bottom:0px;display:none",this.loginContainer.style="opacity:1;",document.querySelector("body>linux").style="visibility:hidden"},20),setTimeout(()=>{document.body.setAttribute("onclick","X.lockScreen.showForm(event)"),document.body.setAttribute("onkeydown","X.lockScreen.showForm(event)")},1e3)},showForm:e=>{X.lockScreen.form.querySelector("input[type='password']");X.lockScreen.loginTime.style="opacity:0;top: 0px",setTimeout(()=>{X.lockScreen.form.style="opacity: 1",X.lockScreen.form.querySelector("input[type='password']").focus()},200),setTimeout(()=>{X.lockScreen.loginTime.style="display:none"},500),document.body.removeAttribute("onclick"),document.body.removeAttribute("onkeydown")},playLoginAnimation:function(e=!1){e?(this.form.style="position:relative;bottom:50px;opacity:0;",this.loginContainer.style="opacity:0;",document.querySelector("body>linux").style="visibility:hidden;opacity: 0",setTimeout(()=>{this.unlock()},500)):(this.form.style="position:relative;bottom:120px;opacity:1;",document.querySelector("input[type=password]").style="border-color:var(--error-color)",document.querySelector("input[type=password]").innerHTML="",setTimeout(()=>{this.form.style="position:relative;bottom:0px;opacity:1;"},120),setTimeout(()=>{document.querySelector("input[type=password]").style=""},300))}},cta:function(e="cta title :)",t="This is a generic cta message",n=[["OK",!0]]){if(X.clearOpenMenus(),n==[]||"object"!=typeof n)return!1;"object"!=typeof n[0]&&(n=[...n]);let o=`\n            <overlay>\n                <cta>\n                    <cta_title>${e}</cta_title>\n                    <cta_message>${t}</cta_message>\n                    <cta_buttons>${n.map(e=>`<input type='button' value='${e[0]}'>`).join("")}</cta_buttons>\n                </cta>\n            </overlay>\n            `;return overlayContainer.innerHTML+=o,document.querySelector("cta > cta_buttons > input").focus(),buttonsInDOM=document.querySelectorAll("cta > cta_buttons > input"),new Promise(e=>{for(const t in n)buttonsInDOM[t].addEventListener("click",async o=>{X.overlay.remove(),e(n[t][1])})})},shutdown:async function(){let e=setTimeout(()=>{system.shutdown()},1e4),t=X.cta("Power Off","This 'thing' Will turn off in 10 seconds!",[["Cancel",!1],["Power Off",!0]]);await t&&system.shutdown(),clearTimeout(e)},logout:async function(){let e=setTimeout(()=>{system.logout()},1e4),t=X.cta("Log Out","You will be logged out in 10 seconds!",[["Cancel",!1],["Log Out",!0]]);await t&&system.logout(),clearTimeout(e)},restart:async function(){let e=setTimeout(()=>{system.restart()},1e4),t=X.cta("Restart","This 'thing' Will restart in 10 seconds!",[["Cancel",!1],["Restart",!0]]);await t&&system.restart(),clearTimeout(e)},initialize:function(){linux=document.querySelector("body > linux"),desktop=document.querySelector("linux > desktop"),appsLayer=document.querySelector("linux > apps_layer"),appList=document.querySelector("linux > app_list"),systemMenuContainer=document.querySelector("system_menu_container"),systemExitAnimationMenuContainer=document.querySelector("system_exit_animation_menu_container"),overlayContainer=document.querySelector("body > overlay_container"),Object.entries(X.services).forEach(e=>{let[t,n]=[e[0],e[1]];"function"==typeof n.onStart&&n.onStart()}),X.menus.openMenuClicked=!1,this.openMenu=[],xObjSchema={createOnMousePosition:!1,listenerType:"click",toggleElement:void 0,recreateBehaviour:"toggle",changeBorder:!0,preventDefault:!1,getHTML:"",onCreate:"",closeCondition:"",enterAnimation:"",exitAnimation:"",elementTag:""},Object.entries(X.menus).forEach(e=>{let[t,n]=[e[0],e[1]],o={};Object.assign(o,xObjSchema),Object.assign(o,n),"object"==typeof n&&null!=o.toggleElement&&"function"==typeof o.getHTML&&o.toggleElement.addEventListener(o.listenerType,e=>{X.openMenus.includes(t)&&"recreate"!=o.recreateBehaviour||(X.clearOpenMenus(!0),o.preventDefault&&e.preventDefault(),setTimeout(()=>{X.createMenu(o,e.clientX,e.clientY),systemMenuContainer.children[systemMenuContainer.children.length-1].addEventListener("click",e=>{("function"==typeof o.closeCondition&&!o.closeCondition(e)||"function"!=typeof o.closeCondition)&&0==X.menus.openMenuClicked&&(X.menus.openMenuClicked=!0)}),o.changeBorder&&(o.toggleElement.style.borderBottom="solid gray 2px"),X.openMenus.push(t),"function"==typeof o.onCreate&&o.onCreate(e)},1))})}),document.body.addEventListener("click",()=>{if(X.menus.openMenuClicked)return X.menus.openMenuClicked=!1,!1;X.clearOpenMenus()}),console.log("X Initialize"),X.lockScreen.lock()},clearOpenMenus:function(e=!1){(0!=X.openMenus.length||e)&&(X.openMenus.forEach(e=>{if(X.menus[e].toggleElement.style.borderBottom="",X.menus[e].elementTag&&X.menus[e].exitAnimation){let t=document.querySelector(X.menus[e].elementTag);systemExitAnimationMenuContainer.insertAdjacentElement("afterbegin",t),t.classList.add(X.menus[e].exitAnimation),X.menus[e].enterAnimation&&t.classList.remove(X.menus[e].enterAnimation),setTimeout(()=>{t.remove()},X.menus[e].exitAnimationTime||200)}}),X.openMenus=[],systemMenuContainer.innerHTML="")},createMenu:function(e,t,n){let o;if(o=e.createOnMousePosition?e.getHTML(t,n):e.getHTML(),systemMenuContainer.innerHTML+=o,""!=e.elementTag&&""!=e.enterAnimation){systemMenuContainer.querySelector(e.elementTag).classList.add(e.enterAnimation)}}};