window.requestAnimationFrame(function () {
    var resourcesLoader = new ResourcesLoader();
    var actuator = new HtmlActuator(Configuration, resourcesLoader);
    var inputManager = new InputManager();
    var player = new Player();

    GameManager.init(Configuration, actuator, inputManager, player);
});