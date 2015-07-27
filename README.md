# Video.js Resolution Switcher

Resolution switcher for [video.js](https://github.com/videojs/video.js) build for [5.0.0-rc.29](https://github.com/videojs/video.js/tree/v5.0.0-rc.29)

## Getting Started

Once you've added the plugin script to your page, you can use it with any video:

```html
<video id='video'></video>
<script src="video.js"></script>
<script src="videojs-resolution-switcher.js"></script>
<script>
  videojs('video', {
    controls: true
  }, function(){
  
    // Add dynamically sources via newVideoSources method
    player.newVideoSources([
        {
          src: 'http://media.xiph.org/mango/tears_of_steel_1080p.webm',
          type: 'video/webm',
          label: '360'
        },
        {
          src: 'http://mirrorblender.top-ix.org/movies/sintel-1024-surround.mp4',
          type: 'video/mp4',
          label: '720'
        }
      ])

      player.on('resolutionchange', function(){
        console.info('Source changed to %s', player.src())
      })
      
  }).videoJsResolutionSwitcher();
</script>
```

There's also a [working example](example.html) of the plugin you can check out if you're having trouble.

## Methods


### newVideoSources([source])

```javascript

// Update video sources
player.newVideoSources([
  { type: "video/mp4", src: "http://www.example.com/path/to/video.mp4", label: 'SD' },
  { type: "video/mp4", src: "http://www.example.com/path/to/video.mp4", label: 'HD' },
  { type: "video/mp4", src: "http://www.example.com/path/to/video.mp4", label: '4k' }
])

```
#### PARAMETERS:
 * source `Array` array of sources


## Events

### resolutionchange `EVENT`

> Fired when resolution is changed


