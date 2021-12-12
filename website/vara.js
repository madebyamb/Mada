(Vara = function (t, e, i, s) {
    var r = this;
    (this.elementName = t),
        (this.textsInit = []),
        "string" == typeof i ? this.textsInit.push({ text: i }) : "object" == typeof i && (this.textsInit = i),
        (this.texts = this.textsInit),
        (this.properties = s || {}),
        (this.properties.textAlign = this.properties.textAlign || "left"),
        (this.letterSpacing = 0),
        (this.element = document.querySelector(this.elementName)),
        (this.fontSource = e),
        (this.characters = {}),
        (this.drawnCharacters = {}),
        (this.totalPathLength = 0),
        (this.fontSize = 24),
        (this.frameRate = 1e3 / 30),
        (this.prevDuration = 0),
        (this.completed = !1),
        (this.ready = function (t) {
            r.readyF = t;
        }),
        (this.animationEnd = function (t) {
            r.animationEndF = t;
        }),
        (this.svg = this.createNode("svg", { width: "100%" })),
        this.element.appendChild(this.svg),
        (this.font = document.createElement("object")),
        this.getSVGData();
}),
    (Vara.prototype.createNode = function (t, e) {
        t = document.createElementNS("http://www.w3.org/2000/svg", t);
        for (var i in e)
            t.setAttributeNS(
                null,
                i.replace(/[A-Z]/g, function (t, e, i, s) {
                    return "-" + t.toLowerCase();
                }),
                e[i]
            );
        return t;
    }),
    (Vara.prototype.getSVGData = function () {
        var t = this,
            e = new XMLHttpRequest();
        e.open("GET", this.fontSource, !0),
            (e.onreadystatechange = function () {
                4 == e.readyState && 200 == e.status && ((t.contents = JSON.parse(e.responseText)), (t.characters = JSON.parse(e.responseText).c), t.preCreate(), t.createText());
            }),
            e.send(null);
    }),
    (Vara.prototype.preCreate = function () {
        !(function () {
            if ("function" == typeof NodeList.prototype.forEach) return !1;
            NodeList.prototype.forEach = Array.prototype.forEach;
        })(),
            (this.questionMark =
                void 0 == this.characters[63]
                    ? {
                          paths: [
                              { w: 8.643798828125, h: 14.231731414794922, my: 22.666500004827977, mx: 0, pw: 28.2464542388916, d: "m 0,0 c -2,-6.01,5,-8.64,8,-3.98,2,4.09,-7,8.57,-7,11.85" },
                              {
                                  w: 1.103759765625,
                                  h: 1.549820899963379,
                                  my: 8.881500004827977,
                                  mx: 1,
                                  pw: 4.466640472412109,
                                  d: "m 0,0 a 0.7592,0.7357,0,0,1,0,0.735,0.7592,0.7357,0,0,1,-1,-0.735,0.7592,0.7357,0,0,1,1,-0.738,0.7592,0.7357,0,0,1,0,0.738 z",
                              },
                          ],
                          w: 8.643798828125,
                      }
                    : this.characters[63]),
            (this.space = { paths: [{ d: "M0,0 l" + this.contents.p.space + " 0", mx: 0, my: 0, w: this.contents.p.space, h: 0 }], w: this.contents.p.space });
        for (var t = this.analyseWidth(), e = 0; e < this.texts.length; e++) {
            for (var i = [], s = ("string" == typeof this.texts[e] ? { text: this.texts[e] } : this.texts[e]).text, r = 0; r < s.length; r++) {
                var o = s[r];
                if (t.breakPoints[e][r].length > 0)
                    for (var a, h = t.breakPoints[e][r].length, n = 0; n <= h; n++) {
                        var d = t.breakPoints[e][r][n];
                        t.breakPoints[e][r][h - 1] != o.length && t.breakPoints[e][r].push(o.length);
                        var c = void 0 == t.breakPoints[e][r][n - 1] ? 0 : t.breakPoints[e][r][n - 1];
                        (a = o.slice(c, d).replace(/^\s+/g, "")), i.push(a);
                    }
                else i.push(s[r]);
            }
            this.texts[e].text = i;
        }
    }),
    (Vara.prototype.createText = function () {
        var t,
            e = this,
            i = this.svg,
            s = 0,
            r = 0,
            o = void 0 == this.properties.lineHeight ? this.contents.p.lh : this.properties.lineHeight;
        this.properties.autoAnimation = void 0 == this.properties.autoAnimation || this.properties.autoAnimation;
        for (var a = 0, h = !0, n = 0; n < this.texts.length; n++) {
            var d = [],
                c = 0;
            t = this.texts[n].fontSize;
            var p = this.texts[n].strokeWidth,
                l = void 0 == this.texts[n].color ? (void 0 == this.properties.color ? "black" : this.properties.color) : this.texts[n].color,
                x = void 0 == this.texts[n].duration ? (void 0 == this.properties.duration ? 2e3 : this.properties.duration) : this.texts[n].duration;
            this.texts[n].duration = x;
            var u = void 0 == this.texts[n].id ? n : this.texts[n].id;
            (this.texts[n].delay = void 0 == this.texts[n].delay ? 0 : this.texts[n].delay),
                (this.prevDuration += this.texts[n].delay),
                void 0 == this.texts[n].fromCurrentPosition && (this.texts[n].fromCurrentPosition = { x: !0, y: !0 }),
                (h = void 0 == this.texts[n].y || !(void 0 != this.texts[n].fromCurrentPosition.y && !this.texts[n].fromCurrentPosition.y));
            var v = l,
                f = void 0 == this.texts[n].textAlign ? this.properties.textAlign : this.texts[n].textAlign;
            o = void 0 == this.texts[n].lineHeight ? o : this.texts[n].lineHeight / t;
            var g = this.createNode("g", { transform: "translate(0,0)" });
            i.appendChild(g), (r = a);
            for (var y = 0, m = 0; m < this.texts[n].text.length; m++) {
                var w = 0,
                    C = this.createNode("g");
                g.appendChild(C);
                for (var S = 0, k = 0, B = 0; B < this.texts[n].text[m].length; B++) {
                    var b = this.texts[n].text[m][B],
                        A = this.createNode("g");
                    C.appendChild(A);
                    s = 0;
                    var P = void 0 != this.characters[b.charCodeAt(0)] || " " == b ? (" " == b ? this.space.paths : this.characters[b.charCodeAt(0)].paths) : this.questionMark.paths;
                    (l = " " == b ? "transparent" : v),
                        P.forEach(function (t, i) {
                            var s = e.createNode("path", { d: t.d, "stroke-width": p, stroke: l, fill: "none", "stroke-linecap": e.contents.p.slc, "stroke-linejoin": e.contents.p.slj });
                            A.appendChild(s),
                                s.setAttribute("transform", "translate(" + t.mx + "," + -t.my + ")"),
                                (S = S > t.my - s.getBBox().y ? S : t.my - s.getBBox().y),
                                0 == i && (k = S),
                                (s.style.opacity = 0),
                                (s.style.strokeDasharray = s.getTotalLength() + " " + (s.getTotalLength() + 2)),
                                (s.style.strokeDashoffset = s.getTotalLength() + 1);
                        }),
                        d.push(A);
                    s = A.getBBox().x * t;
                    A.getBBox().width < this.texts[n].minWidth && (s -= (this.texts[n].minWidth - A.getBBox().width) / 2),
                        A.setAttribute("transform", "translate(" + (w - s + this.texts[n].letterSpacing) + ",0)  scale(" + t + ")"),
                        (w += A.getBBox().width * t + this.texts[n].letterSpacing),
                        A.getBBox().width < this.texts[n].minWidth && (w += this.texts[n].minWidth - A.getBBox().width);
                }
                var W = C.getBBox();
                C.setAttribute("transform", "translate(" + p * t + "," + (-W.y + p * t) + ")");
                var D = 0;
                "center" == f ? (D = (this.svg.getBoundingClientRect().width - W.width) / 2) : "right" == f && (D = this.svg.getBoundingClientRect().width - W.width),
                    this.setPosition(C, { x: D, y: c + this.contents.p.tf * t - S }),
                    (c += o * t),
                    (y += this.contents.p.tf * t + (this.contents.p.tf * t - k));
            }
            (void 0 != this.texts[n].y && 1 != this.texts[n].fromCurrentPosition.y) || this.setPosition(g, { y: r }),
                void 0 != this.texts[n].fromCurrentPosition && this.texts[n].fromCurrentPosition.y && (a += void 0 == this.texts[n].y ? 0 : this.texts[n].y),
                this.setPosition(g, { x: this.texts[n].x, y: this.texts[n].y }, this.texts[n].fromCurrentPosition),
                h && (a += y),
                void 0 != this.drawnCharacters[u] && (u = n),
                (this.drawnCharacters[u] = { characters: d, queued: this.texts[n].queued, container: g }),
                (void 0 == this.texts[n].autoAnimation || this.texts[n].autoAnimation) && this.properties.autoAnimation && (e.draw(u, x), (void 0 == this.texts[n].queued || this.texts[n].queued) && (e.prevDuration += x));
        }
        (this.completed = !0), this.svg.setAttribute("height", this.svg.getBBox().height + this.svg.getBBox().y + 10), this.readyF && this.readyF();
    }),
    (Vara.prototype.playAll = function () {
        this.prevDuration = 0;
        for (var t = 0; t < this.texts.length; t++) {
            var e = this.texts[t].duration,
                i = void 0 == this.texts[t].id ? t : this.texts[t].id;
            (this.prevDuration += this.texts[t].delay), this.draw(i, e), (void 0 == this.texts[t].queued || this.texts[t].queued) && (this.prevDuration += e);
        }
    }),
    (Vara.prototype.draw = function (t, e) {
        var i = this;
        if (void 0 == this.drawnCharacters[t]) return console.warn("ID:`" + t + "` not found. Animation skipped"), void console.trace();
        var s = this.getSectionPathLength(t),
            r = 0,
            o = void 0 == this.drawnCharacters[t].queued || this.drawnCharacters[t].queued ? this.prevDuration : 1;
        setTimeout(function () {
            i.drawnCharacters[t].characters.forEach(function (t) {
                t.querySelectorAll("path").forEach(function (t) {
                    var o = (t.style.strokeDashoffset / s) * e;
                    (t.style.opacity = 1), i.animate(t, o, r, 0), (r += o);
                });
            }),
                setTimeout(function () {
                    i.animationEndF && i.animationEndF(t, i.drawnCharacters[t]);
                }, r);
        }, o);
    }),
    (Vara.prototype.get = function (t) {
        return void 0 == this.drawnCharacters[t] ? (console.warn("ID:`" + t + "` not found."), console.trace(), !1) : this.drawnCharacters[t];
    }),
    (Vara.prototype.animate = function (t, e, i, s) {
        var r = this;
        (s = Number(s) || 0),
            setTimeout(function () {
                var i = new Date().getTime(),
                    o = Number(t.style.strokeDashoffset),
                    a = setInterval(function () {
                        var r = Math.min(1, (new Date().getTime() - i) / e);
                        (t.style.strokeDashoffset = o + r * (s - o)), 1 == r && clearInterval(a);
                    }, r.frameRate);
            }, i);
    }),
    (Vara.prototype.getSectionPathLength = function (t) {
        var e = this;
        return (
            (this.totalPathLength = 0),
            this.drawnCharacters[t].characters.forEach(function (t) {
                t.querySelectorAll("path").forEach(function (t) {
                    e.totalPathLength += t.getTotalLength();
                });
            }),
            this.totalPathLength
        );
    }),
    (Vara.prototype.analyseWidth = function () {
        var t = 0,
            e = this.svg.getBoundingClientRect().width,
            i = [],
            s = void 0 == this.characters[97] ? Object.keys(this.characters)[Math.round(Math.random() * this.characters.length)] : "97",
            r = document.createElement("span");
        this.element.appendChild(r), (r.style.opacity = 0), (r.style.position = "absolute"), (r.innerHTML = String.fromCharCode(s));
        var o = document.createElement("span");
        this.element.appendChild(o), (o.style.opacity = 0), (o.style.position = "absolute"), (o.innerHTML = " . ");
        for (var a = 0; a < this.texts.length; a++) {
            var h,
                n = this.texts[a];
            (h = "string" == typeof n.text ? [n.text] : n.text),
                (this.texts[a].text = h),
                (this.texts[a].letterSpacing = void 0 == this.texts[a].letterSpacing ? (void 0 == this.properties.letterSpacing ? 0 : this.properties.letterSpacing) : this.texts[a].letterSpacing),
                (this.texts[a].strokeWidth = void 0 == this.texts[a].strokeWidth ? (void 0 == this.properties.strokeWidth ? this.contents.p.bsw : this.properties.strokeWidth) : this.texts[a].strokeWidth);
            var d = void 0 == this.texts[a].breakWord ? void 0 != this.properties.breakWord && this.properties.breakWord : this.texts[a].breakWord,
                c = void 0 == n.fontSize ? (void 0 == this.properties.fontSize ? this.fontSize : this.properties.fontSize) : n.fontSize;
            (r.style.fontSize = c + "px"), (o.style.fontSize = c + "px");
            var p = r.getBoundingClientRect().width / this.characters[s].w;
            this.texts[a].minWidth = o.getBoundingClientRect().width;
            var l,
                x = void 0 == this.texts[a].width ? e : this.texts[a].width,
                u = [],
                v = void 0 == this.texts[a].x ? 0 : this.texts[a].x;
            (this.trueFontSize = c), (this.texts[a].fontSize = p);
            for (var f = 0; f < h.length; f++) {
                for (var g = v * p, y = [], m = h[f], w = 0, C = 0; C < m.length; C++)
                    if (
                        (void 0 != this.characters[m[C].charCodeAt(0)]
                            ? ((l = this.characters[m[C].charCodeAt(0)].w * p) < this.texts[a].minWidth && (l += (p * (this.texts[a].minWidth - this.characters[m[C].charCodeAt(0)].w)) / 2), (l += this.texts[a].letterSpacing))
                            : " " == m[C]
                            ? ((l = this.space.w * p), (w = g))
                            : (l = this.questionMark.w * p + this.texts[a].letterSpacing),
                        g + (l += this.texts[a].strokeWidth * p) >= x)
                    ) {
                        0 == w && (d = !0);
                        var S = C;
                        " " == m[C] || d || (S = m.slice(0, S + 1).search(/\S+$/)), y.push(S), (g = v * p + g - w);
                    } else (t += l), (g += l);
                u.push(y);
            }
            i.push(u);
        }
        return r.parentNode.removeChild(r), o.parentNode.removeChild(o), { width: t, breakPoints: i };
    }),
    (Vara.prototype.setPosition = function (t, e, i) {
        ((i = void 0 == i ? { x: !1, y: !1 } : i).x = void 0 != i.x && i.x), (i.y = void 0 != i.y && i.y);
        var s = t.transform.baseVal.consolidate().matrix,
            r = s.e,
            o = s.f;
        void 0 != e.x && (i.x ? (r += e.x) : (r = e.x)), void 0 != e.y && (i.y ? (o += e.y) : (o = e.y - t.getBBox().y)), t.transform.baseVal.consolidate().setTranslate(r, o);
    });
