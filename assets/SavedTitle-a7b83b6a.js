import{u as v,a as d,d as J,j as e,y as G,z as N,e as k}from"./index-9063daab.js";const P="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEgElEQVR4nO2bXYhVVRSAl9VEVFJDBIWlpZVFRA/9avZiUhDE1FORc3t0JMZ+TBHHqB57FpoatSDMgh76s3rINOzPajAfkjQmjCTRpzJ1jHT0i6Xr0GI393juPT/3nNP94MBwZq2919r37L3X3nttkS5duuQJcA5wJ7AUGAG2AGPAAeCQPQfs3WaTeRq4Q3WligAXAguBjcAR2ucw8AHwqJYpZQe4BngZGCd7tCGHgVlSNoArgTeBiSbG7wbWAAPAPeoE0Av02NNr7/R/i4G1wE9NytI63gCuKIPj5wKrmvzi3wPPaOOkKH86sAzY0eSLGNIGzNarhAAzgK8Do05av1+QQ33zgLcn+cpGtetlXV8swEPAn4Eh3wG3S87YjKJOew4CD+Zd9ymsj/pf4S9gEDhLCkLrApZY3X5sGMi74pVBy/8I3JRrpfH23GwDrGdlXpUNBBVtAy7JpbLW7NIZZGtg25I8+vyEq0CDk/OkJKgtZpPvDn1ZFT4rGPC2lsn5YEr+NBgYr86i0NGgz18sJUVtMxsjvk0VJwDPusKOdnLAS4raaLamGxQ5HYX5CO9xqQhqa7Cgaj1sBt4KPqXC5vmM4oRvnP3rWy3gWjfqnywiwssa4DbghJsVZraiPOJa732pKMC7zo+XkipNDfr+PKkotm7wq8cLkij1O6UdUnFskRbxSBKFD53Ccqk4tr8Y8d6ZhHuCPbwZUnGAaTaQYxFt841WYI5zfkxqArDL+XVrnOBSJ/ia1ATgFefXk3GCa5zgoNQEYJHzazhO8DMneJ/UBGC+82tTnOCYE5wtNQG4yvm1O05wvxO8LGUs3gBWZPg02l2P2DI5Yl+c4GEnODVFAzxGPjRSnE9GHCqiARo5NUB/3g2w3wlenrILaEj9YoZPfxFdYMwJ3iD/w0FwixO8X2qCHbpGfJJ0H+ApqQnBmcZw0pXTeqkJQYT7RNINhL1SE4Jcg1taWQ5fJxXHkjdwy+Gzz6Sw0Sk8JxXHEiwi3kmisNAp7JKKA2x3/jycNMNr3CndKxUFuNv5oVHu+UkVh53iZqkowEfOj9WtnghPOOX5UjGAu9xe4PGWT4qBDa4BdnYsG6sNdKS3LLWI19udPo64QoakIgQBnfb9ae0WNOQK0s9orpQcDXSAv53dK9IU1mMnwxG/plkm5w1wKfBzkMeUrusCMy3dJOIHTUySkqFTXJC4+UfqFJkITTgKZoUvgIukJFjsssnZp7Y+kOfeejQzdDxhWVP1JknZHSwqUXKvzre5VJbMHr1U8UshiZLB5sJEMDusKjJOsE1O3So/5uxQmxYVZUBfMDBi6WkLCjrl0YHYczDzPp8wXf4r/suXagwwRbJPl/dL9YjRjt0i4d8LE5PdC9Ik5hfS7C4D1wPPB8fb5bgwMUnYvCHmysw+u1KzzLrPjZaH2GvPdHvXZzJa1m+lvzLT5NLUSJCpmRVH7Zy/fJemmmSa6fngxylvkI1bzlIjzVFdR+H0OKFr8+XAq8DnwB7gd5vGjtnfeywTfZ3Jzi1F/+7SRWrNP1zutOlNKGwEAAAAAElFTkSuQmCC";function b({title:s,id:n,poster_path:r,release_date:o,type:l,vote_average:A}){var w;const i=v(),g=d.currentUser?(w=d.currentUser)==null?void 0:w.uid:"",u=J(k,"saved",g);function f(t,a){i(t==="tv"?`/tvshows/${a}`:`/movies/${a}`)}async function m(t,{title:a,id:x,poster_path:c,release_date:p,type:h,vote_average:j}){t.preventDefault(),t.stopPropagation(),await G(u,{savedtitles:N({id:x,poster_path:c,release_date:p,title:a,type:h,vote_average:j})})}return e.jsx(e.Fragment,{children:e.jsxs("div",{onClick:()=>f(l,n),className:"relative mx-auto h-auto w-44",children:[e.jsx("img",{src:`https://image.tmdb.org/t/p/w300${r}`,alt:"image-cover",className:"mb-2 h-60 w-full rounded-md bg-gray-400"}),e.jsx("button",{onClick:t=>m(t,{title:s,id:n,poster_path:r,release_date:o,type:l,vote_average:A}),className:"absolute right-0 top-0 rounded-none rounded-bl-xl rounded-tr-sm border-none bg-neutral-800 p-1.5 outline-none",children:e.jsx("img",{src:P,alt:"",className:"h-5 w-5"})}),e.jsxs("div",{className:"flex h-auto w-full flex-col items-start justify-center px-2",children:[e.jsx("p",{className:"h-auto w-full overflow-x-hidden whitespace-nowrap py-1 text-left text-base font-bold text-teal-400",children:s}),e.jsxs("h4",{className:"h-auto w-full pb-2 text-left text-sm font-semibold text-gray-400",children:["Rating: ",A," ⭐"]}),e.jsx("h4",{className:"h-auto w-full pb-2 text-left text-xs font-semibold text-gray-400",children:o})]})]})})}export{b as default};
