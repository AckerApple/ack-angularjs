export default "<!DOCTYPE html><html class=\"font-helvetica\" lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"initial-scale=1, maximum-scale=1, user-scalable=0\"><script src=\"ack-angular.js\" type=\"text/javascript\"></script><script src=\"ack-state.js\" type=\"text/javascript\"></script><link href=\"styles.css\" type=\"text/css\" rel=\"stylesheet\"><style>html,body{margin:0;padding:0;}"+
"\n</style><script>angular.module('demoApp',['ack-angular','ack-state'])"+
"\n.component('x', {template:'X'})"+
"\n.component('testLab', {"+
"\n  transclude:true"+
"\n  ,template:'<ng-transclude></ng-transclude>'"+
"\n  ,controller:function($scope){"+
"\n    $scope.$parent.$ctrl = this"+
"\n    this.stringInterpolation='one<strong>Strong{{1+1}}</strong><x></x>'"+
"\n  }"+
"\n})</script></head><body ng-app=\"demoApp\"><test-lab><div class=\"pos-fixed top-0 width-full bg-white animate-height\" on-screen-scroll=\"isShrinkHead=y&gt;55\"><div class=\"pad-sm\"><h1 class=\"animate-all margin-0\" ng-class=\"{'text-sm':isShrinkHead&amp;&amp;screenWidth&lt;768}\">ack-angular</h1><div class=\"animate-height overflow-hidden\" ng-style=\"{height:isShrinkHead?0:'100px'}\"><p class=\"text-grey fx-fade-up fx-stagger-200\" ng-hide=\"isShrinkHead\">A library of commonly used web-app display and functionality techniques</p></div></div></div><div class=\"bg-black pad text-white\" style=\"padding-top:200px\"><user-inactive-trigger inactive-seconds=\"10\" warn-seconds=\"5\"></user-inactive-trigger><div class=\"margin-bottom-lg\"><h2>General Directives</h2><div class=\"flex flex-wrap\"><div class=\"flex-1 pad margin border-info nowrap\"><h3>interpolate-string</h3><div class=\"pad\">one<strong>Strong2</strong>X==<interpolate string=\"$ctrl.stringInterpolation\"></interpolate></div></div><div class=\"flex-1 pad margin border-info nowrap\"><h3>screen-width-model</h3><div class=\"pad\" screen-width-model=\"$ctrl.screenWidth\">Screen Width: {{ $ctrl.screenWidth }}</div></div><div class=\"flex-1 pad margin border-info nowrap\"><h3>screen-height-model</h3><div class=\"pad\" screen-height-model=\"$ctrl.screenHeight\">Screen Height: {{ $ctrl.screenHeight }}</div></div><div class=\"flex-1 pad margin border-info nowrap\"><h3>screen-scroll-height-model</h3><div class=\"pad\" screen-scroll-height-model=\"$ctrl.screenScrollHeight\">height: {{ $ctrl.screenScrollHeight }}</div></div><div class=\"flex-1 pad margin border-info nowrap\"><h3>on-screen-scroll</h3><div class=\"pad\" on-screen-scroll=\"$ctrl.scrollX=x;$ctrl.scrollY=y\">Screen Scroll: {{$ctrl.scrollX}}x{{$ctrl.scrollY}}</div></div><div class=\"flex-1 pad margin border-info nowrap\"><h3>screen-scroll-model-y</h3><div class=\"pad\" screen-scroll-model-y=\"screenScrollModelY\">Screen Y Scroll: {{ screenScrollModelY }}</div></div><div class=\"flex-1 pad margin border-info nowrap\"><h3>screen-height-excess-model</h3><div class=\"pad\" screen-height-excess-model=\"$ctrl.screenHeightExcess\">Screen Height Excess: {{ $ctrl.screenHeightExcess }}</div></div><div class=\"flex-1 pad margin border-info nowrap\"><h3>select-on</h3><div class=\"pad\"><input select-on=\"selectOn\" select-then=\"selectOn=false\" value=\"text to select\"><button ng-click=\"selectOn=true\">selectOn</button></div></div><div class=\"flex-1 pad margin border-info nowrap\"><h3>focus-on</h3><div class=\"pad\"><input focus-on=\"focusOn\" focus-then=\"focusOn=false\" placeholder=\"focus\"><button ng-click=\"focusOn=true\">focusOn</button></div></div><div class=\"flex-1 pad margin border-info nowrap\"><h3>prevent-back-key</h3><div class=\"pad\"><input prevent-back-key value=\"you cant backspace\"></div></div><div class=\"flex-1 pad margin border-info nowrap\"><h3>prevent-enter-key</h3><div class=\"pad\"><textarea prevent-enter-key value=\"you cant use enter key\"></textarea></div></div></div><h2>Animation Examples</h2><div class=\"flex flex-wrap\"><div class=\"flex-1 pad margin border-info nowrap\"><h3>shake-on Directive Examples</h3><div class=\"pad\"><div class=\"pad\"><label shake-on=\"shakeOn\" shake-then=\"shakeOn=false\" shake-type=\"shakeOnType\" shake-controller=\"shakeController\">shake this text</label></div><button ng-click=\"shakeOn=true\">shake:{{shakeOn||false}}</button><select ng-options=\"item for item in shakeController.shakeTypes\" ng-model=\"shakeOnType\" ng-change=\"shakeOn=true\"></select><input ng-model=\"shakeController.shakeForMs\" ng-change=\"shakeOn=true\"></div></div><div class=\"flex-1 pad margin border-info nowrap\"><h3>shake-model Directive Examples</h3><div class=\"pad\"><div class=\"pad\"><label shake-model=\"shakeModel\" shake-type=\"shakeModelType\" shake-controller=\"shakeModelController\">shake this text</label></div><button ng-click=\"shakeModel=true\">shake:{{shakeModel||false}}</button><select ng-options=\"item for item in shakeController.shakeTypes\" ng-model=\"shakeModelType\" ng-change=\"shakeModel=true\"></select><input ng-model=\"shakeModelController.shakeForMs\" ng-change=\"shakeModel=true\"></div></div><div class=\"flex-1 pad margin border-info nowrap\"><h3>Hide Show Examples</h3><div class=\"pad\"><button type=\"button\" ng-click=\"showFx=!showFx\">hide/show ng-fx</button><button type=\"button\" ng-click=\"showModal=!showModal\">hide/show white-out-modal</button><button type=\"button\" ng-click=\"showBlackModal=!showBlackModal\">hide/show black white-out-modal</button><div class=\"text-white\"><div class=\"fx-fade-up\" ng-show=\"showFx\"><h2>ng-fx</h2><hr><hr><hr><hr><hr><hr><h3>Awesomeness</h3></div></div></div></div></div></div><div class=\"margin-bottom-lg\"><h2>Filters</h2><table class=\"table-lines table-pad-xs border-collapse\"><thead><tr><th>name</th><th>unfiltered</th><th>filtered</th></tr></thead><tbody><tr><td>capitalize-words</td><td>FULL NAME</td><td>{{'FULL NAME'|capitalizeWords}}</td></tr></tbody></table></div><div class=\"margin-bottom-lg\"><h2>CSS Examples</h2><h3>Form Examples</h3><div class=\"pad\"><div class=\"form-group has-error\"><label>First Name</label><input></div><div class=\"form-group has-error\"><label>Last Name</label><input></div><div class=\"form-group has-error\"><label>Select Checkboxes</label><label for=\"input-x-0\"><input type=\"checkbox\" id=\"input-x-0\">&nbsp;Choice 0</label><label for=\"input-x-0\"><input type=\"checkbox\" id=\"input-x-0\">&nbsp;Choice 1</label></div></div></div></div><white-out-modal show=\"showBlackModal\" background-color=\"'rgba(0,0,0,.95)'\"><div class=\"text-white\"><h1>Not much to see here</h1></div></white-out-modal><white-out-modal show=\"showModal\"><div style=\"border:1px solid black\"><h1>{{'random tests'|capitalizeWords}}</h1><p>{{'all sentences should be capitalized. isn\'t that right? yup.'|capitalize}}</p><input type=\"text\" ng-init=\"testModel='needs uppercase'\" ng-model=\"testModel\" model-display=\"testModel|capitalizeWords\"><br><br><div ng-bind-html=\"'&lt;strong&gt;trustAsHtml&lt;/strong&gt;' | trustAsHtml\"></div><br><br><p>|aDate fromNow {{0|ack:'date':'now':['addMinutes',-15]:'fromNow'}}</p><p>this is my test on {{0|ack:'date':'mmddyy'}} @ {{0|ack:'date':'hhmmssl'}}</p><br><p>this is my test on {{0|ack:'date':'mmddyy'}} @ {{0|ack:'date':'hhmmtt'}}</p><br><br><h4>ackFilter</h4><ul><li>time: \"{{0|aDate:'now':'hmmtt'}}\"</li><li>time: \"{{0|aDate:'now':'hhmmtt'}}\"</li><li>empty-string: \"{{null|aDate:'hmmtt'}}\"</li><li>empty-string: \"{{null|aDate:'hhmmtt'}}\"</li><li>date-diff: {{0|aDate:'now':['addSeconds',60]:'dateSecondDiff'}} == 60</li><li>time: {{'13:30'|aTime:'hhmmtt'}} == 01:30 PM</li><li>time: {{'1:30 pm'|aTime:'hhmmtt'}} == 01:30 PM</li><li>time: {{'12:00 am'|aTime:'hhmmtt'}} == 12:00 AM</li><li>time: {{'12:00 pm'|aTime:'hhmmtt'}} == 12:00 PM</li><li>minuteDiff: {{'01/01/2014 2:00 am'|aDate:['dateMinuteDiff','01/02/2014 2:00 am']}} == 1440</li></ul><h4>ack:filter</h4><ul><li>time: \"{{0|ack:'date':'now':'hmmtt'}}\"</li><li>time: \"{{0|ack:'date':'now':'hhmmtt'}}\"</li><li>empty-string: \"{{null|ack:'date':'hmmtt'}}\"</li><li>empty-string: \"{{null|ack:'date':'hhmmtt'}}\"</li><li>date-diff: {{0|ack:'date':'now':['addSeconds',60]:'dateSecondDiff'}} == 60</li><li>time: {{'13:30'|ack:'time':'hhmmtt'}} == 01:30 PM</li><li>time: {{'1:30 pm'|ack:'time':'hhmmtt'}} == 01:30 PM</li><li>time: {{'12:00 am'|ack:'time':'hhmmtt'}} == 12:00 AM</li><li>time: {{'12:00 pm'|ack:'time':'hhmmtt'}} == 12:00 PM</li><li>minuteDiff: {{'01/01/2014 2:00 am'|ack:'date':['dateMinuteDiff','01/02/2014 2:00 am']}} == 1440</li></ul><hr><div style=\"text-align:center\">tap outside of here to close</div></div></white-out-modal></test-lab></body></html>"