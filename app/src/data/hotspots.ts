export interface Citation {
  what: string;
  where: string;
}

export interface FollowUp {
  question: string;
  correctSummary: string;
  explanation: string;
  citations: Citation[];
  correctIndicators: string[];
}

export interface Hotspot {
  id: string;
  topic: string;
  question: string;
  correctSummary: string;
  explanation: string;
  citations: Citation[];
  /** lowercase substrings, if the user's guess contains any of these, it's marked correct */
  correctIndicators: string[];
  /** shown only when the user gets it wrong, to nudge them before revealing the answer */
  hint: string;
  /** a gentler question on the same topic, shown only after a wrong guess on the main question */
  followUp: FollowUp;
}

export const hotspots: Hotspot[] = [
  {
    id: "config-merge",
    topic: "Config merge order",
    question:
      "You create an Axios instance with a default Authorization header, then make a request that also passes an Authorization header in its own config object. What value does the outgoing request actually use, the instance default, the per-request value, or something else?",
    correctSummary: "The per-request value wins.",
    explanation:
      "Headers are merged with a deep-merge strategy where the per-request config takes priority over the instance defaults. When both define the same header key, the per-request value is returned directly, overwriting the default. The full precedence chain, lowest to highest priority, is: axios library defaults → instance defaults → per-request config.",
    citations: [
      { what: "Headers merge strategy (deep merge, caseless)", where: "lib/core/mergeConfig.js:148-149" },
      { what: "mergeDeepProperties, config2 beats config1 when defined", where: "lib/core/mergeConfig.js:59-65" },
      { what: "Per-request merge call", where: "lib/core/Axios.js:93" },
      { what: "Instance creation merge call", where: "lib/axios.js:40" },
    ],
    correctIndicators: ["per-request", "per request", "request config", "request wins", "request value", "the new one", "latest", "override"],
    hint: "Think about which config is applied last, closest to the actual network call.",
    followUp: {
      question:
        "mergeConfig(config1, config2) is called with instance defaults as config1 and the per-request config as config2. For a simple property like timeout, which value wins when both are defined?",
      correctSummary: "The per-request value (config2) always wins.",
      explanation:
        "timeout uses the defaultToConfig2 strategy, which returns config2's value whenever it is not undefined, and only falls back to config1's value if config2 doesn't have one.",
      citations: [
        { what: "timeout mapped to defaultToConfig2", where: "lib/core/mergeConfig.js:126" },
        { what: "defaultToConfig2 returns config2 first, falls back to config1", where: "lib/core/mergeConfig.js:75-81" },
      ],
      correctIndicators: ["per-request", "config2", "request wins", "request value", "the request"],
    },
  },
  {
    id: "interceptor-order",
    topic: "Interceptor execution order",
    question:
      "You register three request interceptors on an axios instance, call them A, B, and C, in that order. Then you make a request. In what order do those interceptors actually run?",
    correctSummary: "A → B → C, registration order, not reversed.",
    explanation:
      "Request interceptors are pushed into a chain in registration order, then that whole block is prepended onto the dispatch chain as a unit, it does not reverse the internal order of A, B, C. The chain becomes [A, B, C, dispatch], executed left to right via promise chaining. Response interceptors also run in registration order (FIFO). Only the deprecated legacyInterceptorReqResOrdering:true option reverses request-interceptor order.",
    citations: [
      { what: "Request interceptors pushed into chain, then chain.unshift(...) prepends the whole block", where: "lib/core/Axios.js:165-196" },
      { what: "Sequential execution via promise chaining", where: "lib/core/Axios.js:209-215" },
    ],
    correctIndicators: ["a, b, c", "a then b then c", "registration order", "same order", "a first", "a runs first", "order they were added", "order added"],
    hint: "Don't trust the function name unshiftRequestInterceptors, read what it actually does to the array.",
    followUp: {
      question:
        "You register two request interceptors back to back: axios.interceptors.request.use(A) then axios.interceptors.request.use(B). Which handler runs first when a request is made, A or B?",
      correctSummary: "A runs first, registration order is preserved.",
      explanation:
        "Request interceptors are pushed into requestInterceptorChain in registration order, giving [A, B]. That whole array is then prepended onto the dispatch chain as a block via chain.unshift(...requestInterceptorChain). Spreading an array into unshift preserves its internal order, it does not reverse it, so the final chain is [A, B, dispatch], executed left to right.",
      citations: [
        { what: "Request interceptors pushed in registration order", where: "lib/core/Axios.js:181" },
        { what: "Whole block prepended via unshift(...), order preserved not reversed", where: "lib/core/Axios.js:196" },
      ],
      correctIndicators: ["a runs first", "a first", "a, then b", "registration order", "same order", "a fires first"],
    },
  },
  {
    id: "redirect-credentials",
    topic: "Redirect credential stripping",
    question:
      "You make a Node.js request with axios that includes an Authorization header. The server responds with a 302 redirect to a different origin. What happens to the Authorization header on the redirected request?",
    correctSummary: "It's dropped, restored only if the redirect stays on the same origin.",
    explanation:
      "Axios strips Authorization / HTTP Basic credentials on any cross-origin redirect, and only restores them if the redirect target has the exact same origin as the original request. This is a deliberate security mitigation against credential leakage via attacker-controlled redirects. The same guard applies to any headers listed in the sensitiveHeaders config option.",
    citations: [
      { what: "beforeRedirectAuth hook, restores auth only on origin match", where: "lib/adapters/http.js:1064-1079" },
      { what: "sensitiveHeaders stripping on non-same-origin redirect", where: "lib/adapters/http.js:1114-1115" },
    ],
    correctIndicators: ["dropped", "stripped", "removed", "not sent", "doesn't survive", "does not survive", "lost", "cleared"],
    hint: "Think about why a redirect to an attacker-controlled domain would be a security risk if credentials just followed along.",
    followUp: {
      question:
        "When axios follows a redirect and the destination URL has the same origin as the original request (same protocol, host, and port), what happens to the Authorization / HTTP Basic credentials?",
      correctSummary: "They are preserved and re-attached.",
      explanation:
        "Axios intentionally restores the credentials for same-origin redirects. Only a change in origin causes them to be stripped.",
      citations: [
        { what: "beforeRedirectAuth restores credentials only when origins match", where: "lib/adapters/http.js:1071-1075" },
      ],
      correctIndicators: ["preserved", "kept", "restored", "re-attached", "reattached", "survives", "same origin"],
    },
  },
  {
    id: "cancellation",
    topic: "Cancellation behavior",
    question:
      "You make an axios request and abort it mid-flight using AbortController (or the legacy CancelToken). You have both a .then() and a .catch() chained to the call. Which one runs?",
    correctSummary: "Only .catch() runs.",
    explanation:
      "Cancellation causes axios to reject the promise with a CanceledError (a subclass of AxiosError, code ERR_CANCELED). The .then() success callback is never invoked, cancellation is always an error-path outcome, never a success value, whether it happens before or during the underlying request.",
    citations: [
      { what: "CanceledError extends AxiosError with ERR_CANCELED", where: "lib/cancel/CanceledError.js:16" },
      { what: "Pre-flight cancellation throws CanceledError", where: "lib/core/dispatchRequest.js:24" },
      { what: "Adapter rejects with CanceledError on abort signal", where: "lib/adapters/xhr.js:246" },
    ],
    correctIndicators: ["catch", "only catch", "rejects", "rejected", "error path", "jump to catch", "jumps to catch"],
    hint: "Is cancelling a request more like a success or a failure, from the promise's point of view?",
    followUp: {
      question:
        "When a request is cancelled in axios, what function should you call on the caught error to reliably distinguish a cancellation from any other kind of failure?",
      correctSummary: "axios.isCancel(error), it checks for a truthy __CANCEL__ property.",
      explanation:
        "isCancel returns true only when the error has a truthy __CANCEL__ property, which is the flag set exclusively by CanceledError. Any other AxiosError, network failure, timeout, bad status, does not carry __CANCEL__, so isCancel returns false for them.",
      citations: [
        { what: "isCancel checks for a truthy __CANCEL__ property", where: "lib/cancel/isCancel.js:3-5" },
        { what: "CanceledError sets this.__CANCEL__ = true", where: "lib/cancel/CanceledError.js:18" },
      ],
      correctIndicators: ["iscancel", "__cancel__", "axios.iscancel"],
    },
  },
  {
    id: "xsrf",
    topic: "XSRF token auto-attach",
    question:
      "A developer sets withCredentials: true on an axios request to a cross-origin URL, expecting the XSRF cookie to be automatically read and attached as the X-XSRF-TOKEN header. Will it be?",
    correctSummary: "No, withCredentials has nothing to do with it.",
    explanation:
      "The XSRF token is attached only when withXSRFToken is explicitly true (forcing it regardless of origin), or when withXSRFToken is unset AND the request URL is same-origin. withCredentials plays no role in this decision at all. A cross-origin request with only withCredentials:true will not get the header.",
    citations: [
      { what: "shouldSendXSRF condition, withXSRFToken===true OR (unset AND same-origin)", where: "lib/helpers/resolveConfig.js:92-93" },
    ],
    correctIndicators: ["no", "not attached", "won't", "will not", "doesn't attach", "does not attach", "not sent", "withcredentials doesn't matter", "withcredentials has nothing"],
    hint: "withCredentials controls cookies on the request/response, it's a separate setting from the XSRF-specific opt-in.",
    followUp: {
      question:
        "When a browser makes a same-origin request with the default axios config (withXSRFToken not set), does axios automatically attach the XSRF token header?",
      correctSummary: "Yes, same-origin requests get it automatically by default.",
      explanation:
        "When withXSRFToken is null or undefined (the default), axios falls back to isURLSameOrigin(url). For same-origin URLs that check returns true, so the XSRF cookie is read and the header is attached automatically, no extra config needed.",
      citations: [
        { what: "shouldSendXSRF reduces to isURLSameOrigin(url) when withXSRFToken is unset", where: "lib/helpers/resolveConfig.js:92-93" },
      ],
      correctIndicators: ["yes", "attached", "attaches", "auto-attach", "automatically"],
    },
  },
  {
    id: "max-length",
    topic: "maxContentLength / maxBodyLength protection",
    question:
      "You set maxContentLength: 1000 in your axios config and make a GET request that returns a 50 KB JSON body. What does axios do, silently truncate the response to 1000 bytes and resolve, or reject the promise with an error?",
    correctSummary: "It rejects with an error, no truncation, no silent data loss.",
    explanation:
      "Axios rejects the promise with an AxiosError (code ERR_BAD_RESPONSE) the moment the response exceeds maxContentLength, the response stream is aborted, not silently cut off. The same hard-reject pattern applies to oversized request bodies via maxBodyLength (code ERR_BAD_REQUEST).",
    citations: [
      { what: "Response size check, rejects when estimated size exceeds maxContentLength", where: "lib/adapters/http.js:729-741" },
      { what: "Request body size check, rejects before sending", where: "lib/adapters/http.js:857-864" },
    ],
    correctIndicators: ["reject", "throw", "error", "fails", "fail", "rejects the promise"],
    hint: "Would silently truncating a response ever be a safe default for a JSON API?",
    followUp: {
      question:
        "When maxContentLength is not set in your axios config, what is its default value, and does axios enforce any size limit on the response body?",
      correctSummary: "The default is -1, meaning no limit is enforced.",
      explanation:
        "Axios only checks the response size when maxContentLength > -1. With the default of -1, the guard is skipped entirely and responses of any size are accepted.",
      citations: [
        { what: "Default maxContentLength and maxBodyLength are both -1", where: "lib/defaults/index.js:154-155" },
        { what: "Size guard skipped entirely when not greater than -1", where: "lib/adapters/http.js:729" },
      ],
      correctIndicators: ["-1", "no limit", "unlimited", "not enforced", "no enforcement"],
    },
  },
  {
    id: "transform-pipeline",
    topic: "transformRequest / transformResponse pipeline",
    question:
      "You pass a custom transformRequest function in your request config to add serialization logic. Does axios's built-in default transform (the one that JSON-serializes plain objects) still run alongside your function, or does your function replace it entirely?",
    correctSummary: "Your function completely replaces the default, it does not run alongside it.",
    explanation:
      "transformRequest/transformResponse are merged with pure replacement, not concatenation: if the request config supplies a value, it wins outright over the instance default. There is no array-concat path. To keep the default JSON handling and add your own step, you must explicitly spread axios.defaults.transformRequest into your own array.",
    citations: [
      { what: "transformRequest/transformResponse merged via defaultToConfig2 (pure replacement)", where: "lib/core/mergeConfig.js:123-124" },
      { what: "defaultToConfig2, returns b alone if defined, else a alone, never combines", where: "lib/core/mergeConfig.js:75-80" },
      { what: "Default pipeline is a one-element array, replaced wholesale when overridden", where: "lib/defaults/index.js:44-108" },
    ],
    correctIndicators: ["replace", "replaces", "overwrite", "overwrites", "gone", "no longer run", "doesn't run", "does not run", "instead of"],
    hint: "Is this a merge, or a plain override? Check how the config-merge logic treats function/array values versus objects.",
    followUp: {
      question:
        "A developer wants to add a custom step that uppercases a string body after normal JSON serialization, but the request body arrives as [object Object]. What is the minimal fix, and why does it work?",
      correctSummary: "Concatenate the default transforms with your custom function, don't just replace them.",
      explanation:
        "Pass axios.defaults.transformRequest.concat(yourFunction) so the default JSON serializer still runs first before your custom step. A plain function or a new array without the defaults completely replaces the pipeline, which is why the object fell through unserialized.",
      citations: [
        { what: "Default transformRequest is an array containing the JSON serializer", where: "lib/defaults/index.js:44-45" },
        { what: "Merge strategy replaces outright, no merging", where: "lib/core/mergeConfig.js:123" },
        { what: "Canonical .concat() pattern in axios's own test suite", where: "tests/browser/transform.browser.test.js:196" },
      ],
      correctIndicators: ["concat", "defaults.transformrequest", "spread", "combine with default", "keep the default"],
    },
  },
  {
    id: "proxy-tunneling",
    topic: "Proxy tunneling (HTTP vs HTTPS)",
    question:
      "You configure a proxy in axios and make two requests, one to http://api.example.com and one to https://api.example.com. Do both requests go through the proxy in the same way?",
    correctSummary: "No, HTTPS uses a CONNECT tunnel, HTTP uses forward-proxy mode.",
    explanation:
      "For an HTTPS target, axios tunnels through the proxy via a CONNECT request, the proxy only sees the host:port, everything else stays hidden inside end-to-end TLS, and Proxy-Authorization is sent only on the CONNECT handshake. For an HTTP target, axios sends the full absolute URL directly to the proxy as a plain forward-proxy request, and Proxy-Authorization is stamped as a regular header the proxy can read.",
    citations: [
      { what: "targetIsHttps branch decides tunneling vs forward-proxy mode", where: "lib/adapters/http.js:333-335" },
      { what: "CONNECT-tunnel path for HTTPS targets", where: "lib/adapters/http.js:373" },
      { what: "Forward-proxy mode for HTTP targets, Proxy-Authorization as plain header", where: "lib/adapters/http.js:389" },
    ],
    correctIndicators: ["different", "no", "not the same", "tunnel", "connect", "differently"],
    hint: "Think about what a proxy can actually see in each case, the whole point of HTTPS is that the payload is hidden.",
    followUp: {
      question:
        "When your axios Node.js app makes a request to an https:// target through a proxy, what can an eavesdropper sitting on the proxy server actually read, compared to a request to an http:// target through the same proxy?",
      correctSummary: "For HTTPS only the host and port are visible, for HTTP everything is visible.",
      explanation:
        "For an HTTP target the proxy sees the full absolute URL, all headers, and the full body in plain text. For an HTTPS target the proxy only sees a CONNECT request naming the host and port, then forwards an opaque TLS-encrypted stream. The URL path, headers, and body stay hidden inside the end-to-end TLS tunnel.",
      citations: [
        { what: "CONNECT-tunneling path preserves end-to-end TLS, proxy can't inspect URL/headers/body", where: "lib/adapters/http.js:335-341" },
        { what: "Forward-proxy mode, proxy sees everything for plaintext HTTP", where: "lib/adapters/http.js:389" },
      ],
      correctIndicators: ["host and port", "host:port", "only the host", "hidden", "cannot see", "can't see", "everything visible", "sees everything"],
    },
  },
];
