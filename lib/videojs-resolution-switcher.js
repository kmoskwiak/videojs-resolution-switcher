/*! videojs-resolution-switcher - v0.0.0 - 2015-7-26
 * Copyright (c) 2015 Kasper Moskwiak
 * Licensed under the Apache-2.0 license. */
(function(window, videojs) {
  'use strict';

  var defaults = {
        option: true
      },
      videoJsResolutionSwitcher;

  /**
   * Initialize the plugin.
   * @param options (optional) {object} configuration for the plugin
   */
  videoJsResolutionSwitcher = function(options) {
    var settings = videojs.mergeOptions(defaults, options),
        player = this;

    /*
     * Resolution menu item
     */
    var MenuItem = videojs.getComponent('MenuItem')
    var ResolutionMenuItem = videojs.extends(MenuItem, {
      constructor: function(player, options){

        MenuItem.call(this, player, options);
        this.src = options.src;
        this.type = options.type;

        this.on('click', this.onClick)
      },
      onClick: function(){
        // Hide bigPlayButton
        player.bigPlayButton.hide()

        // Remember player state
        var currentTime = player.currentTime()
        var isPaused = player.paused()

        // Change player source and wait for loadedmetadata event, then play video
        player.src({src: this.src, type: this.type}).one( 'loadedmetadata', function() {
          player.currentTime(currentTime)

          if(!isPaused){
            player.play()
          }
          player.trigger('resolutionchange')
        })
      }
    })


   /*
    * Resolution menu button
    */
    var MenuButton = videojs.getComponent('MenuButton')
    var ResolutionMenuButton = videojs.extends(MenuButton, {
      constructor: function(player, options){
        this.sources = options.sources;

        MenuButton.call(this, player, options);

        this.controlText('Quality')

      },
      createItems: function(){

        var sources = this.sources;
        var menuItems = [];

        for(var i = 0; i < sources.length; i++){
          menuItems.push(new ResolutionMenuItem(player, {
            label: sources[i].label,
            src: sources[i].src,
            type: sources[i].type
          }))
        }

        return menuItems;
      }
    })


    player.updateSrc = function(src){

      // Dispose old resolution menu button before adding new sources
      if(player.controlBar.resolutionSwitcher){
        player.controlBar.resolutionSwitcher.dispose()
        delete player.controlBar.resolutionSwitcher
      }
      var menuButton = new ResolutionMenuButton(player, { sources: src });
      menuButton.el().classList.add('vjs-resolution-button')
      player.controlBar.resolutionSwitcher = player.controlBar.addChild(menuButton)

      player.src(src);
    }

    // Create resolution switcher for videos form <source> tag inside <video>
    if(player.options_.sources.length > 1){
      player.updateSrc(player.options_.sources)
    }

  };

  // register the plugin
  videojs.plugin('videoJsResolutionSwitcher', videoJsResolutionSwitcher);
})(window, window.videojs);
