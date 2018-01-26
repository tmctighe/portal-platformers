window.custom_map.sketchworld = {
  preload: function(parent) {},
  preload_create: function(parent) {},
  preload_update: function(parent) {},
  create: function(parent) {
    // Load my interactive object sprite sheet.
    parent.game.load.spritesheet('ms', 'assets/maps/sketchworld/sketchworld.png', 75, 75);
  },
  update: function(parent) {}
};