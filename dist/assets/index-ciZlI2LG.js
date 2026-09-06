(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const l=[{number:100,title:"TELESPACE 100",color:"green",lines:["YENI SEKME SISTEMI HAZIR","","BIR SAYFA NUMARASI GIRIN","100  ANA SAYFA","200  UZAY HABERLERI","300  HAVA DURUMU","","TELESPACE 100 / 1984-2026"]},{number:200,title:"UZAY HABERLERI",color:"yellow",lines:["YAKINDA: GERCEK ZAMANLI","UZAY VE GOKYUZU BILGILERI"]},{number:300,title:"HAVA DURUMU",color:"blue",lines:["YAKINDA: BUGUNUN","YEREL HAVA DURUMU"]}];function a(n){return l.find(o=>o.number===n)??l[0]}function p(n,o){let r="";const s=document.createElement("span");s.className="page-input",s.setAttribute("aria-live","polite"),n.append(s);function e(){s.textContent=r?`P${r}..`:"P..."}function t(c){/^\d$/.test(c.key)&&(c.preventDefault(),r+=c.key,r.length>3&&(r=r.slice(-3)),e(),r.length===3&&(o(Number(r)),r="",window.setTimeout(e,250)))}return n.addEventListener("keydown",t),e(),()=>n.removeEventListener("keydown",t)}const u=document.querySelector("#teletext-screen");if(!u)throw new Error("Teletext screen could not be found.");const i=u;i.innerHTML='<div class="screen-content"></div>';const d=i.querySelector(".screen-content");if(!d)throw new Error("Teletext content could not be created.");const A=d;function f(n){i.className=`page-${n.color}`,A.innerHTML=`
      <header class="screen-header">
        <span>TELESPACE 100</span>
        <span class="page-number">P${n.number}</span>
      </header>
      <section aria-live="polite">
        <h1 class="screen-title">${n.title}</h1>
        ${n.lines.map(o=>`<p class="screen-line">${o||"&nbsp;"}</p>`).join("")}
      </section>
      <footer class="screen-footer">
        <span>GIRIS BEKLENIYOR</span>
      </footer>
  `}f(a(100));p(i,n=>f(a(n)));i.focus();
