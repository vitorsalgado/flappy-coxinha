window.requestAnimationFrame(function () {
    var resourcesManager = new ResourcesManager();

    resourcesManager.loadAll(function () {
        var actuator = new HtmlActuator(Configuration, resourcesManager);
        var inputManager = new InputManager();
        var player = new Player(resourcesManager);

        GameManager.init(Configuration, actuator, inputManager, player);
    });
});