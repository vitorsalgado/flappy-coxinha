function HtmlActuator(configuration, resourcesManager) {
    var config = configuration;
    var gameWidth = config.game.size.width;
    var gameHeight = config.game.size.height;
    var gameCanvas = null;
    var bufferCanvas = null;
    var gameContainer = document.getElementById('game-container');
    var pointsContainer = document.getElementById('points');
    var messageContainer = document.getElementById('message');
    var brick = resourcesManager.get('brick');

    this.setup = function () {
        gameCanvas = createCanvas('game-canvas');
        bufferCanvas = createCanvas('buffer-canvas');

        gameContainer.appendChild(gameCanvas);
    };

    this.actuate = function (player, trees, gameStage) {
        clearBufferCanvas();

        var ctx = bufferCanvas.getContext('2d');
        var backgroundResource = resourcesManager.get('bg');

        ctx.drawImage(backgroundResource, 0, 0, backgroundResource.width, backgroundResource.height, 0, 0, gameWidth, gameHeight);

        for (var i = 0; i < trees.length; i++) {
            drawTreePair(trees[i], player);
        }

        player.renderTo(bufferCanvas);

        switch (gameStage) {
            case 'START':
                showMessage('Press ENTER or Click to start a new game');
                break;
            case 'PAUSE':
                showMessage('Game paused');
                break;
            case 'GAME_OVER':
                showMessage('Game Over!<br/>Press ENTER or Click to start a new game');
                showScore(player.points);
                break;
            case 'PLAYER_ACTION':
                showMessage('');
                showScore(player.points);
                break;
        }

        transferCanvas();
    };

    drawTreePair = function (tree, player) {
        var ctx = bufferCanvas.getContext('2d');
        var treeHeight = config.tree.height;
        var treeWidth = config.tree.width;

        var upCorner = tree.y * gameHeight / 100;
        var downCorner = upCorner + player.size.height * 3;
        var treeDownY = upCorner - treeHeight;
        var treeUpY = downCorner;

        tree.collisions = [
            {x: tree.x, y: treeDownY, w: treeWidth, h: treeHeight},
            {x: tree.x, y: treeUpY, w: treeWidth, h: treeHeight}
        ];

        ctx.drawImage(brick, tree.x, treeDownY);
        ctx.drawImage(brick, tree.x, treeUpY);
    };

    createCanvas = function (identifier) {
        var canvas = document.createElement('canvas');

        canvas.setAttribute('width', gameWidth);
        canvas.setAttribute('height', gameHeight);
        canvas.setAttribute('id', identifier);

        return canvas;
    };

    clearBufferCanvas = function () {
        var context = bufferCanvas.getContext('2d');

        context.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
    };

    transferCanvas = function () {
        var source = bufferCanvas;
        var destination = gameCanvas;

        var sourceContext = source.getContext('2d');
        var destinationContext = destination.getContext('2d');
        var imageData = sourceContext.getImageData(0, 0, source.width, source.height);

        destinationContext.putImageData(imageData, 0, 0, 0, 0, source.width, source.height);
    };

    showMessage = function (message) {
        messageContainer.innerHTML = message;
    };

    showScore = function (playerScore) {
        pointsContainer.innerHTML = 'score ' + playerScore;
    };
}