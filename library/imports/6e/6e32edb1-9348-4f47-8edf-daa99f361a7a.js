"use strict";
cc._RF.push(module, '6e32e2xk0hPR47f2qmfNhp6', 'ChapterData');
// Script/game/data/ChapterData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//测试数据
var ChapterData = /** @class */ (function () {
    function ChapterData() {
    }
    ChapterData.getNodeList = function (chapterNum) {
        for (var index = 0; index < ChapterData.chapterAry.length; index++) {
            var chapterInfo = ChapterData.chapterAry[index];
            if (chapterInfo.chapterNum == chapterNum)
                return chapterInfo.nodeList;
        }
    };
    ChapterData.chapterAry = [
        {
            chapterNum: 1,
            nodeList: [
                { index: 1, star: 2, bg: 2, x: -580, y: 111 },
                { index: 2, star: 3, bg: 2, x: -430, y: 120 },
                { index: 3, star: 1, bg: 2, x: -263, y: 71 },
                { index: 4, star: 2, bg: 1, x: -278, y: -89 },
                { index: 5, star: 3, bg: 1, x: -100, y: -77 },
                { index: 6, star: 2, bg: 1, x: 5, y: 70 },
                { index: 7, star: 2, bg: 0, x: 184, y: 73 },
                { index: 8, star: 3, bg: 0, x: 287, y: 167 },
                { index: 9, star: 3, bg: 0, x: 485, y: 163 },
                { index: 10, star: 3, bg: 0, x: 595, y: -30 }
            ]
        },
        {
            chapterNum: 2,
            nodeList: [
                { index: 1, star: 2, bg: 2, x: -580, y: 111 },
                { index: 2, star: 3, bg: 2, x: -430, y: 120 },
                { index: 3, star: 1, bg: 2, x: -263, y: 71 },
                { index: 4, star: 2, bg: 1, x: -278, y: -89 },
                { index: 5, star: 3, bg: 1, x: -100, y: -77 },
                { index: 6, star: 2, bg: 1, x: 5, y: 70 },
                { index: 7, star: 2, bg: 0, x: 184, y: 73 },
                { index: 8, star: 3, bg: 0, x: 287, y: 167 },
                { index: 9, star: 3, bg: 0, x: 485, y: 163 },
                { index: 10, star: 3, bg: 0, x: 702, y: 38 }
            ]
        }
    ];
    return ChapterData;
}());
exports.default = ChapterData;

cc._RF.pop();