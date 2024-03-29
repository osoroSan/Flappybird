// Selecting elements and creating a scoreboard
const banner = document.querySelector(".banner");
const scoreboard = document.createElement("h3");
banner.append(scoreboard);

// Utility functions for random number generation and logging
const simp = (m, n) => {
    return Math.floor(Math.random() * (m - n) + n);
};

const imp = (m, n) => {
    return Math.random() * (m - n) + n;
};

const log = (s) => {
    console.log(s);
};

// Selecting the SVG element using D3.js
const svg = d3.select("svg");

// Class for creating obstacle circles
class kai {
    constructor() {
        this.y = simp(500, 0);
        this.x = simp(400, 0);
        this.spectrum = ["red", "yellow", "pink", "white", "blue", "teal"];
        this.mass = svg
            .append("circle")
            .attr("fill", this.spectrum[simp(5, 0)])
            .attr("r", imp(1, 0))
            .attr("cx", this.x)
            .attr("cy", this.y);
    }
}

// Generating 350 obstacle circles
for (let i = 0; i < 350; i++) {
    let xhuo = new kai();
}

// Class for the player's avatar
class avatar {
    constructor() {
        this.vel = 0;
        this.grav = 0.088;
        this.y = 250;
        this.x = 100;
        this.score = 0;
        this.force = -3;
        this.mass = svg
            .append("circle")
            .attr("r", 15)
            .attr("fill", "beige")
            .attr("cx", this.x)
            .attr("cy", this.y);
    }

    // Method for handling avatar movement
    move() {
        window.addEventListener("keypress", (e) => {
            if (this.vel <= -3) {
                this.vel = -3;
            }
            this.vel += this.force;
            this.y += this.vel;
            this.mass.attr("cy", this.y);
        });
    }

    // Method for updating avatar position
    update() {
        if (this.y > 480) {
            this.y = 480;
        }
        if (this.y < 20) {
            this.y = 20;
        }
        if (this.vel >= 4) {
            this.vel = 4;
        }
        this.vel += this.grav;
        this.y += this.vel;
        this.mass.attr("cy", this.y);
    }
}

// Function for checking collisions between avatar and obstacles
const check = (a, b, c, d, e) => {
    if (asta.x > a - 8 && asta.x < a + 25 + 8) {
        if (asta.y > c && asta.y < d + 8) {
            asta.crash = true;
        }
        if (asta.y > e - 8) {
            asta.crash = true;
        }
    }
};

// Class for creating pipes
class pipe {
    constructor(s) {
        this.x = s;
        this.y1 = 5;
        this.h1 = simp(300, 100);
        this.y2 = this.y1 + this.h1 + gap;
        this.h2 = 500 - this.y2;
        this.w = 25;
        this.mass = svg
            .append("rect")
            .attr("x", this.x)
            .attr("fill", "grey")
            .attr("width", this.w)
            .attr("y", this.y1)
            .attr("height", this.h1);
        this.bass = svg
            .append("rect")
            .attr("x", this.x)
            .attr("fill", "grey")
            .attr("width", this.w)
            .attr("y", this.y2)
            .attr("height", this.h2);
    }

    // Method for updating pipe position
    update() {
        this.x -= 1.5;

        if (this.x < 108 && this.x > 67) {
            check(this.x, this.w, this.y1, this.h1, this.y2);
            if (asta.crash) {
                asta.mass.attr("fill", "red");
                asta.interrupt();
            }
        }

        if (this.x < -25) {
            asta.score++;
            scoreboard.textContent = `Your score: ${asta.score}`;

            this.x = 600;
            this.y1 = 5;
            this.h1 = simp(300, 100);
            this.y2 = this.y1 + this.h1 + gap;
            this.h2 = 500 - this.y2;
            this.bass.attr("y", this.y2);
            this.mass.attr("y", this.y1);
            this.bass.attr("height", this.h2);
            this.mass.attr("height", this.h1);
        }

        this.bass.attr("x", this.x);
        this.mass.attr("x", this.x);
    }
}

// Array to store pipe instances
const kipe = [];
const daa = [375, 575, 775];
const atom = new pipe(daa[0]);
const toni = new pipe(daa[1]);
const kodak = new pipe(daa[2]);

// Creating the player's avatar and initializing movement
const asta = new avatar();
asta.move();

// Game loop function
const bond = () => {
    atom.update();
    toni.update();
    kodak.update();
    asta.update();
    requestAnimationFrame(bond);
};

// Initial call to the game loop
requestAnimationFrame(bond);
