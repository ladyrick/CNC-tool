"use strict";
var nav = new Vue({
    el: "#navigator",
    data: {
        tab: "螺纹切削"
    },
    methods: {
        active: function (tab_num) {
            if (tab_num === 0) {
                this.tab = "螺纹切削";
            } else if (tab_num == 1) {
                this.tab = "数控车削";
            }
        }
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
        ]
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
        }
    }
});

var tab2 = new Vue({
    el: "#tab2",
    data: {
        material: "——",
        material_list: ["——", "碳素钢", "合金钢", "铸铁200HBW以下", "钢", "黄铜"],
        method: "——",
        method_list: ["——", "粗加工", "精加工", "车螺纹", "钻中心孔", "钻孔", "切断(宽度<5mm)"],
        database: [
            ["——", "——", "——", "——", "——", "——"],

            ["碳素钢", "粗加工", "5~7", "60~80", "0.2~0.4", "YT类"],
            ["碳素钢", "粗加工", "2~3", "80~120", "0.2~0.4", "YT类"],
            ["碳素钢", "精加工", "0.2~0.3", "120~150", "0.1~0.2", "YT类"],
            ["碳素钢", "车螺纹", "~", "70~100", "导程", "YT类"],
            ["碳素钢", "钻中心孔", "~", "500~800r/min", "~", "W18Cr4V"],
            ["碳素钢", "钻孔", "~", "~30", "0.1~0.2", "W18Cr4V"],
            ["碳素钢", "切断(宽度<5mm)", "~", "70~110", "0.1~0.2", "YT类"],

            ["合金钢", "粗加工", "2~3", "50~80", "0.2~0.4", "YT类"],
            ["合金钢", "精加工", "0.1~0.15", "60~100", "0.1~0.2", "YT类"],
            ["合金钢", "切断(宽度<5mm)", "~", "40~70", "0.1~0.2", "YT类"],

            ["铸铁200HBW以下", "粗加工", "2~3", "50~70", "0.2~0.4", "YT类"],
            ["铸铁201HBW以下", "精加工", "0.1~0.15", "70~100", "0.1~0.2", "YT类"],
            ["铸铁202HBW以下", "切断(宽度<5mm)", "~", "50~70", "0.1~0.2", "YT类"],

            ["钢", "粗加工", "2~3", "600~1000", "0.2~0.4", "YG类"],
            ["钢", "精加工", "0.1~0.15", "800~1200", "0.1~0.2", "YG类"],
            ["钢", "切断(宽度<5mm)", "~", "600~1000", "0.1~0.2", "YG类"],

            ["黄铜", "粗加工", "2~4", "400~500", "0.2~0.4", "YG类"],
            ["黄铜", "精加工", "0.1~0.15", "450~600", "0.1~0.2", "YG类"],
            ["黄铜", "切断(宽度<5mm)", "~", "400~500", "0.1~0.2", "YG类"]
        ]
    },
    computed: {
        active: function () {
            return nav.tab === "数控车削";
        },
        dataline: function () {
            for (var i in this.database) {
                if (this.database[i][0] === this.material && this.database[i][1] === this.method) {
                    return this.database[i];
                }
            }
            return this.database[0];
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