/*
 Highcharts JS v7.1.2 (2019-06-03)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (l) {
    "object" === typeof module && module.exports ? (l["default"] = l, module.exports = l) : "function" === typeof define && define.amd ? define("highcharts/modules/series-label", ["highcharts"], function (p) {
        l(p);
        l.Highcharts = p;
        return l
    }) : l("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (l) {
    function p(w, l, u, p) {
        w.hasOwnProperty(l) || (w[l] = p.apply(null, u))
    }

    l = l ? l._modules : {};
    p(l, "modules/series-label.src.js", [l["parts/Globals.js"]], function (l) {
        function p(d, c, a, g, e, f) {
            d = (f - c) * (a - d) - (g - c) * (e - d);
            return 0 <
            d ? !0 : !(0 > d)
        }

        function u(d, c, a, g, e, f, b, h) {
            return p(d, c, e, f, b, h) !== p(a, g, e, f, b, h) && p(d, c, a, g, e, f) !== p(d, c, a, g, b, h)
        }

        function w(d, c, a, g, e, f, b, h) {
            return u(d, c, d + a, c, e, f, b, h) || u(d + a, c, d + a, c + g, e, f, b, h) || u(d, c + g, d + a, c + g, e, f, b, h) || u(d, c, d, c + g, e, f, b, h)
        }

        function B(d) {
            var c = this, a = l.animObject(c.renderer.globalAnimation).duration;
            c.labelSeries = [];
            c.labelSeriesMaxSum = 0;
            l.clearTimeout(c.seriesLabelTimer);
            c.series.forEach(function (g) {
                var e = g.options.label, f = g.labelBySeries, b = f && f.closest;
                e.enabled && g.visible && (g.graph ||
                    g.area) && !g.isSeriesBoosting && (c.labelSeries.push(g), e.minFontSize && e.maxFontSize && (g.sum = g.yData.reduce(function (a, b) {
                    return (a || 0) + (b || 0)
                }, 0), c.labelSeriesMaxSum = Math.max(c.labelSeriesMaxSum, g.sum)), "load" === d.type && (a = Math.max(a, l.animObject(g.options.animation).duration)), b && (void 0 !== b[0].plotX ? f.animate({
                    x: b[0].plotX + b[1],
                    y: b[0].plotY + b[2]
                }) : f.attr({opacity: 0})))
            });
            c.seriesLabelTimer = l.syncTimeout(function () {
                c.series && c.labelSeries && c.drawSeriesLabels()
            }, c.renderer.forExport ? 0 : a)
        }

        var C = l.addEvent,
            D = l.extend, A = l.isNumber, x = l.pick, y = l.Series, E = l.SVGRenderer, z = l.Chart;
        l.setOptions({
            plotOptions: {
                series: {
                    label: {
                        enabled: !0,
                        connectorAllowed: !1,
                        connectorNeighbourDistance: 24,
                        minFontSize: null,
                        maxFontSize: null,
                        onArea: null,
                        style: {fontWeight: "bold"},
                        boxesToAvoid: []
                    }
                }
            }
        });
        E.prototype.symbols.connector = function (d, c, a, g, e) {
            var f = e && e.anchorX;
            e = e && e.anchorY;
            var b, h, k = a / 2;
            A(f) && A(e) && (b = ["M", f, e], h = c - e, 0 > h && (h = -g - h), h < a && (k = f < d + a / 2 ? h : a - h), e > c + g ? b.push("L", d + k, c + g) : e < c ? b.push("L", d + k, c) : f < d ? b.push("L", d, c + g /
                2) : f > d + a && b.push("L", d + a, c + g / 2));
            return b || []
        };
        y.prototype.getPointsOnGraph = function () {
            function d(a) {
                var b = Math.round(a.plotX / 8) + "," + Math.round(a.plotY / 8);
                p[b] || (p[b] = 1, e.push(a))
            }

            if (this.xAxis || this.yAxis) {
                var c = this.points, a, g, e = [], f, b, h, k;
                b = this.graph || this.area;
                h = b.element;
                var l = this.chart.inverted, r = this.xAxis;
                a = this.yAxis;
                var t = l ? a.pos : r.pos, l = l ? r.pos : a.pos, r = x(this.options.label.onArea, !!this.area),
                    m = a.getThreshold(this.options.threshold), p = {};
                if (this.getPointSpline && h.getPointAtLength && !r &&
                    c.length < this.chart.plotSizeX / 16) {
                    b.toD && (g = b.attr("d"), b.attr({d: b.toD}));
                    k = h.getTotalLength();
                    for (f = 0; f < k; f += 16) a = h.getPointAtLength(f), d({
                        chartX: t + a.x,
                        chartY: l + a.y,
                        plotX: a.x,
                        plotY: a.y
                    });
                    g && b.attr({d: g});
                    a = c[c.length - 1];
                    a.chartX = t + a.plotX;
                    a.chartY = l + a.plotY;
                    d(a)
                } else for (k = c.length, f = 0; f < k; f += 1) {
                    a = c[f];
                    g = c[f - 1];
                    a.chartX = t + a.plotX;
                    a.chartY = l + a.plotY;
                    r && (a.chartCenterY = l + (a.plotY + x(a.yBottom, m)) / 2);
                    if (0 < f && (b = Math.abs(a.chartX - g.chartX), h = Math.abs(a.chartY - g.chartY), b = Math.max(b, h), 16 < b)) for (b = Math.ceil(b /
                        16), h = 1; h < b; h += 1) d({
                        chartX: g.chartX + h / b * (a.chartX - g.chartX),
                        chartY: g.chartY + h / b * (a.chartY - g.chartY),
                        chartCenterY: g.chartCenterY + h / b * (a.chartCenterY - g.chartCenterY),
                        plotX: g.plotX + h / b * (a.plotX - g.plotX),
                        plotY: g.plotY + h / b * (a.plotY - g.plotY)
                    });
                    A(a.plotY) && d(a)
                }
                return e
            }
        };
        y.prototype.labelFontSize = function (d, c) {
            return d + this.sum / this.chart.labelSeriesMaxSum * (c - d) + "px"
        };
        y.prototype.checkClearPoint = function (d, c, a, g) {
            var e = Number.MAX_VALUE, f = Number.MAX_VALUE, b, h, k = x(this.options.label.onArea, !!this.area), l =
                k || this.options.label.connectorAllowed, r = this.chart, t, m, p, u, q, n;
            for (q = 0; q < r.boxesToAvoid.length; q += 1) if (m = r.boxesToAvoid[q], n = d + a.width, t = c, p = c + a.height, !(d > m.right || n < m.left || t > m.bottom || p < m.top)) return !1;
            for (q = 0; q < r.series.length; q += 1) if (t = r.series[q], m = t.interpolatedPoints, t.visible && m) {
                for (n = 1; n < m.length; n += 1) {
                    if (m[n].chartX >= d - 16 && m[n - 1].chartX <= d + a.width + 16) {
                        if (w(d, c, a.width, a.height, m[n - 1].chartX, m[n - 1].chartY, m[n].chartX, m[n].chartY)) return !1;
                        this === t && !b && g && (b = w(d - 16, c - 16, a.width + 32, a.height +
                            32, m[n - 1].chartX, m[n - 1].chartY, m[n].chartX, m[n].chartY))
                    }
                    !l && !b || this === t && !k || (p = d + a.width / 2 - m[n].chartX, u = c + a.height / 2 - m[n].chartY, e = Math.min(e, p * p + u * u))
                }
                if (!k && l && this === t && (g && !b || e < Math.pow(this.options.label.connectorNeighbourDistance, 2))) {
                    for (n = 1; n < m.length; n += 1) b = Math.min(Math.pow(d + a.width / 2 - m[n].chartX, 2) + Math.pow(c + a.height / 2 - m[n].chartY, 2), Math.pow(d - m[n].chartX, 2) + Math.pow(c - m[n].chartY, 2), Math.pow(d + a.width - m[n].chartX, 2) + Math.pow(c - m[n].chartY, 2), Math.pow(d + a.width - m[n].chartX, 2) + Math.pow(c +
                        a.height - m[n].chartY, 2), Math.pow(d - m[n].chartX, 2) + Math.pow(c + a.height - m[n].chartY, 2)), b < f && (f = b, h = m[n]);
                    b = !0
                }
            }
            return !g || b ? {x: d, y: c, weight: e - (h ? f : 0), connectorPoint: h} : !1
        };
        z.prototype.drawSeriesLabels = function () {
            var d = this, c = this.labelSeries;
            d.boxesToAvoid = [];
            c.forEach(function (a) {
                a.interpolatedPoints = a.getPointsOnGraph();
                (a.options.label.boxesToAvoid || []).forEach(function (a) {
                    d.boxesToAvoid.push(a)
                })
            });
            d.series.forEach(function (a) {
                function c(a, b, c) {
                    var d = Math.max(t, x(y, -Infinity)), e = Math.min(t + u, x(z,
                        Infinity));
                    return a > d && a <= e - c.width && b >= m && b <= m + w - c.height
                }

                if (a.xAxis || a.yAxis) {
                    var e, f, b, h = [], k, p, r = a.options.label, t = (b = d.inverted) ? a.yAxis.pos : a.xAxis.pos,
                        m = b ? a.xAxis.pos : a.yAxis.pos, u = d.inverted ? a.yAxis.len : a.xAxis.len,
                        w = d.inverted ? a.xAxis.len : a.yAxis.len, q = a.interpolatedPoints, n = x(r.onArea, !!a.area),
                        v = a.labelBySeries, A = !v;
                    e = r.minFontSize;
                    f = r.maxFontSize;
                    var y, z;
                    n && !b && (b = [a.xAxis.toPixels(a.xData[0]), a.xAxis.toPixels(a.xData[a.xData.length - 1])], y = Math.min.apply(Math, b), z = Math.max.apply(Math,
                        b));
                    if (a.visible && !a.isSeriesBoosting && q) {
                        v || (a.labelBySeries = v = d.renderer.label(a.name, 0, -9999, "connector").addClass("highcharts-series-label highcharts-series-label-" + a.index + " " + (a.options.className || "")).css(D({color: n ? d.renderer.getContrast(a.color) : a.color}, a.options.label.style)), e && f && v.css({fontSize: a.labelFontSize(e, f)}), v.attr({
                            padding: 0,
                            opacity: d.renderer.forExport ? 1 : 0,
                            stroke: a.color,
                            "stroke-width": 1,
                            zIndex: 3
                        }).add());
                        e = v.getBBox();
                        e.width = Math.round(e.width);
                        for (p = q.length - 1; 0 < p; --p) n ?
                            (f = q[p].chartX - e.width / 2, b = q[p].chartCenterY - e.height / 2, c(f, b, e) && (k = a.checkClearPoint(f, b, e))) : (f = q[p].chartX + 3, b = q[p].chartY - e.height - 3, c(f, b, e) && (k = a.checkClearPoint(f, b, e, !0)), k && h.push(k), f = q[p].chartX + 3, b = q[p].chartY + 3, c(f, b, e) && (k = a.checkClearPoint(f, b, e, !0)), k && h.push(k), f = q[p].chartX - e.width - 3, b = q[p].chartY + 3, c(f, b, e) && (k = a.checkClearPoint(f, b, e, !0)), k && h.push(k), f = q[p].chartX - e.width - 3, b = q[p].chartY - e.height - 3, c(f, b, e) && (k = a.checkClearPoint(f, b, e, !0))), k && h.push(k);
                        if (r.connectorAllowed &&
                            !h.length && !n) for (f = t + u - e.width; f >= t; f -= 16) for (b = m; b < m + w - e.height; b += 16) (k = a.checkClearPoint(f, b, e, !0)) && h.push(k);
                        if (h.length) {
                            if (h.sort(function (a, b) {
                                return b.weight - a.weight
                            }), k = h[0], d.boxesToAvoid.push({
                                left: k.x,
                                right: k.x + e.width,
                                top: k.y,
                                bottom: k.y + e.height
                            }), h = Math.sqrt(Math.pow(Math.abs(k.x - v.x), 2), Math.pow(Math.abs(k.y - v.y), 2))) r = {
                                opacity: d.renderer.forExport ? 1 : 0,
                                x: k.x,
                                y: k.y
                            }, q = {opacity: 1}, 10 >= h && (q = {x: r.x, y: r.y}, r = {}), a.labelBySeries.attr(D(r, {
                                anchorX: k.connectorPoint && k.connectorPoint.plotX +
                                    t, anchorY: k.connectorPoint && k.connectorPoint.plotY + m
                            })).animate(q, A ? .2 * l.animObject(a.options.animation).duration : d.renderer.globalAnimation), a.options.kdNow = !0, a.buildKDTree(), a = a.searchPoint({
                                chartX: k.x,
                                chartY: k.y
                            }, !0), v.closest = [a, k.x - a.plotX, k.y - a.plotY]
                        } else v && (a.labelBySeries = v.destroy())
                    } else v && (a.labelBySeries = v.destroy())
                }
            });
            l.fireEvent(d, "afterDrawSeriesLabels")
        };
        C(z, "load", B);
        C(z, "redraw", B)
    });
    p(l, "masters/modules/series-label.src.js", [], function () {
    })
});
//# sourceMappingURL=series-label.js.map