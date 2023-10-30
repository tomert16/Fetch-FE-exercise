import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successfullyAdded = (dog) => {
    toast.success(`Successfully added ${dog.name} to your liked list ✅`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };

export const successfullyRemoved = (dog) => {
    toast.success(`Successfully removed ${dog.name} from your liked list ✅`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };

export const unableToGetData = () => {
    toast.error(`Unable to get data❌`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };

export const unableToCreateMatch = () => {
    toast.error(`Cannot find a match❌`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };

