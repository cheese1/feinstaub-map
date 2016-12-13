webpackJsonp([0,2],[,,,function(t,e){},function(t,e,n){var o,i;n(19),o=n(9);var a=n(26);i=o=o||{},"object"!=typeof o["default"]&&"function"!=typeof o["default"]||(i=o=o["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},,function(t,e){"use strict";t.exports={mapbox:{id:"mapbox.streets",accessToken:"pk.eyJ1IjoicmFzaGZhZWwiLCJhIjoiY2luZG4wOWlwMDA2YXdrbHlodDgycnRibSJ9.s7UThyUXewWYetZ7C5gynA"},center:[48.7791878,9.107176]}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),a=o(i);e["default"]={data:function(){return{}},props:{cell:Array},computed:{mean:function(){return{P1:a["default"].meanBy(this.cell,function(t){return t.o.data.P1}),P2:a["default"].meanBy(this.cell,function(t){return t.o.data.P2})}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={components:{},data:function(){return{}},computed:{},created:function(){},mounted:function(){this.$nextTick(function(){})},methods:{}}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(22),a=o(i),r=n(20),s=o(r),u=n(21),l=o(u);e["default"]={components:{GeoMap:a["default"],CellInfo:s["default"],MapLegend:l["default"]},data:function(){return{selectedCell:null}}}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=o(i);n(15);var r=n(6),s=o(r),u=n(11),l=o(u);n(12),e["default"]={mounted:function(){var t=this;this.$nextTick(function(){var e=a["default"].map(t.$el,{center:s["default"].center,zoom:11});a["default"].tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',maxZoom:13,id:s["default"].mapbox.id,accessToken:s["default"].mapbox.accessToken}).addTo(e);var n={mouseover:function(e){t.$emit("cell-selected",e)},mouseout:function(){},click:function(e){t.$emit("cell-selected",e)}},o=new a["default"].HexbinLayer(n).addTo(e);l["default"].getAllSensors().then(function(t){o.data(t)})})}}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),a=o(i);n(28);var r="https://www.madavi.de/sensor/feinstaub-map-sds/data.json",s={fetchNow:function(){return fetch(r).then(function(t){return t.json()})},getAllSensors:function(){return s.fetchNow().then(function(t){var e=a["default"].chain(t).filter(function(t){return null!=t.location.latitude&&null!=t.location.longitude&&"SDS011"===t.sensor.sensor_type.name&&t.sensordatavalues.length>=5}).groupBy(function(t){return t.sensor.id}).map(function(t,e){var n=Number(t[0].location.latitude),o=Number(t[0].location.longitude),i=a["default"].reduce(t,function(t,e){var n=a["default"].keyBy(e.sensordatavalues,"value_type");return t.P1+=Number(n.P1.value),t.P2+=Number(n.P2.value),t},{P1:0,P2:0});return{latitude:n+5e-4,longitude:o+5e-4,id:t[0].sensor.id,data:{P1:i.P1/t.length,P2:i.P2/t.length}}}).value();return Promise.resolve(e)})}};e["default"]=s},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}var i=n(1),a=o(i),r=n(14),s=o(r),u=n(13),l=o(u),c=n(0),d=o(c);s["default"].hexbin=l["default"].hexbin,a["default"].HexbinLayer=a["default"].Layer.extend({_undef:function(t){return"undefined"==typeof t},options:{radius:25,opacity:.6,duration:200,valueDomain:[20,40,60,90],colorRange:["#00796B","#F9A825","#E65100","#DD2C00"],onmouseover:void 0,onmouseout:void 0,click:void 0,lng:function(t){return t.longitude},lat:function(t){return t.latitude},value:function(t){return d["default"].meanBy(t,function(t){return t.o.data.P1})}},initialize:function(t){a["default"].setOptions(this,t),this._data=[],this._colorScale=s["default"].scale.linear().domain(this.options.valueDomain).range(this.options.colorRange).clamp(!0)},onAdd:function(t){this.map=t;var e=this;this._svg=a["default"].svg(),t.addLayer(this._svg),this._rootGroup=s["default"].select(this._svg._rootGroup).classed("d3-overlay",!0),this.selection=this._rootGroup,this._pixelOrigin=t.getPixelOrigin(),this._wgsOrigin=a["default"].latLng([0,0]),this._wgsInitialShift=this.map.latLngToLayerPoint(this._wgsOrigin),this._zoom=this.map.getZoom(),this._shift=a["default"].point(0,0),this._scale=1,this.projection={latLngToLayerPoint:function(t,n){n=e._undef(n)?e._zoom:n;var o=e.map.project(a["default"].latLng(t),n)._round();return o._subtract(e._pixelOrigin)},layerPointToLatLng:function(t,n){n=e._undef(n)?e._zoom:n;var o=a["default"].point(t).add(e._pixelOrigin);return e.map.unproject(o,n)},unitsPerMeter:256*Math.pow(2,e._zoom)/40075017,map:e.map,layer:e,scale:1},this.projection._projectPoint=function(t,n){var o=e.projection.latLngToLayerPoint(new a["default"].LatLng(n,t));this.stream.point(o.x,o.y)},this.projection.pathFromGeojson=s["default"].geo.path().projection(s["default"].geo.transform({point:this.projection._projectPoint})),this.projection.latLngToLayerFloatPoint=this.projection.latLngToLayerPoint,this.projection.getZoom=this.map.getZoom.bind(this.map),this.projection.getBounds=this.map.getBounds.bind(this.map),this.selection=this._rootGroup,this.draw()},onRemove:function(t){null!=this._container&&this._container.remove(),t.off({moveend:this._redraw},this),this._container=null,this._map=null},addTo:function(t){return t.addLayer(this),this},_disableLeafletRounding:function(){this._leaflet_round=a["default"].Point.prototype._round,a["default"].Point.prototype._round=function(){return this}},_enableLeafletRounding:function(){a["default"].Point.prototype._round=this._leaflet_round},draw:function(){this._disableLeafletRounding(),this._redraw(this.selection,this.projection,this.map.getZoom()),this._enableLeafletRounding()},getEvents:function(){return{zoomend:this._zoomChange}},_zoomChange:function(t){this._disableLeafletRounding();var e=this._undef(t.zoom)?this.map._zoom:t.zoom;this._zoomDiff=e-this._zoom,this._scale=Math.pow(2,this._zoomDiff),this.projection.scale=this._scale,this._shift=this.map.latLngToLayerPoint(this._wgsOrigin)._subtract(this._wgsInitialShift.multiplyBy(this._scale));var n=["translate(",this._shift.x,",",this._shift.y,") "],o=["scale(",this._scale,",",this._scale,") "];this._rootGroup.attr("transform",n.concat(o).join("")),this.draw(),this._enableLeafletRounding()},_redraw:function(t,e,n){var o=this,i=this._data.map(function(t){var n=o.options.lng(t),i=o.options.lat(t),a=e.latLngToLayerPoint([i,n]);return{o:t,point:a}}),a=t.selectAll("g.hexbin").data([n],function(t){return t});a.enter().append("g").attr("class",function(t){return"hexbin zoom-"+t}),a.exit().remove(),this._createHexagons(a,i,e)},_createHexagons:function(t,e,n){var o=this,i=s["default"].hexbin().radius(this.options.radius/n.scale).x(function(t){return t.point.x}).y(function(t){return t.point.y}),a=i(e),r=t.selectAll("path.hexbin-hexagon").data(a);r.transition().duration(this.options.duration).attr("fill",function(t){return o._colorScale(o.options.value(t))}).attr("fill-opacity",this.options.opacity).attr("stroke-opacity",this.options.opacity),r.enter().append("path").attr("class","hexbin-hexagon").attr("d",function(t){return"M"+t.x+","+t.y+i.hexagon()}).attr("fill",function(t){return o._colorScale(o.options.value(t))}).attr("fill-opacity",.01).attr("stroke-opacity",.01).on("mouseover",this.options.mouseover).on("mouseout",this.options.mouseout).on("click",this.options.click).transition().duration(this.options.duration).attr("fill-opacity",this.options.opacity).attr("stroke-opacity",this.options.opacity),r.exit().transition().duration(this.options.duration).attr("fill-opacity",.01).attr("stroke-opacity",.01).remove()},data:function(t){return this._data=null!=t?t:[],this.draw(),this}})},,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){var o,i;n(16),o=n(7);var a=n(23);i=o=o||{},"object"!=typeof o["default"]&&"function"!=typeof o["default"]||(i=o=o["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},function(t,e,n){var o,i;n(17),o=n(8);var a=n(24);i=o=o||{},"object"!=typeof o["default"]&&"function"!=typeof o["default"]||(i=o=o["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},function(t,e,n){var o,i;n(18),o=n(10);var a=n(25);i=o=o||{},"object"!=typeof o["default"]&&"function"!=typeof o["default"]||(i=o=o["default"]),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},function(t,e){t.exports={render:function(){var t=this;return t.cell?t._h("div",{attrs:{id:"cell-info"}},[t._h("h3",["#Sensors "+t._s(t.cell.length)]),t._h("table",[t._m(0),t._h("tr",{staticClass:"mean"},[t._h("td",["mean"]),t._h("td",[t._s(t.mean.P1.toFixed(2))]),t._h("td",[t._s(t.mean.P2.toFixed(2))])]),t._l(t.cell,function(e){return t._h("tr",[t._h("td",[t._s(e.o.id)]),t._h("td",[t._s(e.o.data.P1.toFixed(2))]),t._h("td",[t._s(e.o.data.P2.toFixed(2))])])})])]):t._e()},staticRenderFns:[function(){var t=this;return t._h("tr",[t._h("th",["µg/m³"]),t._h("th",["PM10"]),t._h("th",["PM2.5"])])}]}},function(t,e){t.exports={render:function(){var t=this;return t._m(0)},staticRenderFns:[function(){var t=this;return t._h("div",{attrs:{id:"legend"}},[t._h("div",{staticClass:"gradient"},[t._h("div",{staticClass:"limit"})]),t._h("div",{staticClass:"labels"},[t._h("div",{staticClass:"label",staticStyle:{bottom:"100%"}},["100"]),t._h("div",{staticClass:"label",staticStyle:{bottom:"75%"}},["75"]),t._h("div",{staticClass:"label limit",staticStyle:{bottom:"50%"}},["50"]),t._h("div",{staticClass:"label",staticStyle:{bottom:"25%"}},["25"]),t._h("div",{staticClass:"label",staticStyle:{bottom:"0%"}},["0 µg/m³"])])])}]}},function(t,e){t.exports={render:function(){var t=this;return t._h("div",{staticClass:"map"})},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this;return t._h("div",{attrs:{id:"content"}},[t._h("geo-map",{on:{"cell-selected":function(e){return t.selectedCell=e}}}),t._h("map-legend"),t._h("cell-info",{attrs:{cell:t.selectedCell}})])},staticRenderFns:[]}},,,function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}var i=n(5),a=o(i),r=n(4),s=o(r);n(3),new a["default"](s["default"]).$mount("#v-app")}],[29]);