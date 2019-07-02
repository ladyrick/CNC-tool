"use strict";

if (window.screen.height > window.screen.width) {
    document.body.style.maxWidth = "95%";
}

var nav = new Vue({
    el: "#navigator",
    data: {
        tab: "螺纹切削"
    }
});


var tab1 = new Vue({
    el: "#tab1",
    data: {
        luoju: "0.0",
        luoju_list: ["0.0", "1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0"],
        yashen: "0.000",
        yashen_list: ["0.000", "0.649", "0.974", "1.299", "1.624", "1.949", "2.273", "2.598"],
        chidao_list: [
            [],
            ["0.7", "0.4", "0.2"],
            ["0.8", "0.6", "0.4", "0.16"],
            ["0.9", "0.6", "0.6", "0.4", "0.1"],
            ["1.0", "0.7", "0.6", "0.4", "0.4", "0.15"],
            ["1.2", "0.7", "0.6", "0.4", "0.4", "0.4", "0.2"],
            ["1.5", "0.7", "0.6", "0.6", "0.4", "0.4", "0.2", "0.15"],
            ["1.5", "0.8", "0.6", "0.6", "0.4", "0.4", "0.4", "0.3", "0.2"],
        ],
        d: "",
        luowen: "车外螺纹",
        jinshu: "塑性金属"
    },
    computed: {
        active: function () {
            return nav.tab === "螺纹切削";
        },
        chidao: function () {
            return this.chidao_list[this.luoju_list.indexOf(this.luoju)].map(
                function (value, index) {
                    return { index: index + 1, value: value };
                }
            );
        },
        lwdij: function () {
            // 螺纹底径
            var d = new Number(this.d);
            if (this.d === "" || d < 0) {
                return "——";
            }
            if (this.luowen === "车外螺纹") {
                return this.fix(d - 1.3 * Number(this.luoju));
            } else if (this.luowen === "车内螺纹") {
                return this.fix(d);
            }
            return "——";
        },
        lwdingj: function () {
            // 螺纹顶径
            var d = new Number(this.d);
            if (this.d === "" || d < 0) {
                return "——";
            }
            if (this.luowen === "车外螺纹") {
                return this.fix(d - 0.4) + "~" + this.fix(d - 0.2);
            } else if (this.luowen === "车内螺纹") {
                if (this.jinshu === "塑性金属") {
                    return this.fix(d - Number(this.luoju));
                } else if (this.jinshu === "脆性金属") {
                    return this.fix(d - 1.05 * Number(this.luoju));
                }
            }
            return "——";
        },
        clwqdkj: function () {
            // 车螺纹前的孔径
            if (this.luowen === "车外螺纹") {
                return "——";
            } else if (this.luowen === "车内螺纹") {
                return this.lwdingj;
            }
            return "——";
        }
    },
    methods: {
        set_luoju: function (luoju) {
            this.luoju = luoju;
            this.yashen = this.yashen_list[this.luoju_list.indexOf(luoju)];
        },
        set_yashen: function (yashen) {
            this.yashen = yashen;
            this.luoju = this.luoju_list[this.yashen_list.indexOf(yashen)];
        },
        fix: function (x) {
            return Math.round(x * 100) / 100;
        }
    }
});

var tab2 = new Vue({
    el: "#tab2",
    data: {
        material: "——",
        method: "——",
        database: [
            ["——", "——", "——", "——", "——", "——"],

            ["碳素钢 σ_b>600MPa", "粗加工", "5~7", "60~80", "0.2~0.4", "YT类"],
            ["碳素钢 σ_b>600MPa", "粗加工", "2~3", "80~120", "0.2~0.4", "YT类"],
            ["碳素钢 σ_b>600MPa", "精加工", "0.2~0.3", "120~150", "0.1~0.2", "YT类"],
            ["碳素钢 σ_b>600MPa", "车螺纹", "~", "70~100", "导程", "YT类"],
            ["碳素钢 σ_b>600MPa", "钻中心孔", "~", "500~800r/min", "~", "W18Cr4V"],
            ["碳素钢 σ_b>600MPa", "钻孔", "~", "~30", "0.1~0.2", "W18Cr4V"],
            ["碳素钢 σ_b>600MPa", "切断(宽度<5mm)", "~", "70~110", "0.1~0.2", "YT类"],

            ["合金钢 σ_b=1470MPa", "粗加工", "2~3", "50~80", "0.2~0.4", "YT类"],
            ["合金钢 σ_b=1470MPa", "精加工", "0.1~0.15", "60~100", "0.1~0.2", "YT类"],
            ["合金钢 σ_b=1470MPa", "切断(宽度<5mm)", "~", "40~70", "0.1~0.2", "YT类"],

            ["铸铁 200HBS以下", "粗加工", "2~3", "50~70", "0.2~0.4", "YG类"],
            ["铸铁 200HBS以下", "精加工", "0.1~0.15", "70~100", "0.1~0.2", "YG类"],
            ["铸铁 200HBS以下", "切断(宽度<5mm)", "~", "50~70", "0.1~0.2", "YG类"],

            ["铝", "粗加工", "2~3", "600~1000", "0.2~0.4", "YG类"],
            ["铝", "精加工", "0.2~0.3", "800~1200", "0.1~0.2", "YG类"],
            ["铝", "切断(宽度<5mm)", "~", "600~1000", "0.1~0.2", "YG类"],

            ["黄铜", "粗加工", "2~4", "400~500", "0.2~0.4", "YG类"],
            ["黄铜", "精加工", "0.1~0.15", "450~600", "0.1~0.2", "YG类"],
            ["黄铜", "切断(宽度<5mm)", "~", "400~500", "0.1~0.2", "YG类"]
        ],
        d: ""
    },
    computed: {
        active: function () {
            return nav.tab === "数控车削";
        },
        material_list: function () {
            var m_list = []
            for (var i of this.database) {
                var m = i[0];
                if (m_list.indexOf(m) < 0) {
                    m_list.push(m);
                }
            }
            return m_list;
        },
        method_list: function () {
            var m_list = []
            for (var i of this.database) {
                var m = i[1];
                if (m_list.indexOf(m) < 0) {
                    m_list.push(m);
                }
            }
            return m_list;
        },
        dataline: function () {
            for (var i in this.database) {
                if (this.database[i][0] === this.material && this.database[i][1] === this.method) {
                    return this.database[i];
                }
            }
            return this.database[0];
        },
        zzzs: function () {
            var d = new Number(this.d);
            console.log(d);
            if (d == 0) {
                return "——";
            }
            var qxsd = this.dataline[3]; // 切削速度
            var pattern = /^(\d*)~(\d+)$/;
            var match = pattern.exec(qxsd);
            if (match === null) {
                return "——";
            }

            function comput_n(qxsd, d) {
                return qxsd === "" ? "" : parseInt(1000 * Number(qxsd) / Math.PI / d);
            }
            var n_low = comput_n(match[1], d);
            var n_high = comput_n(match[2], d);
            if (n_low < 0 || n_high < 0 || n_high < n_low) {
                return "——";
            }
            return n_low + "~" + n_high;
        }
    },
    methods: {
        set_material: function (material) {
            this.material = material;
        },
        set_method: function (method) {
            this.method = method;
        }
    }
});