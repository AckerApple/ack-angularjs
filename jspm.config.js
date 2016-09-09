SystemJS.config({
  browserConfig: {
    "paths": {
      "npm:": "/jspm_packages/npm/",
      "github:": "/jspm_packages/github/",
      "ack-angular/": "/src/"
    }
  },
  nodeConfig: {
    "paths": {
      "npm:": "jspm_packages/npm/",
      "github:": "jspm_packages/github/",
      "ack-angular/": "src/"
    }
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.13",
      "core-js": "npm:core-js@1.2.7",
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel": "npm:babel-core@5.8.38"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "ack-angular": {
      "main": "ack-angular.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "ack-x": "npm:ack-x@1.2.18",
    "angular": "github:angular/bower-angular@1.5.8",
    "angular-activity-monitor": "npm:angular-activity-monitor@1.1.0",
    "angular-animate": "github:angular/bower-angular-animate@1.5.8",
    "angular-mocks": "github:angular/bower-angular-mocks@1.5.8",
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "constants": "github:jspm/nodelibs-constants@0.2.0-alpha",
    "crypto": "github:jspm/nodelibs-crypto@0.2.0-alpha",
    "estraverse": "npm:estraverse@4.2.0",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "localforage": "npm:localforage@1.4.2",
    "module": "github:jspm/nodelibs-module@0.2.0-alpha",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "readline": "github:jspm/nodelibs-readline@0.2.0-alpha",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
    "tty": "github:jspm/nodelibs-tty@0.2.0-alpha",
    "uglify-js": "npm:uglify-js@2.7.3",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha",
    "vm": "github:jspm/nodelibs-vm@0.2.0-alpha"
  },
  packages: {
    "npm:ack-x@1.2.18": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "moment": "npm:moment@2.14.1",
        "ack-p": "npm:ack-p@1.0.6"
      }
    },
    "npm:angular-activity-monitor@1.1.0": {
      "map": {
        "eslint": "npm:eslint@1.10.3",
        "uglify-js": "npm:uglify-js@2.6.4"
      }
    },
    "npm:eslint@1.10.3": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "chalk": "npm:chalk@1.1.3",
        "concat-stream": "npm:concat-stream@1.5.2",
        "estraverse-fb": "npm:estraverse-fb@1.3.1",
        "esutils": "npm:esutils@2.0.2",
        "globals": "npm:globals@8.18.0",
        "handlebars": "npm:handlebars@4.0.5",
        "is-my-json-valid": "npm:is-my-json-valid@2.13.1",
        "inquirer": "npm:inquirer@0.11.4",
        "json-stable-stringify": "npm:json-stable-stringify@1.0.1",
        "mkdirp": "npm:mkdirp@0.5.1",
        "js-yaml": "npm:js-yaml@3.4.5",
        "lodash.clonedeep": "npm:lodash.clonedeep@3.0.2",
        "lodash.merge": "npm:lodash.merge@3.3.2",
        "path-is-absolute": "npm:path-is-absolute@1.0.0",
        "object-assign": "npm:object-assign@4.1.0",
        "optionator": "npm:optionator@0.6.0",
        "glob": "npm:glob@5.0.15",
        "lodash.omit": "npm:lodash.omit@3.1.0",
        "xml-escape": "npm:xml-escape@1.0.0",
        "user-home": "npm:user-home@2.0.0",
        "text-table": "npm:text-table@0.2.0",
        "shelljs": "npm:shelljs@0.5.3",
        "is-resolvable": "npm:is-resolvable@1.0.0",
        "path-is-inside": "npm:path-is-inside@1.0.1",
        "file-entry-cache": "npm:file-entry-cache@1.3.1",
        "escope": "npm:escope@3.6.0",
        "doctrine": "npm:doctrine@0.7.2",
        "estraverse": "npm:estraverse@4.2.0",
        "strip-json-comments": "npm:strip-json-comments@1.0.4",
        "minimatch": "npm:minimatch@3.0.3",
        "espree": "npm:espree@2.2.5"
      }
    },
    "npm:localforage@1.4.2": {
      "map": {
        "lie": "npm:lie@3.0.2"
      }
    },
    "npm:debug@2.2.0": {
      "map": {
        "ms": "npm:ms@0.7.1"
      }
    },
    "npm:lie@3.0.2": {
      "map": {
        "es3ify": "npm:es3ify@0.1.4",
        "inline-process-browser": "npm:inline-process-browser@1.0.0",
        "unreachable-branch-transform": "npm:unreachable-branch-transform@0.3.0",
        "immediate": "npm:immediate@3.0.6"
      }
    },
    "npm:chalk@1.1.3": {
      "map": {
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "has-ansi": "npm:has-ansi@2.0.0",
        "ansi-styles": "npm:ansi-styles@2.2.1",
        "supports-color": "npm:supports-color@2.0.0"
      }
    },
    "npm:glob@5.0.15": {
      "map": {
        "minimatch": "npm:minimatch@3.0.3",
        "path-is-absolute": "npm:path-is-absolute@1.0.0",
        "inherits": "npm:inherits@2.0.1",
        "once": "npm:once@1.4.0",
        "inflight": "npm:inflight@1.0.5"
      }
    },
    "npm:inquirer@0.11.4": {
      "map": {
        "chalk": "npm:chalk@1.1.3",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "ansi-escapes": "npm:ansi-escapes@1.4.0",
        "ansi-regex": "npm:ansi-regex@2.0.0",
        "cli-cursor": "npm:cli-cursor@1.0.2",
        "lodash": "npm:lodash@3.10.1",
        "run-async": "npm:run-async@0.1.0",
        "rx-lite": "npm:rx-lite@3.1.2",
        "figures": "npm:figures@1.7.0",
        "readline2": "npm:readline2@1.0.1",
        "through": "npm:through@2.3.8",
        "string-width": "npm:string-width@1.0.2",
        "cli-width": "npm:cli-width@1.1.1"
      }
    },
    "npm:uglify-js@2.6.4": {
      "map": {
        "source-map": "npm:source-map@0.5.6",
        "yargs": "npm:yargs@3.10.0",
        "uglify-to-browserify": "npm:uglify-to-browserify@1.0.2",
        "async": "npm:async@0.2.10"
      }
    },
    "npm:handlebars@4.0.5": {
      "map": {
        "source-map": "npm:source-map@0.4.4",
        "optimist": "npm:optimist@0.6.1",
        "async": "npm:async@1.5.2"
      }
    },
    "npm:file-entry-cache@1.3.1": {
      "map": {
        "object-assign": "npm:object-assign@4.1.0",
        "flat-cache": "npm:flat-cache@1.2.1"
      }
    },
    "npm:is-my-json-valid@2.13.1": {
      "map": {
        "generate-function": "npm:generate-function@2.0.0",
        "generate-object-property": "npm:generate-object-property@1.2.0",
        "xtend": "npm:xtend@4.0.1",
        "jsonpointer": "npm:jsonpointer@2.0.0"
      }
    },
    "npm:concat-stream@1.5.2": {
      "map": {
        "readable-stream": "npm:readable-stream@2.0.6",
        "inherits": "npm:inherits@2.0.1",
        "typedarray": "npm:typedarray@0.0.6"
      }
    },
    "npm:doctrine@0.7.2": {
      "map": {
        "esutils": "npm:esutils@1.1.6",
        "isarray": "npm:isarray@0.0.1"
      }
    },
    "npm:escope@3.6.0": {
      "map": {
        "estraverse": "npm:estraverse@4.2.0",
        "es6-map": "npm:es6-map@0.1.4",
        "es6-weak-map": "npm:es6-weak-map@2.0.1",
        "esrecurse": "npm:esrecurse@4.1.0"
      }
    },
    "npm:js-yaml@3.4.5": {
      "map": {
        "argparse": "npm:argparse@1.0.7",
        "esprima": "npm:esprima@2.7.3"
      }
    },
    "npm:json-stable-stringify@1.0.1": {
      "map": {
        "jsonify": "npm:jsonify@0.0.0"
      }
    },
    "npm:mkdirp@0.5.1": {
      "map": {
        "minimist": "npm:minimist@0.0.8"
      }
    },
    "npm:lodash.merge@3.3.2": {
      "map": {
        "lodash._arraycopy": "npm:lodash._arraycopy@3.0.0",
        "lodash._getnative": "npm:lodash._getnative@3.9.1",
        "lodash.isplainobject": "npm:lodash.isplainobject@3.2.0",
        "lodash._arrayeach": "npm:lodash._arrayeach@3.0.0",
        "lodash.keysin": "npm:lodash.keysin@3.0.8",
        "lodash.isarguments": "npm:lodash.isarguments@3.1.0",
        "lodash.istypedarray": "npm:lodash.istypedarray@3.0.6",
        "lodash.isarray": "npm:lodash.isarray@3.0.4",
        "lodash._createassigner": "npm:lodash._createassigner@3.1.1",
        "lodash.toplainobject": "npm:lodash.toplainobject@3.0.0",
        "lodash.keys": "npm:lodash.keys@3.1.2"
      }
    },
    "npm:lodash.clonedeep@3.0.2": {
      "map": {
        "lodash._bindcallback": "npm:lodash._bindcallback@3.0.1",
        "lodash._baseclone": "npm:lodash._baseclone@3.3.0"
      }
    },
    "npm:lodash.omit@3.1.0": {
      "map": {
        "lodash._bindcallback": "npm:lodash._bindcallback@3.0.1",
        "lodash.keysin": "npm:lodash.keysin@3.0.8",
        "lodash._arraymap": "npm:lodash._arraymap@3.0.0",
        "lodash._baseflatten": "npm:lodash._baseflatten@3.1.4",
        "lodash._basedifference": "npm:lodash._basedifference@3.0.3",
        "lodash._pickbyarray": "npm:lodash._pickbyarray@3.0.2",
        "lodash.restparam": "npm:lodash.restparam@3.6.1",
        "lodash._pickbycallback": "npm:lodash._pickbycallback@3.0.0"
      }
    },
    "npm:es3ify@0.1.4": {
      "map": {
        "through": "npm:through@2.3.8",
        "esprima-fb": "npm:esprima-fb@3001.1.0-dev-harmony-fb",
        "jstransform": "npm:jstransform@3.0.0"
      }
    },
    "npm:optionator@0.6.0": {
      "map": {
        "wordwrap": "npm:wordwrap@0.0.3",
        "deep-is": "npm:deep-is@0.1.3",
        "fast-levenshtein": "npm:fast-levenshtein@1.0.7",
        "levn": "npm:levn@0.2.5",
        "prelude-ls": "npm:prelude-ls@1.1.2",
        "type-check": "npm:type-check@0.3.2"
      }
    },
    "npm:user-home@2.0.0": {
      "map": {
        "os-homedir": "npm:os-homedir@1.0.1"
      }
    },
    "npm:readable-stream@2.0.6": {
      "map": {
        "isarray": "npm:isarray@1.0.0",
        "inherits": "npm:inherits@2.0.1",
        "core-util-is": "npm:core-util-is@1.0.2",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "string_decoder": "npm:string_decoder@0.10.31",
        "process-nextick-args": "npm:process-nextick-args@1.0.7"
      }
    },
    "npm:strip-ansi@3.0.1": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:has-ansi@2.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:optimist@0.6.1": {
      "map": {
        "wordwrap": "npm:wordwrap@0.0.3",
        "minimist": "npm:minimist@0.0.10"
      }
    },
    "npm:minimatch@3.0.3": {
      "map": {
        "brace-expansion": "npm:brace-expansion@1.1.6"
      }
    },
    "npm:figures@1.7.0": {
      "map": {
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "object-assign": "npm:object-assign@4.1.0"
      }
    },
    "npm:run-async@0.1.0": {
      "map": {
        "once": "npm:once@1.4.0"
      }
    },
    "npm:is-resolvable@1.0.0": {
      "map": {
        "tryit": "npm:tryit@1.0.2"
      }
    },
    "npm:lodash.isplainobject@3.2.0": {
      "map": {
        "lodash.isarguments": "npm:lodash.isarguments@3.1.0",
        "lodash.keysin": "npm:lodash.keysin@3.0.8",
        "lodash._basefor": "npm:lodash._basefor@3.0.3"
      }
    },
    "npm:lodash.keysin@3.0.8": {
      "map": {
        "lodash.isarguments": "npm:lodash.isarguments@3.1.0",
        "lodash.isarray": "npm:lodash.isarray@3.0.4"
      }
    },
    "npm:lodash._baseflatten@3.1.4": {
      "map": {
        "lodash.isarguments": "npm:lodash.isarguments@3.1.0",
        "lodash.isarray": "npm:lodash.isarray@3.0.4"
      }
    },
    "npm:lodash._pickbycallback@3.0.0": {
      "map": {
        "lodash.keysin": "npm:lodash.keysin@3.0.8",
        "lodash._basefor": "npm:lodash._basefor@3.0.3"
      }
    },
    "npm:levn@0.2.5": {
      "map": {
        "prelude-ls": "npm:prelude-ls@1.1.2",
        "type-check": "npm:type-check@0.3.2"
      }
    },
    "npm:source-map@0.4.4": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:inline-process-browser@1.0.0": {
      "map": {
        "falafel": "npm:falafel@1.2.0",
        "through2": "npm:through2@0.6.5"
      }
    },
    "npm:unreachable-branch-transform@0.3.0": {
      "map": {
        "through2": "npm:through2@0.6.5",
        "recast": "npm:recast@0.10.43",
        "esmangle-evaluator": "npm:esmangle-evaluator@1.0.1"
      }
    },
    "npm:yargs@3.10.0": {
      "map": {
        "cliui": "npm:cliui@2.1.0",
        "camelcase": "npm:camelcase@1.2.1",
        "decamelize": "npm:decamelize@1.2.0",
        "window-size": "npm:window-size@0.1.0"
      }
    },
    "npm:generate-object-property@1.2.0": {
      "map": {
        "is-property": "npm:is-property@1.0.2"
      }
    },
    "npm:lodash._createassigner@3.1.1": {
      "map": {
        "lodash._bindcallback": "npm:lodash._bindcallback@3.0.1",
        "lodash.restparam": "npm:lodash.restparam@3.6.1",
        "lodash._isiterateecall": "npm:lodash._isiterateecall@3.0.9"
      }
    },
    "npm:string-width@1.0.2": {
      "map": {
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "code-point-at": "npm:code-point-at@1.0.0",
        "is-fullwidth-code-point": "npm:is-fullwidth-code-point@1.0.0"
      }
    },
    "npm:argparse@1.0.7": {
      "map": {
        "sprintf-js": "npm:sprintf-js@1.0.3"
      }
    },
    "npm:cli-cursor@1.0.2": {
      "map": {
        "restore-cursor": "npm:restore-cursor@1.0.1"
      }
    },
    "npm:readline2@1.0.1": {
      "map": {
        "code-point-at": "npm:code-point-at@1.0.0",
        "is-fullwidth-code-point": "npm:is-fullwidth-code-point@1.0.0",
        "mute-stream": "npm:mute-stream@0.0.5"
      }
    },
    "npm:jstransform@3.0.0": {
      "map": {
        "source-map": "npm:source-map@0.1.31",
        "esprima-fb": "npm:esprima-fb@3001.1.0-dev-harmony-fb",
        "base62": "npm:base62@0.1.1"
      }
    },
    "npm:lodash.toplainobject@3.0.0": {
      "map": {
        "lodash.keysin": "npm:lodash.keysin@3.0.8",
        "lodash._basecopy": "npm:lodash._basecopy@3.0.1"
      }
    },
    "npm:inflight@1.0.5": {
      "map": {
        "once": "npm:once@1.4.0",
        "wrappy": "npm:wrappy@1.0.2"
      }
    },
    "npm:lodash._baseclone@3.3.0": {
      "map": {
        "lodash._arraycopy": "npm:lodash._arraycopy@3.0.0",
        "lodash._arrayeach": "npm:lodash._arrayeach@3.0.0",
        "lodash.isarray": "npm:lodash.isarray@3.0.4",
        "lodash.keys": "npm:lodash.keys@3.1.2",
        "lodash._basefor": "npm:lodash._basefor@3.0.3",
        "lodash._baseassign": "npm:lodash._baseassign@3.2.0"
      }
    },
    "npm:type-check@0.3.2": {
      "map": {
        "prelude-ls": "npm:prelude-ls@1.1.2"
      }
    },
    "npm:lodash.keys@3.1.2": {
      "map": {
        "lodash._getnative": "npm:lodash._getnative@3.9.1",
        "lodash.isarguments": "npm:lodash.isarguments@3.1.0",
        "lodash.isarray": "npm:lodash.isarray@3.0.4"
      }
    },
    "npm:lodash._basedifference@3.0.3": {
      "map": {
        "lodash._cacheindexof": "npm:lodash._cacheindexof@3.0.2",
        "lodash._createcache": "npm:lodash._createcache@3.1.2",
        "lodash._baseindexof": "npm:lodash._baseindexof@3.1.0"
      }
    },
    "npm:cliui@2.1.0": {
      "map": {
        "wordwrap": "npm:wordwrap@0.0.2",
        "right-align": "npm:right-align@0.1.3",
        "center-align": "npm:center-align@0.1.3"
      }
    },
    "npm:through2@0.6.5": {
      "map": {
        "readable-stream": "npm:readable-stream@1.0.34",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:falafel@1.2.0": {
      "map": {
        "isarray": "npm:isarray@0.0.1",
        "foreach": "npm:foreach@2.0.5",
        "object-keys": "npm:object-keys@1.0.11",
        "acorn": "npm:acorn@1.2.2"
      }
    },
    "github:angular/bower-angular-mocks@1.5.8": {
      "map": {
        "angular": "github:angular/bower-angular@1.5.8"
      }
    },
    "npm:esrecurse@4.1.0": {
      "map": {
        "estraverse": "npm:estraverse@4.1.1",
        "object-assign": "npm:object-assign@4.1.0"
      }
    },
    "npm:recast@0.10.43": {
      "map": {
        "esprima-fb": "npm:esprima-fb@15001.1001.0-dev-harmony-fb",
        "source-map": "npm:source-map@0.5.6",
        "ast-types": "npm:ast-types@0.8.15",
        "private": "npm:private@0.1.6"
      }
    },
    "npm:es6-map@0.1.4": {
      "map": {
        "d": "npm:d@0.1.1",
        "es6-set": "npm:es6-set@0.1.4",
        "es6-iterator": "npm:es6-iterator@2.0.0",
        "event-emitter": "npm:event-emitter@0.3.4",
        "es6-symbol": "npm:es6-symbol@3.1.0",
        "es5-ext": "npm:es5-ext@0.10.12"
      }
    },
    "npm:es6-weak-map@2.0.1": {
      "map": {
        "d": "npm:d@0.1.1",
        "es6-iterator": "npm:es6-iterator@2.0.0",
        "es6-symbol": "npm:es6-symbol@3.1.0",
        "es5-ext": "npm:es5-ext@0.10.12"
      }
    },
    "npm:source-map@0.1.31": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:brace-expansion@1.1.6": {
      "map": {
        "balanced-match": "npm:balanced-match@0.4.2",
        "concat-map": "npm:concat-map@0.0.1"
      }
    },
    "github:angular/bower-angular-animate@1.5.8": {
      "map": {
        "angular": "github:angular/bower-angular@1.5.8"
      }
    },
    "npm:lodash._createcache@3.1.2": {
      "map": {
        "lodash._getnative": "npm:lodash._getnative@3.9.1"
      }
    },
    "npm:flat-cache@1.2.1": {
      "map": {
        "del": "npm:del@2.2.2",
        "graceful-fs": "npm:graceful-fs@4.1.6",
        "circular-json": "npm:circular-json@0.3.1",
        "write": "npm:write@0.2.1"
      }
    },
    "npm:is-fullwidth-code-point@1.0.0": {
      "map": {
        "number-is-nan": "npm:number-is-nan@1.0.0"
      }
    },
    "npm:code-point-at@1.0.0": {
      "map": {
        "number-is-nan": "npm:number-is-nan@1.0.0"
      }
    },
    "npm:restore-cursor@1.0.1": {
      "map": {
        "exit-hook": "npm:exit-hook@1.1.1",
        "onetime": "npm:onetime@1.1.0"
      }
    },
    "npm:readable-stream@1.0.34": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "isarray": "npm:isarray@0.0.1",
        "string_decoder": "npm:string_decoder@0.10.31",
        "inherits": "npm:inherits@2.0.1",
        "stream-browserify": "npm:stream-browserify@1.0.0"
      }
    },
    "npm:es6-set@0.1.4": {
      "map": {
        "d": "npm:d@0.1.1",
        "es6-iterator": "npm:es6-iterator@2.0.0",
        "es6-symbol": "npm:es6-symbol@3.1.0",
        "es5-ext": "npm:es5-ext@0.10.12",
        "event-emitter": "npm:event-emitter@0.3.4"
      }
    },
    "npm:es6-iterator@2.0.0": {
      "map": {
        "d": "npm:d@0.1.1",
        "es6-symbol": "npm:es6-symbol@3.1.0",
        "es5-ext": "npm:es5-ext@0.10.12"
      }
    },
    "npm:es6-symbol@3.1.0": {
      "map": {
        "d": "npm:d@0.1.1",
        "es5-ext": "npm:es5-ext@0.10.12"
      }
    },
    "npm:d@0.1.1": {
      "map": {
        "es5-ext": "npm:es5-ext@0.10.12"
      }
    },
    "npm:event-emitter@0.3.4": {
      "map": {
        "es5-ext": "npm:es5-ext@0.10.12",
        "d": "npm:d@0.1.1"
      }
    },
    "npm:es5-ext@0.10.12": {
      "map": {
        "es6-iterator": "npm:es6-iterator@2.0.0",
        "es6-symbol": "npm:es6-symbol@3.1.0"
      }
    },
    "npm:lodash._baseassign@3.2.0": {
      "map": {
        "lodash.keys": "npm:lodash.keys@3.1.2",
        "lodash._basecopy": "npm:lodash._basecopy@3.0.1"
      }
    },
    "npm:del@2.2.2": {
      "map": {
        "object-assign": "npm:object-assign@4.1.0",
        "is-path-cwd": "npm:is-path-cwd@1.0.0",
        "globby": "npm:globby@5.0.0",
        "is-path-in-cwd": "npm:is-path-in-cwd@1.0.0",
        "pify": "npm:pify@2.3.0",
        "rimraf": "npm:rimraf@2.5.4",
        "pinkie-promise": "npm:pinkie-promise@2.0.1"
      }
    },
    "npm:right-align@0.1.3": {
      "map": {
        "align-text": "npm:align-text@0.1.4"
      }
    },
    "npm:center-align@0.1.3": {
      "map": {
        "align-text": "npm:align-text@0.1.4",
        "lazy-cache": "npm:lazy-cache@1.0.4"
      }
    },
    "npm:write@0.2.1": {
      "map": {
        "mkdirp": "npm:mkdirp@0.5.1"
      }
    },
    "github:jspm/nodelibs-stream@0.2.0-alpha": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:stream-browserify@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@1.1.14"
      }
    },
    "npm:globby@5.0.0": {
      "map": {
        "glob": "npm:glob@7.0.6",
        "object-assign": "npm:object-assign@4.1.0",
        "pify": "npm:pify@2.3.0",
        "pinkie-promise": "npm:pinkie-promise@2.0.1",
        "array-union": "npm:array-union@1.0.2",
        "arrify": "npm:arrify@1.0.1"
      }
    },
    "npm:rimraf@2.5.4": {
      "map": {
        "glob": "npm:glob@7.0.6"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.9.1"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.1.5"
      }
    },
    "npm:align-text@0.1.4": {
      "map": {
        "longest": "npm:longest@1.0.1",
        "kind-of": "npm:kind-of@3.0.4",
        "repeat-string": "npm:repeat-string@1.5.4"
      }
    },
    "npm:glob@7.0.6": {
      "map": {
        "inflight": "npm:inflight@1.0.5",
        "inherits": "npm:inherits@2.0.1",
        "minimatch": "npm:minimatch@3.0.3",
        "once": "npm:once@1.4.0",
        "path-is-absolute": "npm:path-is-absolute@1.0.0",
        "fs.realpath": "npm:fs.realpath@1.0.0"
      }
    },
    "npm:pinkie-promise@2.0.1": {
      "map": {
        "pinkie": "npm:pinkie@2.0.4"
      }
    },
    "npm:buffer@4.9.1": {
      "map": {
        "isarray": "npm:isarray@1.0.0",
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6"
      }
    },
    "npm:is-path-in-cwd@1.0.0": {
      "map": {
        "is-path-inside": "npm:is-path-inside@1.0.0"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "github:jspm/nodelibs-crypto@0.2.0-alpha": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "npm:is-path-inside@1.0.0": {
      "map": {
        "path-is-inside": "npm:path-is-inside@1.0.1"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "randombytes": "npm:randombytes@2.0.3",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "pbkdf2": "npm:pbkdf2@3.0.4",
        "browserify-sign": "npm:browserify-sign@4.0.0",
        "create-hmac": "npm:create-hmac@1.1.4",
        "public-encrypt": "npm:public-encrypt@4.0.0"
      }
    },
    "npm:kind-of@3.0.4": {
      "map": {
        "is-buffer": "npm:is-buffer@1.1.4"
      }
    },
    "npm:array-union@1.0.2": {
      "map": {
        "array-uniq": "npm:array-uniq@1.0.3"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "cipher-base": "npm:cipher-base@1.0.2",
        "ripemd160": "npm:ripemd160@1.0.1",
        "sha.js": "npm:sha.js@2.4.5"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "randombytes": "npm:randombytes@2.0.3",
        "miller-rabin": "npm:miller-rabin@4.0.0",
        "bn.js": "npm:bn.js@4.11.6"
      }
    },
    "npm:pbkdf2@3.0.4": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4",
        "inherits": "npm:inherits@2.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "elliptic": "npm:elliptic@6.3.1",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "bn.js": "npm:bn.js@4.11.6"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "randombytes": "npm:randombytes@2.0.3",
        "create-hash": "npm:create-hash@1.1.2",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "bn.js": "npm:bn.js@4.11.6"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "elliptic": "npm:elliptic@6.3.1",
        "bn.js": "npm:bn.js@4.11.6"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "browserify-des": "npm:browserify-des@1.0.0",
        "browserify-aes": "npm:browserify-aes@1.0.6"
      }
    },
    "npm:elliptic@6.3.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "bn.js": "npm:bn.js@4.11.6",
        "hash.js": "npm:hash.js@1.0.3",
        "brorand": "npm:brorand@1.0.5"
      }
    },
    "npm:cipher-base@1.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "brorand": "npm:brorand@1.0.5"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.1",
        "cipher-base": "npm:cipher-base@1.0.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:sha.js@2.4.5": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "randombytes": "npm:randombytes@2.0.3",
        "bn.js": "npm:bn.js@4.11.6"
      }
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.4",
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "asn1.js": "npm:asn1.js@4.8.0"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:asn1.js@4.8.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "github:jspm/nodelibs-string_decoder@0.2.0-alpha": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "npm:uglify-js@2.7.3": {
      "map": {
        "source-map": "npm:source-map@0.5.6",
        "yargs": "npm:yargs@3.10.0",
        "async": "npm:async@0.2.10",
        "uglify-to-browserify": "npm:uglify-to-browserify@1.0.2"
      }
    },
    "npm:readable-stream@2.1.5": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@1.0.0",
        "buffer-shims": "npm:buffer-shims@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@1.0.7"
      }
    },
    "npm:once@1.4.0": {
      "map": {
        "wrappy": "npm:wrappy@1.0.2"
      }
    },
    "npm:readable-stream@1.1.14": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "isarray": "npm:isarray@0.0.1",
        "string_decoder": "npm:string_decoder@0.10.31",
        "stream-browserify": "npm:stream-browserify@1.0.0",
        "inherits": "npm:inherits@2.0.1"
      }
    }
  }
});
