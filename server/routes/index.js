
import authRoutes from "./api/auth-routes.js"


class AppRouter {
constructor(app){
  this.app= app;
}

  init() {

    this.app.use("/api/auth", authRoutes);
  }
  
 
}

export default AppRouter;
