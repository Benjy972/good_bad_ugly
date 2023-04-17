class Coordonnees {
    x=0;
    y=0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getCopy() {
        return new Coordonnees(this.x, this.y);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    getDistance(coords) {
        return Math.sqrt(Math.pow(coords.x - this.x, 2) + Math.pow(coords.y - this.y, 2));
    }

    getDistanceCoords(px, py) {
        return Math.sqrt(Math.pow(px - this.x, 2) + Math.pow(py - this.y, 2));
    }

    equals(coords) {
        return this.getDistance(coords) == 0;
    }

    equalsCoords(px, py) {
        return this.x == px && this.y == py;
    }

    getAngle(coords) {
        return Math.atan2(coords.y-this.y, coords.x-this.x);
    }
}