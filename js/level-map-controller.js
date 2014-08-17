var app = angular.module('levelApp', ['LocalStorageModule'])
  .controller('LevelMapController', ['localStorageService', function(localStorageService){

    this.defaults = [
      [
        { 'url': 'thingading.html', 'parents':[], 'solution': 'This is the wrong solution' },
      ],
      [
        { 'url': 'things.html', 'parents':['thingading.html'], 'solution': 'This is the solution' },
        { 'url': 'stuff.html', 'parents':['thingading.html'], 'solution': 'This is the solution to the second thing' }
      ],
      [
        { 'url': 'a/things.html', 'parents':['things.html', 'stuff.html'], 'solution': 'This is the solution' },
        { 'url': 'a/stuff.html', 'parents':['stuff.html'], 'solution': 'This is the solution to the second thing' }
      ]
    ]

    this.init = function(){
      this.levels = localStorageService.get('levels') || this.defaults

      this.edit = false
    }

    this.addLevel = function(index){
      this.levels[index].push({})
      this.save()
    }

    this.addLevelVal = function(){
      console.log('Adding level val')
      this.levels.push([{}])
      this.save()
    }

    this.save = function(){
      //localStorageService.add('levelKey', JSON.stringify(this.levels))
    }

    this.init()

  }])
  .directive('levelinfo', function() {
    return {
      restrict: 'E',
      scope: {
        level: '=',
        edit: '='
      },
      //templateUrl: 'templates/level.html',
      template: '<section id="{{level.url}}"><p class="url"><span ng-show="!edit">{{level.url}}</span><input ng-show="edit" ng-model="level.url" /></p><div class="solutionBar" ng-click="showing = !showing">Solution<i class="angle up icon revealSolution" ng-class="showing || edit ? \'rotatepi\' : \'\'"></i></div><article ng-class="showing || edit ? \'shown\' : \'hidden\'"><span ng-show="!edit">{{level.solution}}</span><textarea ng-show="edit" ng-model="level.solution"></textarea></article></section>',
      link: function(scope, element, attrs) {

        scope.showing = false

      }
    }
  })
  .directive('levelconnector', function($timeout) {
    return {
      restrict: 'E',
      scope: {
        parent: '@',
        child: '@'
      },
      //templateUrl: 'templates/levelconnector.html',
      template: '<div class="line"></div>',
      link: function(scope, element, attrs) {

        connect(element, document.getElementById(scope.child), document.getElementById(scope.parent))

      }
    }
  })

    var addSyles = function(elm, cx, cy, length, angle) {
      elm = angular.element(elm.children('div')[0])
      elm.css('left', cx + 'px')
      elm.css('top', cy + 'px')
      elm.css('width', length + 'px')
      elm.css('-webkit-transform', 'rotate(' + angle + 'deg)')
      elm.css('-ms-transform', 'rotate(' + angle + 'deg)')
      elm.css('transform', 'rotate(' + angle + 'deg)')
    }

    //http://stackoverflow.com/questions/8672369/how-to-draw-a-line-between-two-divs
    var connect = function(elm, div1, div2) {
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
      var cy = ((y1 + y2) / 2) - 1
      // angle
      var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI)

      addSyles(elm, cx, cy, length, angle)
    }

    var getOffset = function(el) {
        var x = 0
        var y = 0
        var w = el.offsetWidth || 0
        var h = el.offsetHeight || 0
        // //needs debugging for scroll
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            x += el.offsetLeft - el.scrollLeft
            y += el.offsetTop - el.scrollTop
            el = el.offsetParent
        }
        return { top: y, left: x, width: w, height: h }
    }
