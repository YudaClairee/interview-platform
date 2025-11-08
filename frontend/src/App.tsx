import "./App.css";
import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>
  );
}

export default App;
