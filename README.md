# ack-angular, the Acker Way of Fullfilling Our Everyday Angular Needs
Extra special directives, services and filters to aide in completeting everyday interface development needs

## This is a Stable Project But is Developing & Maturing
This code was born out of countless past production projects that were implemented and put together by Acker Apple. This code is used in existing production projects and is still primarly maintained by Acker Apple.

At this time, the documentation is just now evolving as this package is just now becoming a publically consumed piece of software. The demand for this code to be available for immediate use as a public package, has out weighed producing proper documentation.

Use this package at will, use with caution. PLEASE watch our version numbers as this package upgrades. Breaking changes will always be illustrated in a major version number change (IE. v1.0.0 versus v1.1.0)

## Simple Filter Example
```
  {{0|ack:'date':'mmddyy'}} {{0|ack:'date':'hhmmssl'}}
```
Result
```
  04/04/2016 15:36:32.15
```

## Complex Example Illustrating Included Directives & Filters
```
  <button type="button" ng-click="showModal=!showModal">hide/show white-out-modal</button>
  <white-out-modal show="showModal">
    this is my test on {{0|ack:'date':'mmddyy'}} @ {{0|ack:'date':'hhmmssl'}}
    <hr />
    <div style="text-align:center;">
      tap outside of here to close
    </div>
  </white-out-modal>
```

##Currently Included Directives
- whiteOutModal{show:'=', size:'=?'}

##Currently Included Filters
- |ack:'type':property-or-function:property-or-function:property-or-function

! Currently, animation css is included, DO NOT USE. These classes will be removed from this package entirely soon.