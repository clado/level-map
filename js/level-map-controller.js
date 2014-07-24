var app = angular.module('levelApp', ['LocalStorageModule'])
  .controller('LevelMapController', ['localStorageService', function(localStorageService){

    this.defaults = {
      1: [
        { 'url': 'things.html', 'title': 'Title', 'parents':[], 'solution': 'This is the solution' },
        { 'url': 'stuff.html', 'title': 'Another Title', 'parents':[], 'solution': 'This is the solution to the second thing' }
      ],
      2: [
        { 'url': 'a/things.html', 'title': 'Title', 'parents':['things.html', 'stuff.html'], 'solution': 'This is the solution' },
        { 'url': 'a/stuff.html', 'title': 'Another Title', 'parents':['stuff.html'], 'solution': 'This is the solution to the second thing' }
      ]
    }

    this.init = function(){

      var levels = localStorageService.get('levels')
      this.levels = levels ? levels : this.defaults

      this.connectLevels()

    }

    this.connectLevels = function(){
      // this.defaults.forEach(function(levelVal){
      //   levelVal.forEach(function(level){
      //     level.parents.forEach(function(parent){

      //     })
      //   })
      // })
    }





    this.init()

  }])
  .directive('level', function($timeout) {
    return {
      restrict: 'E',
      scope: {
        level: '='
      },
      templateUrl: 'templates/level.html',
      link: function(scope, element, attrs) {

        scope.connect = connect

        var connectLevels = function(){
          scope.level.parents.forEach(function(parent){
            console.log(scope.level.url)
            scope.connect(document.getElementById(scope.level.url), document.getElementById(parent), 'things', 'stuff')
          })
        }

        $timeout(connectLevels, 0)

      }
    }
  })

    //http://stackoverflow.com/questions/8672369/how-to-draw-a-line-between-two-divs
    var connect = function(div1, div2, color, thickness) {
      var off1 = getOffset(div1)
      var off2 = getOffset(div2)
      // top center
      var x1 = off1.left + off1.width / 2;
      var y1 = off1.top
      // bottom center
      var x2 = off2.left + off2.width / 2;
      var y2 = off2.top + off2.height
      // distance
      var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)))
      // center
      var cx = ((x1 + x2) / 2) - (length / 2)
      var cy = ((y1 + y2) / 2) - (2 / 2)
      // angle
      var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI)
      // make hr
      var htmlLine = "<div style='padding:0px; margin:0px; height:2px; background-color:rgba(0,0,0,.6); line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />"

      document.body.innerHTML += htmlLine
    }

    var getOffset = function(el) {
        var x = 0
        var y = 0
        var w = el.offsetWidth || 0
        var h = el.offsetHeight || 0
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            x += el.offsetLeft - el.scrollLeft
            y += el.offsetTop - el.scrollTop
            el = el.offsetParent
        }
        return { top: y, left: x, width: w, height: h }
    }