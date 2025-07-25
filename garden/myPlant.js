class MyPlant {
    constructor(title, img, forTrade = false) {
        this.title = title;
        this.img = img;
        this.forTrade = forTrade;
    }
    toJson() {
        return {
            title: this.title,
            img: this.img,
            forTrade: this.forTrade,
        };
    }
    static fromJson(obj) {
        return new MyPlant(obj.title, obj.img, obj.forTrade);
    }
}
export { MyPlant };
