window.custom_map = {
    preload: function (parent) {
        // Load my interactive object sprite sheet.
        parent.game.load.spritesheet('ms', 'assets/maps/sketchworld/sketchworld.png', 75, 75);
    },
    preload_create: function (parent) {
    },
    preload_update: function (parent) {
    },
    create: function (parent) {
        window.custom_map.methods.addBlock('b1', 150, 1100, parent);
    },
    update: function (parent) {
    },
    methods: {
        addBlock: function (name, x,y, context) {
            let block;

            // Add the sprite objects to the world.
            block = context.game.add.sprite(150, 1100, 'ms', 13);

            context.blocks = context.blocks || [];
            context.blocks[name] = block;

            context.game.physics.p2.enable([context.blocks[name]], false);
            block.body.setRectangleFromSprite(context.blocks[name]);
            block.body.static = true;
            block.body.onBeginContact.add(
                window.custom_map.methods.blockHit,
                context
            );
        },
        blockHit: function (body, bodyB, shapeA, shapeB, equation) {
            // Check to make sure we were hit from below.
            if (window.custom_map.methods.fromBelow(equation)) {
                console.log("Hit the brick");
            }
        },
        fromBelow: function (eq) {
            if (eq[0].contactPointA[0] <= 0) { return false; }
            if (eq[0].contactPointA[1] > 0) { return false; }
            if (eq[1].contactPointA[0] > 0) { return false; }
            if (eq[1].contactPointA[1] > 0) { return false; }

            return true;
        }
    }
};