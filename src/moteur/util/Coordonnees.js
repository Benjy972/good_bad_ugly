class Coordonnees {
    x=0;
    y=0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    getDistance(coords) {
        return Math.sqrt(Math.pow(coords.x - this.x, 2) + Math.pow(coords.y - this.y, 2));
    }

    equals(coords) {
        return this.getDistance(coords) == 0;
    }

    /*getAngle(coords) {
        return Math.atan2(coords.y-this.y, coords.x-this.x);
    }*/
}