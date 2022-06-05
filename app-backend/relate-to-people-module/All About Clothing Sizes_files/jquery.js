!function(t){function e(e){for(var n=i(e),o=[],a=0,l=0,r=n.length;r>a;a++)for(l=0;r>l;l++)a!==l&&_(n[a],n[l])&&o.push(e[l])
return t.unique(o)}function n(t,e){for(var n=i(t),o=i(e),a=0,l=0,r=n.length,d=o.length;r>a;a++)for(l=0;d>l;l++)if(t[a]!==e[l]&&_(n[a],o[l]))return!0
return!1}function i(e){for(var n,i,_=[],o=0;i=e[o++];)n=t(i).offset(),_.push([n.top,n.left,i.offsetWidth,i.offsetHeight])
return _}function _(t,e){var n=t[1],i=t[0],_=t[2],o=t[3],a=e[1],l=e[0],r=e[2],d=e[3]
return!(i>l+d||l>i+o||n>a+r||a>n+_)}t.fn.overlaps=function(i){return 0===arguments.length?this.pushStack(e(this)):n(this,t(i))},t.expr[":"].overlaps=function(t,e,i,_){return n([t],_)},t.expr[":"].overlapping=t.expr[":"].overlaps}(jQuery)
