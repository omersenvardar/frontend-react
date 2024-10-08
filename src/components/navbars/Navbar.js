import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export function NavbarDark() {
  const appContext = useContext(AppContext);
  const { cart } = appContext;
  const navigate = useNavigate();

  const calculcateNumberOfCartItems = () => {
    let count = 0;
    for (const item of cart) {
      count += item.count;
    }
    return count;
  };

  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="mx-auto container from-black to-gray-400 px-4 py-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5"
          onClick={() => navigate("/")}
        >
          Online Alışveriş
        </Typography>
        <div className="ml-auto flex gap-1 md:mr-4">
          <IconButton
            variant="text"
            color="white"
            onClick={() => {
              navigate("/edit-informations");
            }}
          >
            <UserIcon className="h-4 w-4" />
          </IconButton>
          <div className="relative">
            {calculcateNumberOfCartItems() > 0 ? (
              <div className="absolute flex flex-col justify-center items-center h-4 w-4 rounded-full bg-red-400 text-white right-0 top-0">
                <span className="text-xs">{calculcateNumberOfCartItems()}</span>
              </div>
            ) : null}

            <IconButton
              variant="text"
              color="white"
              onClick={() => {
                navigate("/orders");
              }}
            >
              <ShoppingCartIcon className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="white"
            label="Arama"
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button
            size="sm"
            color="white"
            className="!absolute right-1 top-1 rounded"
          >
            ARA
          </Button>
        </div>
      </div>
    </Navbar>
  );
}
