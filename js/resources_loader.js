function ResourcesLoader() {
    var results = {};
    var paths = {
        sky: 'resources/img/sky.png',
        bg: 'resources/img/bg.png'
    };

    this.loadImages = function (callback) {
        for (var key in paths) {
            var img = new Image();

            img.alt = key;
            img.onload = function () {
                results[this.alt] = this;

                if (Object.keys(results).length === Object.keys(paths).length
                    && typeof callback === 'function')
                    callback(results);
            };

            img.src = paths[key];
        }
    };
}