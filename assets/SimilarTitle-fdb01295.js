import{j as t,L as x}from"./index-9063daab.js";function m({name:l,id:s,title:i,poster_path:a,isShow:r,vote_average:e}){return t.jsx(t.Fragment,{children:t.jsxs(x,{to:r?`/tvshows/${s}`:`/movies/${s}`,className:"mx-auto h-60 w-32 flex-shrink-0",children:[t.jsx("img",{src:`https://image.tmdb.org/t/p/original/${a}`,alt:"poster",className:"h-44 w-full rounded-xl"}),t.jsxs("div",{className:"mt-1 flex h-12 w-full flex-col items-start justify-start",children:[t.jsx("p",{className:"h-6 w-full overflow-x-hidden whitespace-nowrap text-left text-sm font-bold text-white",children:l||i}),t.jsxs("h4",{className:"h-6 w-full text-left text-xs font-semibold text-gray-400",children:["Rating: ",e?`${e.toFixed(1)}⭐`:"NA"]})]})]})})}export{m as default};
