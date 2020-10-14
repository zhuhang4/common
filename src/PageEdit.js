import * as YR from './YR';
import MyData from './MyData';
export default class PageEdit extends PIXI.Container {
    constructor() {
        super();
        this.arr_editable = [];
        YR.Mediator.getInstance().add('PageEdit_In', this.pageChangeHandler.bind(this));
    }
    init(arr) {
        this.arr = arr;
        for (let item of arr) {
            this[item.targetName] = item.target;
            // this.addChild(this[item.text]);
        }
    }
    pageChangeHandler(e) {
        if (this.currentPage && this.currentPage.parent) {
            this.removeChild(this.currentPage);
        }
        this.resetEditableElement();
        console.log("e.idx:::",this[e.idx]);
        this.currentPage = this[e.idx];
        this.addChild(this.currentPage);
        this.getChildren(this.currentPage);
    }
    resetEditableElement()
    {
        this.arr_editable.forEach((e) => {
            TweenMax.killTweensOf(e);
            e.alpha = 1;
        })
        this.arr_editable.length = 0;
        this.arr_editable = [];
    }
    getChildren(target) {

        let arr_child = target.children;
        if (arr_child && arr_child.length > 0) {
            for (let i = 0; i < arr_child.length; i++) {
                this.getChildren(arr_child[i]);

            }
        }
        else if (arr_child && arr_child.length == 0) {
            if (target.editype == 'bt') {
                target.alpha = 1;
                target.removeAllListeners();
                target.on('pointerdown', () => {
                    this.arr_editable.forEach((e) => {
                        TweenMax.killTweensOf(e);
                        e.alpha = 1;
                    })
                    target.alpha = 1;
                    TweenMax.killTweensOf(target);
                    TweenMax.to(target, 0.5, { alpha: 0.0, repeat: -1, yoyo: true, ease: Cubic.easeInOut });
                    YR.Mediator.getInstance().fire('Vue_EditUpdateSingleBT', { id: target.editid, stat: '' });
                    this.arr_editable.push(target);
                });
            }
            else {
                target.alpha = 0.5;
            }
        }
    }
    resize() {
        console.log('resize');
    }
}