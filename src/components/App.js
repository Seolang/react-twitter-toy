import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // onAuthStateChanged function makes observer that observe state change of auth.
      // and if it changed, it calls callback function.
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    // setUserObj(authService.currentUser);
    // when just try set userObj Object, because userObj is too big,
    // react can't decide whether data is updated or not.
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <div className="App">
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializing"
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
