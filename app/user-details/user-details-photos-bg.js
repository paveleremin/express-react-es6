export default class {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.rgb = {
            r: 0,
            b: 0,
            g: 0
        };
        this.cnt = 0;
    }

    setBackgroud() {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        //img.tainted = true;
        img.onload = () => {
            this.wrapper.style.background = this.analyse(img, 1);
        };
        img.src = this.wrapper.children[0].src;
    }

    countBuffer(data) {
        let i = 0;
        while (i < data.length) {
            this.rgb.r += data[i++];
            this.rgb.g += data[i++];
            this.rgb.b += data[i++];
            this.cnt++;
            i++;
        }
    }

    analyse(img, border) {
        const canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            w = img.naturalWidth,
            h = img.naturalHeight;

        canvas.width = w;
        canvas.height = h;

        context.drawImage(img, 0, 0);

        let top, left, right, bottom;
        try {
            top = context.getImageData(0, 0, w, border).data;
            left = context.getImageData(0, border, border, h-border * 2).data;
            right = context.getImageData(w-border, border, border, h-border * 2).data;
            bottom = context.getImageData(0, h-border, w, border).data;
        }
        catch (e) {
            return 'rgb(0,0,0)';
        }

        // count pixels and add up color components: (see function below)
        this.countBuffer(top);
        this.countBuffer(left);
        this.countBuffer(right);
        this.countBuffer(bottom);

        // calc average
        const r = (this.rgb.r / this.cnt+0.5) | 0,
            g = (this.rgb.g / this.cnt+0.5) | 0,
            b = (this.rgb.b / this.cnt+0.5) | 0;

        return `rgb(${r},${g},${b})`;

    }
}
