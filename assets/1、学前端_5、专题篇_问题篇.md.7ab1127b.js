import{_ as s,o as e,c as a,S as o}from"./chunks/framework.b12503b9.js";const h=JSON.parse('{"title":"我用「拓展运算符」把项目搞崩了","description":"","frontmatter":{},"headers":[],"relativePath":"1、学前端/5、专题篇/问题篇.md","filePath":"1、学前端/5、专题篇/问题篇.md"}'),p={name:"1、学前端/5、专题篇/问题篇.md"},n=o(`<h1 id="我用「拓展运算符」把项目搞崩了" tabindex="-1">我用「拓展运算符」把项目搞崩了 <a class="header-anchor" href="#我用「拓展运算符」把项目搞崩了" aria-label="Permalink to &quot;我用「拓展运算符」把项目搞崩了&quot;">​</a></h1><blockquote><p>前几天遇到一个很有意思的事情，一段在线上**「稳定运行一年多」**的代码把项目搞崩了。</p></blockquote><p>一个清风徐徐的晚上，月亮在飘渺的乌云中忽明忽暗，带着一种神秘的色彩，我在阳台吹着晚风刷着掘金。</p><p>突然一个**「加急信息」**突如其来：快修<code>Bug！</code></p><p><strong>「老大」</strong>：小卢，出大问题，你这段代码有问题，用户的软件崩溃了！！！</p><p><strong>「我」</strong>：不可能！绝对不可能！这代码在线上都一年了，要有问题早就出问题了。</p><p>排查之后居然发现这段代码的提交人是我，我赶紧打开电脑想看看我一年前又写了什么弱智代码。</p><h2 id="定位问题" tabindex="-1">定位问题 <a class="header-anchor" href="#定位问题" aria-label="Permalink to &quot;定位问题&quot;">​</a></h2><p>删去所有业务代码并精简代码后，最后出问题的代码大概是这样的。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> items</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">[]</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> newItems</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">getItemsById</span><span style="color:#A6ACCD;">(id)｜｜[]</span></span>
<span class="line"><span style="color:#A6ACCD;">items</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">newItems)</span></span></code></pre></div><p><code>getItemsById</code>是根据<code>id</code>获取一个数组，在业务的特殊性上这里需要对一个数组合并另一个数组，有很多种数组合并的方法，当时选择了<code>push</code>。</p><p>乍一看，没问题啊，我本地也验证了好几次，根本不会引起报错啊，更别说导致软件崩溃了。</p><p>而且这样的写法其实也挺常见呀，更何况这一年来它根本**「没有出过任何问题」**，怎么可能是这里出错呢？</p><p>难道这段代码随着**「时间」**会有什么变化？</p><p>**「时间。。。？？？」**难道说随着用户用软件的时间增长，用户的数据增长了一定程度，这个数组的长度达到了一定极值之后爆栈了？</p><p>于是，我赶紧模拟了用户数据巨大的情况下该代码的运行。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> items</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">[]</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> newItems</span><span style="color:#89DDFF;">=new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Array</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1000000</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">items</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">newItems)</span></span></code></pre></div><p><strong>「果然爆栈了！然后导致软件崩溃了！！」</strong></p><p><img src="https://mmbiz.qpic.cn/mmbiz_png/MtIub1ta1ib78ib0RiabY7W3tgicLaXpN0ibjQiaP5dQC2kIL8Vau930vsgXH387wIsHADk3nuiaiblb5eLdXCTcMTBSTw/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><h2 id="探究原因" tabindex="-1">探究原因 <a class="header-anchor" href="#探究原因" aria-label="Permalink to &quot;探究原因&quot;">​</a></h2><p>但是，为什么啊，为什么数组过长就会导致爆栈？是这个<code>push</code>的原因吗，还是因为<code>拓展运算符</code>？赶紧把这段<code>ES6</code>代码<code>Babel</code>（网址：<a href="https://babeljs.io" target="_blank" rel="noreferrer">https://babeljs.io</a>）在线转换一下。</p><img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212222046139.png" alt="image-20221222204643095" style="zoom:80%;"><p>我们可以看到最后这段<code>push</code>拓展运算符数组的操作会变成<code>push.apply(items, newItems)</code>。</p><p>在查阅了<code>MDN</code>后终于知道了原因，如果按上面方式调用<code>apply</code>，有超出<code>JavaScript</code>引擎参数长度上限的风险。一个方法传入过多参数（比如一万个）时的后果在不同<code>JavaScript</code>引擎中表现不同。</p><img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212222046680.png" alt="image-20221222204653615" style="zoom:67%;"><p>好家伙原来是因为这样，我做梦也没想到一个小小的<code>拓展运算符</code>与<code>push</code>搭配时还会有这样的副作用，那么是不是在所有函数中如果使用拓展运算符传入参数超出一定数量就会如此呢？</p><p>答案是：<strong>「是的」</strong>，如下图我随便写了个函数，使用**「拓展运算符传参」**，我们会发现它会自动转成使用<code>apply</code>方法，而在<code>apply</code>方法参数过多的时候就会引起爆栈，学到了学到了。</p><p>关于<code>apply</code>方法的介绍，详见：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply</a></p><p><img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212222047366.png" alt="image-20221222204716312"></p><h2 id="合理解决" tabindex="-1">合理解决 <a class="header-anchor" href="#合理解决" aria-label="Permalink to &quot;合理解决&quot;">​</a></h2><p>其实合并数组有好几种方法，我们可以选择适合的方法去使用。</p><p>第一种：使用<code>concat</code>合并。</p><img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212222047397.png" alt="image-20221222204729320" style="zoom:50%;"><p>第二种：使用<code>拓展运算符</code>合并。</p><img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212222047608.png" alt="image-20221222204744528" style="zoom:50%;"><p>第三种：循环<code>push</code>。</p><img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212222048503.png" alt="image-20221222204816314" style="zoom:50%;"><p>第四种：<code>拓展运算符</code>+<code>push</code>。</p><img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202212222048316.png" alt="image-20221222204853240" style="zoom:50%;"><blockquote><p>「第二种」应该是大家最常用的并且是最简便的，「第四种」虽然数据量少的时候不会引起问题，但是还是少用吧哈哈，万一以后用户数据多起来了就会跟我一样收到一条**「加急信息」**了。</p></blockquote>`,40),c=[n];function t(l,r,i,d,m,g){return e(),a("div",null,c)}const u=s(p,[["render",t]]);export{h as __pageData,u as default};
