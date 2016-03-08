System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "ignore": [
      "github:*",
      "npm:*"
    ],
    "stage": 0,
    "optional": []
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*",
    "aurelia-bundle": "https://cdn.rawgit.com/bryanrsmith/aurelia-bundle/react/dist/aurelia-bundle"
  },
  bundles: {
    "dist/aurelia-bundle.js": [
      "src/zzzz.js",
      "npm:aurelia-binding@1.0.0-beta.1.2.2",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.1.4",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.1.1",
      "npm:aurelia-framework@1.0.0-beta.1.1.4",
      "npm:aurelia-loader-default@1.0.0-beta.1.1.3",
      "npm:aurelia-loader@1.0.0-beta.1.1.1",
      "npm:aurelia-logging@1.0.0-beta.1.1.2",
      "npm:aurelia-logging-console@1.0.0-beta.1.1.4",
      "npm:aurelia-metadata@1.0.0-beta.1.1.6",
      "npm:aurelia-polyfills@1.0.0-beta.1.0.1",
      "npm:aurelia-path@1.0.0-beta.1.1.1",
      "npm:aurelia-task-queue@1.0.0-beta.1.1.1",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3",
      "npm:aurelia-templating@1.0.0-beta.1.1.4",
      "npm:aurelia-templating-binding@1.0.0-beta.1.1.2",
      "npm:react@0.14.7",
      "npm:react-dom@0.14.7",
      "npm:aurelia-react-loader@1.0.4",
      "npm:aurelia-binding@1.0.0-beta.1.2.2/aurelia-binding",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.1.1/aurelia-event-aggregator",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.1.4/aurelia-bootstrapper",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5/aurelia-dependency-injection",
      "npm:aurelia-framework@1.0.0-beta.1.1.4/aurelia-framework",
      "npm:aurelia-loader-default@1.0.0-beta.1.1.3/aurelia-loader-default",
      "npm:aurelia-loader@1.0.0-beta.1.1.1/aurelia-loader",
      "npm:aurelia-logging@1.0.0-beta.1.1.2/aurelia-logging",
      "npm:aurelia-logging-console@1.0.0-beta.1.1.4/aurelia-logging-console",
      "npm:aurelia-metadata@1.0.0-beta.1.1.6/aurelia-metadata",
      "npm:aurelia-polyfills@1.0.0-beta.1.0.1/aurelia-polyfills",
      "npm:aurelia-path@1.0.0-beta.1.1.1/aurelia-path",
      "npm:aurelia-task-queue@1.0.0-beta.1.1.1/aurelia-task-queue",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/aurelia-templating-resources",
      "npm:aurelia-templating@1.0.0-beta.1.1.4/aurelia-templating",
      "npm:aurelia-templating-binding@1.0.0-beta.1.1.2/aurelia-templating-binding",
      "npm:react-dom@0.14.7/index",
      "npm:react@0.14.7/react",
      "npm:aurelia-react-loader@1.0.4/dist/index",
      "npm:aurelia-pal-browser@1.0.0-beta.1.1.4",
      "npm:aurelia-pal@1.0.0-beta.1.1.1",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/compose",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/with",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/repeat",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/if",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/sanitize-html",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/replaceable",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/hide",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/show",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/focus",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/compile-spy",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/css-resource",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/html-sanitizer",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/dynamic-element",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/view-spy",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/throttle-binding-behavior",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/binding-mode-behaviors",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/debounce-binding-behavior",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/signal-binding-behavior",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/binding-signaler",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/update-trigger-binding-behavior",
      "npm:react@0.14.7/lib/React",
      "npm:lodash.kebabcase@4.0.0",
      "npm:react@0.14.7/lib/ReactDOM",
      "npm:aurelia-pal@1.0.0-beta.1.1.1/aurelia-pal",
      "npm:aurelia-pal-browser@1.0.0-beta.1.1.4/aurelia-pal-browser",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/repeat-strategy-locator",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/analyze-view-factory",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/repeat-utilities",
      "npm:react@0.14.7/lib/ReactDOMServer",
      "npm:react@0.14.7/lib/Object.assign",
      "npm:react@0.14.7/lib/ReactIsomorphic",
      "npm:react@0.14.7/lib/deprecated",
      "npm:lodash.kebabcase@4.0.0/index",
      "npm:react@0.14.7/lib/ReactCurrentOwner",
      "npm:react@0.14.7/lib/ReactDOMTextComponent",
      "github:jspm/nodelibs-process@0.1.2",
      "npm:react@0.14.7/lib/ReactDefaultInjection",
      "npm:react@0.14.7/lib/ReactInstanceHandles",
      "npm:react@0.14.7/lib/ReactMount",
      "npm:react@0.14.7/lib/ReactPerf",
      "npm:react@0.14.7/lib/ReactReconciler",
      "npm:react@0.14.7/lib/ReactUpdates",
      "npm:react@0.14.7/lib/ReactVersion",
      "npm:react@0.14.7/lib/findDOMNode",
      "npm:react@0.14.7/lib/renderSubtreeIntoContainer",
      "npm:fbjs@0.6.1/lib/warning",
      "npm:fbjs@0.6.1/lib/ExecutionEnvironment",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/array-repeat-strategy",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/map-repeat-strategy",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/set-repeat-strategy",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/null-repeat-strategy",
      "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/number-repeat-strategy",
      "npm:react@0.14.7/lib/ReactServerRendering",
      "npm:react@0.14.7/lib/ReactChildren",
      "npm:react@0.14.7/lib/ReactComponent",
      "npm:react@0.14.7/lib/ReactClass",
      "npm:react@0.14.7/lib/ReactDOMFactories",
      "npm:react@0.14.7/lib/ReactElement",
      "npm:react@0.14.7/lib/onlyChild",
      "npm:react@0.14.7/lib/ReactElementValidator",
      "npm:lodash.deburr@4.0.0",
      "npm:react@0.14.7/lib/ReactPropTypes",
      "npm:react@0.14.7/lib/DOMChildrenOperations",
      "npm:react@0.14.7/lib/ReactComponentBrowserEnvironment",
      "npm:react@0.14.7/lib/DOMPropertyOperations",
      "npm:lodash.words@4.0.0",
      "npm:react@0.14.7/lib/setTextContent",
      "npm:react@0.14.7/lib/escapeTextContentForBrowser",
      "npm:react@0.14.7/lib/validateDOMNesting",
      "github:jspm/nodelibs-process@0.1.2/index",
      "npm:react@0.14.7/lib/BeforeInputEventPlugin",
      "npm:react@0.14.7/lib/EnterLeaveEventPlugin",
      "npm:react@0.14.7/lib/ReactBrowserComponentMixin",
      "npm:react@0.14.7/lib/ChangeEventPlugin",
      "npm:react@0.14.7/lib/ReactDefaultBatchingStrategy",
      "npm:react@0.14.7/lib/ReactReconcileTransaction",
      "npm:react@0.14.7/lib/ReactDOMComponent",
      "npm:react@0.14.7/lib/SelectEventPlugin",
      "npm:react@0.14.7/lib/ReactEventListener",
      "npm:react@0.14.7/lib/ReactInjection",
      "npm:react@0.14.7/lib/ReactDefaultPerf",
      "npm:react@0.14.7/lib/ServerReactRootIndex",
      "npm:react@0.14.7/lib/SimpleEventPlugin",
      "npm:react@0.14.7/lib/SVGDOMPropertyConfig",
      "npm:react@0.14.7/lib/ReactRootIndex",
      "npm:react@0.14.7/lib/ClientReactRootIndex",
      "npm:react@0.14.7/lib/HTMLDOMPropertyConfig",
      "npm:react@0.14.7/lib/ReactBrowserEventEmitter",
      "npm:react@0.14.7/lib/ReactDOMFeatureFlags",
      "npm:react@0.14.7/lib/DefaultEventPluginOrder",
      "npm:react@0.14.7/lib/ReactInstanceMap",
      "npm:react@0.14.7/lib/DOMProperty",
      "npm:fbjs@0.6.1/lib/invariant",
      "npm:react@0.14.7/lib/ReactEmptyComponentRegistry",
      "npm:react@0.14.7/lib/ReactMarkupChecksum",
      "npm:fbjs@0.6.1/lib/containsNode",
      "npm:react@0.14.7/lib/setInnerHTML",
      "npm:react@0.14.7/lib/shouldUpdateReactComponent",
      "npm:react@0.14.7/lib/ReactRef",
      "npm:react@0.14.7/lib/CallbackQueue",
      "npm:react@0.14.7/lib/PooledClass",
      "npm:react@0.14.7/lib/instantiateReactComponent",
      "npm:react@0.14.7/lib/ReactUpdateQueue",
      "npm:fbjs@0.6.1/lib/emptyObject",
      "npm:react@0.14.7/lib/Transaction",
      "npm:fbjs@0.6.1/lib/emptyFunction",
      "npm:react@0.14.7/lib/ReactServerRenderingTransaction",
      "npm:react@0.14.7/lib/traverseAllChildren",
      "npm:react@0.14.7/lib/ReactNoopUpdateQueue",
      "npm:react@0.14.7/lib/ReactPropTypeLocations",
      "npm:fbjs@0.6.1/lib/keyMirror",
      "npm:react@0.14.7/lib/canDefineProperty",
      "npm:react@0.14.7/lib/ReactServerBatchingStrategy",
      "npm:react@0.14.7/lib/ReactPropTypeLocationNames",
      "npm:fbjs@0.6.1/lib/keyOf",
      "npm:fbjs@0.6.1/lib/mapObject",
      "npm:lodash.deburr@4.0.0/index",
      "npm:react@0.14.7/lib/getIteratorFn",
      "npm:react@0.14.7/lib/ReactMultiChildUpdateTypes",
      "npm:react@0.14.7/lib/ReactDOMIDOperations",
      "npm:react@0.14.7/lib/Danger",
      "npm:react@0.14.7/lib/quoteAttributeValueForBrowser",
      "npm:process@0.11.2",
      "npm:lodash.words@4.0.0/index",
      "npm:react@0.14.7/lib/EventConstants",
      "npm:react@0.14.7/lib/EventPropagators",
      "npm:react@0.14.7/lib/SyntheticCompositionEvent",
      "npm:react@0.14.7/lib/SyntheticInputEvent",
      "npm:react@0.14.7/lib/FallbackCompositionState",
      "npm:react@0.14.7/lib/SyntheticMouseEvent",
      "npm:react@0.14.7/lib/getEventTarget",
      "npm:react@0.14.7/lib/EventPluginHub",
      "npm:react@0.14.7/lib/SyntheticEvent",
      "npm:react@0.14.7/lib/isEventSupported",
      "npm:react@0.14.7/lib/isTextInputElement",
      "npm:react@0.14.7/lib/ReactInputSelection",
      "npm:react@0.14.7/lib/AutoFocusUtils",
      "npm:react@0.14.7/lib/ReactDOMButton",
      "npm:react@0.14.7/lib/CSSPropertyOperations",
      "npm:react@0.14.7/lib/ReactDOMOption",
      "npm:react@0.14.7/lib/ReactDOMSelect",
      "npm:react@0.14.7/lib/ReactDOMInput",
      "npm:react@0.14.7/lib/ReactDOMTextarea",
      "npm:react@0.14.7/lib/ReactMultiChild",
      "npm:fbjs@0.6.1/lib/shallowEqual",
      "npm:fbjs@0.6.1/lib/getActiveElement",
      "npm:fbjs@0.6.1/lib/EventListener",
      "npm:fbjs@0.6.1/lib/getUnboundedScrollPosition",
      "npm:react@0.14.7/lib/ReactComponentEnvironment",
      "npm:react@0.14.7/lib/ReactNativeComponent",
      "npm:react@0.14.7/lib/ReactEmptyComponent",
      "npm:react@0.14.7/lib/ReactDefaultPerfAnalysis",
      "npm:fbjs@0.6.1/lib/performanceNow",
      "npm:react@0.14.7/lib/SyntheticClipboardEvent",
      "npm:react@0.14.7/lib/SyntheticDragEvent",
      "npm:react@0.14.7/lib/SyntheticFocusEvent",
      "npm:react@0.14.7/lib/SyntheticKeyboardEvent",
      "npm:react@0.14.7/lib/SyntheticTouchEvent",
      "npm:react@0.14.7/lib/SyntheticUIEvent",
      "npm:react@0.14.7/lib/getEventCharCode",
      "npm:react@0.14.7/lib/SyntheticWheelEvent",
      "npm:react@0.14.7/lib/EventPluginRegistry",
      "npm:react@0.14.7/lib/ViewportMetrics",
      "npm:react@0.14.7/lib/adler32",
      "npm:fbjs@0.6.1/lib/isTextNode",
      "npm:react@0.14.7/lib/ReactEventEmitterMixin",
      "npm:react@0.14.7/lib/ReactOwner",
      "npm:react@0.14.7/lib/ReactCompositeComponent",
      "npm:fbjs@0.6.1/lib/createNodesFromMarkup",
      "npm:process@0.11.2/browser",
      "npm:lodash.tostring@4.1.2",
      "npm:fbjs@0.6.1/lib/getMarkupWrap",
      "npm:react@0.14.7/lib/accumulateInto",
      "npm:react@0.14.7/lib/getEventModifierState",
      "npm:react@0.14.7/lib/forEachAccumulated",
      "npm:react@0.14.7/lib/getTextContentAccessor",
      "npm:react@0.14.7/lib/EventPluginUtils",
      "npm:react@0.14.7/lib/ReactErrorUtils",
      "npm:react@0.14.7/lib/ReactDOMSelection",
      "npm:fbjs@0.6.1/lib/focusNode",
      "npm:react@0.14.7/lib/dangerousStyleValue",
      "npm:fbjs@0.6.1/lib/camelizeStyleName",
      "npm:react@0.14.7/lib/CSSProperty",
      "npm:fbjs@0.6.1/lib/hyphenateStyleName",
      "npm:fbjs@0.6.1/lib/memoizeStringOnly",
      "npm:react@0.14.7/lib/LinkedValueUtils",
      "npm:react@0.14.7/lib/ReactChildReconciler",
      "npm:react@0.14.7/lib/flattenChildren",
      "npm:fbjs@0.6.1/lib/performance",
      "npm:fbjs@0.6.1/lib/isNode",
      "npm:react@0.14.7/lib/getEventKey",
      "npm:fbjs@0.6.1/lib/createArrayFromMixed",
      "npm:lodash.tostring@4.1.2/index",
      "npm:fbjs@0.6.1/lib/camelize",
      "npm:fbjs@0.6.1/lib/hyphenate",
      "npm:react@0.14.7/lib/getNodeForCharacterOffset",
      "npm:fbjs@0.6.1/lib/toArray"
    ]
  },

  depCache: {
    "gulpfile.js": [
      "require-dir.js"
    ],
    "index.js": [
      "app.js",
      "browser-window.js",
      "crash-reporter.js"
    ],
    "wallaby.js": [
      "path.js"
    ]
  },

  map: {
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.0-beta.1.1.2",
    "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.2.2",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0-beta.1.1.4",
    "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5",
    "aurelia-dialog": "npm:aurelia-dialog@0.5.7",
    "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.1.1",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.0-beta.1.1.1",
    "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.1.4",
    "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.1.1",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.1.4",
    "aurelia-http-client": "npm:aurelia-http-client@1.0.0-beta.1.1.2",
    "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.1.1",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.1.3",
    "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1.1.4",
    "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.6",
    "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.1.1",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.0.1",
    "aurelia-react-loader": "npm:aurelia-react-loader@1.0.4",
    "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.1.1.3",
    "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.1.3",
    "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.1.1",
    "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.1.4",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.1.2",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.1.3",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.1.2",
    "aurelia-validation": "npm:aurelia-validation@0.6.3",
    "babel": "npm:babel-core@5.8.35",
    "babel-runtime": "npm:babel-runtime@5.8.35",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "core-js": "npm:core-js@2.0.3",
    "css": "github:systemjs/plugin-css@0.1.20",
    "fetch": "github:github/fetch@0.11.0",
    "font-awesome": "npm:font-awesome@4.5.0",
    "moment": "npm:moment@2.11.2",
    "numeral": "npm:numeral@1.5.3",
    "react": "npm:react@0.14.7",
    "react-dom": "npm:react-dom@0.14.7",
    "text": "github:systemjs/plugin-text@0.0.7",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "github:components/jquery@2.2.1"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.0-beta.1.1.2": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.6",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.1.4"
    },
    "npm:aurelia-binding@1.0.0-beta.1.2.2": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.6",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.1.1"
    },
    "npm:aurelia-bootstrapper@1.0.0-beta.1.1.4": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.1.1",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.1.4",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.1.1",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.1.4",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.1.3",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1.1.4",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-beta.1.1.4",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.0.1",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.1.3",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.1.4",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.1.2",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.1.3",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.1.2"
    },
    "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.6",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1"
    },
    "npm:aurelia-dialog@0.5.7": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.6",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.1.4"
    },
    "npm:aurelia-event-aggregator@1.0.0-beta.1.1.1": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2"
    },
    "npm:aurelia-framework@1.0.0-beta.1.1.4": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.2.2",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.1.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.6",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.1.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.1.4"
    },
    "npm:aurelia-history-browser@1.0.0-beta.1.1.4": {
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.1.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1"
    },
    "npm:aurelia-http-client@1.0.0-beta.1.1.2": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.1.1"
    },
    "npm:aurelia-loader-default@1.0.0-beta.1.1.3": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.1.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.6",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1"
    },
    "npm:aurelia-loader@1.0.0-beta.1.1.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.6",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.1.1"
    },
    "npm:aurelia-logging-console@1.0.0-beta.1.1.4": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1"
    },
    "npm:aurelia-metadata@1.0.0-beta.1.1.6": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1"
    },
    "npm:aurelia-pal-browser@1.0.0-beta.1.1.4": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1"
    },
    "npm:aurelia-polyfills@1.0.0-beta.1.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1"
    },
    "npm:aurelia-react-loader@1.0.4": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.6",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.1.4",
      "lodash.kebabcase": "npm:lodash.kebabcase@4.0.0",
      "react": "npm:react@0.14.7",
      "react-dom": "npm:react-dom@0.14.7"
    },
    "npm:aurelia-route-recognizer@1.0.0-beta.1.1.3": {
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.1.1"
    },
    "npm:aurelia-router@1.0.0-beta.1.1.3": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.1.1",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.1.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.1.1",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.1.1.3"
    },
    "npm:aurelia-task-queue@1.0.0-beta.1.1.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1"
    },
    "npm:aurelia-templating-binding@1.0.0-beta.1.1.2": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.2.2",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.1.4"
    },
    "npm:aurelia-templating-resources@1.0.0-beta.1.1.3": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.2.2",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.1.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.1.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.1.4"
    },
    "npm:aurelia-templating-router@1.0.0-beta.1.1.2": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.6",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.1.1",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.1.3",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.1.4"
    },
    "npm:aurelia-templating@1.0.0-beta.1.1.4": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.2.2",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.1.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.6",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.1.1"
    },
    "npm:aurelia-validation@0.6.3": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.2.2",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.6",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.1.4"
    },
    "npm:babel-runtime@5.8.35": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@2.0.3": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:fbjs@0.6.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:font-awesome@4.5.0": {
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash.deburr@4.0.0": {
      "lodash.tostring": "npm:lodash.tostring@4.1.2"
    },
    "npm:lodash.kebabcase@4.0.0": {
      "lodash.deburr": "npm:lodash.deburr@4.0.0",
      "lodash.words": "npm:lodash.words@4.0.0"
    },
    "npm:lodash.tostring@4.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.words@4.0.0": {
      "lodash.tostring": "npm:lodash.tostring@4.1.2"
    },
    "npm:moment@2.11.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:numeral@1.5.3": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:react-dom@0.14.7": {
      "react": "npm:react@0.14.7"
    },
    "npm:react@0.14.7": {
      "fbjs": "npm:fbjs@0.6.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
