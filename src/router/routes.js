const routes = [
  {
    path: "/",
    name: "",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "dashboard", component: () => import("pages/DashboardUser.vue") },
      {
        path: "cotizacion",
        component: () => import("pages/cotiza/IndexRegistro.vue")
      }
      // { path: '/user/create', component: () => import('pages/Ususarios/Create.vue') },
      // { path: '/cliente', component: () => import('pages/Cliente/Index.vue') },
      // { path: '/cliente/sindeuda', component: () => import('pages/Cliente/sinDeudas.vue') },
      // { path: '/cliente/create', component: () => import('pages/Cliente/Create.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("pages/login"),
    meta: {
      guest: true
    }
  },
  {
    path: "/dashboard",
    name: "userboard",
    component: () => import("pages/account"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("pages/admin"),
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
