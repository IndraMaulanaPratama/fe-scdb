import { Routes, Route, useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "../widgets/layout";
import routes from "../routes";
import adminRoute from "../routers/admin-route";
import { useMaterialTailwindController, setOpenConfigurator } from "../context";
import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecoded from "jwt-decode";

export function Dashboard() {
  // Inisialisasi Variable
  const serviceHost = import.meta.env.VITE_HOST_SERVICE_SCDB
  const navigate = useNavigate()
  const requestServer = axios.create()
  const [controller, dispatch] = useMaterialTailwindController();
  const [getToken, setToken] = useState("")
  const [getLoginUsername, setLoginUsername] = useState("")
  const [getLoginEmail, setLoginEmail] = useState("")
  const [getLoginRole, setLoginRole] = useState("")
  const [getLoginExpired, setLoginExpired] = useState("")
  const { sidenavType } = controller;

  // Memerintahkan react menjalankan fungsi refresh token setiap client melakukan request
  useEffect(() => {
    refreshToken()
  }, [])

  // Function untuk menjalankan request refresh token ke server
  const refreshToken = async () => {
    try {
      // Meminta service refresh token dari service scdb
      const result = await requestServer.get(`${serviceHost}/auth/refresh-token`, { withCredentials: true })

      // Melakukan decode token yang dikirmkan oleh server
      const dataDecoded = jwtDecoded(result.data.token)

      // Menyimpan data hasil decode kedalam variable
      setToken(result.data.token)
      setLoginUsername(dataDecoded.username)
      setLoginEmail(dataDecoded.email)
      setLoginRole(dataDecoded.role)
      setLoginExpired(dataDecoded.exp)

    } catch (error) {
      console.error(error.message)
      return navigate(`/auth/sign-in`)
    }
  }

  // Menjalankan axios interceptors seakan2 menjadi middleware untuk refresh token
  requestServer.interceptors.request.use(async (conf) => {
    const currentDate = new Date()
    let token

    if (getLoginExpired * 1000 <= currentDate.getTime()) {
      const result = await axios.get(`${serviceHost}/auth/refresh-token`, { withCredentials: true })
      token = result.data.token

      conf.headers.Authorization = `Bearer ${token}`
      setToken(token)

      const dataDecoded = jwtDecoded(token)
      setLoginUsername(dataDecoded.username)
      setLoginEmail(dataDecoded.email)
      setLoginRole(dataDecoded.role)
      setLoginExpired(dataDecoded.exp)
    }

    return conf
  }, (error) => { return Promise.reject(error) })

  const data = {
    email: getLoginEmail,
    username: getLoginUsername,
    role: getLoginRole,
    token: getToken,
    token_expire: getLoginExpired,
  }

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={adminRoute}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        {/* Navbar atas admin page */}
        <DashboardNavbar data={data} />

        {/* Sidebar kanan */}
        <Configurator />

        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>

        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>

        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
