var GameManager = (function () {

    var Game = {

        config: null,
        actuator: null,
        inputManager: null,
        player: null,

        stage: 'START',
        trees: [],

        stageActions: {
            'START': null,
            'PAUSE': null,
            'GAME_OVER': null,
            'PLAYER_ACTION': null
        },

        init: function (configuration, actuator, inputManager, player) {
            var self = this;

            self.stageActions['START'] = self.onStart;
            self.stageActions['PAUSE'] = self.onPause;
            self.stageActions['GAME_OVER'] = self.onGameOver;
            self.stageActions['PLAYER_ACTION'] = self.onPlayerAction;

            self.config = configuration;
            self.actuator = actuator;
            self.inputManager = inputManager;
            self.player = player;

            self.actuator.setup(function () {
                self.newGame();
                self.inputManager.listen();
                self.startLoop();
            });
        },

        startLoop: function () {
            setInterval(Game.act, 1000 / Game.config.FPS);
        },

        act: function () {
            Game.update();
            Game.actuator.actuate(Game.player, Game.trees, Game.stage);
        },

        update: function () {
            var isPlayerAction = Game.inputManager.isPlayerAction();

            console.log(Game.inputManager.keyPressed);

            Game.stageActions[Game.stage](isPlayerAction);
            Game.inputManager.clear();
        },

        onStart: function (isPlayerAction) {
            if (isPlayerAction) {
                Game.stage = 'PLAYER_ACTION';
            }
        },

        onPause: function (isPlayerAction) {
            if (isPlayerAction) {
                Game.stage = 'PLAYER_ACTION';
            }
        },

        onGameOver: function (isPlayerAction) {
            if (isPlayerAction) {
                Game.stage = 'PLAYER_ACTION';
                Game.newGame();
            }
        },

        onPlayerAction: function (isPlayerAction) {
            var player = Game.player;

            if (isPlayerAction) {
                player.gravity = Game.config.player.gravity - Game.config.physics.gravity;
            } else if (Game.inputManager.keyPressed === 112) {
                Game.stage = 'pause';
            } else if (player.gravity !== Game.config.player.gravity) {
                player.gravity += Game.config.physics.gravity / Game.config.physics.jumpLoops;
            }

            player.y += player.gravity;

            Game.player.frameCount = Game.player.frameCount || 0;
            Game.player.frameCount = Game.player.frameCount === 5 ? 0 : Game.player.frameCount + 1;

            if (!Game.player.frameCount) {
                Game.player.wingUp = !Game.player.wingUp;
            }

            for (var i = 0; i < Game.trees.length; i++) {
                var treePair = Game.trees[i];
                treePair.x -= Game.config.tree.speed;

                if (treePair.x < Game.config.tree.width * -1) {
                    Game.trees.splice(i, 1);
                    Game.trees.push(Game.createRandomTreePair());
                    Game.player.points++;
                }
            }

            if (Game.hasLost()) {
                Game.stage = 'GAME_OVER';
            }
        },

        newGame: function () {
            Game.trees = [];

            Game.player.x = Game.config.player.x;
            Game.player.y = Game.config.player.y;
            Game.player.gravity = Game.config.player.gravity;
            Game.player.points = 0;

            for (var i = 1; i <= 5; i++) {
                Game.trees.push(Game.createRandomTreePair());
            }
        },

        hasLost: function () {
            return (Game.player.y > (Game.config.game.size.height - Game.player.size.height))
                || Game.checkTreeCollision();
        },

        checkTreeCollision: function () {
            var self = Game;

            for (var i = 0; i < Game.trees.length; i++) {
                var treePair = Game.trees[i];

                if (treePair.collisions && treePair.collisions.some(function (item) {
                        return self.checkBoxCollision({
                            x: self.player.x,
                            y: self.player.y,
                            w: self.player.size.width,
                            h: self.player.size.height
                        }, item);
                    })) {
                    return true;
                }
            }

            return false;
        },

        checkBoxCollision: function (box1, box2) {
            return box1.x < box2.x + box2.w &&
                box1.x + box1.w > box2.x &&
                box1.y < box2.y + box2.h &&
                box1.y + box1.h > box2.y;
        },

        createRandomTreePair: function () {
            return {
                x: Game.trees.length
                    ? (Game.trees[Game.trees.length - 1].x + Game.config.tree.distance)
                    : Game.config.game.size.width,
                y: Math.floor(Math.random() * (60 - 20 + 1)) + 20
            }
        }
    };

    return Game;
}());