import Ember from 'ember';

export default Ember.Component.extend({
    click : function(){
		},
		fixPos: function (a, l1, l2) {
			if (a < l1) return l1;
			if (a > l1 && a < l2) return a;
			if (a > l2) return l2;
		},
		classNames: ['my-class', 'my-other-class'],
		mouseDown : function(e) {
			var
      options = options || {},
      self = this,
      limit = {};
			var _this = e.target;
			console.log(_this);
      // 禁用了拖动
      if (_this.disableDrag) return;
      
      _this.style.position = 'absolute';
      
      var
        datas = {
          x: e.pageX,
          y: e.pageY,
          ox: options.fixed ? $(_this).offset().left : _this.offsetLeft,
          oy: options.fixed ? $(_this).offset().top : _this.offsetTop
        },
        me = _this,
        delta = {
          x: datas.ox,
          y: datas.oy
        };
      console.log(delta);
      // 是否禁用默认事件及冒泡
      if (options.disableDefault) {
        e.preventDefault();
      }
      if (options.disableBubble) {
        e.stopPropagation();
      }
      // 是否启用边界限制
      if (options.limit) {
        var parNode = options.parNode || _this.parentNode;
        var bw = parseInt($(parNode).css("border-width")) * 2 || 0;
        limit = {
          l: 0,
          r: parNode.offsetWidth - bw - _this.offsetWidth,
          t: 0,
          b: parNode.offsetHeight - bw - _this.offsetHeight
        };
      }
      // 回调
      options.mousedownFn && options.mousedownFn(datas, me);
      // 拖动过程
      document.onmousemove = function (e) {
        // delta为拖移距离
        delta.x = e.pageX - datas.x + datas.ox;
        delta.y = e.pageY - datas.y + datas.oy;
        // 是否启用边界限制
        if (options.limit) {
          if(options.limit.x) delta.x = self.fixPos(delta.x, limit.l, limit.r);
          else if(options.limit.y) delta.y = self.fixPos(delta.y, limit.t, limit.b);
          else {
            delta.x = self.fixPos(delta.x, limit.l, limit.r);
            delta.y = self.fixPos(delta.y, limit.t, limit.b);
          }
          // 容错undefined
          if (delta.x === undefined) delta.x = parseInt($(me).css("left"));
          if (delta.y === undefined) delta.y = parseInt($(me).css("top"));
        }
        // 容器拖动
        $(me).css({
          left: delta.x,
          top: delta.y
        });
        options.mousemoveFn && options.mousemoveFn(delta, me, e);
      }

      document.onmouseup = function (e) {
        document.onmousemove = null;
        options.mouseupFn && options.mouseupFn(delta, me, e);
        document.onmouseup = null;
      }
		}		
});
