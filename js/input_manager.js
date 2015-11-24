function InputManager() {
    var keyPressed = 0;
    var mouseClick = 0;

    this.clear = function () {
        keyPressed = 0;
        mouseClick = 0;
    };

    this.listen = function () {
        document.addEventListener('keypress', function (e) {
            keyPressed = e.keyCode || e.which;
        });

        var wrapper = document.getElementById('wrapper');

        wrapper.addEventListener('click', function () {
            mouseClick = 1;
        });
    };

    this.isPlayerAction = function () {
        return keyPressed === 32 || keyPressed === 13 || mouseClick === 1;
    };

    this.isPausePressed = function () {
        return keyPressed === 112;
    }
}