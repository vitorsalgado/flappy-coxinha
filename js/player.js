function Player(resourcesManager) {
    this.points = 0;
    this.x = 0;
    this.y = 0;
    this.gravity = 0;

    this.size = {
        width: 33,
        height: 50
    };

    this.renderTo = function (canvas) {
        var ctx = canvas.getContext('2d');

        ctx.drawImage(resourcesManager.get('coxinha'), this.x, this.y);

        ctx.fillStyle = 'white';
        ctx.fillRect(this.x + this.size.width - 13, this.y + 12, 5, 5);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + this.size.width - 10, this.y + 12, 3, 3);

        ctx.fill();
    };
}