import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/RespondIR.vue";
import IncidentReport from "../components/RespondIR.vue";
import TrainingReport from "../components/RTCODE.vue";
import OpaCalculation from "../components/OpaCalculation.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/incident-report",
    name: "incident-report",
    component: IncidentReport,
  },
  {
    path: "/training-report",
    name: "training-report",
    component: TrainingReport,
  },
  {
    path: "/opa-calculation",
    name: "opa-calculation",
    component: OpaCalculation,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
