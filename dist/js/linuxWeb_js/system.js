function parseDir(e,t=null,s=null){let n=isDefined(t)?t.currentDirectory:"/";return!isDefined(s)&&isDefined(e)&&(s=e["@"][0]),isDefined(s)&&(s=s.endsWith("/")?s.slice(0,-1):s,n=isTextEmpty(s)?"/":".."==s?n.split("/").slice(0,-1).join("/"):s.startsWith("/")?s:n+(n.endsWith("/")?"":"/")+s),!n.startsWith("/")&&(n="/"+n),n}system={started:!1,user:"root",encPassword:"bf0dbd74174039131b667de9f31b5d8012baaf82011b934b2cc0e3bd53a02a1f",global:{volume:50,brightness:100,doNotDisturb:!1,css:{}},changeBrightness:function(e){this.global.brightness=e,document.querySelector("html").style.filter=`brightness(${system.global.brightness/100})`},changeVolume:function(e){this.global.volume=e,X.services.volume.update()},startup:function(){if(this.started)return!1;this.started=!0,(async()=>{system.build=await(async()=>(await fetch("./build.ver")).text())()})(),X.initialize(),X.services.clock.update.add(document.querySelector("dateTime"),"month>str date time-s"),X.notification.create("","","","","",!1),X.notification.create("Virus Alert","Your computer has a virus","X.cta('JK','No virus here...')","./img/network.svg",!0,!1)},validatePassword:function(e){return sha256(btoa(e))==system.encPassword},cli:{i:function(e=!1,t=!1){if(!e||!t)return!1;let s=null,n=e.trim(),r=!1;n.includes(">")&&([n,r]=n.split(">"),r=parseDir(null,t,r.trim())),argArray=(n+" ").split(" ");let o=argArray.splice(0,1)[0].trim();if(0!=argArray.length&&(1!=argArray.length||0!==argArray[0].trim().length)){s={"@":[],$raw:n};let e="";for(let t of argArray)t=t.trim(),t.startsWith("-")&&t.length>1?(isTextEmpty(e)||(obj=this.appendToOptions(e,"",s),e=""),e=t.startsWith("--")&&t.length>2?"-"+t.replaceAll("-",""):t.replaceAll("-","")):(isTextEmpty(e)?s["@"].push(t):obj=this.appendToOptions(e,t,s),e="");s["@s"]=s["@"].join(" ").trim()}try{const e=null!=system.cli.commands[o]?system.cli.commands[o].method(s,t):o+": command not found";if(!r)return e;fileSystem.write(r,1,e,777)}catch(e){throw`${o}: ${e}`}},getArgValue:function(e){},appendToOptions:function(e,t,s){if(e.startsWith("-"))s["-"+e]=t;else if(!isTextEmpty(e))for(const n of e)s["-"+n]=t;return s},commands:{help:{shortHelp:"Displays help pages for commands",help:"Displays a help page for commands\n                    \n    USAGE\n        help\n        help <command>",method:e=>{let t="";if(null==e)t="-----help-----\n",t+="For more information about a specific command type: help <command>\n\n",t+=Object.entries(system.cli.commands).map(e=>`${e[0].length>15&&e[0].slice(0,12)+"..."||e[0]}    ${e[0].length<8?"    ":""}${e[1].shortHelp??"*No short help available*"}\n`).join("");else{let s=e["@"][0];null==system.cli.commands[s]||null==system.cli.commands[s].help?t=`No help for '${s}' try: help help`:(t=`----- ${s} help-----\n\n`,t+=system.cli.commands[s].help+"\n")}return t}},uname:{shortHelp:"Prints System Information",help:"Prints System Information",method:e=>"linuxWEB"},whoami:{shortHelp:"Prints Username Information",help:"Prints System Information",method:e=>"root"},clear:{shortHelp:"Prints Username Information",help:"Prints System Information",method:(e,t)=>{t.clear()}},echo:{shortHelp:"Echos your message back to you",help:"Echos your message back to you\n\n    USAGE\n        echo <message>\n         ----------------\n        echo Hello Word",method:e=>{if(null!=e){let t=e["@s"];return t=t.trim(),'"'==t[0]&&'"'==t.slice(-1)&&(t=t.slice(1,-1)[0]),t}}},app:{shortHelp:"Starts an app",help:"Starts an app\n\n    USAGE\n        app <app name>\n        ----------------\n        app terminal\n        app notepad",method:e=>{if(null==e)return system.cli.commands.app.help;let t=e["@s"];if(null==apps[t])throw t+": No such app";processes.create(t)}},shutdown:{shortHelp:"Shoots the computer",help:"Makes computer go beep boob RIP.\n\n    USAGE\n        shutdown",method:()=>{system.shutdown()}},restart:{shortHelp:"Restarts",help:"Restarts the computer\n\n    USAGE\n        restart",method:()=>{system.restart()}},logout:{shortHelp:"Logouts",help:"Restarts the computer\n\n    USAGE\n        logout",method:()=>{system.logout()}},lock:{shortHelp:"Locks the screen",help:"Locks the screen\n\n    USAGE\n        lock",method:()=>{X.lockScreen.lock()}},exit:{shortHelp:"Exits the terminal window",help:"Exits the terminal window\n\n    USAGE\n        exit",method:(e,t)=>{processes.remove(t.elementId)}},kill:{shortHelp:"Kills a process by pid",help:"Kills a running process\n\n    USAGE\n        kill <process pid>\n        ----------------\n        kill 1",method:e=>{console.log(e);let t=e["@s"];if(isNaN(Number(t)))throw t+" - Must be a number";if(!isDefined(processes.pid[t]))throw t+" - No such process";processes.remove("pid"+t)}},killall:{shortHelp:"Kills processes",help:"Kills all running processes of a name\n\n    USAGE\n        killall <process name>\n        ----------------\n        killall terminal\n        killall google",method:e=>{let t=e["@s"];if(processList=processes.getRunningInstanceList(t),!isValid(processList)||0==processList)throw t+" - No processes found";for(const e of processList)processes.remove("pid"+e.id)}},remind:{shortHelp:"Create a reminder",help:"Create a reminder\n\n    USAGE\n        remind <message> -t <seconds>\n        ----------------\n        remind Sleep in the shed -t 180,\n        remind Get in the bed -t 3600",method:e=>{const t=e["@s"],s=e["-t"];if(isNaN(Number(s)))throw" -t: must be a number";if(!isValid(t)||0==t.length)throw"message - Cannot be empty";setTimeout(()=>{X.notification.create("Reminder",t,"","",!1,!0)},1e3*s)}},ls:{shortHelp:"List the contents of a directory",help:"List the Contents of the current or provided directory\n\n    USAGE\n        ls <directory>\n        ----------------\n        ls\n        ls /home",method:(e,t)=>{path=parseDir(e,t);let s=!1,n=fileSystem.getDir(path,!1,!0),r=`Contents of '${path}' :\n`;return isDefined(e)&&(s=!!isDefined(e["-l"])),Object.entries(n).forEach(e=>{if("\\0"!=e[0]){if(s){let t=1==fileSystem.getType(e[1])?"-":"d",s=fileSystem.getPermissions(e[1]);r+=`${t} ${s}`}r+=`    ${e[0]}\n`}}),r.slice(0,-1)}},cd:{shortHelp:"Changes Directory",help:"Changes the current directory or display the current directory\n\n    USAGE\n        cd <directory>\n        ----------------\n        cd\n        cd /home",method:(e,t)=>(path=parseDir(e,t),t.setCurrentDirectory(path),path)},cat:{shortHelp:"Displays file content",help:"Displays the contents of a file\n\n    USAGE\n     cat <path/to/file>\n        ----------------\n        cat example.txt\n        cat /home/example.txt",method:(e,t)=>(path=parseDir(e,t),fileSystem.read(path))},mkdir:{shortHelp:"Create a Directory",help:"Create a Directory\n\n    USAGE\n        mkdir <directory> or <path/to/directory>\n        ----------------\n        mkdir project\n        mkdir /var/www",method:(e,t)=>{path=parseDir(e,t),fileSystem.write(path,0,null,777)}},touch:{shortHelp:"Creates a file",help:"Creates a file\n\n    USAGE\n        touch <path/to/file>\n        ----------------\n        touch example.txt\n        touch /home/example.txt",method:(e,t)=>{path=parseDir(e,t),fileSystem.write(path,1,"",777)}},write:{shortHelp:"Writes to a file",help:"Writes to a file\n\n    USAGE\n        write <text> -f <path/to/file>\n        ----------------\n        write Hello -f example.txt\n        write Hi! -f /home/example.txt",method:(e,t)=>{if(null==e||!isDefined(e["-f"]))throw"path must be specified with -f!";dir=e["-f"],text=e["@s"],path=parseDir(e,t,dir),fileSystem.write(path,1,text,755)}},top:{shortHelp:"Lists the active processes",help:"List the active processes\n    USAGE\n        top",method:function(e,t){t.initUpdate(this.update,e)},update:function(e,t,s=null){if(obj=processes.getPidObject()){ret="PID    AppName\n";for(const e of Object.values(obj))ret+=`${e.id}    ${e.appName} \n`;return ret}}},ping:{shortHelp:"Pings a url",help:"Pings a url\n    USAGE\n        ping <url>\n        ping <ip>",method:function(e,t){t.initUpdate(this.update,e,2e3)},update:function(e,t,s=null){if(obj=processes.getPidObject()){ret="PID    AppName\n";for(const e of Object.values(obj))ret+=`${e.id}    ${e.appName} \n`;return ret}}}}},shutdown:()=>page.changePage("./html/shutdown.html"),logout:()=>page.changePage("./html/X.html","(async()=>{await retrieveMainJs(false);system.startup();})();"),restart:()=>page.changePage("./html/shutdown.html","afterShutdown='restart'",!1)};