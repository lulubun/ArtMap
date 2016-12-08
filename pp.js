bfsPath = ["North", "East"];

enemies = [1, 2];

class Enemy {

    constructor() {
        this.idx = 0;
        this.x = 0;
        this.y = 0;
        this.frameCount = 0;
    }

    update() {
        this.frameCount++;
        if (this.frameCount % 20 == 0) {
            // change direction logic using bfs Path
            var dir = bfsPath[this.idx];
            if (dir == "North") {
                this.x--;
            }
            this.idx++;
        }
        // move x and y for pixel position
    }

    show() {
        // renders to DOM
    }
}

// runs every frame, draws first then updates for the subsequent frame
function draw() {
    // logic to draw
    for (var i = 0 ; i < enemies.length ; i++) {
        enemies[i].show();
    }

    // logic to update
    for (var i = 0 ; i < enemies.length ; i++) {
        enemies[i].update();
    }
}
