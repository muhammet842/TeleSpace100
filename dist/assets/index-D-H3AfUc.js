(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const u=[{number:100,title:"TELESPACE 100",color:"green",lines:["NEW TAB SYSTEM READY","","ENTER PAGE NUMBER","100  MAIN MENU","200  SPACE WEATHER","300  NASA APOD","","TELESPACE 100 / 1984-2026"]},{number:200,title:"SPACE WEATHER",color:"yellow",lines:["COMING SOON: LIVE SPACE","AND SKY INFORMATION"]},{number:300,title:"NASA APOD",color:"blue",lines:["COMING SOON: NASA'S","ASTRONOMY PICTURE OF THE DAY"]}];function f(t){return u.find(e=>e.number===t)??u[0]}const E="https://services.swpc.noaa.gov/json/planetary_k_index_1m.json";function N(t){return t<4?{text:"QUIET / NORMAL",color:"green"}:t===4?{text:"UNSETTLED",color:"yellow"}:{text:"GEOMAGNETIC STORM WARNING",color:"red"}}async function T(){const t=await fetch(E);if(!t.ok)throw new Error(`NOAA request failed: ${t.status}`);const e=await t.json(),n=e[e.length-1],o=Number(n==null?void 0:n.kp_index);if(!(n!=null&&n.time_tag)||!Number.isFinite(o))throw new Error("NOAA returned incomplete data");return{timeTag:n.time_tag,kpIndex:o,status:N(o)}}function m(t,e){let n="";const o=document.createElement("span");o.className="page-input",o.setAttribute("aria-live","polite"),t.append(o);function r(){o.textContent=n?`P${n}..`:"P..."}function s(i){/^\d$/.test(i.key)&&(i.preventDefault(),n+=i.key,n.length>3&&(n=n.slice(-3)),r(),n.length===3&&(e(Number(n)),n="",window.setTimeout(r,250)))}return t.addEventListener("keydown",s),r(),()=>t.removeEventListener("keydown",s)}const O="https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";async function S(){try{const t=await fetch(O);if(!t.ok)throw new Error(`NASA request failed: ${t.status}`);const e=await t.json();if(!e.title||!e.date||!e.explanation)throw new Error("NASA returned incomplete APOD data");return{title:e.title,date:e.date,explanation:e.explanation}}catch(t){return console.error("Error fetching APOD data:",t),null}}const d=document.querySelector("#teletext-screen");if(!d)throw new Error("Teletext screen could not be found.");const a=d;a.innerHTML='<div class="screen-content"></div>';const A=a.querySelector(".screen-content");if(!A)throw new Error("Teletext content could not be created.");const h=A;let l=100;function y(t){const e=new Date(t);return Number.isNaN(e.getTime())?t:`${e.toLocaleDateString("en-GB")} ${e.toLocaleTimeString("en-GB",{timeZone:"UTC"})} UTC`}function c(t,e,n,o){a.className=`page-${t.color}`,h.innerHTML=`
      <header class="screen-header">
        <span>TELESPACE 100</span>
        <span class="page-number">P${t.number}</span>
      </header>
      <section aria-live="polite">
        <h1 class="screen-title">${t.title}</h1>

        ${e?`
          <p class="screen-line">LATEST NOAA READING</p>
          <p class="screen-line">KP INDEX: ${e.kpIndex.toFixed(1)}</p>
          <p class="screen-line">MEASURED: ${y(e.timeTag)}</p>
          <p class="screen-line status-${e.status.color}">${e.status.text}</p>
        `:n?`
          <p class="screen-line">TITLE: ${n.title}</p>
          <p class="screen-line">DATE: ${n.date}</p>
          <p class="screen-line apod-text">${n.explanation}</p>
        `:o?`<p class="screen-line">${o}</p>`:t.lines.map(r=>`<p class="screen-line">${r||"&nbsp;"}</p>`).join("")}
      </section>
      <footer class="screen-footer">
        <span>WAITING FOR INPUT...</span>
      </footer>
  `}async function p(t){l=t;const e=f(t);if(e.number===200){c(e,void 0,void 0,"P200 - LOADING NOAA DATA...");try{const n=await T();l===t&&c(e,n)}catch{l===t&&c(e,void 0,void 0,"DATA IS NOT AVAILABLE")}return}if(e.number===300){c(e,void 0,void 0,"P300 - LOADING NASA APOD DATA...");const n=await S();if(l!==t)return;n?c(e,void 0,n):c(e,void 0,void 0,"DATA IS NOT AVAILABLE");return}c(e)}p(100);m(a,t=>void p(t));a.focus();
