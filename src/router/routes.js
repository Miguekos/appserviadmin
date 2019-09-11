const routes = [
  {
    path: "/",
    name: "",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "dashboard", component: () => import("pages/DashboardUser.vue") }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/cotizacion",
    name: "cotizacion",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/cotiza/IndexRegistro.vue") },
      { path: "create", component: () => import("pages/cotiza/Create.vue") }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/proveedores",
    name: "proveedores",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/proveedor/Index.vue") },
      { path: "create", component: () => import("pages/proveedor/Create.vue") },
      {
        path: "detalle/:id",
        component: () => import("pages/proveedor/Detalle.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/user",
    name: "user",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/user/Index.vue") },
      { path: "create", component: () => import("pages/user/Create.vue") }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/cliente",
    name: "cliente",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/cliente/Index.vue") },
      { path: "create", component: () => import("pages/cliente/Create.vue") }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("layouts/Login"),
    children: [
      {
        path: "/",
        component: () => import("pages/login")
      }
    ],
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
