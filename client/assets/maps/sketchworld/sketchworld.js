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
        let block;

        // Add the sprite objects to the world.
        parent.block = parent.game.add.sprite(150, 100, 'ms', 13);

        parent.game.physics.p2.enable([parent.block], false);

        parent.block.body.setRectangleFromSprite(parent.block);
        parent.block.body.static = true;
        // parent.block.body.sprite = block;

        //block.body.setCircle(50);

        //  Check for the player hitting another object
        //parent.player.body.onBeginContact.add(this.methods.blockHit, parent);

        parent.block.body.onBeginContact.add(this.methods.blockHit, parent);

    },
    update: function (parent) {
    },
    methods: {
        blockHit: function blockHit(body, bodyB, shapeA, shapeB, equation) {

            //  The block hit something.
            //
            //  This callback is sent 5 arguments:
            //
            //  The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
            //  The p2.Body this Body is in contact with.
            //  The Shape from this body that caused the contact.
            //  The Shape from the contact body.
            //  The Contact Equation data array.
            //
            //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.
            if (body) {
                result = 'You last hit: '; // + body.sprite.key;
            }
            else {
                result = 'You last hit: The wall :)';
            }
            console.log(result, body, bodyB);
        }
    }
};