import Loading from "./LoadingToRedirect"

const privateRoute = ({children}) => {

    const user = JSON.parse(localStorage.getItem("profile"))

  return user ? children : <Loading/>
}

export default privateRoute