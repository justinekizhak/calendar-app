import AppHeader from "~/components/AppHeader";
import AppFooter from "~/components/AppFooter";

export default (props) => {
  return (
    <div>
      <AppHeader />
      <main>{props.children}</main>
      <AppFooter />
    </div>
  );
};
