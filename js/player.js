function Player() {
    this.points = 0;
    this.x = 0;
    this.y = 0;
    this.gravity = 0;
    this.wingUp = false;

    this.size = {
        width: 50,
        height: 50
    };
}

Player.prototype.renderTo = function (canvas) {
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.size.width, this.size.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x + this.size.width - 5, this.y + 12, 15, 10);

    ctx.beginPath();
    ctx.moveTo(this.x + 5, this.y + 25);
    ctx.lineTo(this.x + 40, this.y + 25);
    ctx.lineTo(this.x + 22.5, this.y + (this.wingUp ? 13 : 37));

    ctx.fill();
};