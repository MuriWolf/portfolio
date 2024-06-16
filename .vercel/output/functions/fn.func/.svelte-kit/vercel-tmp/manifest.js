export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Torus.png","Vector.svg","ellipse-blue.png","ellipse-green.png","fonts/montserrat/Montserrat-Black.woff2","fonts/montserrat/Montserrat-BlackItalic.ttf","fonts/montserrat/Montserrat-Bold.woff2","fonts/montserrat/Montserrat-BoldItalic.ttf","fonts/montserrat/Montserrat-ExtraBold.ttf","fonts/montserrat/Montserrat-ExtraBold.woff2","fonts/montserrat/Montserrat-ExtraBoldItalic.ttf","fonts/montserrat/Montserrat-ExtraLight.ttf","fonts/montserrat/Montserrat-ExtraLightItalic.ttf","fonts/montserrat/Montserrat-Italic.ttf","fonts/montserrat/Montserrat-Light.woff2","fonts/montserrat/Montserrat-LightItalic.ttf","fonts/montserrat/Montserrat-Medium.woff2","fonts/montserrat/Montserrat-MediumItalic.ttf","fonts/montserrat/Montserrat-Regular.ttf","fonts/montserrat/Montserrat-Regular.woff2","fonts/montserrat/Montserrat-SemiBold.woff2","fonts/montserrat/Montserrat-SemiBoldItalic.ttf","fonts/montserrat/Montserrat-Thin.ttf","fonts/montserrat/Montserrat-ThinItalic.ttf","fonts/montserrat/OFL.txt","fonts/sora/Sora-Bold.woff2","fonts/sora/Sora-ExtraBold.ttf","fonts/sora/Sora-ExtraLight.woff2","fonts/sora/Sora-Light.woff2","fonts/sora/Sora-Medium.woff2","fonts/sora/Sora-Regular.woff2","fonts/sora/Sora-SemiBold.woff2","fonts/sora/Sora-Thin.woff2","images/flags/br.svg","images/flags/us.svg","images/logo.png","images/photos/me.png","images/photos/me2.png","logo.svg","platonic-form.png","strokes-hero.png","strokes-hero2.png"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".woff2":"font/woff2",".ttf":"font/ttf",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.cIPpRRqr.js","app":"_app/immutable/entry/app.h_kLHkyx.js","imports":["_app/immutable/entry/start.cIPpRRqr.js","_app/immutable/chunks/entry.LbAjPyqR.js","_app/immutable/chunks/scheduler.L6m4aTwr.js","_app/immutable/chunks/index.gWnlUx6_.js","_app/immutable/entry/app.h_kLHkyx.js","_app/immutable/chunks/scheduler.L6m4aTwr.js","_app/immutable/chunks/index.Wm-maJvP.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/projects",
				pattern: /^\/api\/projects\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/projects/_server.ts.js'))
			},
			{
				id: "/api/projects/[slug]",
				pattern: /^\/api\/projects\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/projects/_slug_/_server.ts.js'))
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/projects/[slug]",
				pattern: /^\/projects\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
