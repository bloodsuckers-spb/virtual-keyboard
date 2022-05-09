(()=>{"use strict";function t(t,e="",n=""){let o=null;try{o=document.createElement(t)}catch(t){throw new Error("Unable to create new DOM node")}return o.classList.add(...e.split(" ")),o.textContent=n,o}class e{constructor(e,n){this.key=t("div","key"),this.keyboard=n,Object.assign(this.key,e),this.key.isFnKey=Boolean("functional"===this.key.type)}generateKey(){const e=this.key;let n=e.code;n=n.toLowerCase(),e.classList.add(`key-${n}`);const o=t("span","top"),r=t("span","bottom");return e.append(o,r),o.textContent=this.key.content[this.keyboard.lang],this.key.content[this.keyboard.lang]!==this.key.altContent[this.keyboard.lang]&&(this.key.isAltContent=!0,r.textContent=this.key.altContent[this.keyboard.lang]),this.key=e,this}bindEvent(){const t=t=>!(this.keyboard.state.isLeftShift&&this.keyboard.state.isRightShift&&!this.key.code.match(/Shift/)||(this.key.isFnKey?(this.keyboard.defineBtnFunctionality(t,this.key),this.key.code.match(/shift|ControlLeft|AltLeft/gi)&&this.key.classList.toggle("active")):this.keyboard.print(this.key),0));return this.key.onclick=e=>{t(e)},this}}const n=function(t,e=null){return JSON.parse(window.localStorage.getItem(t)||e)}("kbLang",'"ru"');new class{constructor(t,e="ru"){this.state={isCaps:!1,isLeftShift:!1,isRightShift:!1,isAlt:!1,isCtrlLeft:!1},this.lang=e,this.data=t,this.keys=[],this.keyboardRows=5,this.title="",this.desk="",this.output="",this.layout="",this.keyboard=""}set rows(t){this.keyboardRows=t}get rows(){return this.keyboardRows}generateOutput(){const e=t("textarea","output");return Object.assign(e,{placeholder:"Hello! Thanx for for checking my work! All the best to you!",autofocus:!0,cols:"40",rows:"6"}),this.output=e,this}generateKeys(){for(this.keys=[];this.keys.length<this.keyboardRows;)this.keys.push([]);return this.data.forEach((t=>{const n=new e(t,this).generateKey().bindEvent().key;this.keys[t.row-1].push(n)})),this}generateLayout(){const e=t("div","keys-wrapper"),n=t("h1","title","Virtual Keyboard"),o=t("p","desk","Created in Windows. Press Ctrl+Alt to switch language.");for(let n=0;n<this.keyboardRows;n+=1){const o=t("div","keyboard-row");o.append(...this.keys[n]),e.append(o)}return this.keys=this.keys.flat(),this.title=n,this.desk=o,this.layout=e,this}generateKeyboard(e="keyboard"){const n=t("div",e);return n.append(this.title,this.desk,this.output,this.layout),this.keyboard=n,this}handleEvent(){return document.addEventListener("keydown",(t=>{t.preventDefault();const e=this.keys.find((e=>e.code===t.code));e&&(e.classList.add("key-pressed"),e.isFnKey?this.defineBtnFunctionality(t,e):this.print(e))})),document.addEventListener("keyup",(t=>{t.preventDefault();const e=this.keys.find((e=>e.code===t.code));e&&(e.classList.remove("key-pressed"),t.code.match(/Shift/)&&(this.state.isCaps=!this.state.isCaps,this.shiftPress()))})),this}defineBtnFunctionality(t,e){if(!e.code.match(/space|enter/gi)&&t.repeat)return!1;switch(e.code.match(/caps/gi)&&e.classList.toggle("active"),e.code){case"CapsLock":this.state.isCaps=!this.state.isCaps,this.switchCase();break;case"ShiftLeft":if(this.state.isLeftShift=!this.state.isLeftShift,this.state.isRightShift)return!1;this.state.isCaps=!this.state.isCaps,this.shiftPress();break;case"ShiftRight":if(this.state.isRightShift=!this.state.isRightShift,this.state.isLeftShift)return!1;this.state.isCaps=!this.state.isCaps,this.shiftPress();break;case"ControlLeft":this.state.isCtrlLeft=!0,this.state.isAlt&&this.switchLanguage();break;case"AltLeft":this.state.isAlt=!0,this.state.isCtrlLeft&&this.switchLanguage();break;case"AltRight":case"MetaLeft":case"ControlRight":break;default:this.print(e)}return this}switchCase(){const t=this.keys.filter((t=>"letter"===t.type));for(let e=0;e<t.length;e+=1){const n=t[e];this.state.isCaps?(n.content[this.lang]=n.content[this.lang].toUpperCase(),n.firstChild.textContent=n.content[this.lang]):(n.content[this.lang]=n.content[this.lang].toLowerCase(),n.firstChild.textContent=n.content[this.lang])}}shiftPress(){const t=this.keys.filter((t=>t.isAltContent));for(let e=0;e<t.length;e+=1){const n=t[e].firstChild.textContent;t[e].firstChild.textContent=t[e].lastChild.textContent,t[e].lastChild.textContent=n}this.switchCase()}switchLanguage(){var t;this.state.isCtrlLeft=!1,this.state.isAlt=!1,this.lang="ru"===this.lang?"en":"ru",t=this.lang,window.localStorage.setItem("kbLang",JSON.stringify(t));const e=this.keys.filter((t=>!t.isFnKey));for(let t=0;t<e.length;t+=1)e[t].firstChild.textContent=e[t].content[this.lang],e[t].isAltContent&&(e[t].lastChild.textContent=e[t].altContent[this.lang]);return this.switchCase(),this}print(t){let e="";this.output.focus();const n=this.output.selectionStart,o=this.output.selectionEnd,r=this.output.value.slice(0,n),i=this.output.value.slice(o,this.output.value.length);switch(t.code){case"Backspace":n===o?(e=r.slice(0,-1)+i,this.output.value=e,this.output.setSelectionRange(r.length-1,r.length-1)):(e=r+i,this.output.value=e,this.output.setSelectionRange(r.length,r.length));break;case"Delete":n===o?(e=r+i.slice(1),this.output.value=e,this.output.setSelectionRange(r.length,r.length)):(e=r+i,this.output.value=e,this.output.setSelectionRange(r.length,r.length));break;case"Tab":this.output.value=`${r}\t${i}`;break;case"Enter":this.output.value=`${r}\n${i}`;break;default:this.output.value=r+t.firstChild.textContent+i,this.output.setSelectionRange(n,o),this.output.selectionStart=n+1}return this}render(){return document.body.append(this.keyboard),this}}([{type:"other",content:{ru:"ё",en:"`"},altContent:{ru:"ё",en:"~"},code:"Backquote",width:"normal",row:1},{type:"digits",content:{ru:"1",en:"1"},altContent:{ru:"!",en:"!"},code:"Digit1",width:"normal",row:1},{type:"digits",content:{ru:"2",en:"2"},altContent:{ru:'"',en:"@"},code:"Digit2",width:"normal",row:1},{type:"digits",content:{ru:"3",en:"3"},altContent:{ru:"№",en:"#"},code:"Digit3",width:"normal",row:1},{type:"digits",content:{ru:"4",en:"4"},altContent:{ru:";",en:"$"},code:"Digit4",width:"normal",row:1},{type:"digits",content:{ru:"5",en:"5"},altContent:{ru:"%",en:"%"},code:"Digit5",width:"normal",row:1},{type:"digits",content:{ru:"6",en:"6"},altContent:{ru:":",en:"^"},code:"Digit6",width:"normal",row:1},{type:"digits",content:{ru:"7",en:"7"},altContent:{ru:"?",en:"&"},code:"Digit7",width:"normal",row:1},{type:"digits",content:{ru:"8",en:"8"},altContent:{ru:"*",en:"*"},code:"Digit8",width:"normal",row:1},{type:"digits",content:{ru:"9",en:"9"},altContent:{ru:"(",en:"("},code:"Digit9",width:"normal",row:1},{type:"digits",content:{ru:"0",en:"0"},altContent:{ru:")",en:")"},code:"Digit0",width:"normal",row:1},{type:"other",content:{ru:"-",en:"-"},altContent:{ru:"_",en:"_"},code:"Minus",width:"normal",row:1},{type:"other",content:{ru:"=",en:"="},altContent:{ru:"+",en:"+"},code:"Equal",width:"normal",row:1},{type:"functional",content:{ru:"Backspace",en:"Backspace"},altContent:{ru:"Backspace",en:"Backspace"},code:"Backspace",width:"wide",row:1},{type:"functional",content:{ru:"Tab",en:"Tab"},altContent:{ru:"Tab",en:"Tab"},code:"Tab",width:"medium",row:2},{type:"letter",content:{ru:"й",en:"q"},altContent:{ru:"й",en:"q"},code:"KeyQ",width:"normal",row:2},{type:"letter",content:{ru:"ц",en:"w"},altContent:{ru:"ц",en:"w"},code:"KeyW",width:"normal",row:2},{type:"letter",content:{ru:"у",en:"e"},altContent:{ru:"у",en:"e"},code:"KeyE",width:"normal",row:2},{type:"letter",content:{ru:"к",en:"r"},altContent:{ru:"к",en:"r"},code:"KeyR",width:"normal",row:2},{type:"letter",content:{ru:"е",en:"t"},altContent:{ru:"е",en:"t"},code:"KeyT",width:"normal",row:2},{type:"letter",content:{ru:"н",en:"y"},altContent:{ru:"н",en:"y"},code:"KeyY",width:"normal",row:2},{type:"letter",content:{ru:"г",en:"u"},altContent:{ru:"г",en:"u"},code:"KeyU",width:"normal",row:2},{type:"letter",content:{ru:"ш",en:"i"},altContent:{ru:"ш",en:"i"},code:"KeyI",width:"normal",row:2},{type:"letter",content:{ru:"щ",en:"o"},altContent:{ru:"щ",en:"o"},code:"KeyO",width:"normal",row:2},{type:"letter",content:{ru:"з",en:"p"},altContent:{ru:"з",en:"p"},code:"KeyP",width:"normal",row:2},{type:"other",content:{ru:"х",en:"["},altContent:{ru:"х",en:"{"},code:"BracketLeft",width:"normal",row:2},{type:"other",content:{ru:"ъ",en:"]"},altContent:{ru:"ъ",en:"}"},code:"BracketRight",width:"normal",row:2},{type:"other",content:{ru:"\\",en:"\\"},altContent:{ru:"/",en:"|"},code:"Backslash",width:"normal",row:2},{type:"functional",content:{ru:"DEL",en:"DEL"},altContent:{ru:"DEL",en:"DEL"},code:"Delete",width:"medium",row:2},{type:"functional",content:{ru:"Caps Lock",en:"Caps Lock"},altContent:{ru:"Caps Lock",en:"Caps Lock"},code:"CapsLock",width:"wide",row:3},{type:"letter",content:{ru:"ф",en:"a"},altContent:{ru:"ф",en:"a"},code:"KeyA",width:"normal",row:3},{type:"letter",content:{ru:"ы",en:"s"},altContent:{ru:"ы",en:"s"},code:"KeyS",width:"normal",row:3},{type:"letter",content:{ru:"в",en:"d"},altContent:{ru:"в",en:"d"},code:"KeyD",width:"normal",row:3},{type:"letter",content:{ru:"а",en:"f"},altContent:{ru:"а",en:"f"},code:"KeyF",width:"normal",row:3},{type:"letter",content:{ru:"п",en:"g"},altContent:{ru:"п",en:"g"},code:"KeyG",width:"normal",row:3},{type:"letter",content:{ru:"р",en:"h"},altContent:{ru:"р",en:"h"},code:"KeyH",width:"normal",row:3},{type:"letter",content:{ru:"о",en:"j"},altContent:{ru:"о",en:"j"},code:"KeyJ",width:"normal",row:3},{type:"letter",content:{ru:"л",en:"k"},altContent:{ru:"л",en:"k"},code:"KeyK",width:"normal",row:3},{type:"letter",content:{ru:"д",en:"l"},altContent:{ru:"д",en:"l"},code:"KeyL",width:"normal",row:3},{type:"letter",content:{ru:"ж",en:";"},altContent:{ru:"ж",en:":"},code:"Semicolon",width:"normal",row:3},{type:"letter",content:{ru:"э",en:"'"},altContent:{ru:"э",en:'"'},code:"Quote",width:"normal",row:3},{type:"functional",content:{ru:"ENTER",en:"ENTER"},altContent:{ru:"ENTER",en:"ENTER"},code:"Enter",width:"wideplus",row:3},{type:"functional",content:{ru:"Shift",en:"Shift"},altContent:{ru:"Shift",en:"Shift"},code:"ShiftLeft",width:"wideplus",row:4},{type:"letter",content:{ru:"я",en:"z"},altContent:{ru:"я",en:"z"},code:"KeyZ",width:"normal",row:4},{type:"letter",content:{ru:"ч",en:"x"},altContent:{ru:"ч",en:"x"},code:"KeyX",width:"normal",row:4},{type:"letter",content:{ru:"с",en:"c"},altContent:{ru:"с",en:"c"},code:"KeyC",width:"normal",row:4},{type:"letter",content:{ru:"м",en:"v"},altContent:{ru:"м",en:"v"},code:"KeyV",width:"normal",row:4},{type:"letter",content:{ru:"и",en:"b"},altContent:{ru:"и",en:"b"},code:"KeyB",width:"normal",row:4},{type:"letter",content:{ru:"т",en:"n"},altContent:{ru:"т",en:"n"},code:"KeyN",width:"normal",row:4},{type:"letter",content:{ru:"ь",en:"m"},altContent:{ru:"ь",en:"m"},code:"KeyM",width:"normal",row:4},{type:"letter",content:{ru:"б",en:","},altContent:{ru:"б",en:"<"},code:"Comma",width:"normal",row:4},{type:"letter",content:{ru:"ю",en:"."},altContent:{ru:"ю",en:">"},code:"Period",width:"normal",row:4},{type:"other",content:{ru:".",en:"/"},altContent:{ru:",",en:"?"},code:"Slash",width:"normal",row:4},{type:"functional",content:{ru:"▲",en:"▲"},altContent:{ru:"▲",en:"▲"},code:"ArrowUp",width:"normal",row:4},{type:"functional",content:{ru:"Shift",en:"Shift"},altContent:{ru:"Shift",en:"Shift"},code:"ShiftRight",width:"normal",row:4},{type:"functional",content:{ru:"Ctrl",en:"Ctrl"},altContent:{ru:"Ctrl",en:"Ctrl"},code:"ControlLeft",width:"medium",row:5},{type:"functional",content:{ru:"Meta",en:"Meta"},altContent:{ru:"Meta",en:"Meta"},code:"MetaLeft",width:"normal",row:5},{type:"functional",content:{ru:"Alt",en:"Alt"},altContent:{ru:"Alt",en:"Alt"},code:"AltLeft",width:"normal",row:5},{type:"functional",content:{ru:" ",en:" "},altContent:{ru:" ",en:" "},code:"Space",width:"overwide",row:5},{type:"functional",content:{ru:"Alt",en:"Alt"},altContent:{ru:"Alt",en:"Alt"},code:"AltRight",width:"normal",row:5},{type:"functional",content:{ru:"◄",en:"◄"},altContent:{ru:"◄",en:"◄"},code:"ArrowLeft",width:"normal",row:5},{type:"functional",content:{ru:"▼",en:"▼"},altContent:{ru:"▼",en:"▼"},code:"ArrowDown",width:"normal",row:5},{type:"functional",content:{ru:"►",en:"►"},altContent:{ru:"►",en:"►"},code:"ArrowRight",width:"normal",row:5},{type:"functional",content:{ru:"Ctrl",en:"Ctrl"},altContent:{ru:"Ctrl",en:"Ctrl"},code:"ControlRight",width:"medium",row:5}],n).generateOutput().generateKeys().generateLayout().generateKeyboard().handleEvent().render()})();
//# sourceMappingURL=index.js.map