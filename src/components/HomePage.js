// HomePage.js
import React from "react";
import LoginPage from "./LoginPage"; // Assuming login is used here

function HomePage() {
  return (
    <div>
      <h2>Welcome to the Faculty Home Page!</h2>
      <p>Here are some important updates and messages.</p>
      <LoginPage setUserRole={() => {}} /> {/* Login component */}
    </div>
  );
}

export default HomePage;
