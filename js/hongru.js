/**
 * Created by Administrator on 2016/12/9.
 */
var Hongru={};
function H$(id){return document.getElementById(id)}
function H$$(c,p){return p.getElementsByTagName(c)}
Hongru.shutter = function(){
    function init(anchor,options){this.anchor=anchor; this.init(options);}
    init.prototype = {
        init:function(options){ //options������id����ѡ����ͼƬ�б���ǩid��auto����ѡ�����Զ�����ʱ�䣻index����ѡ������ʼ�����е�ͼƬ���
            var wp = H$(options.id), // ��ȡͼƬ�б�Ԫ��
                ul = H$$('ul',wp)[0], // ��ȡ
                li = this.li = H$$('li',ul);
            this.a = options.auto?options.auto:4; //�Զ����м��
            this.index = options.position?options.position:0; //��ʼ���е�ͼƬ��ţ���0��ʼ��
            this.l = li.length;
            this.cur = 0; //��ǰ��ʾ��ͼƬ���
            this.N = options.roller?options.roller:1;
            this.W = wp.offsetWidth;
            this.H = wp.offsetHeight;
            this.aw = options.speed?options.speed:5;
            this.mask = [];
            this.convolution = [];
            this.nav = [];
            ul.style.display = 'none';
            var container = this.container = document.createElement('div'),
                con_a = this._a = document.createElement('a');
            con_a.target = '_blank';
            container.style.cssText = con_a.style.cssText = 'position:absolute;width:'+this.W+'px;height:'+this.H+'px;left:0;top:0';
            container.appendChild(con_a);
            for (var x=0; x<4; x++) {
                var mask = document.createElement('span');
                mask.id = this.anchor + 'convolution-mask-' + (x+1);
                this.mask.push(mask);con_a.appendChild(mask);
                var cvl = document.createElement('span');
                cvl.id = this.anchor + 'convolution-' + (x+1);
                con_a.appendChild(cvl);
            }
            wp.appendChild(container);
            this.nav_wp = document.createElement('div'); //�Ƚ�һ��div��Ϊ����������ǩ����Ҳ������<ul>��<ol>������������ܻ���ã������ҾͲ�����
            this.nav_wp.style.cssText = 'position:absolute;right:0;bottom:0;padding:8px 0;'; //Ϊ��������ʽ
            for(var i=0;i<this.l;i++){
                /* == ���ƿ����� == */
                var nav = document.createElement('a'); //�����Ҿ�ֱ����a��ǩ��������������������Ļ���Ҳ������li
                nav.className = options.navClass?options.navClass:'shutter-nav'; //������class��Ĭ��Ϊ'shutter-nav'
                this.nav.push[nav];
                nav.innerHTML = i+1;
                nav.onclick = new Function(this.anchor+'.pos('+i+')'); //��onclick�¼���ֱ�ӵ���֮ǰд�õ�pos()����
                this.nav_wp.appendChild(nav);
            }
            wp.appendChild(this.nav_wp);
            this.curC = options.curNavClass?options.curNavClass:'shutter-cur-nav';
            this.pos(this.index); //�任����
        },
        auto:function(){
            this.li.a = setInterval(new Function(this.anchor+'.move(1)'),this.a*1000);
        },
        move:function(i){//����i������ѡ��1��-1,1�������е���һ�ţ�-1�������е���һ��
            var n = this.cur+i;
            var m = i==1?n==this.l?0:n:n<0?this.l-1:n; //��һ�Ż���һ�ŵ���ţ�ע����Ԫѡ��������ã�
            this.pos(m); //�任����һ�Ż���һ��
        },
        pos:function(i){
            clearInterval(this.li.a);clearInterval(this.__a);clearInterval(this.__b);clearInterval(this.__c);clearInterval(this.__d);clearInterval(this.__e);clearInterval(this.__f);clearInterval(this.__g);clearInterval(this.__h);
            //this.aw = this.dir == 'H'?this.W/this.stN : this.H/this.stN;
            var src = H$$('img',this.li[i])[0].src;
            var _n = i+1>=this.l?0:i+1;
            var src_n = H$$('img',this.li[_n])[0].src;
            this.container.style.backgroundImage = 'url('+src_n+')';
            for(var n=0;n<4;n++){
                this.mask[n].style.cssText = 'position:absolute;background:#fff;width:'+this.W/2+'px;height:'+this.H/2+'px;left:'+(n%2 == 0 ? 0 : this.W/2)+'px;top:'+(n>1 ? this.H/2 : 0) +'px';
            }
            H$(this.anchor+'convolution-1').style.cssText = 'position:absolute;border-width:0px '+this.W/4+'px;border-style:solid solid dashed dashed;border-color:#fff #fff transparent transparent;width:0;height:0;left:0;top:'+this.H/2+'px;font-size:0;line-height:0';
            H$(this.anchor+'convolution-2').style.cssText = 'position:absolute;border-width:'+this.H/4+'px 0px;border-style:dashed solid solid dashed;border-color:transparent #fff #fff transparent;width:0;height:0;left:'+this.W/2+'px;top:0;overflow:hidden;font-size:0;line-height:0';
            H$(this.anchor+'convolution-3').style.cssText = 'font-size:0;line-height:0;position:absolute;border-width:0px '+this.W/4+'px;border-style:dashed dashed solid solid;border-color:transparent transparent #fff #fff;width:0;height:0;left:'+this.W/2+'px;top:'+this.H/2+'px';
            H$(this.anchor+'convolution-4').style.cssText = 'font-size:0;line-height:0;position:absolute;border-width:'+this.H/4+'px 0px;border-style:solid dashed dashed solid;border-color:#fff transparent transparent #fff;width:0;height:0;left:'+this.W/2+'px;top:'+this.H/2+'px';
            this.cur = i; //�󶨵�ǰ��ʾͼƬ����ȷ���
            this.li.a = false;
            for(var x=0;x<this.l;x++){
                H$$('a',this.nav_wp)[x].className = x==i?this.curC:'shutter-nav'; //�󶨵�ǰ��������ʽ
            }
            this._a.href = H$$('a',this.li[i])[0].href;
            //this.auto(); //�Զ�����
            //this.li[i].a = setInterval(new Function(this.anchor+'.anim('+i+')'), 4*this.stN);
            this.anim();
        },
        anim: function () {
            this.__a = setInterval(new Function(this.anchor+'._1()'), 20);
            if (this.N == 2) this.__e = setInterval(new Function(this.anchor+'._5()'), 20);
            if (this.N == 4) {
                this.__c = setInterval(new Function(this.anchor+'._3()'), 20);
                this.__e = setInterval(new Function(this.anchor+'._5()'), 20);
                this.__g = setInterval(new Function(this.anchor+'._7()'), 20);
            }
        },
        _1 : function () {
            var s =  H$(this.anchor+'convolution-2'), a = H$(this.anchor+'convolution-mask-2'), d = parseInt(s.style.borderRightWidth)+this.aw;
            if(d>=this.W/4){
                clearInterval(this.__a);
                d = this.W/4;
                this.__b = setInterval(new Function(this.anchor+'._2()'), 20);
            }
            s.style.borderLeftWidth = s.style.borderRightWidth = d+'px';
            a.style.left = 2*d + this.W/2 + 'px';
        },
        _2 : function () {
            var s =  H$(this.anchor+'convolution-2'), d = parseInt(s.style.borderTopWidth)-this.aw;
            if(d<=0){
                clearInterval(this.__b);
                d = 0;
                if (this.N == 1 || this.N == 2) this.__c = setInterval(new Function(this.anchor+'._3()'), 20);
            }
            s.style.borderTopWidth = s.style.borderBottomWidth = d + 'px';
            s.style.top = this.H/2-2*d + 'px';
        },
        _3 : function () {
            var s =  H$(this.anchor+'convolution-3'), a = H$(this.anchor+'convolution-mask-4'), d = parseInt(s.style.borderTopWidth)+this.aw;
            if(d>=this.H/4){
                clearInterval(this.__c);
                d = this.H/4;
                this.__d = setInterval(new Function(this.anchor+'._4()'), 20);
            }
            s.style.borderTopWidth = s.style.borderBottomWidth = d+'px';
            a.style.top = 2*d + this.H/2 + 'px';
        },
        _4 : function () {
            var s =  H$(this.anchor+'convolution-3'), dm = parseInt(s.style.borderRightWidth)-this.aw;
            if(dm<=0){
                clearInterval(this.__d);
                dm = 0;
                if (this.N == 1) this.__e = setInterval(new Function(this.anchor+'._5()'), 20);
            }
            s.style.borderLeftWidth = s.style.borderRightWidth = dm + 'px';
        },
        _5 : function () {
            var s =  H$(this.anchor+'convolution-4'), a = H$(this.anchor+'convolution-mask-3'), d = parseInt(s.style.borderRightWidth)+this.aw;
            if(d>=this.W/4){
                clearInterval(this.__e);
                d = this.W/4;
                this.__f = setInterval(new Function(this.anchor+'._6()'), 20);
            }
            s.style.borderLeftWidth = s.style.borderRightWidth = d+'px';
            s.style.left = this.W/2-2*d + 'px';
            a.style.left = -2*d + 'px';
        },
        _6 : function () {
            var s =  H$(this.anchor+'convolution-4'), dm = parseInt(s.style.borderTopWidth)-this.aw;
            if(dm<=0){
                clearInterval(this.__f);
                dm = 0;
                if (this.N == 1 || this.N == 2) this.__g = setInterval(new Function(this.anchor+'._7()'), 20);
            }
            s.style.borderTopWidth = s.style.borderBottomWidth = dm + 'px';
        },
        _7 : function () {
            var s =  H$(this.anchor+'convolution-1'), a = H$(this.anchor+'convolution-mask-1'), d = parseInt(s.style.borderTopWidth)+this.aw;
            if(d>=this.H/4){
                clearInterval(this.__g);
                d = this.H/4;
                this.__h = setInterval(new Function(this.anchor+'._8()'), 20);
            }
            s.style.borderTopWidth = s.style.borderBottomWidth = d+'px';
            s.style.top = this.H/2-2*d + 'px';
            a.style.top = -2*d + 'px';
        },
        _8 : function () {
            var s =  H$(this.anchor+'convolution-1'), dm = parseInt(s.style.borderRightWidth)-this.aw;
            if(dm<=0){
                clearInterval(this.__h);
                dm = 0;
                if (!this.li.a) this.auto();
            }
            s.style.borderLeftWidth = s.style.borderRightWidth = dm + 'px';
            s.style.left = this.W/2-2*dm + 'px';
        }
    }
    return {init:init}
}();