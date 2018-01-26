window.custom_map = {
    winner: false,
    icons: [],
    preload: function (parent) {
        // Load my interactive object sprite sheet.
        parent.game.load.spritesheet('ms', 'assets/maps/sketchworld/sketchworld.png', 75, 75);

        parent.game.load.spritesheet('drupal', 'assets/img/source/druplicon-vector.png');
    },
    preload_create: function (parent) {
    },
    preload_update: function (parent) {
    },
    create: function (parent) {
        // window.custom_map.methods.addBlock('b1', 150, 1100, parent);
        window.custom_map.methods.addBlock('b1', 10300, 150, parent);

    },
    update: function (context) {
        if (window.custom_map.winner === true) {
            // window.custom_map.winner = false;

            if (Math.floor(Math.random()*2.0) === 1) {
                if (this.icons.length>150) {window.custom_map.winner = false;}

                d = context.game.add.sprite(150, 1100, 'drupal', 1);
                this.icons.push(d);
                d.scale.set(0.25, 0.25);
                context.game.physics.p2.enable([d], false);
                //context.druppel[x].body.setRectangleFromSprite(context.druppel[x]);

                d.body.x = context.player.x;
                d.body.y = context.player.y - 110;

                d.body.velocity.y = -800;
                d.body.velocity.x = Math.random()*1000.0 - 500.0;
            }
        } else {
            // Decay the sprites.
            if (this.icons.length > 1) {
                if (Math.floor(Math.random() * 1.1) === 1) {
                    d = this.icons.pop();
                    d.destroy();
                }
            }
        }
    },
    methods: {
        addBlock: function (name, x,y, context) {
            let block;

            // Add the sprite objects to the world.
            block = context.game.add.sprite(x, y, 'ms', 13);

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
                window.custom_map.winner = true;
                // mr = this.game.add.sprite(150, 1100, 'ms', 11);
                // this.game.physics.p2.enable([mr], false);
                // mr.body.setRectangleFromSprite(mr);
                // mr.body.velocity.y = -50;
                // mr.body.velocity.x = Math.random()*1000.0 - 500.0;
                // mr.created = Date.now();
                // mr.body.onBeginContact.add(
                //     function(a,b,c,d,e) {
                //         //if (a.created && (Date.now() - a.created > 10000)) {
                //         //    a.destroy(true);
                //         //    this.player.playerSprite.scale.set(3,3);
                //         //}
                //     }
                // );
            }
        },
        fromBelow: function (eq) {
            try {

                if (eq[0].contactPointA[0] <= 0) {
                    return false;
                }
                if (eq[0].contactPointA[1] > 0) {
                    return false;
                }
                if (eq[1].contactPointA[0] > 0) {
                    return false;
                }
                if (eq[1].contactPointA[1] > 0) {
                    return false;
                }
            }
            catch(e) {
                return false;
            }

            return true;
        }
    }
};