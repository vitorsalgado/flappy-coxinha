function ResourcesManager() {
    var cache = {};

    var paths = {
        bg: 'resources/bg.png',
        coxinha: 'resources/coxinha.png',
        brick: 'resources/brick.jpg'
    };

    this.get = function (key) {
        return cache[key];
    };

    this.loadAll = function (callback) {
        for (var key in paths) {
            var img = new Image();

            img.alt = key;
            img.onload = function () {
                cache[this.alt] = this;

                if (Object.keys(cache).length === Object.keys(paths).length) {
                    callback();
                }
            };

            img.src = paths[img.alt];
        }
    };
}