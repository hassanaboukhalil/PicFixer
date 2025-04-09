import Sidbar from "./Sidbar";

const Main = ({ children }) => {
  return (
    <main className="flex">
      <Sidbar />
      {children}
    </main>
  );
};
export default Main;
