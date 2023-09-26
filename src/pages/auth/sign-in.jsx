import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";

import { ShieldExclamationIcon } from "@heroicons/react/24/outline";

import axios from "axios";

export function SignIn() {

  // Inisialisasi variable
  const navigate = useNavigate()
  const serviceHost = import.meta.env.VITE_HOST_SERVICE_SCDB
  const [getEmail, setEmail] = useState("")
  const [getPassword, setPassword] = useState("")
  const [getMessage, setMessage] = useState("")
  const [getStatusAlert, setStatusAlert] = useState(false)
  let data

  // Logic process login
  const ProcessLogin = async (e) => {
    // Melarang browser untuk merender page pada saat function dijalankan
    e.preventDefault()

    // Menjalankan service login
    try {
      data = { email: getEmail, password: getPassword } // Inisialisasi data mandatory
      await axios.post(`${serviceHost}/auth/login`, data, { withCredentials: true }) // Mengirimkan request ke backend

      // Redirect client page menuju halaman dashboard aplikasi
      return navigate("/dashboard/home")
    } catch (error) {

      // Menampilkan pesan error di console browser
      console.error({
        message: `Client dengan email ${getEmail} gagal melakukan login`,
        error: error.message
      })

      // Memuat pesan yang diterima dari server SCDB
      setMessage(error.response.data.errors)

      // Merubah status alert agar bisa muncul di browser client
      setStatusAlert(true)
    }
  }

  return (
    <>
    {/* Biru */}
    {/* https://unsplash.com/photos/7ACuHoezUYk */}

    {/* default */}
    {/* https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" */}
      <img
        src="https://wallpaperaccess.com/full/4893694.jpg"
        alt="background-login-page"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/40" />
      <div className="container mx-auto p-4">
        <form onSubmit={ProcessLogin} method="post">
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">

            <CardHeader
              variant="gradient"
              color="deep-purple"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">

              {/* Custom Notification */}
              <Alert
                key="warnLogin"
                open={getStatusAlert}
                color="orange"
                icon={<ShieldExclamationIcon strokeWidth={2} className="h-6 w-6" />}
                className="mb-4"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }} >
                {getMessage}
              </Alert>

              {/* Input Email */}
              <Input type="email" label="Email" size="lg" value={getEmail} onChange={(e) => { setEmail(e.target.value) }} required />

              {/* Input Password */}
              <Input type="password" label="Password" size="lg" value={getPassword} onChange={(e) => { setPassword(e.target.value) }} required />

              {/* Remember Me */}
              {/* <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div> */}
            </CardBody>

            <CardFooter className="pt-0">
              <Button type="submit" color="blue-gray" variant="gradient" fullWidth>
                Sign In
              </Button>

              {/* Call to action register */}
              {/* <Typography variant="small" className="mt-6 flex justify-center">
                Don't have an account?
                <Link to="/auth/sign-up">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography> */}

            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}

export default SignIn;
