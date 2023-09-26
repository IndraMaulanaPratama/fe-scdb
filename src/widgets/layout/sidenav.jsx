import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "../../context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-red-700" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABjFBMVEVHcEzWnhjutyD/1gnkrBn6vBD1swL/wQD/1gnMnCrXqjH/zQ3SoB/4ugj/ugD/vwDdsTjesTv+xy7/vgv/AAD///8AMGtKWVjJkzc1TV4bQmRjbFr3BAM7VGLj055EVV8AO2oqSWQCNWNZYlnxMAp1dU0uQ1rx6M/b0L3EroVYZmCbhz18dETQ3NFlZ05dWTaEfk4kPlu9gSpARj8+SlTjUBBtcFJFTlXPQi29sqDhVCvjPhTo6ed5elNQYlP++vDmYj/79eXz7Ny7gQmOgkGOdT5xYi2Tik5gX0lKYGXWcyjJlyVyZEnwNSGIhFS0ViyvdR/e4trv5LkAKGu+pHf9/fvvSA33HxCEqIuvw7Tm2qufWzXEx8zNxLHqEQuFe0WVOhYtZCEAI27ZZRnaij7E0cT4ZmmcsZ/EUQuxoXiwLi+ukjXagBXprUXFig5weGLlmYJnjnbZvpWxnXL9RknUCgBnLwwvUFOquskAI2oAaBm5dDVShlxQmGCMVyT/Hip3UBWKnbBjSBIqgkarJ3AeAAAAFHRSTlMAudlV47GWYxzM+3HtuU5J5LWRpjiq2U8AAAMMSURBVDiNbZNnc5tAGISR4wjJcWInuQMBQnSQBAL1ahWr92LZcu/dTu+9/vGcHCexx9kPDDP7zN7LsS+G/ZMDt9ucTpsdd2D/053pikpcSK1M37lh32pFhzRjKmVTkViBiLZuXfdvtwm2Vq6bUY6MSpWK4N9r377qT4Z4o0bSHEkqCkeytKkwhDp5xRcbwRzNKutJ2e2Wk+sKJRgMIf4l7ob85ZyQ67kBAB0ZPdy9HMc8FUJ3L+dr06bA1Z8dFV4B+fHjDnAvjzImF88S7d+TtngUaWaqPesIgEePUEJ6fzQyKSa+17r4/mgjTuTk3bMOGKePzwHNzCiTo/1kYnwf0wJDUr2vOztfwF9lmjG5R8UZYhrdb4VkeKNw/C21vwzAciE9jml20jG3QSlUxYHhqkJS61s/klsHBwAkw00EHLhAOra8TsUlCsfsosSSyd2dXeByuQrgY99dQC+gkBklySxD2DEb3+XeyjvJVwgIu9InvmetMALkWEx+G60TNszJ12izc7RbAPuufvjs9fHzcN/VBFuxmNv0nw+dCGAEq/gzcAi9T8L9szf1jX74iXep6Fmbt1g/4cRsqAARbfBpDkJfqeR7+marVFqEUENABFk2zE74ucjm58NDCOGcN5x6feJFLFzzLHgjDIuGxLmEoJ4GVlcCcA56U4snqU04tzTv8eRP1QRN4phDR0HV/MrxCgp4USyVtBfeQd7jWchXBZ7QUT0nh8FuyLcaWH0Oixsp38vNjQH0eNY0XygYHI4rgUtklotoH1ZW0dGLSBAuoYBihNVJCR//zinCCIrWPISBwAAxcEErLmnzFmXU9qYu+jATpMvxkKXBMYJ8hELNUo2uGJy5rDQr6YwYWcxDuPH93TsI876ImA0m2Id/SjlBS3qWVqsvN72DQCp1WlX5rE7SE/9qPcEm4tsNPpSIWlY0EeIlnaPYKz46pft+u1yWOIFv8Cy3rdeH3WuLg2H3pvxie9s4N6vnukEO/VP3bmwnPltriKIo0cNGbRa/YY/lwB/cdzrvP7i2/r8AhsyZii9zhogAAAAASUVORK5CYII=",
  brandName: "Smart Campus Database IPDN",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
